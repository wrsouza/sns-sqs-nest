import { Test, TestingModule } from '@nestjs/testing';
import { Sqs1Controller } from './sqs1.controller';
import { Sqs1Service } from './sqs1.service';

describe('Sqs1Controller', () => {
  let sqs1Controller: Sqs1Controller;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [Sqs1Controller],
      providers: [Sqs1Service],
    }).compile();

    sqs1Controller = app.get<Sqs1Controller>(Sqs1Controller);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(sqs1Controller.getHello()).toBe('Hello World!');
    });
  });
});
