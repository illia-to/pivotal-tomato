export default class User {
  constructor(fields) {
    this.id = fields.id;
    this.email = fields.email;
    this.username = fields.username;
    this.password = fields.password;
    this.role = fields.role;
    this.projects = fields.projects;
    this.projectsId = fields.projectsId;
  }
}
