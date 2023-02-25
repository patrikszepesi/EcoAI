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


//import reactImageSize from 'react-image-size';






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


  const [files, setFiles] = useState([]);
  const [backendStatuses,setBackendStatuses]= useState([]);
  const [value, onChange] = useState(new Date());
  const [arrays,setArrays]= useState([]);

  useEffect(() => {
    console.log('Something happened')
  }, [files,backendStatuses,value,lengthOfBoundingBox]); // Only re-run the effect if files changes

    useEffect(() => {
      callBackend();
    }, [value]);


//month is zero based, add 1
    let month = value.getMonth() + 1;
    let day = value.getDate();
    let year = value.getFullYear();




  const callBackend = async (e) => {


    axios
      .post(
        "/api/inference",
        { year, month, day }, //send this data to our server, and our server will send data to aws endpoint
      )
      .then(res => {
          setBackendStatuses(res);

          setArrays(Object.entries(res.data.jsonData))

      })
      .catch(err => {
        console.log('Error', err);
      });
  };

  let height=0
  let width=0

  //console.log(arrays)
  let detectedClass;
  let confidence;

  //not scaled to image between 0 and 1
  let xmin;
  let ymin;
  let xmax;
  let ymax;
  let x;
  let y;
  let lengthOfBoundingBox = 0
  let imageName;

  for (const [key, value] of Object.entries(arrays)) {

    //console.log(value[0])//will give name: 0.jpeg
    //console.log(value[1])//will give the arrays
    //console.log(length)//will give the length of detections
    imageName=value[0]


    let counter = 0
    for( let i=0; i<value[1].length;i++){

       detectedClass = value[1][counter][0];
       confidence = value[1][counter][1];
       xmin = value[1][counter][2];
       ymin = value[1][counter][3];
       xmax = value[1][counter][4];
       ymax = value[1][counter][5];
      counter++
  }
}

//pexels-lara-jameson-9324374.jpeg
let url;
let placeholder
if(imageName!=undefined){
  placeholder=imageName.slice(25,57)
  url=`https://object-detection-plastic-batch-transform.s3.eu-west-1.amazonaws.com/images/2022/11/24/${placeholder}`
  console.log(url)
}else{
  url=null
}



const [data, { loading, error }] = useImageSize(url);

if(!loading && data!=undefined){
  height=data.height/10
  width=data.width/10
  console.log(data.height)
  console.log(data.width)
}


 lengthOfBoundingBox = width * (xmax-xmin)
console.log("TWWWW",lengthOfBoundingBox,xmin,xmax,width)

//const { width, height } = await getImageSize(url);
//console.log(weight,height)

  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });



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
      <div className={classes.form}>
        <Grid container spacing={isMd ? 4 : 2}>
            <Calendar onChange={onChange} value={new Date()} />
        </Grid>

      </div>
    </div>
    <div className={classes.container}>
         <img
           src={url}
           alt="Desert"
           height={height}
           width={width}

         />
         <svg className={classes.svg}>
           <rect
             x="0"
             y="0"
             width={lengthOfBoundingBox}
             height="300"
             fill="none"
             stroke="#f00"
             strokeWidth="10"
           />
         </svg>
       </div>

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
