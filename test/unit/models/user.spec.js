describe('about User model operation.', function() {
  it('create User with admin', async (done) => {
    try {
      let newUser = {
        username: 'TestUser01',
        email: 'TestUser01@test.com',
      };
      let createdUser = await db.User.create(newUser);

      done();
    } catch (e) {
      console.log(e.stack);
      done(e);
    }
  });

  it('create User with user', async (done) => {
    let newUser = {
      username: 'TestUser02',
      email: 'TestUser02@test.com',
    };
    let createdUser = await db.User.create(newUser);
    done();
  });
});
