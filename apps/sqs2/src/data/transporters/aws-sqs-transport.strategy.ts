import { Logger } from '@nestjs/common';
import { CustomTransportStrategy, Server } from '@nestjs/microservices';
import * as AWS from 'aws-sdk';
import { Consumer } from 'sqs-consumer';
import { MICROSERVICE_EVENT_NAME } from '../../common/constants/microservice-event-name';

export default class AwsSqsTransportStrategy
  extends Server
  implements CustomTransportStrategy
{
  private _queueName: string;
  private handlerPattern = 'otptokensolicitado';

  constructor() {
    super();
    this._queueName = process.env.AWS_SQS_MICROSERVICE_QUEUE_NAME;
    Logger.log(
      `Observando a fila ${this._queueName}. Url: ${process.env.AWS_SQS_MICROSERVICE_QUEUE_URL}`,
    );
    AWS.config.update({
      region: process.env.AWS_REGION,
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });
  }

  listen(callback: () => void) {
    console.log(this.messageHandlers);
    Logger.log(
      `Starting listening AWS SQS SERVER. AWS Region ${process.env.AWS_REGION}. AWS ACCESS KEY ID ${process.env.AWS_ACCESS_KEY_ID}. Queue Url: ${process.env.AWS_SQS_MICROSERVICE_QUEUE_URL}.  `,
    );

    const app = Consumer.create({
      queueUrl: process.env.AWS_SQS_MICROSERVICE_QUEUE_URL,
      handleMessage: async (message) => {
        Logger.log(message);

        // Returns a Map of all the handlers
        const handlers = this.messageHandlers;

        Logger.log(JSON.stringify(handlers));

        // Try to get a handler for this message
        const handler = handlers.get(MICROSERVICE_EVENT_NAME);

        if (handler) {
          try {
            await handler(message);
          } catch (e) {
            console.log(
              `Error while trying to handle the ${this.handlerPattern} event`,
              e,
            );
            throw e;
          }
        } else {
          console.warn(
            `No handler registered for the ${this.handlerPattern} event`,
          );
        }
      },
      sqs: new AWS.SQS(),
    });

    app.on('error', (err) => {
      Logger.error(`Error with queue`, {
        queue: this._queueName,
        error: err.message,
      });
    });

    app.on('processing_error', (err) => {
      Logger.error(err.message);
    });

    app.on('timeout_error', (err) => {
      Logger.error(err.message);
    });

    app.on('message_received', () => {
      Logger.log('Message Received.');
    });

    app.on('message_processed', () => {
      Logger.log('Message Processed.');
    });

    app.start();

    callback();
  }

  close() {
    Logger.warn('Closing AWS SQS SERVER');
  }
}
