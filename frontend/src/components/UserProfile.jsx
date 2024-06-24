import React, { Component } from "react";

export class UserProfile extends Component {
  render() {
    const { user } = this.props;
    return (
      <div className="UserProfile">
        <div className="User">
          <div className="name">{`${user.name} ${user.lastName}`}</div>
          <div className="image"><img src={user.avatar} alt="profile" /></div>
        </div>
      </div>
    );
  }
}
