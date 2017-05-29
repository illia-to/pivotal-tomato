import { connectionDefinitions } from 'graphql-relay';
import StoryType from './StoryType';

export default connectionDefinitions({
  name: 'Story',
  nodeType: StoryType
});
