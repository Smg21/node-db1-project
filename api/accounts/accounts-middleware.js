const Accounts = require("./accounts-model");

exports.checkAccountNameUnique = async (req, res, next) => {
  const { name } = req.body;

  if(req.params.id) { 
    const account = await Accounts.getById(req.params.id);
    if(account.name === name) {
      next();
      return;
    }
  }
    
  const accounts = await Accounts.getAll();
  
  for (const account of accounts) {
    if(account.name === name) {
      next({
        status: 400,
        message: "that name is taken"
      })
      return;
    }
  }

  next();
}

exports.checkAccountPayload = (req, res, next) => {

  const errObj = { status: 400 };

  if(req.body.name === undefined || req.body.budget === undefined)
    errObj.message = "name and budget are required";
  else {
    req.body.name = req.body.name.trim();

    const {name, budget} = req.body;

    if(name.length < 3 || name.length > 100)
      errObj.message = "name of account must be between 3 and 100";
    else if (budget !== 0 && !Number(budget)) 
      errObj.message = "budget of account must be a number";
    else if(budget < 0 || budget > 1000000) 
      errObj.message = "budget of account is too large or too small";
  }

  if(errObj.message) {
    next(errObj);
  } else next();

}

exports.checkAccountId = async (req, res, next) => {
  const account = await Accounts.getById(req.params.id);

  if(account) {
    req.account = account;
    next();
  }
  else next({
    status: 404,
    message: "account not found"
  });
}