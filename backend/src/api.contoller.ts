import { Controller, Body, Param, Get, Post, Delete } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { Task as TaskModel } from '@prisma/client';

@Controller('api')
export class ApiController {
    constructor(private readonly prismaService: PrismaService) {}

    @Get('task/:id')
    async getTaskById(@Param('id') id: number): Promise<TaskModel> {
        return this.prismaService.task.findUniqueOrThrow({ where: { id } });
    }

    @Get('tasks')
    async getAllTasks(): Promise<TaskModel[]> {
        return this.prismaService.task.findMany();
    }

    @Post('task')
    async createTask(@Body() { text }: { text: string }): Promise<TaskModel> {
        return this.prismaService.task.create({ data: { text } });
    }

    @Delete('task/:id')
    async deleteTaskById(@Param('id') id: number): Promise<TaskModel> {
        return this.prismaService.task.delete({ where: { id } });
    }
}