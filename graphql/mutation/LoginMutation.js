import { GraphQLNonNull, GraphQLString } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';

import { createToken, decodeToken } from '../../server/authentication';

import UserType from '../type/UserType';

export default mutationWithClientMutationId({
  name: 'Login',
  inputFields: {
    email: {
      type: new GraphQLNonNull(GraphQLString)
    },
    password: {
      type: new GraphQLNonNull(GraphQLString)
    },
    id: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  outputFields: {
    user: {
      type: UserType,
      resolve: payload => payload
    }
  },
  mutateAndGetPayload: async ({ email, password }, { db }, { rootValue }) => {
    const user = await db.fetchUser(email, password);
    if (user) {
      rootValue.session.token = createToken(user);
      rootValue.tokenData = decodeToken(rootValue.session.token);
    }
    return user;
  }
});
