import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().required(),
        AWS_REGION: Joi.string().required(),
        AWS_SNS_TOPIC: Joi.string().required(),
        AWS_SNS_ENDPOINT: Joi.string().required(),
      }),
      envFilePath: './apps/sns-sqs-nest/.env',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
