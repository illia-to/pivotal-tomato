import Relay from 'react-relay';

export default class UpdatePomodoroMutation extends Relay.Mutation {

  getMutation() {
    return Relay.QL`mutation { updatePomodoro }`;
  }

  getVariables() {
    return {
      time: this.props.time,
      userId: this.props.user.userId,
      storyId: this.props.storyId
    };
  }

  getFatQuery() {
    return Relay.QL`
      fragment on updatePomodoroPayload {
        pomodoro
      }
    `;
  }

  getConfigs() {
    return [
      {
        type: 'FIELDS_CHANGE',
        fieldIDs: {
          pomodoro: this.props.pomodoro.id
        }
      }];
  }

  static fragments = {
    user: () => Relay.QL`
      fragment on User {
        userId,
        id
      }
    `
  }
}
