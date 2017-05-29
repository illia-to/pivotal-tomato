import { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList } from 'graphql';
import { connectionArgs, globalIdField, connectionFromArray } from 'graphql-relay';
import PomodoroConnection from './PomodoroConnection';
import { NodeInterface } from '../interface/NodeInterface';
import Story from '../../data/model/Story';

export default new GraphQLObjectType({
  name: 'Story',
  description: 'Story',
  isTypeOf: object => object instanceof Story,
  fields: () => ({
    id: globalIdField('Story'),
    projectId: {
      type: GraphQLString,
      description: 'The posts creators id',
    },
    title: {
      type: GraphQLString,
      description: 'The posts title',
    },
    storyId: {
      type: GraphQLInt,
      description: 'The posts title',
    },
    type: {
      type: GraphQLString,
      description: 'The posts title',
    },
    state: {
      type: GraphQLString,
      description: 'The posts title',
    },
    owners: {
      type: new GraphQLList(GraphQLInt),
      description: 'The posts title',
    },
    time: {
      type: GraphQLInt,
      description: 'The posts title',
    },
    pomodoro: {
      type: PomodoroConnection.connectionType,
      args: connectionArgs,
      resolve: (object, args, { db }, { rootValue: { tokenData } }) => {
        const pomodoro = db.getPomodorosForUserAndStory(tokenData.userId, object.storyId);
        if (pomodoro) {
          return connectionFromArray([pomodoro], args);
        }

        return connectionFromArray([db.createPomodoro({ userId: tokenData.userId, storyId: object.storyId, time: 0 })], args);
      }
    }
  }),
  interfaces: [NodeInterface],
});
