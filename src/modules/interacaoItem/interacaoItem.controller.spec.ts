import { Test, TestingModule } from '@nestjs/testing';

import { InteracaoItemController } from './interacaoItem.controller';

describe('InteracaoItemController', () => {
  let controller: InteracaoItemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InteracaoItemController],
    }).compile();

    controller = module.get<InteracaoItemController>(InteracaoItemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
