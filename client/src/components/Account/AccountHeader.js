import React from "react";
import { useHistory } from "react-router-dom";
import { Grid, Typography, Box, Button, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  text: {
    color: theme.palette.secondary.main,
  },
  headerContainer: {
    width: "80%",
    padding: "3% 5%",
  },
}));

const AccountHeader = (props) => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Box className={classes.headerContainer}>
      <Grid
        container
        item
        spacing={2}
        justifyContent='flex-end'
        alignItems='baseline'
      >
        <Grid item>
          <Typography className={classes.text}>{props.text}</Typography>
        </Grid>
        <Grid item>
          <Paper elevation={2}>
            <Button
              variant='outlined'
              color='primary'
              onClick={() => history.push(props.route)}
            >
              {props.button}
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AccountHeader;