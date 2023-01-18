import { Injectable } from '@nestjs/common';

@Injectable()
export class Sqs2Service {
  getHello(): string {
    return 'Hello World!';
  }
}
