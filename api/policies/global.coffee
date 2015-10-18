module.exports = (req, res, next) ->


  req.setLocale(req.language);
  if res.locals and res.locals.company
    return next()

  res.locals = res.locals or {}

  # get user data
  res.locals.user = UserService.getLoginUser(req)
  console.log(res.locals.user);

  try
    # get company data and brand list
    db.Company.findOne()
    .then (result) ->
      console.log '=== find Company ==='
      res.locals.company = result.dataValues;
      next()
  catch error
    console.log error.stack
    console.error "==== without Company Data!! ===="
    next()
