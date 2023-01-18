import { Controller, Logger } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { MICROSERVICE_EVENT_NAME } from './common/constants/microservice-event-name';
import { Sqs2Service } from './sqs2.service';

@Controller()
export class Sqs2Controller {
  constructor(private readonly sqs2Service: Sqs2Service) {}

  @EventPattern(MICROSERVICE_EVENT_NAME)
  async eventHandler(data: any): Promise<void> {
    const eventData = JSON.parse(data.Body);
    Logger.log(`Dados recebidos: ${JSON.stringify(eventData)}`);
  }
}
