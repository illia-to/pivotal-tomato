import Relay from 'react-relay';
import LoginComponent from './LoginComponent';

import LoginMutation from '../../../mutation/LoginMutation';

export default Relay.createContainer(LoginComponent, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        user {
          id,
          role,
          ${LoginMutation.getFragment('user')}
        }
      }
    `,
  }
});
