import fs from 'fs';
import mime from "mime";
import util from "util";

module.exports = {

  getLoginState: function(req) {
    if (req.session.authenticated) {
      return true;
    } else {
      return false;
    }
  },

  getLoginUser: function(req) {
    if (req.session.passport != undefined && req.session.passport.user) {
      return req.session.passport.user;
    } else {
      return null;
    }
  },

  findAll: async () => {
    let users = await db.User.findAll();
    return users;
  },

  findOne: async (id) => {
    let user = await db.User.findById(id);
    return user;
  },

  findAllByRole: async (id) => {
    let users = await db.User.findAll({
      where:{
        RoleId:[id]
      }
    });
    return users;
  },

  findRole: async (id) => {
    let role = await db.Role.findById(id);
    return role;
  },

  findRoles: async () => {
    let roles = await db.Role.findAll();
    return roles;
  },

  search: async (username) => {
    let users = await db.User.findAll({
      where:{
        username:{
          $like: username
        }
      }
    });
    return users;
  },

};
