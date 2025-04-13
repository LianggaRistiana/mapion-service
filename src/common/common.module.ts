import { Global, Module } from '@nestjs/common';
import { Prisma } from 'generated/prisma';
import { WinstonModule } from 'nest-winston';
import *  as winston from "winston"
import { validationService } from './validation.service';
import { PrismaService } from './prisma.service';


@Global()
@Module({
    imports:[
        WinstonModule.forRoot({
            format: winston.format.json(),
            transports: [
                new winston.transports.Console()
            ]
        })
    ],
    providers:[PrismaService, validationService],
    exports:[PrismaService, validationService],
    
})
export class CommonModule {}
