import { Module } from '@nestjs/common';
import { SupabaseModule } from 'src/database/database.module';
import { CompaniesRepository } from 'src/repository/companies/companies.repository';
import { CompaniesController } from 'src/controllers/companies/companies.controller';
import { EmployeesController } from './controllers/employees/employess.controller';
import { EmployeesRepository } from './repository/employees/employees.repository';

@Module({
  imports: [SupabaseModule],
  controllers: [CompaniesController, EmployeesController],
  providers: [CompaniesRepository, EmployeesRepository],
})
export class AppModule {}
