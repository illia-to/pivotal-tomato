import Relay from 'react-relay';
import LogoutMutation from '../../../mutation/LogoutMutation';
import Header from './Header';

export default Relay.createContainer(Header, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        user {
          userId,
          username,
          role,
          projects (first: 10) {
            edges
          },
          ${LogoutMutation.getFragment('user')}
        },
      }
    `,
  }
});
