import React from 'react';
import {
  Grid,
  Box,
  Typography,
  Button,
  FormControl,
  TextField,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  focus: {
    fontSize: '1.5rem',
  },
  formButton: {
    height: 60,
    width: 160,
    margin: '2rem',
  },
}));

export default function SignupForm(props) {
  const classes = useStyles();

  return (
    <Box width='65%'>
      <Grid>
        <Typography className={classes.focus}>Create an account.</Typography>
      </Grid>
      <form onSubmit={props.handleRegister}>
        <Grid container direction='column'>
          <FormControl>
            <TextField
              aria-label='username'
              label='Username'
              name='username'
              type='text'
              required
            />
          </FormControl>
          <FormControl>
            <TextField
              label='E-mail address'
              aria-label='e-mail address'
              type='email'
              name='email'
              required
            />
          </FormControl>
          <FormControl>
            <TextField
              aria-label='password'
              label='Password'
              type='password'
              inputProps={{ minLength: 6 }}
              name='password'
              required
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
              Create
            </Button>
          </Box>
        </Grid>
      </form>
    </Box>
  );
}
