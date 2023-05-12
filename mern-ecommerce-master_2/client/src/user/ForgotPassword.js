import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import Layout from '../core/Layout';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import { MenuItem, InputLabel, FormControl, Select } from '@material-ui/core';

import { forgotPassword, authenticate, isAuthenticated } from '../auth';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function ForgotPassword() {
  const [values, setValues] = useState({
    email: '',
    password: '',
    securityQuestion: '',
    securityAnswer: '',
    error: '',
    loading: false,
    redirectToReferrer: false,
  });

  const { email, password,securityQuestion,securityAnswer, loading, error, redirectToReferrer } = values;
  const { user } = isAuthenticated();

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault(); // so that browser does not reload
    setValues({ ...values, error: false, loading: true });
    forgotPassword({ email, password, securityQuestion,securityAnswer }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        
          setValues({
            ...values,
            redirectToReferrer: true,
          });
      
      }
    });
  };

  const showError = () => (
    <div
      className='alert alert-danger'
      style={{ display: error ? '' : 'none' }}
    >
      {error}
    </div>
  );

  const showLoading = () =>
    loading && (
      <div className='alert alert-info'>
        <h2>Loading...</h2>
      </div>
    );

  const redirectUser = () => {
    if (redirectToReferrer) {
      if (user && user.role === 1) {
        return <Redirect to='/signin' />;
      } else {
        return <Redirect to='/signin' />;
      }
    }
    // if (isAuthenticated()) {
    //   return <Redirect to='/' />;
    // }
  };

  const classes = useStyles();

  const signInForm = () => (
    <Container component='main' maxWidth='xs'>
      {showError()}
      {showLoading()}
      {redirectUser()}
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Change Password
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email Address'
            name='email'
            autoComplete='email'
            onChange={handleChange('email')}
            type='email'
            value={email}
            autoFocus
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            name='password'
            label='New Password'
            type='password'
            id='password'
            onChange={handleChange('password')}
            type='password'
            value={password}
            autoComplete='current-password'
          /> 

            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Security Question</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={securityQuestion}
                name="securityQuestion"
                label="Security Question"
                onChange={handleChange('securityQuestion')}
                required
                >
                    <MenuItem value="What is your Birth Place">What is your Birth Place</MenuItem>
                    <MenuItem value="What is your favourite Place">What is your favourite Place</MenuItem>
                    <MenuItem value="What is your Nick Name">What is your Nick Name</MenuItem>
                </Select>
            </FormControl>
            
              <TextField
                variant='outlined'
                required
                fullWidth
                id='securityAnswer'
                label='Email Address'
                name='securityAnswer'
                onChange={handleChange('securityAnswer')}
                type='text'
                value={securityAnswer}
                autoComplete='off'
              />
            
          
          <Button
            onClick={clickSubmit}
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
          >
            Change Password
          </Button>
          <Grid container>
            <Grid item xs>
            <Link to='/signin' variant='body2'>
                {"Sign In"}
              </Link>
            </Grid>
            <Grid item>
              <Link to='/signup' variant='body2'>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );

  return (
    <Layout
      title='Signin page'
      description='Signin to Watch Store'
      className='container col-md-8 offset-md-2'
    >
      {signInForm()}
    </Layout>
  );
}
