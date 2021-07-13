import React from "react";
import { Box, Typography } from "@material-ui/core";
import background from "../../images/bg_accountSideBanner.png";
import bubbleIcon from "../../images/message_icon.svg";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  sideBannerContainer: {
    minHeight: "100vh",
    background: `url(${background}) center center no-repeat`,
    backgroundSize: "cover",
  },
  overlay: {
    minHeight: "100vh",
    background: `linear-gradient(to bottom, rgba(58, 141, 255, 0.85), rgba(134, 185, 255, 0.85))`,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "0 18%",
  },
  icon: {
    width: "70px",
    height: "70px",
    objectFit: "cover",
  },
  bannerText: {
    textAlign: "center",
    fontSize: '2rem',
    margin: theme.spacing(10),
    color: "white",
  },
}));

const SideBanner = () => {
  const classes = useStyles();

  return (
    <Box className={classes.sideBannerContainer} display={{ xs: 'none', sm: 'block' }}>
      <Box className={classes.overlay}>
        <img className={classes.icon} src={bubbleIcon} alt='Message Icon' />
        <Typography className={classes.bannerText}>
          Converse with anyone with any language
        </Typography>
      </Box>
    </Box>
  );
};

export default SideBanner;