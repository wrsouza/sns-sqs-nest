import { Injectable } from '@nestjs/common';

@Injectable()
export class Sqs1Service {
  getHello(): string {
    return 'Hello World!';
  }
}
