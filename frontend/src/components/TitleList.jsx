import React, { Component } from "react";

import { Item } from "./Item";
import { Loader } from "./Loader";

export class TitleList extends Component {
  render() {
    let titles = '';
    if (this.props.titles && this.props.loaded) {
      titles = this.props.titles.map((title, i) => {
        if (i < 4) {
          let name = '';
          const backDrop = `https://image.tmdb.org/t/p/original${title.backdrop_path}`;
          if (!title.name) {
            name = title.original_title;
          } else {
            name = title.name;
          }
          return (
            <Item
              key={title.id}
              title={name}
              score={title.vote_average}
              overview={title.overview}
              backdrop={backDrop}
            />
          );
        }
        return (
          <div key={title.id}></div>
        );
      });
    }
    return (
      <div className="TitleList">
        <div className="Title">
          <h1>{this.props.title}</h1>
          <div className="titles-slider">
            {titles || <Loader />}
          </div>
        </div>
      </div>
    );
  }
}
