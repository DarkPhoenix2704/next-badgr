import { Injectable } from '@nestjs/common';
import exclude from 'src/lib/exclude';
import { UpdateProfileDto } from './dto/update-profile.dto';
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

    async update(updateProfileDto: UpdateProfileDto) {
        const res = await this.prismaService.user.update({
            where: {
                authid: updateProfileDto.authid,
            },
            data: updateProfileDto,
        });
        return this.Success({
            message: 'User updated successfully',
            data: res,
        });
    }

    async getBySlug(slug: string) {
        const data = await this.prismaService.user.findFirst({
            where: {
                id: {
                    equals: slug,
                    mode: 'insensitive',
                },
            },
        });
        if (!data) {
            return this.Success({
                message: 'User not found',
            });
        }
        exclude(data, ['authid', 'createdAt', 'updatedAt', 'email']);

        return this.Success({
            message: 'User read successfully',
            data,
        });
    }
}
