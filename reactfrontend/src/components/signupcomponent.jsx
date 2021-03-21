import React from "react";
import register from "../images/E-commerce-cartoon-illustration-vector.jpg";
import Signp from "../pages/signup";
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Faker from "faker";
let imgsrc=Faker.image.abstract();
function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        {new Date().getFullYear()}
        {' | ' }
        <Link color="inherit" href="/signup">
          Developed By Mayur Vanmali
        </Link>{' '}
      </Typography>
    );
  }

  const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
      },
    paper: {
      margin: theme.spacing(8,4,0,4),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    bgimage:{
        
      backgroundImage: `url(${imgsrc})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
  }));
  
  export default function Signup() {
    const classes = useStyles();
    return(
        <>
        <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Signp net={classes}/>
          <Box mt={5}>
              <Copyright/>
            </Box>
      </Grid>
      <Grid item xs={false} sm={4} md={7} className={classes.bgimage} />
    </Grid>
        </>
    )
}
