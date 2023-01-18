import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { Sqs2Controller } from './sqs2.controller';
import { Sqs2Service } from './sqs2.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        AWS_REGION: Joi.string().required(),
        AWS_SQS_MICROSERVICE_QUEUE_NAME: Joi.string().required(),
        AWS_SQS_MICROSERVICE_QUEUE_URL: Joi.string().required(),
      }),
      envFilePath: './apps/sqs2/.env',
    }),
  ],
  controllers: [Sqs2Controller],
  providers: [Sqs2Service],
})
export class Sqs2Module {}
