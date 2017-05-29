import { connectionDefinitions } from 'graphql-relay';
import ProjectType from './ProjectType';

export default connectionDefinitions({
  name: 'Project',
  nodeType: ProjectType
});
