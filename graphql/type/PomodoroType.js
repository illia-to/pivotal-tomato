import { GraphQLObjectType, GraphQLInt } from 'graphql';
import { globalIdField } from 'graphql-relay';

import { NodeInterface } from '../interface/NodeInterface';
import Timer from '../../data/model/Pomodoro';

export default new GraphQLObjectType({
  name: 'Pomodoro',
  isTypeOf: object => object instanceof Timer,
  fields: {
    id: globalIdField('Pomodoro'),
    userId: {
      description: 'user id for current viewer',
      type: GraphQLInt
    },
    storyId: {
      description: 'the users email address',
      type: GraphQLInt
    },
    time: {
      description: 'the users first name',
      type: GraphQLInt
    }
  },
  interfaces: () => [NodeInterface]
});
