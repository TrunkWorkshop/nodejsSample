module.exports = {

  database: async () => {
    let force = sails.config.db.force;
    await db.sequelize.sync({force});
  },

  basicData: async () => {
    var roleUser = {
      authority: 'user',
      comment: 'site user'
    };
    let roleUserOptions = {where: {authority: 'user'}, defaults: roleUser}
    var createRoleUser = (await db.Role.findOrCreate(roleUserOptions))[0];

    var roleAdmin = {
      authority: 'admin',
      comment: 'site admin'
    };
    let roleAdminOptions = {where: {authority: 'admin'}, defaults: roleAdmin}
    var createRoleAdmin = (await db.Role.findOrCreate(roleAdminOptions))[0];

    let admin = {
      username: "admin",
      email: "admin@gmail.com",
      mobile: "0900000000",
      address: "admin",
      comment: "",
      city: "基隆市",
      region: "仁愛區",
      zipcode: 200,
      RoleId: createRoleAdmin.id
    };
    let userOptions = {where: {username: "admin"}, defaults: admin}
    let createdAdmin = (await db.User.findOrCreate(userOptions))[0];

    let passport = {
      protocol: 'local',
      password: "admin",
      UserId: createdAdmin.id
    };

    let passportOptions = {where: {UserId: createdAdmin.id}, defaults: passport}

    await db.Passport.findOrCreate(passportOptions);

    // create company
    let companyObj = {
      avatar: "https://cldup.com/VOUpIxN-AH.png",
      name: "Picklete",
      fullname: "Picklete INTERNATIONAL CO.,LTD.",
      email: "hq@picklete.com",
      desc: "週一至週五 早上10:00 -下午5:00",
      line: "https://dl.dropboxusercontent.com/u/9662264/iplusdeal/images/contact.png",
      blog: "http://blog.kerker.com/",
      facebook: "https://www.facebook.com",
      instagram: "https://www.instagram.com",
      youtube: "https://www.yotube.com"
    };

    await db.Company.create(companyObj);


  },

}
