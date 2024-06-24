import React, { Component } from 'react';

import { UserProfile } from './UserProfile';

import { Hero } from './Hero';
import { TitleList } from './TitleList';

import userAvatarImage from '../assets/images/user.jpg';

import './style.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: {
        data: {},
        loaded: false
      },
      watching: {
        data: {},
        loaded: false
      },
      session: {
        name: 'Cindy',
        lastName: 'Lopez',
        username: 'cindy',
        avatar: userAvatarImage
      },
      fixHeader: false
    };

    this.onScroll = this.onScroll.bind(this);
  }

  componentDidMount() {
    fetch('/api/movies')
      .then(res => res.json())
      .then(result => {
        this.setState({
          movies: {
            data: result,
            loaded: true
          }
        });
      });

    fetch('/api/watching')
      .then(res => res.json())
      .then(result => {
        this.setState({
          watching: {
            data: result,
            loaded: true
          }
        });
      });

    window.addEventListener('scroll', this.onScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll);
  }

  onScroll() {
    this.setState({
      fixHeader: window.scrollY > 100
    });
  }

  render() {
    const { movies, watching, session } = this.state;
    return (
      <div className="App">
        <header className={`Header ${this.state.fixHeader ? 'fixed' : ''}`}>
          <div className="content">
            <div className="logo">Movies</div>
            <ul className="menu">
              <li className="selected">Home</li>
              <li>Movies</li>
              <li>My List</li>
            </ul>
            <UserProfile user={session} />
          </div>
        </header>
        <Hero />
        <TitleList title="Movies" titles={movies.data} loaded={movies.loaded} />
        <TitleList
          title={`Continue watching for ${session.name}`}
          titles={watching.data}
          loaded={watching.loaded}
        />
      </div>
    );
  }
}

export default App;
