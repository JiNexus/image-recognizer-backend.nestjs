import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiModule } from './api/api.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RouterModule } from '@nestjs/core';

@Module({
    imports: [
        ApiModule,
        ConfigModule.forRoot(),
        RouterModule.register([
            {
                path: 'api',
                module: ApiModule,
            },
        ]),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
