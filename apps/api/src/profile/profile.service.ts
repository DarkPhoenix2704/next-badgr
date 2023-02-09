import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProfileDto } from './dto/create-profile.dto';

interface Resp {
    message: string;
    data?: unknown;
}

@Injectable()
export class ProfileService {
    constructor(private readonly prismaService: PrismaService) {}

    Success(resp: Resp) {
        return {
            success: true,
            message: resp.message,
            data: resp.data,
        };
    }

    async read(authid: string) {
        const data = await this.prismaService.user.findUnique({
            where: {
                authid,
            },
        });
        return this.Success({
            message: 'User read successfully',
            data,
        });
    }

    async create(createProfileDto: CreateProfileDto) {
        const res = await this.prismaService.user.create({
            data: createProfileDto,
        });
        return this.Success({
            message: 'User created successfully',
            data: res,
        });
    }
}
