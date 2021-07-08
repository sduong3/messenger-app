import React from "react";
import {
  Grid,
  Box,
  Typography,
  Button,
  FormControl,
  TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  formTitle: {
    fontSize: "2rem",
    fontWeight: 'bold'
  },
  formButton: {
    height: 60,
    width: 160,
    margin: "2rem",
  },
}));

const LoginForm = (props) => {
  const classes = useStyles();

  return (
    <Box width='65%'>
      <Grid>
        <Typography className={classes.formTitle}>Welcome back!</Typography>
      </Grid>
      <form onSubmit={props.handleLogin}>
        <Grid container direction='column'>
          <FormControl margin='normal' required>
            <TextField
              aria-label='username'
              label='Username'
              name='username'
              type='text'
            />
          </FormControl>
          <FormControl margin='normal' required>
            <TextField
              aria-label='password'
              label='Password'
              type='password'
              name='password'
            />
          </FormControl>
          <Box textAlign='center'>
            <Button
              type='submit'
              variant='contained'
              color='primary'
              size='large'
              className={classes.formButton}
            >
              Login
            </Button>
          </Box>
        </Grid>
      </form>
    </Box>
  );
};

export default LoginForm;