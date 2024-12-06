import { Module } from "@nestjs/common";
import { ServeStaticModule } from "@nestjs/serve-static";
import { PrismaService } from "./prisma.service";
import { ApiController } from "./api.contoller";
import path from 'node:path';

@Module({
    imports: [ 
        ServeStaticModule.forRoot({ 
            rootPath: path.resolve(__dirname, '../frontend'), 
            exclude: ['/api/(.*)'] 
        }) 
    ],
    controllers: [ ApiController ],
    providers: [ PrismaService ]
})
export class BackendModule {}