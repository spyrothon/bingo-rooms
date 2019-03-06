import { h, render, Component } from 'preact';
import { Router } from 'preact-router';

import { RoomsIndexPage } from './pages/rooms_index';
import { RoomsShowPage } from './pages/rooms_show';

export class App extends Component {
  render() {
    return (
      <Router>
        <RoomsIndexPage path="/" />
        <RoomsShowPage path="/r/:roomId" />
      </Router>
    );
  }
}
