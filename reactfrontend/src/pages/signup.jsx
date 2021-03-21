import React,{Component} from "react";
import SimpleReactValidator from "simple-react-validator";
import {SignupAction} from "../actions/user";
import {connect} from "react-redux";
import Loading from "../components/loader";
import {Link} from "react-router-dom";
import {history} from "../shared/helper/history";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import { Header} from 'semantic-ui-react';

class Signp extends Component
{
    constructor(props)
    {
        super(props);
        this.state={
                firstname:"",
                lastname:"",
                email:"",
                password:"",
                termsAcceptCheck:false,
                loading: false
            };
        this.validator = new SimpleReactValidator({autoForceUpdate:this});
    }


    handleFormSubmit = e => {
        e.preventDefault();
        if (this.validator.allValid()) {
          let data = {
                firstname:this.state.firstname,
                lastname:this.state.lastname,
                email: this.state.email,
                password: this.state.password,
                termsAcceptCheck:this.state.termsAcceptCheck
          };
          //console.log(data);
          this.props.SignupAction(data);
          setTimeout(() => {
            history.push("/login");
            window.location.reload();
          }, 2500);
          this.toggleLoading();
        } 
        else {
          this.forceUpdate();
          this.validator.showMessages();
        }
      };

      handleInput = e => {
        this.setState({ [e.target.name]: e.target.value });
      };

      handleChange= e =>{
        this.setState({termsAcceptCheck:!this.state.termsAcceptCheck});
    }

      toggleLoading = () => {
        this.setState({ loading: true });

        setTimeout(() => {
          this.setState({ loading: false });
        }, 2000);
      }

    render()
    {
        const { loading } = this.state;
        const {net}=this.props;
        return(
            <>
                <div className={net.paper}>
        <Avatar className={net.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={net.form} onSubmit={this.handleFormSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstname"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                value={this.state.firstname}
                onChange={this.handleInput}
              />
                {
                    this.validator.message('firstname',this.state.firstname,'required|min:5|string')
                } 
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastname"
                label="Last Name"
                name="lastname"
                autoComplete="lname"
                value={this.state.lastname}
                onChange={this.handleInput}
              />
                {
                    this.validator.message('lastname',this.state.lastname,'required|min:5|string')
                }
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={this.state.email}
                onChange={this.handleInput}
              />
                {
                    this.validator.message('email',this.state.email,'required|email')
                }
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={this.state.password}
                onChange={this.handleInput}
              />
                {
                    this.validator.message('password',this.state.password,'required|min:8|max:25')
                }
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I agree to the Terms and Conditions" onChange={this.handleChange}
                defaultChecked={this.state.termsAcceptCheck}
              />
                {
                    this.validator.message('termsAcceptCheck',this.state.termsAcceptCheck,'required')
                }
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={net.submit}
            onClick={this.handleFormSubmit} disabled={loading}
          >
            {loading && !this.props.signup.error &&(<Loading style={{ marginRight: "5px" }}/>)}
                    {!loading && <span>Sign Up</span>}
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
          <Header as='h3' icon textAlign='center'>
                {
                    this.props.signup.error?
                        <div className="ui error message">
                        {this.props.signup.error}
                        </div>
                        :null
                }
                </Header>

                {/*<Header as='h3' icon textAlign='center'>
                {
                    this.props.signup.message?
                        <div className="ui error message">
                        {this.props.signup.message}
                        </div>
                        :null
                }
            </Header>*/}
        </form>
      </div>
                <Header as='h3' icon textAlign='center'>
                <Link to="/" style={{color:"black"}}>Visit our Home page to view Products </Link>
                </Header>
            </>
        )
    }
}

const mapStateToProps=(state)=>
{
console.log(state);
return ({signup:state.signup});
}

export default connect(mapStateToProps,{SignupAction})(Signp);