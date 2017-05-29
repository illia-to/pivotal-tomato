import { GraphQLObjectType, GraphQLString } from 'graphql';
import { connectionArgs, globalIdField, connectionFromArray } from 'graphql-relay';
import { ROLES } from '../../config';
import Project from '../../data/model/Project';
import StoryConnection from './StoryConnection';

import { NodeInterface } from '../interface/NodeInterface';

export default new GraphQLObjectType({
  name: 'Project',
  description: 'A post',
  isTypeOf: object => object instanceof Project,
  fields: () => ({
    id: globalIdField('Project'),
    projectId: {
      type: GraphQLString,
      description: 'The posts creators id',
    },
    title: {
      type: GraphQLString,
      description: 'The posts title',
    },
    stories: {
      type: StoryConnection.connectionType,
      args: connectionArgs,
      resolve: async (obj, args, { db }, { rootValue: { tokenData } }) => {
        if (tokenData && tokenData.userId && tokenData.role !== ROLES.anonymous) {
          return connectionFromArray(await db.fetchStories(obj.projectId, tokenData.userId), args);
        }
        return connectionFromArray([], args);
      }
    }
  }),
  interfaces: [NodeInterface],
});
