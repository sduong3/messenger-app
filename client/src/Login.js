import React from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';
import { SideBanner, AccountHeader, LoginForm } from './components/Account';
import { login } from './store/utils/thunkCreators';

const Login = (props) => {
  const history = useHistory();
  const { user, login } = props;

  const handleLogin = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    await login({ username, password });
  };

  if (user.id) {
    return <Redirect to='/home' />;
  }

  return (
    <Grid container justifyContent='space-between'>
      <Grid item sm={5} xs={12}>
        <SideBanner />
      </Grid>

      <Grid sm={7} container item>
        <Grid
          container
          item
          direction='column'
          justifyContent='center'
          alignItems='center'
        >
          <AccountHeader
            text="Don't have an account?"
            route='/register'
            button='Create account'
          />
        </Grid>

        <Grid container item justifyContent='center'>
          <LoginForm handleLogin={handleLogin} />
        </Grid>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (credentials) => {
      dispatch(login(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
