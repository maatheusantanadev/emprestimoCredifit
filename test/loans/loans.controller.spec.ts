// test/loans/loans.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { LoansController } from 'src/controllers/loans/loans.controller';
import { LoansService } from 'src/service/loans/loans.service';
import {
  CreateLoanDto,
  Loan,
} from 'src/interfaces/loans/CreateloansDto.interfaces';

describe('LoansController', () => {
  let controller: LoansController;

  const mockLoan: Loan = {
    id: 'loan-1',
    employee_id: 'employee-uuid-1',
    amount: 2000,
    installments: 3,
    status: 'pendente',
    score: 750,
    created_at: '2025-09-05T12:00:00Z',
  };

  // Mock tipado do LoansService
  const mockLoansService: Partial<LoansService> = {
    findAll: jest.fn().mockResolvedValue([]),
    findById: jest.fn(),
    findByEmployeeId: jest.fn(),
    create: jest.fn(),
    updateStatus: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoansController],
      providers: [
        {
          provide: LoansService,
          useValue: mockLoansService,
        },
      ],
    }).compile();

    controller = module.get<LoansController>(LoansController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of loans', async () => {
      (mockLoansService.findAll as jest.Mock).mockResolvedValue([mockLoan]);

      const result = await controller.findAll();
      expect(result).toEqual([mockLoan]);
      expect(mockLoansService.findAll).toHaveBeenCalled();
    });
  });

  describe('findById', () => {
    it('should return a loan by ID', async () => {
      (mockLoansService.findById as jest.Mock).mockResolvedValue(mockLoan);

      const result = await controller.findById('loan-1');
      expect(result).toEqual(mockLoan);
      expect(mockLoansService.findById).toHaveBeenCalledWith('loan-1');
    });

    it('should return null if loan not found', async () => {
      (mockLoansService.findById as jest.Mock).mockResolvedValue(null);

      const result = await controller.findById('non-existent-id');
      expect(result).toBeNull();
      expect(mockLoansService.findById).toHaveBeenCalledWith('non-existent-id');
    });
  });

  describe('findByEmployeeId', () => {
    it('should return loans by employee ID', async () => {
      (mockLoansService.findByEmployeeId as jest.Mock).mockResolvedValue([
        mockLoan,
      ]);

      const result = await controller.findByEmployeeId('employee-uuid-1');
      expect(result).toEqual([mockLoan]);
      expect(mockLoansService.findByEmployeeId).toHaveBeenCalledWith(
        'employee-uuid-1',
      );
    });
  });

  describe('create', () => {
    it('should create and return a new loan', async () => {
      const dto: CreateLoanDto = {
        employee_id: 'employee-uuid-1',
        amount: 2500,
        installments: 3,
        status: 'pendente',
        score: 780,
      };

      (mockLoansService.create as jest.Mock).mockResolvedValue(mockLoan);

      const result = await controller.create(dto);
      expect(result).toEqual(mockLoan);
      expect(mockLoansService.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('updateStatus', () => {
    it('should update loan status', async () => {
      (mockLoansService.updateStatus as jest.Mock).mockResolvedValue({
        ...mockLoan,
        status: 'aprovado',
      });

      const result = await controller.updateStatus('loan-1', 'aprovado');
      expect(result).toEqual({ ...mockLoan, status: 'aprovado' });
      expect(mockLoansService.updateStatus).toHaveBeenCalledWith(
        'loan-1',
        'aprovado',
      );
    });
  });

  describe('delete', () => {
    it('should delete a loan and return message', async () => {
      const message = { message: 'Empréstimo deletado com sucesso' };
      (mockLoansService.delete as jest.Mock).mockResolvedValue(message);

      const result = await controller.delete('loan-1');
      expect(result).toEqual(message);
      expect(mockLoansService.delete).toHaveBeenCalledWith('loan-1');
    });
  });
});
