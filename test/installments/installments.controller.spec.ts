import { Test, TestingModule } from '@nestjs/testing';
import { InstallmentsController } from 'src/controllers/installments/installments.controller';
import { InstallmentsService } from 'src/service/installments/installments.service';
import {
  CreateInstallmentDto,
  Installment,
} from 'src/interfaces/installments/CreateinstallmentsDto.interfaces';

describe('InstallmentsController', () => {
  let controller: InstallmentsController;

  const mockInstallment: Installment = {
    id: '123',
    loan_id: 'loan-1',
    installment_number: 1,
    due_date: '2025-09-01',
    amount: 1000,
    paid: false,
  };

  // Mock do Service (não mais Repository!)
  const mockInstallmentsService = {
    findAll: jest.fn(),
    findById: jest.fn(),
    findByLoanId: jest.fn(),
    create: jest.fn(),
    markAsPaid: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InstallmentsController],
      providers: [
        {
          provide: InstallmentsService,
          useValue: mockInstallmentsService,
        },
      ],
    }).compile();

    controller = module.get<InstallmentsController>(InstallmentsController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of installments', async () => {
      mockInstallmentsService.findAll.mockResolvedValue([mockInstallment]);

      const result = await controller.findAll();
      expect(result).toEqual([mockInstallment]);
      expect(mockInstallmentsService.findAll).toHaveBeenCalled();
    });
  });

  describe('findById', () => {
    it('should return an installment by ID', async () => {
      mockInstallmentsService.findById.mockResolvedValue(mockInstallment);

      const result = await controller.findById('123');
      expect(result).toEqual(mockInstallment);
      expect(mockInstallmentsService.findById).toHaveBeenCalledWith('123');
    });
  });

  describe('findByLoanId', () => {
    it('should return installments by loan ID', async () => {
      mockInstallmentsService.findByLoanId.mockResolvedValue([mockInstallment]);

      const result = await controller.findByLoanId('loan-1');
      expect(result).toEqual([mockInstallment]);
      expect(mockInstallmentsService.findByLoanId).toHaveBeenCalledWith(
        'loan-1',
      );
    });
  });

  describe('create', () => {
    it('should create and return a new installment', async () => {
      const dto: CreateInstallmentDto = {
        loan_id: 'loan-1',
        installment_number: 2,
        due_date: '2025-10-01',
        amount: 500,
      };

      mockInstallmentsService.create.mockResolvedValue(mockInstallment);

      const result = await controller.create(dto);
      expect(result).toEqual(mockInstallment);
      expect(mockInstallmentsService.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('markAsPaid', () => {
    it('should mark an installment as paid', async () => {
      mockInstallmentsService.markAsPaid.mockResolvedValue({
        ...mockInstallment,
        paid: true,
      });

      const result = await controller.markAsPaid('123');
      expect(result).toEqual({ ...mockInstallment, paid: true });
      expect(mockInstallmentsService.markAsPaid).toHaveBeenCalledWith('123');
    });
  });

  describe('delete', () => {
    it('should delete an installment and return message', async () => {
      const message = { message: 'Parcela deletada com sucesso' };
      mockInstallmentsService.delete.mockResolvedValue(message);

      const result = await controller.delete('123');
      expect(result).toEqual(message);
      expect(mockInstallmentsService.delete).toHaveBeenCalledWith('123');
    });
  });
});
