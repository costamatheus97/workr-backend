import { getRepository } from 'typeorm'

import AppError from '../error/AppError'
import Company from '../models/Company'

interface RequestDTO {
  id: string,
  phone: string,
  city: string,
  state: string,
  country: string,
  cep: string,
  company_size: string,
  field: string,
  description: string,
}

class UpdateCompanyService {
  async execute({ phone, city, state, country, cep, description, company_size, field, id }: RequestDTO): Promise<Company> {
    const companyRepository = getRepository(Company)

    const company = await companyRepository.findOne({
      where: { id }
    })

    if (!company) {
      throw new AppError('User not found in database');
    }

    company.city = city
    company.state = state
    company.country = country
    company.cep = cep
    company.phone = phone
    company.description = description
    company.company_size = company_size
    company.field = field

    await companyRepository.save(company)

    return company;
  }
}

export default UpdateCompanyService
