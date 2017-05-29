import React from 'react';
import Relay from 'react-relay';
import PropTypes from 'prop-types';

import Header from './header/HeaderContainer';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      navigationOpen: false
    };
  }

  render() {
    return (
      <div>
        <Header
          viewer={this.props.viewer}
        />

        <div id='container' className='container'>
          {this.props.children}
        </div>
      </div>
    );
  }
}

App.contextTypes = {
  router: PropTypes.object.isRequired,
};

App.propTypes = {
  viewer: PropTypes.object.isRequired,
  children: PropTypes.object.isRequired
};

App.childContextTypes = {
  muiTheme: PropTypes.object.isRequired,
};

export default Relay.createContainer(App, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        ${Header.getFragment('viewer')},
      }
    `
  }
});
