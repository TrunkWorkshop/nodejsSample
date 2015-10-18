import sinon from 'sinon';


describe("login user data", () => {

  before( async (done) => {
    let admin = db.User.find ({
      where: {username: 'admin'},
      include: [db.Role]
    });
    sinon.stub(UserService, 'getLoginState', (req) => {
      return true;
    });
    sinon.stub(UserService, 'getLoginUser', (req) => {
      return admin;
    });
    return done();
  });

  after( (done) => {
    UserService.getLoginState.restore();
    UserService.getLoginUser.restore();
    done();
  });

});
