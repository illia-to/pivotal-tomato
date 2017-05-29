import React from 'react';
import PropTypes from 'prop-types';
import {
  Button
} from 'react-bootstrap';

let timerStyle = {
  color: 'red'
};

export default class PomodoroComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      minutes: 25,
      seconds: 0,
      totalTime: 0,
      started: false,
      status: 'work',
      color: 'red',
      interval: null
    };

    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
  }

  interval() {
    return setInterval(() => {
      if (!this.state.started) return false;
      if (this.state.seconds === 0) {
        if (this.state.minutes === 0) {
          if (this.state.status === 'break') {
            this.resetTimer({ minutes: 25, seconds: 0, status: 'work', started: true });
            timerStyle = { color: 'red' };
          } else {
            this.setState({ totalTime: this.state.totalTime + 25 });
            this.props.action(this.props.storyId, this.props.user, this.state.totalTime, this.props.pomodoro);
            this.resetTimer({ minutes: 5, seconds: 0, status: 'break', started: true });
            timerStyle = { color: 'green' };
          }
        }
        this.setState({
          minutes: this.state.minutes - 1,
          seconds: 59
        });
      } else {
        this.setState({
          seconds: this.state.seconds - 1
        });
      }
    }, 10);
  }


  resetTimer(data) {
    this.setState({
      minutes: data.minutes,
      seconds: data.seconds,
      started: data.started,
      status: data.status
    });
  }

  startTimer(event) {
    event.preventDefault();
    this.resetTimer({ minutes: 25, seconds: 0, status: 'work', started: true });
    this.setState({ totalTime: this.props.pomodoro.time, interval: this.interval() });
  }

  stopTimer() {
    event.preventDefault();
    if (this.state.status === 'work') {
      this.state.totalTime = this.state.totalTime + (25 - this.state.minutes);
    }

    this.resetTimer({ minutes: 25, seconds: 0, status: 'work', started: false });
    timerStyle = { color: 'red' };
    this.props.action(this.props.storyId, this.props.user, this.state.totalTime, this.props.pomodoro);
    clearInterval(this.state.interval);
  }

  render() {
    return (
      <div>
        <div>
          <h2>
            <span style={timerStyle}>{this.state.minutes}</span>
            <span>:</span>
            <span style={timerStyle}>{this.state.seconds}</span>
          </h2>
        </div>
        <div>
          <Button onClick={this.startTimer}>Start</Button>
          <Button onClick={this.stopTimer}>Stop</Button>
        </div>
      </div>
    );
  }
}

PomodoroComponent.propTypes = {
  user: PropTypes.object.isRequired,
  storyId: PropTypes.number.isRequired,
  action: PropTypes.func.isRequired,
  pomodoro: PropTypes.object.isRequired
};
