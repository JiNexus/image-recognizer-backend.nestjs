import { ImageRecognizerController } from '@api/controller/image-recognizer.controller';
import { Module } from '@nestjs/common';

@Module({
    controllers: [ImageRecognizerController],
})
export class ApiModule {}
