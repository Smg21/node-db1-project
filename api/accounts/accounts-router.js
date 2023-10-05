const router = require('express').Router()
const Accounts = require("./accounts-model");
const {
  checkAccountPayload,
  checkAccountNameUnique,
  checkAccountId
} = require("./accounts-middleware");

router.get('/', async (req, res, next) => {
  try {
    const accounts = await Accounts.getAll();
    res.json(accounts);
  } catch (err) {
    next(err);
  }
})

router.get('/:id', checkAccountId, (req, res, next) => {
  res.json(req.account);
})

router.post('/', checkAccountPayload, checkAccountNameUnique, (req, res, next) => {
  Accounts.create(req.body)
    .then( newAccount => res.status(201).json(newAccount) )
    .catch(next);
  
})

router.put('/:id', 
  checkAccountId, 
  checkAccountPayload,
  checkAccountNameUnique,

  (req, res, next) => {
    Accounts.updateById(req.params.id, req.body)
      .then( updatedAccount => res.json(updatedAccount))
      .catch(next);

});

router.delete('/:id', checkAccountId, (req, res, next) => {
  Accounts.deleteById(req.params.id)
    .then(() => res.json(req.account))
    .catch(next);
})

router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message
  })
})

module.exports = router;