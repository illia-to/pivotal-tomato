import Relay from 'react-relay';

import PomodoroTrackerComponent from './PomodoroTrackerComponent';
import UpdatePomodoroMutation from '../../../mutation/UpdatePomodoroMutation';

export default Relay.createContainer(PomodoroTrackerComponent, {
  initialVariables: {
    projectId: ''
  },
  fragments: {
    viewer: () => Relay.QL`
    fragment on Viewer {
      project(projectId: $projectId) {
        stories(first: 50) {
          edges {
            node {
              storyId
              title
              pomodoro (first: 1){
                edges {
                  node {
                    userId
                    storyId
                    time
                    id
                  }
                }
              }
            }
          }
        }
      }
      user {
        userId
        ${UpdatePomodoroMutation.getFragment('user')}
      }
    }
  `,
  }
});
