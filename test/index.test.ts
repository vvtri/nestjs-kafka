import { describe, expect, it, test } from '@jest/globals';
import request from 'supertest';

describe('Listening message successfully', () => {
  it('Start App successfully', async () => {
    const { body, statusCode } = await request(app.getHttpServer())
      .get('/')
      .send();
    expect(statusCode).toEqual(200);
  });

  it('Test produce and listen', async () => {
    const { body, statusCode } = await request(app.getHttpServer())
      .post('/message')
      .send();

    expect(testProducer1Fn).toBeCalled();

    await new Promise<void>((res) => {
      setTimeout(() => {
        res();
      }, 1000);
    });
    expect(testConsumer1Fn).toBeCalled();
  });
});
