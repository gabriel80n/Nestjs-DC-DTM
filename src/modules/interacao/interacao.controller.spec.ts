import { Test, TestingModule } from '@nestjs/testing';

import { InteracaoController } from './interacao.controller';

describe('InteracaoController', () => {
  let controller: InteracaoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InteracaoController],
    }).compile();

    controller = module.get<InteracaoController>(InteracaoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
