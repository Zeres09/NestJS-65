import { Test, TestingModule } from '@nestjs/testing';
import { BookserviceService } from './bookservice.service';

describe('BookserviceService', () => {
  let service: BookserviceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BookserviceService],
    }).compile();

    service = module.get<BookserviceService>(BookserviceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
