import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import {
  ListGroup,
  ListGroupItem,
} from 'react-bootstrap';

export default class ProjectListComponent extends React.Component {
  navigateToProject(projectId, event) {
    event.preventDefault();
    browserHistory.push(`projects/${projectId}`);
  }

  render() {
    const ProjectsEdges = this.props.viewer.user.projects.edges;
    const Projects = ProjectsEdges.map(project =>
      <ListGroupItem
        key={project.node.projectId}
        onClick={this.navigateToProject.bind(this, project.node.projectId)}
      >
        {project.node.title}
      </ListGroupItem >
    );

    return (
      <ListGroup>
        {Projects}
      </ListGroup>
    );
  }
}

ProjectListComponent.contextTypes = {
  router: PropTypes.object.isRequired,
};

ProjectListComponent.propTypes = {
  viewer: PropTypes.object.isRequired
};
