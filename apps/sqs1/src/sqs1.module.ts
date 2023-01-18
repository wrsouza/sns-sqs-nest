import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { Sqs1Controller } from './sqs1.controller';
import { Sqs1Service } from './sqs1.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        AWS_REGION: Joi.string().required(),
        AWS_SQS_MICROSERVICE_QUEUE_NAME: Joi.string().required(),
        AWS_SQS_MICROSERVICE_QUEUE_URL: Joi.string().required(),
      }),
      envFilePath: './apps/sqs1/.env',
    }),
  ],
  controllers: [Sqs1Controller],
  providers: [Sqs1Service],
})
export class Sqs1Module {}
