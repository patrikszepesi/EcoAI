import React from 'react';
import{ useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useMediaQuery, Grid, Typography, TextField, Button } from '@material-ui/core';
import { IconText } from '../../../../components/atoms';
import { SectionHeader } from '../../../../components/molecules';
import axios from "axios";
import { FcCheckmark, FcSynchronize, FcCancel } from "react-icons/fc";
import { Image } from '../../../../components/atoms';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useImageSize } from 'react-image-size';



const useStyles = makeStyles(theme => ({
  container: {
  position: 'relative'
},

/*
img: {
  maxwidth: '50%',
},
*/
svg: {
  height: 100,
  left: 0,
  position: 'absolute',
  top: 0,
  width: 100,
  zindex: 1,
},
  icon: {
    background: 'transparent',
    borderRadius: 0,
  },
  iconText: {
    fontWeight: 700,
    marginLeft: theme.spacing(2),
  },
  form: {
    '& .MuiTextField-root': {
      background: theme.palette.background.paper,
    },
    '& .MuiOutlinedInput-input': {
      background: theme.palette.background.paper,
    },
  },
  inputTitle: {
    fontWeight: 700,
    marginBottom: theme.spacing(1),
  },
  uploadButton: {
    display: 'flex',
    justifyContent: 'center',
    border: '1px solid transparent',
    background: theme.palette.alternate.dark,
    textTransform: 'lowercase',
    '& .icon-text': {
      width: 'auto',
    },
    [theme.breakpoints.down('xs')]: {
      justifyContent: 'flex-start',
    },
  },
}));

const Application = props => {


  const { className, ...rest } = props;
  const classes = useStyles();


  const [value, setValue] = useState(new Date());
  const [images,setImages]= useState([]);
  const [hasImages,setHasImages]=useState(null)


    useEffect(() => {
      callBackend();
    }, [value]);


    //month is zero based, add 1
    let month = value.getMonth() + 1;
    let day = value.getDate();
    let year = value.getFullYear();



    if(day<10){
        day = `0${day}`
    }
    if(month<10){
        month = `0${month}`
    }


  const callBackend = async (e) => {

    axios
      .post(
        "/api/inference",
        { year, month, day }, //send this data to our server, and our server will send data to aws endpoint
      )
      .then(res => {
          //setArrays(Object.entries(res.data))
          setImages(res.data)

      })
      .catch(err => {
        console.log('Error', err);
      });
  };


  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });



let display = images.map((image, index) => (
    <img
      key={index}
      src={`data:image/jpeg;base64,${image.data}`}
      alt={`Image ${index}`}
    />
  ))



  return (
    <>
    <div className={className} {...rest}>
      <SectionHeader
        title="Retrieve Inferences from AWS "
        subtitle="Select the day from which you want the inferences from"
        subtitleProps={{
          variant: 'body1',
          color: 'textPrimary',
        }}
        data-aos="fade-up"
        align={isMd ? 'center' : 'left'}
      />
      <Grid container spacing={isMd ? 4 : 2}>
          <Calendar onChange={setValue} value={new Date()} />
      </Grid>
      <div className={classes.form}>
      </div>
    </div>
    <br/>

  {display}


    </>
  );
};

Application.propTypes = {
  /**
   * External classes
   */
  className: PropTypes.string,
};

export default Application;
