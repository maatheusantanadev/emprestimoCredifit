import { Test, TestingModule } from '@nestjs/testing';
import { InstallmentsController } from 'src/controllers/installments/installments.controller';
import { InstallmentsRepository } from 'src/repository/installments/installments.repository';
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

  // Mock de InstallmentsRepository
  const mockInstallmentsRepository = {
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
          provide: InstallmentsRepository,
          useValue: mockInstallmentsRepository,
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
      mockInstallmentsRepository.findAll.mockResolvedValue([mockInstallment]);

      const result = await controller.findAll();
      expect(result).toEqual([mockInstallment]);
      expect(mockInstallmentsRepository.findAll).toHaveBeenCalled();
    });
  });

  describe('findById', () => {
    it('should return an installment by ID', async () => {
      mockInstallmentsRepository.findById.mockResolvedValue(mockInstallment);

      const result = await controller.findById('123');
      expect(result).toEqual(mockInstallment);
      expect(mockInstallmentsRepository.findById).toHaveBeenCalledWith('123');
    });

    it('should return null if installment not found', async () => {
      mockInstallmentsRepository.findById.mockResolvedValue(null);

      const result = await controller.findById('non-existent-id');
      expect(result).toBeNull();
      expect(mockInstallmentsRepository.findById).toHaveBeenCalledWith(
        'non-existent-id',
      );
    });
  });

  describe('findByLoanId', () => {
    it('should return installments by loan ID', async () => {
      mockInstallmentsRepository.findByLoanId.mockResolvedValue([
        mockInstallment,
      ]);

      const result = await controller.findByLoanId('loan-1');
      expect(result).toEqual([mockInstallment]);
      expect(mockInstallmentsRepository.findByLoanId).toHaveBeenCalledWith(
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

      mockInstallmentsRepository.create.mockResolvedValue(mockInstallment);

      const result = await controller.create(dto);
      expect(result).toEqual(mockInstallment);
      expect(mockInstallmentsRepository.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('markAsPaid', () => {
    it('should mark an installment as paid', async () => {
      mockInstallmentsRepository.markAsPaid.mockResolvedValue({
        ...mockInstallment,
        paid: true,
      });

      const result = await controller.markAsPaid('123');
      expect(result).toEqual({ ...mockInstallment, paid: true });
      expect(mockInstallmentsRepository.markAsPaid).toHaveBeenCalledWith('123');
    });
  });

  describe('delete', () => {
    it('should delete an installment and return message', async () => {
      const message = { message: 'Parcela deletada com sucesso' };
      mockInstallmentsRepository.delete.mockResolvedValue(message);

      const result = await controller.delete('123');
      expect(result).toEqual(message);
      expect(mockInstallmentsRepository.delete).toHaveBeenCalledWith('123');
    });
  });
});
