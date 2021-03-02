import { hash } from 'bcryptjs'
import { getRepository } from 'typeorm'

import AppError from '../error/AppError'
import Company from '../models/Company'

interface RequestDTO {
  email: string;
  hash: string;
  company_name: string;
  cnpj: string;
  phone: string;
}

class CreateCompanyService {
  public async execute({ email, hash, phone, cnpj, company_name }: RequestDTO): Promise<Company> {
    const companyRepository = getRepository(Company)

      const checkIfEmailExists = await companyRepository.findOne({
        where: { email }
      })

      const checkIfCnpjExists = await companyRepository.findOne({
        where: { cnpj }
      })

      if(checkIfEmailExists || checkIfCnpjExists){
        throw new AppError('Company already exists in database')
      }

      const hashedPassword = await hash(hash, 8)

      const user = companyRepository.create({
        company_name,
        email,
        hash: hashedPassword,
        phone,
        cnpj
      })

      await companyRepository.save(user)

      return user
  }
}

export default CreateCompanyService;
