import { Test, TestingModule } from '@nestjs/testing';
import { BookcontrollerController } from './bookcontroller.controller';

describe('BookcontrollerController', () => {
  let controller: BookcontrollerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookcontrollerController],
    }).compile();

    controller = module.get<BookcontrollerController>(BookcontrollerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
