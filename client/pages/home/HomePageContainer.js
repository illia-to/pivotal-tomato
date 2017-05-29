import Relay from 'react-relay';
import HomePage from './HomePage';

export default Relay.createContainer(HomePage, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        user {
          id,
          userId
        }
      }
    `,
  },
});
