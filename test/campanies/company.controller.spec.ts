import { Test, TestingModule } from '@nestjs/testing';
import { CompaniesController } from '../../src/controllers/companies/companies.controller';
import { CompaniesRepository } from '../../src/repository/companies/companies.repository';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('CompanyController', () => {
  let controller: CompaniesController;

  const mockRepo = {
    findAll: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompaniesController],
      providers: [{ provide: CompaniesRepository, useValue: mockRepo }],
    }).compile();

    controller = module.get<CompaniesController>(CompaniesController);

    jest.clearAllMocks(); // limpa mocks entre testes
  });

  it('deve retornar a lista de empresas', async () => {
    const companies = [
      { id: '1', cnpj: '123456', corporate_name: 'Empresa X' } as any,
    ];
    mockRepo.findAll.mockResolvedValueOnce(companies);

    const result = await controller.getAll();

    expect(result).toEqual(companies);
    expect(mockRepo.findAll).toHaveBeenCalledTimes(1);
  });

  it('deve lançar HttpException em caso de erro', async () => {
    mockRepo.findAll.mockRejectedValueOnce(new Error('DB error'));

    await expect(controller.getAll()).rejects.toThrow(HttpException);

    try {
      await controller.getAll();
    } catch (err) {
      expect(err).toBeInstanceOf(HttpException);
      expect((err as HttpException).getStatus()).toBe(
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
      expect((err as HttpException).getResponse()).toEqual(
        expect.objectContaining({
          message: 'Erro ao buscar empresas',
          details: 'DB error',
        }),
      );
    }
  });
});
