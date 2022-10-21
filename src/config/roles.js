const roles = ['user', 'admin', 'brand'];
const adminRoles = ['admin']; //only this roles can login to dashboard

const roleRights = new Map();
roleRights.set(roles[0], ['getUsers', "manageUsers"]);
roleRights.set(roles[1], ['getUsers', 'manageUsers']);
roleRights.set(roles[2], ['getUsers', "manageUsers"]);

module.exports = {
  roles,
  roleRights,
  adminRoles
};
