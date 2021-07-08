import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Grid } from "@material-ui/core";
import { register } from "./store/utils/thunkCreators";
import { SideBanner, AccountHeader, SignupForm } from "./components/Account";

const Signup = (props) => {
  const { user, register } = props;

  const handleRegister = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;

    await register({ username, email, password });
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
            text='Already have an account?'
            route='/login'
            button='Login'
          />
        </Grid>

        <Grid container item justifyContent='center'>
          <SignupForm handleRegister={handleRegister} />
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
    register: (credentials) => {
      dispatch(register(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);