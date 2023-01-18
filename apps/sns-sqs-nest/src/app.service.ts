import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';

@Injectable()
export class AppService {
  private client: AWS.SNS;

  constructor(private configService: ConfigService) {
    this.client = new AWS.SNS({
      region: this.configService.get<string>('AWS_REGION'),
      endpoint: this.configService.get<string>('AWS_SNS_ENDPOINT'),
    });
  }

  getHello(): string {
    return 'Hello World!';
  }

  async sendMessage(payload: any) {
    const params = {
      Message: JSON.stringify(payload),
      TopicArn: this.configService.get<string>('AWS_SNS_TOPIC'),
    };

    const response = await this.client.publish(params).promise();
    console.log(response);

    return {
      MessageId: response.MessageId,
    };
  }
}
