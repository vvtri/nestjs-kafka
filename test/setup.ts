import { afterAll, beforeAll, jest } from '@jest/globals';
import { INestApplication } from '@nestjs/common';
import { AppModule } from './mock/app.module';
import { Test, TestingModule } from '@nestjs/testing';
import { testMockFn } from './mock/config';

declare global {
  var app: INestApplication;
  var testProducer1Fn: jest.Mock<any>;
  var testConsumer1Fn: jest.Mock<any>;
}

beforeAll(async () => {
  global.testProducer1Fn = jest.fn();
  global.testConsumer1Fn = jest.fn();

  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  })
    .overrideProvider(testMockFn.TEST_PRODUCER1)
    .useValue(global.testProducer1Fn)
    .overrideProvider(testMockFn.TEST_CONSUMER1)
    .useValue(global.testConsumer1Fn)
    .compile();

  global.app = moduleFixture.createNestApplication();
  await app.init();
});

afterAll(async () => {
  await global.app.close();
});
