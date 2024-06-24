import React, { Component } from "react";

import { ListToggle } from "./ListToggle";

export class Item extends Component {
  render() {
    return (
      <div className="Item">
        <div
          className="ItemContainer"
          style={{ backgroundImage: `url(${this.props.backdrop})` }}
          data-testid="item-container"
        >
          <div className="overlay">
            <div className="title">{this.props.title}</div>
            <div className="rating">{this.props.score} / 10</div>
            <ListToggle />
          </div>
        </div>
      </div>
    );
  }
}
