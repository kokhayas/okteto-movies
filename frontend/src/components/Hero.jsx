import React, { Component } from "react";

import movieBackground from '../assets/images/movie-bg.jpg';

class HeroButton extends Component {
  render() {
    return (
      <a href="#" className="Button">{this.props.children}</a>
    );
  }
}

export class Hero extends Component {
  render() {
    return (
      <div id="hero" className="Hero" style={{ backgroundImage: `url(${movieBackground})` }}>
        <div className="spring" />
        <div className="content">
          <h1>Bohemian Rhapsody</h1>
          <p>
            Queen take the music world by storm when they form the rock &apos;n&apos; roll
            band in 1970.
          </p>
          <div className="button-container">
            <HeroButton class="play-button">
              <svg className="icon play-icon" width="20" height="20" viewBox="0 0 512 512">
                <path d="M405.2 232.9L126.8 67.2c-3.4-2-6.9-3.2-10.9-3.2-10.9 0-19.8 9-19.8 20H96v344h.1c0 11 8.9 20 19.8 20 4.1 0 7.5-1.4 11.2-3.4l278.1-165.5c6.6-5.5 10.8-13.8 10.8-23.1s-4.2-17.5-10.8-23.1z"/>
              </svg>
              Play
            </HeroButton>
            <HeroButton class="list-button">
              <svg className="icon add-icon" width="20" height="20" viewBox="0 0 20 20">
                <path d="M16 9h-5V4H9v5H4v2h5v5h2v-5h5V9z"/>
              </svg>
              My list
            </HeroButton>
          </div>
        </div>
        <div className="overlay"></div>
      </div>
    );
  }
}
