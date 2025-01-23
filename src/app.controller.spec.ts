import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';  // Ensure that the service is correctly imported

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],  // Ensure the service is provided (even though not used in the controller)
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  it('should be defined', () => {
    expect(appController).toBeDefined();  // Ensures the controller is defined after initialization
  });

  it('should return "Hello World!" when calling getHello()', () => {
    expect(appController.getHello()).toBe('Hello World!');
  });
});


