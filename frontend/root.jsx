import React from 'react';
import ReactDOM from 'react-dom';




class Root extends React.Component {
  constructor(props){
    super(props);
    const currentTime = new Date();
    const isAM = currentTime.getHours() < 12 ? true : false;
    let hour = currentTime.getHours();
    if (hour === 0){
      hour = 12;
    }
      else if(hour > 12){
        hour -= 12;
      }
    this.state = {
      hour,
      minutes: currentTime.getMinutes(),
      seconds: currentTime.getSeconds(),
      isAM
    };
    this.incrementTime();
  }

  padding(num) {
    if (num < 10) {
      return "0" + num;
    }
    return num;
  }

  amPm() {
    if (this.state.isAm) {
      return "AM";
    }
    return "PM";
  }

  incrementTime() {
    setInterval(this.incrementSeconds.bind(this), 1000);
  }

  incrementSeconds(){
    let {seconds} = this.state;
    if (seconds < 59){
      this.setState({seconds: seconds += 1});
    }
    else if(seconds === 59) {
      this.setState({seconds: 0});
      this.incrementMinutes();
    }
  }

  incrementMinutes() {
    let { minutes } = this.state;
    if (minutes < 59) {
      this.setState({ minutes: minutes += 1 });
    } else {
      this.setState({ minutes: 0 });
      this.incrementHours();
    }
  }

  incrementHours() {
    let { hours } = this.state;
    if (hours < 12) {
      if (hours === 11) {
        this.flipAmPm();
      }
      this.setState({ hours: hours+= 1});
    } else if (hours === 12){
      this.setState({ hours: 1});
    }
  }

  switchAmPm() {
    this.setState({ isAm: !this.state.isAm });
  }


  render() {
    return(
      <div>
        <div className="hour">
          { this.padding(this.state.hour) }
        </div>
        <div className="minutes">
          { this.padding(this.state.minutes) }
        </div>
        <div className="seconds">
          { this.padding(this.state.seconds)}
        </div>
        <div className="isAM">
          { this.amPm() }
        </div>
      </div>
    );
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<Root/>, document.getElementById('main'));
});
