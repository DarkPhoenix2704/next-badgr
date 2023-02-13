import { Body, Controller, Get, Param, Patch, Post, Session, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { SessionContainer } from 'supertokens-node/recipe/session';
import { getUserById } from 'supertokens-node/recipe/emailpassword';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { CreateProfileDto } from './dto/create-profile.dto';
import { ReadException } from './exception/read.exception';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
    constructor(private readonly profileService: ProfileService) {}

    @Get()
    @UseGuards(new AuthGuard())
    async read(@Session() session: SessionContainer) {
        let authid: string;
        try {
            authid = session.getUserId();
            return await this.profileService.read(authid);
        } catch (err) {
            throw new ReadException(err);
        }
    }

    @Post()
    @UseGuards(new AuthGuard())
    async create(@Session() session: SessionContainer, @Body() createProfileDto: CreateProfileDto) {
        let authid: string;
        try {
            authid = session.getUserId();
            const data = { ...createProfileDto, authid };
            return await this.profileService.create(data);
        } catch (err) {
            throw new ReadException(err);
        }
    }

    @Patch()
    @UseGuards(new AuthGuard())
    async update(@Session() session: SessionContainer, @Body() updareProfileDto: UpdateProfileDto) {
        let authid: string;
        try {
            authid = session.getUserId();
            const user = await getUserById(authid);
            const data = { ...updareProfileDto, authid, email: user!.email };
            return await this.profileService.update(data);
        } catch (err) {
            throw new ReadException(err);
        }
    }

    @Get(':slug')
    async getBySlug(@Param('slug') slug: string) {
        return await this.profileService.getBySlug(slug);
    }
}
