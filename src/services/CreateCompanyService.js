const { hash } = require('bcryptjs');

const ContextInterface = require('../db/base/ContextInterface');
const CompanyRepository = require('../db/mongodb/repositories/CompaniesRepository');
const CompanySchema = require('../db/mongodb/schemas/CompanySchema');
const Base = require('../db/base/MongoBase');

class CreateCompanyService {
  async execute(payload) {
    const connection = Base.connect();
    const baseInterface = new Base(connection);
    const context = new ContextInterface(new CompanyRepository(CompanySchema));

    const isConnected = await baseInterface.isConnected();

    if (isConnected) {
      const { email } = payload;
      const companyInDatabase = await context.read({ email });

      if (companyInDatabase.length) {
        throw new Error('Company already exists in database');
      }

      const hashedPassword = await hash(payload.hash, 8);

      const user = {
        email,
        hash: hashedPassword,
        phone: payload.phone,
        company_name: payload.company_name,
        is_company: true,
        is_premium: false,
        is_verified: false,
        followers: 0,
        created_at: Date.now(),
        updated_at: Date.now()
      };

      return await context.create(user);
    }
  }
}

module.exports = CreateCompanyService;
