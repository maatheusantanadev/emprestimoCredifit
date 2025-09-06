import { Test, TestingModule } from '@nestjs/testing';
import { CompaniesController } from '../../src/controllers/companies/companies.controller';
import { CompaniesService } from '../../src/service/companies/companies.service';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('CompaniesController', () => {
  let controller: CompaniesController;

  const mockService = {
    findAll: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompaniesController],
      providers: [{ provide: CompaniesService, useValue: mockService }],
    }).compile();

    controller = module.get<CompaniesController>(CompaniesController);

    jest.clearAllMocks();
  });

  it('deve retornar a lista de empresas', async () => {
    const companies = [
      { id: '1', cnpj: '123456', corporate_name: 'Empresa X' } as any,
    ];
    mockService.findAll.mockResolvedValueOnce(companies);

    const result = await controller.getAll();

    expect(result).toEqual(companies);
    expect(mockService.findAll).toHaveBeenCalledTimes(1);
  });

  it('deve lançar HttpException em caso de erro', async () => {
    // Mocka o serviço para lançar um erro
    mockService.findAll.mockRejectedValueOnce(new Error('DB error'));

    let error: HttpException | null = null;
    try {
      await controller.getAll();
    } catch (err) {
      error = err as HttpException;
    }

    expect(error).not.toBeNull(); // garante que capturou
    expect(error).toBeInstanceOf(HttpException);
    expect(error!.getStatus()).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
    expect(error!.getResponse()).toEqual(
      expect.objectContaining({
        message: 'Erro ao buscar empresas',
        details: 'DB error',
      }),
    );
  });
});
