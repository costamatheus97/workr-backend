const express = require('express');

const router = express.Router();

const CreateUserService = require('../services/CreateUserService')
const UpdateUserService = require('../services/UpdateUserService')
const ContextInterface = require('../db/base/ContextInterface')
const UsersRepository = require('../db/mongodb/repositories/UsersRepository')
const UserSchema = require('../db/mongodb/schemas/UserSchema')
const Base = require('../db/base/MongoBase')

const context = new ContextInterface(new UsersRepository(UserSchema))

router.get('/', async (req, res, next) => {
  const connection = Base.connect();
  const baseInterface = new Base(connection)
  const isConnected = await baseInterface.isConnected(connection)

  if(isConnected) {
    try {
      const users = await context.read()
    
      res.json(users);
    } catch (error) {
      next(error)
    }
  }
});

router.post('/', async (req, res, next) => {
  const createUserService = new CreateUserService()
  try {
    const newUser = await createUserService.execute(req.body);

    res.json(newUser);
  } catch (error) {
    next(error)
  }
});

router.put('/:id', async (req, res, next) => {
  const updateUserService = new UpdateUserService()
  try {
    const updatedUser = await updateUserService.execute(req.body, req.params.id);

    res.json(updatedUser).status(200);
  } catch (error) {
    next(error)
  }
});

module.exports = router;
