import React,{Component} from "react";
import SimpleReactValidator from "simple-react-validator";
import {LoginAction} from "../actions/user";
import {connect} from "react-redux";
import Loading from "../components/loader";
import {Link} from "react-router-dom";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import { Header} from 'semantic-ui-react';


class Loginp extends Component
{
    constructor(props)
    {
        super(props);
        this.state={
                email:"",
                password:"",
                loading: false
            };
        this.validator = new SimpleReactValidator({autoForceUpdate:this});
    }

    handleFormSubmit = e => {
        e.preventDefault();
        if (this.validator.allValid()) {
          let data = {
             email: this.state.email,
              password: this.state.password
          };
          //console.log(data);
          this.props.LoginAction(data);
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

      toggleLoading = () => {
        this.setState({ loading: true });

        setTimeout(() => {
          this.setState({ loading: false });
        }, 3000);
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
            Sign in
          </Typography>
          <form className={net.form} onSubmit={this.handleFormSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={this.state.email}
              onChange={this.handleInput}
            />
                {
                    this.validator.message('email',this.state.email,'required|email')
                }
            <TextField
              variant="outlined"
              margin="normal"
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
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
        
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={net.submit}
              onClick={this.handleFormSubmit} disabled={loading}
            >
              {loading && !this.props.login.error &&(<Loading style={{ marginRight: "5px" }}/>)}
                    {!loading && <span>Sign In</span>}
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to="/forgotpassword" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Header as='h3' icon textAlign='center'>
                {
                    this.props.login.error?
                        <div className="ui error message">
                        {this.props.login.error}
                        </div>
                        :""
                }
                </Header>
          </form>
        </div>
            </>
        )
    }
}

const mapStateToProps=(state)=>
{
//console.log(state);
return ({login:state.login});
}

export default connect(mapStateToProps,{LoginAction})(Loginp);