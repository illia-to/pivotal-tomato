import { GraphQLObjectType } from 'graphql';

import LoginMutation from '../mutation/LoginMutation';
import LogoutMutation from '../mutation/LogoutMutation';
import PomodoroMutation from '../mutation/PomodoroMutation';

export default new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    login: LoginMutation,
    logout: LogoutMutation,
    updatePomodoro: PomodoroMutation
  })
});
