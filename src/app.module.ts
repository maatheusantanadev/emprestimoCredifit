import { Module } from '@nestjs/common';
import { SupabaseModule } from 'src/database/database.module';
import { CompaniesRepository } from 'src/repository/companies/companies.repository';
import { CompaniesController } from 'src/controllers/companies/companies.controller';
import { EmployeesController } from './controllers/employees/employess.controller';
import { EmployeesRepository } from './repository/employees/employees.repository';
import { InstallmentsController } from './controllers/installments/installments.controller';
import { InstallmentsRepository } from './repository/installments/installments.repository';
import { LoansRepository } from './repository/loans/loans.repository';
import { LoansController } from './controllers/loans/loans.controller';
import { LoansService } from './service/loans/loans.service';
import { CompaniesService } from './service/companies/companies.service';

@Module({
  imports: [SupabaseModule],
  controllers: [
    CompaniesController,
    EmployeesController,
    InstallmentsController,
    LoansController,
  ],
  providers: [
    CompaniesRepository,
    EmployeesRepository,
    InstallmentsRepository,
    LoansRepository,

    CompaniesService,
    LoansService,
  ],
})
export class AppModule {}
