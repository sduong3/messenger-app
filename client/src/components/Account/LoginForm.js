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

const useStyles = makeStyles((theme) => ({
  formTitle: {
    fontWeight: 'bold'
  },
  formButton: {
    height: 60,
    width: 160,
    margin: theme.spacing(5)
  },
}));

const LoginForm = ({ handleLogin }) => {
  const classes = useStyles();

  return (
    <Box width='65%'>
      <Grid>
        <Typography className={classes.formTitle}>Welcome back!</Typography>
      </Grid>
      <form onSubmit={handleLogin}>
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