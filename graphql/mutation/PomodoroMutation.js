import { GraphQLNonNull, GraphQLInt } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';

import PomodoroType from '../type/PomodoroType';

export default mutationWithClientMutationId({
  name: 'updatePomodoro',
  inputFields: {
    userId: {
      type: new GraphQLNonNull(GraphQLInt)
    },
    storyId: {
      type: new GraphQLNonNull(GraphQLInt)
    },
    time: {
      type: new GraphQLNonNull(GraphQLInt)
    },
  },
  outputFields: {
    pomodoro: {
      type: PomodoroType,
      resolve: (timer, args, { db }) => db.getPomodorosForUserAndStory(timer.userId, timer.storyId)
    }
  },
  mutateAndGetPayload: (timer, { db }) => {
    const existingTimer = db.getPomodorosForUserAndStory(timer.userId, timer.storyId);
    if (!existingTimer) {
      return db.createPomodoro({ userId: timer.userId, storyId: timer.storyId, time: timer.time });
    }
    return db.updatePomodorosForUserAndStory(timer.userId, timer.storyId, timer.time);
  }
});
