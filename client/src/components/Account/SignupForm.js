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

export default function SignupForm(props) {
  const classes = useStyles();

  return (
    <Box width='65%'>
      <Grid>
        <Typography className={classes.formTitle}>Create an account.</Typography>
      </Grid>
      <form onSubmit={props.handleRegister}>
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
              label='E-mail address'
              aria-label='e-mail address'
              type='email'
              name='email'
            />
          </FormControl>
          <FormControl margin='normal' required>
            <TextField
              aria-label='password'
              label='Password'
              type='password'
              inputProps={{ minLength: 6 }}
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
              Create
            </Button>
          </Box>
        </Grid>
      </form>
    </Box>
  );
}