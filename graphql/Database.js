import request from 'request';

import { projects } from './testData/projects';
import { users } from './testData/users';
import { stories } from './testData/stories';
import { pomodoros } from './testData/pomodoros';
import { ROLES } from '../config';

import User from '../data/model/User';
import Post from '../data/model/Project';
import Story from '../data/model/Story';
import Pomodoro from '../data/model/Pomodoro';

const viewerId = 'qoyciemasklfhkel';

export default class Database {

  createProject({ id, projectId, title, }) {
    const existingProject = this.getProject(projectId);
    if (!existingProject) {
      const newProject = new Post({ id, projectId, title, });
      projects.push(newProject);
      return newProject;
    }

    return null;
  }

  getProject(id) {
    const projectId = parseInt(id, 10);
    return projects.find(project => project.projectId === projectId);
  }

  createStory(fields) {
    if (this.findStoryById(fields.id)) {
      return;
    }

    const story = new Story({ id: fields.id, storyId: fields.id, projectId: fields.project_id, type: fields.story_type, title: fields.name, state: fields.current_state, owners: fields.owner_ids, time: 0 });

    stories.push(story);
    return story;
  }

  findStoryByProject(id) {
    return stories.filter(story => story.projectId === id);
  }

  createStory

  async fetchStories(projectId, userId) {
    const storyPromise = await new Promise((resolve, reject) => {
      const user = this.getUserWithId(userId);
      const url = `https://${user.username}:${user.password}@www.pivotaltracker.com/services/v5/projects/${projectId}/stories`;
      request(url, (error, response, body) => {
        const fetchedStories = JSON.parse(body);

        if (!fetchedStories.kind) {
          fetchedStories.forEach((story) => {
            this.createStory(story);
          });

          const projectStories = this.findStoryByProject(projectId);

          resolve(projectStories);
        } else {
          reject('Something went wrong to fetch stories');
        }
      });
    });

    return storyPromise;
  }

  findStoryById(id) {
    return stories.find(story => story.storyId === id);
  }

  getPomodoros() {
    return pomodoros;
  }

  getPomodorosForUser(id) {
    const userPomodoros = pomodoros.filter(pomodoro => pomodoro.userId === id.toString());
    return userPomodoros || [];
  }

  getPomodorosForUserAndStory(userId, storyId) {
    const pomodoro = pomodoros.find(timer => timer.userId === userId && timer.storyId === storyId);

    if (!pomodoro) {
      return null;
    }

    return pomodoro;
  }

  updatePomodorosForUserAndStory(userId, storyId, time) {
    const pomodoro = pomodoros.find((timer) => {
      if (timer.userId === userId && timer.storyId === storyId) {
        timer.time = time;
        return timer;
      }

      return null;
    });

    if (pomodoro) {
      return pomodoro;
    }
    return null;
  }

  createPomodoro({ userId, storyId, time }) {
    const pomodoro = new Pomodoro({ id: userId + storyId, userId, storyId, time });
    pomodoros.push(pomodoro);
    return pomodoro;
  }

  getProjectsForUser(projectIidList) {
    const userProjects = [];
    for (let i = 0; i < projectIidList.length; i++) {
      userProjects.push(projects.find(project => project.projectId === projectIidList[i]));
    }

    return userProjects || [];
  }

  getAnonymousUser() {
    return new User({ id: viewerId, role: ROLES.anonymous });
  }

  getViewerById(id) {
    if (!id || id === 'anonymous') {
      return this.getAnonymousUser();
    }
    const user = this.copy(users.find(currentUser => currentUser.id === id));
    if (user) {
      user.userId = user.id;
      user.id = viewerId;
    }

    return user;
  }

  getUserWithId(id) {
    const user = this.copy(users.find(currentUser => currentUser.id === id));
    if (!user) {
      return null;
    }

    user.userId = user.id;
    user.id = viewerId;
    return user;
  }

  getUserWithCredentials(email, password) {
    const user = this.copy(users.find(currentUser => (currentUser.email === email || currentUser.username === email) && currentUser.password === password));
    // TODO: DELEte
    if (!user) {
      return;
    }

    user.userId = user.id;
    user.id = viewerId;
    return user;
  }

  async fetchUser(username, password) {
    const userPromise = await new Promise((resolve, reject) => {
      let user;
      user = this.getUserWithCredentials(username, password);
      if (!user) {
        const url = `https://${username}:${password}@www.pivotaltracker.com/services/v5/me`;
        request(url, (error, response, body) => {
          const fetchedUser = JSON.parse(body);
          if (fetchedUser.kind !== 'error') {
            const projectsId = fetchedUser.projects.map((project) => {
              const projectId = project.project_id;
              this.createProject({ id: project.id, projectId, title: project.project_name });

              return projectId;
            });

            user = this.createUser(fetchedUser.id, fetchedUser.email, fetchedUser.username, password, projectsId, 'reader');

            resolve(user);
          } else {
            reject('Wrong username or password');
          }
        });
      } else {
        resolve(user);
      }
    });

    return userPromise;
  }

  createUser(id, email, username, password, projectsId, role) {
    const existingUser = users.find(user => user.email === email);

    if (existingUser) {
      return existingUser;
    }

    const newUser = new User({
      id, email, username, password, projectsId, role
    });

    users.push(newUser);

    return { user: newUser };
  }

  copy(object) {
    if (!object) {
      return object;
    }

    return { ...object };
  }
}
