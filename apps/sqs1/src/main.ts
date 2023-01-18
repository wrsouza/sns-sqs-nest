import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import AwsSqsTransportStrategy from './data/transporters/aws-sqs-transport.strategy';
import { Sqs1Module } from './sqs1.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    Sqs1Module,
    {
      strategy: new AwsSqsTransportStrategy(),
    },
  );
  await app.listen();
}
bootstrap();
