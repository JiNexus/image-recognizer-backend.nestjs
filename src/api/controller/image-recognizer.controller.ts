import { createCanvas, loadImage } from 'canvas';
import { Body, Controller, Post } from '@nestjs/common';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import * as tf from '@tensorflow/tfjs';

@Controller('image-recognizer')
export class ImageRecognizerController {
    private model: cocoSsd.ObjectDetection | null = null;

    constructor() {
        this.loadModel();
    }

    private async loadModel() {
        tf.ready().then(async () => {
            this.model = await cocoSsd.load();
        });
    }

    @Post()
    async process(@Body() body: { imageData: string }) {
        const dataURL = body.imageData;

        // Create a new canvas and context
        const canvas = createCanvas(480, 480); // Adjust the dimensions as needed
        const ctx = canvas.getContext('2d');

        // Load the image onto the canvas
        const image = await loadImage(dataURL);
        ctx.drawImage(image, 0, 0, 480, 480); // Adjust the dimensions as needed

        // Convert the canvas to an HTMLCanvasElement
        const htmlCanvas = canvas as unknown as HTMLCanvasElement;

        // Perform object detection using COCO-SSD
        const predictions = await this.model?.detect(htmlCanvas);

        console.log(predictions);

        // Return the predictions
        return predictions;
    }
}
