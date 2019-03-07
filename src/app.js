import { h, render, Component } from 'preact';
import { Router } from 'preact-router';
import { connect } from 'preact-redux';

import { LoginPage } from './pages/login';
import { RoomsIndexPage } from './pages/rooms_index';
import { RoomsShowPage } from './pages/rooms_show';

export const App = (props) => {
  const { sessionId } = props;

  return (
    <div>
      { !sessionId
        ? <LoginPage />
        : <Router>
            <RoomsIndexPage path="/" />
            <RoomsShowPage path="/r/:roomId" />
          </Router>
      }
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    sessionId: state.sessionId,
    user: state.user
  };
}

const mapDispatchToProps = (dispatch) => {
  return {dispatch};
}

export const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);
