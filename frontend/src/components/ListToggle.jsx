import React, { Component } from "react";

export class ListToggle extends Component {
  constructor(props) {
    super(props);

    this.state = { toggled: false };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    if(this.state.toggled === true) {
      this.setState({ toggled: false });
    } else {
      this.setState({ toggled: true });
    }
  }

  render() {
    return (
      <div className="ListToggle" onClick={this.handleClick} data-toggled={this.state.toggled}>
        <div>
          <div style={{ width: '32px', height: '32px'}}>
            <svg className="plus" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
              <path d="M24,13.2c-0.6,0-1,0.4-1,1v9h-9c-0.6,0-1,0.4-1,1s0.4,1,1,1h9v9c0,0.6,0.4,1,1,1s1-0.4,1-1v-9h9c0.6,0,1-0.4,1-1    s-0.4-1-1-1h-9v-9C25,13.6,24.6,13.2,24,13.2z"/>
            </svg>
          </div>
          <div style={{ width: '32px', height: '32px'}}>
            <svg className="check" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
              <path d="M33.2,16.9L21,29l-6.5-6.4c-0.4-0.4-1-0.4-1.4,0c-0.4,0.4-0.4,1,0,1.4l7.2,7.1c0.2,0.2,0.5,0.3,0.7,0.3    c0.3,0,0.5-0.1,0.7-0.3l12.8-12.8c0.4-0.4,0.4-1,0-1.4C34.2,16.5,33.6,16.5,33.2,16.9z"/>
            </svg>
          </div>
        </div>
      </div>
    );
  }
}
