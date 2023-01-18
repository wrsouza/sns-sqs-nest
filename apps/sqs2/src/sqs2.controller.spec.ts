import { Test, TestingModule } from '@nestjs/testing';
import { Sqs2Controller } from './sqs2.controller';
import { Sqs2Service } from './sqs2.service';

describe('Sqs2Controller', () => {
  let sqs2Controller: Sqs2Controller;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [Sqs2Controller],
      providers: [Sqs2Service],
    }).compile();

    sqs2Controller = app.get<Sqs2Controller>(Sqs2Controller);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(sqs2Controller.getHello()).toBe('Hello World!');
    });
  });
});
