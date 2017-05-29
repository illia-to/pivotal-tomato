import { GraphQLObjectType, GraphQLString } from 'graphql';
import UserType from './UserType';
import ProjectType from './ProjectType';
import PomodoroType from './PomodoroType';

import { ROLES } from '../../config';

export default new GraphQLObjectType({
  name: 'Viewer',
  fields: () => ({
    user: {
      type: UserType,
      resolve: (obj, args, { db }, { rootValue: { tokenData } }) => {
        if (tokenData && tokenData.userId && tokenData.role && tokenData.role !== ROLES.anonymous) {
          return db.getViewerById(tokenData.userId);
        }
        return db.getAnonymousUser();
      }
    },
    project: {
      type: ProjectType,
      args: {
        projectId: { type: GraphQLString }
      },
      resolve: (obj, { projectId }, { db }) => {
        const project = db.getProject(projectId);
        if (!project) {
          return null;
        }
        return project;
      }
    },
    pomodoro: {
      type: PomodoroType,
      args: {
        projectId: { type: GraphQLString }
      },
      resolve: (obj, args, { db }, { rootValue: { tokenData } }) => {
        const pomodoro = db.getPomodorosForUser(tokenData.userId);
        if (!pomodoro) {
          return null;
        }
        return pomodoro;
      }
    }
  })
});
