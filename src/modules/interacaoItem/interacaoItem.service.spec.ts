import { Test, TestingModule } from '@nestjs/testing';

import { InteracaoItemService } from './interacaoItem.service';

describe('InteracaoItemService', () => {
  let service: InteracaoItemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InteracaoItemService],
    }).compile();

    service = module.get<InteracaoItemService>(InteracaoItemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
