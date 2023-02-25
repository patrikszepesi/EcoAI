import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Context } from "../../../context";
import { useRouter } from "next/router";
import { makeStyles } from '@material-ui/core/styles';
import { Image } from '../../components/atoms';
import { LearnMoreLinkPlain } from '../../components/atoms';
import { SectionHeader } from '../../components/molecules';
import { HeroShapedAuth } from '../../components/organisms';
import { Typography, Grid, Button, TextField } from '@material-ui/core';
import toast, { Toaster } from 'react-hot-toast';
import loginSvg from '../../../public/assets/login.svg';




const useStyles = makeStyles(theme => ({
  root: {
    '& .hero-shaped': {
      borderBottom: 0,
    },
    '& .hero-shaped__wrapper': {
      [theme.breakpoints.up('md')]: {
        minHeight: `calc(100vh - ${theme.mixins.toolbar['@media (min-width:600px)'].minHeight}px)`,
      },
    },
  },
  formElement:{
    width:'100%',
  },
  formContainer: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
      maxWidth: 500,
      margin: `0 auto`,
    },
  },
  image: {
    objectFit: 'cover',
  },
}));

const LoginView = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const classes = useStyles();


  const {
    state: { user },
    dispatch,
  } = useContext(Context);


  // router
  const router = useRouter();

  useEffect(() => {
    if (user !== null) router.push("/user");
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(`/api/login`, {
        email,
        password,
      });
      dispatch({
        type: "LOGIN",
        payload: data,
      });
      // save in local storage
      window.localStorage.setItem("user", JSON.stringify(data));
      // redirect
      router.push("/user");
      // setLoading(false);
    } catch (err) {
      toast.error(err.response.data, {
         duration: 4000,
  style: {
    border: '5px solid #E1C699',
    padding: '16px',
    color: '#713200',
    minWidth:'800px',
    marginTop:'70px',
  },
  iconTheme: {
    primary: '#713200',
    secondary: '#FFFAEE',
  },
});
      setLoading(false);
    }
  };

  return (
    <>
     <Toaster />
    <div className={classes.root}>
      <HeroShapedAuth
        leftSide={
          <div className={classes.formContainer}>
            <SectionHeader
              title="Login"
              subtitle={
                <span>
                  No account yet?{' '}

                  <LearnMoreLinkPlain
                    onClick={()=>{router.push("/register")}}
                    title="Register"
                    typographyProps={{ variant: 'h6' }}
                  />

                </span>
              }
              titleProps={{
                variant: 'h3',
              }}
            />
            <div className={classes.formElement}>
              <form name="login-form" method="post" onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      placeholder="E-mail"
                      label="E-mail *"
                      variant="outlined"
                      size="medium"
                      name="email"
                      fullWidth
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      value={email || ''}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      placeholder="Password"
                      label="Password*"
                      variant="outlined"
                      size="medium"
                      name="password"
                      fullWidth
                      onChange={(e) => setPassword(e.target.value)}
                      type="password"
                      value={password || ''}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      size="large"
                      variant="contained"
                      type="submit"
                      color="primary"
                      fullWidth
                    >
                      Login
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </div>
          </div>
        }
        rightSide={
          <Image
            src={loginSvg}
            className={classes.image}
            lazy={false}
          />
        }
      />
    </div>

    </>
  );
};

export default LoginView;
