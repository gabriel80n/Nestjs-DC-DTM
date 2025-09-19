import { Test, TestingModule } from '@nestjs/testing';

import { InteracaoService } from './interacao.service';

describe('InteracaoService', () => {
  let service: InteracaoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InteracaoService],
    }).compile();

    service = module.get<InteracaoService>(InteracaoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
