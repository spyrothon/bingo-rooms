import { h, render, Component } from 'preact';
import { bindActionCreators } from 'redux';
import { connect } from 'preact-redux';
import _ from 'lodash';

import {
  loginUser
} from '../actions';


class Login extends Component {
  doLogin(ev) {
    ev.preventDefault();

    const form = ev.target;
    const { loginUser } = this.props;
    const username = form.querySelector('[name=username]').value;
    const password = form.querySelector('[name=password]').value;
    loginUser(username, password);
  }

  render() {
    const { user } = this.props;
    const { username, password } = this.state;

    return (
      <div class="container mx-auto">
        <h1>Login</h1>
        <form onSubmit={this.doLogin.bind(this)}>
          <div class="my-2">
            <input type="text" name="username" />
          </div>
          <div class="my-2">
            <input type="password" name="password" />
          </div>

          <input type="submit" />
        </form>
      </div>
    );
  }
}



const mapStateToProps = (state) => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    ...bindActionCreators({
      loginUser
    }, dispatch)
  };
}

export const LoginPage = connect(mapStateToProps, mapDispatchToProps)(Login);
