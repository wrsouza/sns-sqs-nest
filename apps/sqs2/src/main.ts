import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import AwsSqsTransportStrategy from './data/transporters/aws-sqs-transport.strategy';
import { Sqs2Module } from './sqs2.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    Sqs2Module,
    {
      strategy: new AwsSqsTransportStrategy(),
    },
  );
  await app.listen();
}
bootstrap();
