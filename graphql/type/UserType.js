import { GraphQLObjectType, GraphQLList, GraphQLString, GraphQLInt } from 'graphql';
import { connectionArgs, connectionFromArray, globalIdField } from 'graphql-relay';
import ProjectConnection from './ProjectConnection';
import PomodoroConnection from './PomodoroConnection';
import { NodeInterface } from '../interface/NodeInterface';

import { ROLES } from '../../config';

export default new GraphQLObjectType({
  name: 'User',
  fields: {
    id: globalIdField('User'),
    userId: {
      description: 'user id for current viewer',
      type: GraphQLString
    },
    email: {
      description: 'the users email address',
      type: GraphQLString
    },
    username: {
      description: 'the users first name',
      type: GraphQLString
    },
    projectsId: {
      description: 'the users last name',
      type: new GraphQLList(GraphQLInt)
    },
    role: {
      description: 'the users role',
      type: GraphQLString
    },
    projects: {
      type: ProjectConnection.connectionType,
      args: connectionArgs,
      resolve: (obj, args, { db }, { rootValue: { tokenData } }) => {
        if (tokenData && tokenData.userId && tokenData.role !== ROLES.anonymous) {
          return connectionFromArray(db.getProjectsForUser(obj.projectsId), args);
        }
        return connectionFromArray([], args);
      }
    },
    pomodoro: {
      type: PomodoroConnection.connectionType,
      args: connectionArgs,
      resolve: (obj, args, { db }, { rootValue: { tokenData } }) => {
        if (tokenData && tokenData.userId && tokenData.role !== ROLES.anonymous) {
          return connectionFromArray(db.getPomodorosForUser(tokenData.userId), args);
        }

        return connectionFromArray([], args);
      }
    }
  },
  interfaces: [NodeInterface]
});
