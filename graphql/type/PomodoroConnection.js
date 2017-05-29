import { connectionDefinitions } from 'graphql-relay';
import PomodoroType from './PomodoroType';

export default connectionDefinitions({
  name: 'Pomodoro',
  nodeType: PomodoroType
});
