import { Controller, Logger } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { MICROSERVICE_EVENT_NAME } from './common/constants/microservice-event-name';
import { Sqs1Service } from './sqs1.service';

@Controller()
export class Sqs1Controller {
  constructor(private readonly sqs1Service: Sqs1Service) {}

  @EventPattern(MICROSERVICE_EVENT_NAME)
  async eventHandler(data: any): Promise<void> {
    const eventData = JSON.parse(data.Body);
    Logger.log(`Dados recebidos: ${JSON.stringify(eventData)}`);
  }
}
