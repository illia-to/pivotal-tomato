import Relay from 'react-relay';

import ProjectListComponent from './ProjectListComponent';

export default Relay.createContainer(ProjectListComponent, {
  fragments: {
    viewer: () => Relay.QL`
    fragment on Viewer {
      user {
        userId,
        role,
        projects (first: 100) {
          edges {
            node {
              projectId,
              title,
              stories (first: 100){
              edges{
                node{
                  title
                  pomodoro (first: 10){
                    edges{
                      node{
                        userId
                        time
                        id
                        storyId
                      }
                    }
                  }
                }
              }
            }
            }
          }
        }
      }
    }
  `,
  },
});


