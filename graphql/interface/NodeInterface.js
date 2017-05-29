import { nodeDefinitions, fromGlobalId } from 'graphql-relay';
import UserType from '../type/UserType';
import ProjectType from '../type/ProjectType';
import StoryType from '../type/StoryType';
import PomodoroType from '../type/PomodoroType';

import User from '../../data/model/User';
import Project from '../../data/model/Project';
import Story from '../../data/model/Story';
import Pomodoro from '../../data/model/Pomodoro';

const { nodeInterface, nodeField } = nodeDefinitions(
  (globalId, { db }) => {
    const { type, id } = fromGlobalId(globalId);

    switch (type) {

      case 'User':
        return db.getViewerById(id);

      case 'Project':
        return db.getProjectsForUser(id);

      case 'Story':
        return db.getStory(id);

      case 'Pomodoro':
        return db.getPomodoro(id);

      default:
        return null;
    }
  },
  (obj) => {
    if (obj instanceof User) {
      return UserType;
    } else if (obj instanceof Project) {
      return ProjectType;
    } else if (obj instanceof Story) {
      return StoryType;
    } else if (obj instanceof Pomodoro) {
      return PomodoroType;
    }
  }
);

export const NodeInterface = nodeInterface;
export const NodeField = nodeField;
