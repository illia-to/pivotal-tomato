export default class Project {
  constructor(fields) {
    this.id = fields.id;
    this.storyId = fields.storyId;
    this.projectId = fields.projectId;
    this.type = fields.type;
    this.title = fields.title;
    this.state = fields.state;
    this.owners = fields.owners;
    this.time = fields.time;
  }
}
