import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './App';
import HomePageContainer from '../../pages/home/HomePageContainer';

import LoginContainer from '../../pages/user/login/LoginContainer';
import ProjectListConnector from '../../pages/projects/ProjectList/ProjectListConnector';
import PomodoroTrackerContainer from '../../pages/pomodoro/PomodoroTracker/PomodoroTrackerContainer';

import ViewerQuery from '../../queries/ViewerQuery';

export default (
  <Route path='/' component={App} queries={ViewerQuery}>
    <IndexRoute component={HomePageContainer} queries={ViewerQuery} />
    <Route path='login' component={LoginContainer} queries={ViewerQuery} />
    <Route path='projects' component={ProjectListConnector} queries={ViewerQuery} />
    <Route path='projects/:projectId' component={PomodoroTrackerContainer} queries={ViewerQuery}></Route>
  </Route>
);
