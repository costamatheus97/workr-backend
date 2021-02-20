const ContextInterface = require('../db/base/ContextInterface');
const CompanyRepository = require('../db/mongodb/repositories/CompaniesRepository');
const CompanySchema = require('../db/mongodb/schemas/CompanySchema');
const Base = require('../db/base/MongoBase');

class CreateCompanyService {
  async execute(payload, id) {
    const connection = Base.connect();
    const baseInterface = new Base(connection);
    const context = new ContextInterface(new CompanyRepository(CompanySchema));

    const isConnected = await baseInterface.isConnected();

    if (isConnected) {
      const company = await context.read({ _id: id });

      console.log(company);

      if (company.length === 0) {
        throw new Error('Company not found in database');
      }

      return context.update({ _id: id }, {
        $set: payload
      });
    }
  }
}

module.exports = CreateCompanyService;
