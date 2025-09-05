// test/employees/employees.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { EmployeesController } from 'src/controllers/employees/employess.controller';
import { EmployeesRepository } from 'src/repository/employees/employees.repository';
import {
  Employee,
  CreateEmployeeDto,
} from 'src/interfaces/employees/CreateEmployeesDto.interfaces';

describe('EmployeesController', () => {
  let controller: EmployeesController;

  // Mock de EmployeesRepository
  const mockEmployeesRepository = {
    findAll: jest.fn(),
    findById: jest.fn(),
    findByCompany: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeesController],
      providers: [
        {
          provide: EmployeesRepository,
          useValue: mockEmployeesRepository,
        },
      ],
    }).compile();

    controller = module.get<EmployeesController>(EmployeesController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of employees', async () => {
      const employees: Employee[] = [
        {
          id: 'uuid-1',
          company_id: 'uuid-company',
          full_name: 'John Doe',
          cpf: '123.456.789-00',
          email: 'john@example.com',
          salary: 5000,
          created_at: new Date(),
        },
      ];

      mockEmployeesRepository.findAll.mockResolvedValue(employees);

      const result = await controller.findAll();
      expect(result).toEqual(employees);
      expect(mockEmployeesRepository.findAll).toHaveBeenCalled();
    });
  });

  describe('findById', () => {
    it('should return an employee by ID', async () => {
      const employee: Employee = {
        id: 'uuid-1',
        company_id: 'uuid-company',
        full_name: 'John Doe',
        cpf: '123.456.789-00',
        email: 'john@example.com',
        salary: 5000,
        created_at: new Date(),
      };

      mockEmployeesRepository.findById.mockResolvedValue(employee);

      const result = await controller.findById('uuid-1');
      expect(result).toEqual(employee);
      expect(mockEmployeesRepository.findById).toHaveBeenCalledWith('uuid-1');
    });

    it('should return null if employee not found', async () => {
      mockEmployeesRepository.findById.mockResolvedValue(null);

      const result = await controller.findById('non-existent-id');
      expect(result).toBeNull();
      expect(mockEmployeesRepository.findById).toHaveBeenCalledWith(
        'non-existent-id',
      );
    });
  });

  describe('create', () => {
    it('should create and return a new employee', async () => {
      const createDto: CreateEmployeeDto = {
        company_id: 'uuid-company',
        full_name: 'Jane Doe',
        cpf: '987.654.321-00',
        email: 'jane@example.com',
        password: 'hashedpassword',
        salary: 6000,
      };

      const createdEmployee: Employee = {
        id: 'uuid-2',
        company_id: createDto.company_id,
        full_name: createDto.full_name,
        cpf: createDto.cpf,
        email: createDto.email,
        salary: createDto.salary,
        created_at: new Date(),
      };

      mockEmployeesRepository.create.mockResolvedValue(createdEmployee);

      const result = await controller.create(createDto);
      expect(result).toEqual(createdEmployee);
      expect(mockEmployeesRepository.create).toHaveBeenCalledWith(createDto);
    });
  });

  describe('update', () => {
    it('should update and return the employee', async () => {
      const updates: Partial<CreateEmployeeDto> = { salary: 7000 };
      const updatedEmployee: Employee = {
        id: 'uuid-1',
        company_id: 'uuid-company',
        full_name: 'John Doe',
        cpf: '123.456.789-00',
        email: 'john@example.com',
        salary: 7000,
        created_at: new Date(),
      };

      mockEmployeesRepository.update.mockResolvedValue(updatedEmployee);

      const result = await controller.update('uuid-1', updates);
      expect(result).toEqual(updatedEmployee);
      expect(mockEmployeesRepository.update).toHaveBeenCalledWith(
        'uuid-1',
        updates,
      );
    });

    it('should return null if employee not found', async () => {
      mockEmployeesRepository.update.mockResolvedValue(null);

      const result = await controller.update('non-existent-id', {
        salary: 8000,
      });
      expect(result).toBeNull();
      expect(mockEmployeesRepository.update).toHaveBeenCalledWith(
        'non-existent-id',
        { salary: 8000 },
      );
    });
  });

  describe('delete', () => {
    it('should delete the employee and return message', async () => {
      const message = { message: 'Funcionário deletado com sucesso' };
      mockEmployeesRepository.delete.mockResolvedValue(message);

      const result = await controller.delete('uuid-1');
      expect(result).toEqual(message);
      expect(mockEmployeesRepository.delete).toHaveBeenCalledWith('uuid-1');
    });
  });
});
