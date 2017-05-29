import React from 'react';
import PropTypes from 'prop-types';
import styles from './home.css';

export default class HomePage extends React.Component {
  render() {
    return (
      <div className={styles.content}>
        <h2>Welcome to Pivotal Tomato</h2>
      </div>
    );
  }
}

HomePage.contextTypes = {
  router: PropTypes.object.isRequired,
};
