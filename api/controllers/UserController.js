
/**
 * Authentication Controller
#
 * This is merely meant as an example of how your Authentication controller
 * should look. It currently includes the minimum amount of functionality for
 * the basics of Passport.js to work.
 */
let moment = require("moment");

let UserController = {


  controlLogin: function(req, res) {
    console.log('=== into controlLogin ===');
    if(UserService.getLoginState(req))
      res.redirect('/admin/members');
    else
      res.view({});
  },
  controlMembers: async function(req, res) {

    try {
      console.log('query',req.query);

      let query = req.query;
      let queryObj = {};

      if (query.fullName) {
        queryObj.fullName = { 'like': '%'+query.fullName+'%'};
      }

      if (query.keyword) {
        queryObj.$or = [
          { comment:  { $like: '%'+query.keyword+'%' }},
          { email:    { $like: '%'+query.keyword+'%' }},
          { mobile:   { $like: '%'+query.keyword+'%' }},
          { fullName: { $like: '%'+query.keyword+'%' }}
        ];
      }

      if (query.mobile) {
        queryObj.mobile = { 'like': '%'+query.mobile+'%'};
      }

      if (query.createdStart && query.createdEnd) {
         queryObj.createdAt = {
           between : [
             new Date(query.createdStart),
             new Date(query.createdEnd)
           ]
         };
      }
      else if (query.createdStart || query.createdEnd) {
        queryObj.createdAt = query.createdStart? {
          gte : new Date(query.createdStart)}: {
          lte : new Date(query.createdEnd)};
      }

      let page = await pagination.page(req);
      let offset = await pagination.offset(req);
      let limit = await pagination.limit(req);

      let members = await db.User.findAndCountAll({
        where: queryObj,
        offset: offset,
        limit: limit
      });

      //查詢購物金
      for (var i = 0; i < members.rows.length; i++) {
        let member = members.rows[i];

        member.totalBonusRemain = 0;
      }

      res.view("user/controlMembers", {
        pageName: "members",
        members: members,
        page: page,
        limit: limit,
        totalPages: Math.ceil(members.count / limit),
        totalRows: members.count,
        query
      });
    }
    catch (error) {
      return res.serverError(error);
    }
  },
  controlMemberDetail: async function(req, res) {
    try {
      res.view("user/controlMemberDetail", {
        pageName: "member-detail",
        member: await db.User.findById(req.param('id'))
      });
    }
    catch (error) {
      return res.serverError(error);
    }
  },


  search: async (req, res) => {
    try {
      let userName = req.param("username");
      let users = await UserService.search(userName);
      // console.log("\n ### find user =>",user);
      return res.ok({users});
    } catch (error) {
      return res.serverError(error);
    }
  },

  add: async (req, res) => {
    try{
      let newUser = req.body.user;
      // console.log("\n ### new user =>\n",newUser);
      let addUser = await db.User.create(newUser);
      if(!addUser){
        return res.serverError({
          msg: 'add a new user failed.'
        });
      }
      var query = req.query.responseType;
      if(!query || query.toLowerCase() == 'json'){
        return res.ok(addUser.toJSON());
      }else{
        return res.redirect('user/index');
      }
    }catch(error){
      return res.serverError(error);
    }
  },


};

module.exports = UserController;
