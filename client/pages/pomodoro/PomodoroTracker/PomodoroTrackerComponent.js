import React from 'react';
import PropTypes from 'prop-types';
import Relay from 'react-relay';
import {
  Grid,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
} from 'react-bootstrap';

import PomodoroComponent from '../PomodoroComponent/PomodoroComponent';
import UpdatePomodoroMutation from '../../../mutation/UpdatePomodoroMutation';

export default class PomodoroTrackerComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      storyId: 0,
      storyTitle: '',
      pomodoro: {}
    };
  }

  handleTicketForPomodoro(storyId, user, time, pomodoro) {
    Relay.Store.commitUpdate(
      new UpdatePomodoroMutation({
        storyId,
        time,
        user,
        pomodoro
      }),
      {
        onFailure: () => {
          console.log('login failed');
        },
        onSuccess: (response) => {
          console.log(response);
        }
      }
    );
  }

  handleStoryClick(story, pomodoro) {
    this.setState({
      storyId: story.storyId,
      storyTitle: story.title,
      pomodoro
    });
  }

  render() {
    const storiesEdge = this.props.viewer.project.stories.edges;
    const Stories = storiesEdge.map((story) => {
      const pomodoro = story.node.pomodoro.edges[0].node;

      return (<ListGroupItem
        key={story.node.storyId}
        className={'active'}
        onClick={this.handleStoryClick.bind(this, story.node, pomodoro)}
      >
        <span>{story.node.title}</span>
        <span>{`[spent: ${pomodoro.time}]`}</span>
      </ListGroupItem >);
    });


    return (
      <Grid>
        <Row className='show-grid'>
          <Col xs={12} md={8}>
            <h2>{this.state.storyTitle}</h2>
            <PomodoroComponent
              storyId={this.state.storyId}
              action={this.handleTicketForPomodoro}
              user={this.props.viewer.user}
              pomodoro={this.state.pomodoro}
            />
          </Col>
          <Col xs={6} md={4}>
            <ListGroup>
              {Stories}
            </ListGroup>
          </Col>
        </Row>
      </Grid>
    );
  }
}

PomodoroTrackerComponent.contextTypes = {
  router: PropTypes.object.isRequired,
};

PomodoroTrackerComponent.propTypes = {
  viewer: PropTypes.object.isRequired,
};

