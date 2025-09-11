import { Module } from '@nestjs/common';
import { SupabaseModule } from './database/database.module';
import { CompaniesRepository } from './repository/companies/companies.repository';
import { CompaniesController } from './controllers/companies/companies.controller';
import { EmployeesController } from './controllers/employees/employess.controller';
import { EmployeesRepository } from './repository/employees/employees.repository';
import { LoansRepository } from './repository/loans/loans.repository';
import { LoansController } from './controllers/loans/loans.controller';
import { LoansService } from './service/loans/loans.service';
import { CompaniesService } from './service/companies/companies.service';
import { EmployeesService } from './service/employees/employees.service';

@Module({
  imports: [SupabaseModule],
  controllers: [
    CompaniesController,
    EmployeesController,
    LoansController,
  ],
  providers: [
    CompaniesRepository,
    EmployeesRepository,
    LoansRepository,

    CompaniesService,
    LoansService,
    EmployeesService,
  ],
})
export class AppModule {}
