import { ValidationPipe } from "@nestjs/common";
import { BackendModule } from "./backend.module";
import { NestFactory } from "@nestjs/core";

async function bootstrap() {
    const server = await NestFactory.create(BackendModule);
    server.useGlobalPipes(new ValidationPipe({ transform: true }));

    await server.listen(process.env.SERVER_PORT ?? 80);
} 

bootstrap();