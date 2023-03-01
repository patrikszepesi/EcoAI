import React from 'react';
import{ useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useMediaQuery, Grid, Typography, TextField, Button } from '@material-ui/core';
import { IconText } from '../../../../components/atoms';
import { SectionHeader } from '../../../../components/molecules';
import axios from "axios";
import { FcCheckmark, FcSynchronize, FcCancel } from "react-icons/fc";
//import myGif from '../../../../../public/assets/giphy.gif';
import { Image } from '../../../../components/atoms';








const useStyles = makeStyles(theme => ({
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

  useEffect(() => {
    console.log('Something happened')
  }, [files,backendStatuses]); // Only re-run the effect if files changes

  const fileInput = React.useRef();


  const uploadImage = async (e) => {
    const base64 = await convertBase64(e);
    axios
      .post(
        "/api/predict",
        { image: base64, name:e.name }, //send this data to our server, and our server will send data to aws endpoint
      )
      .then(res => {
        console.log(res)
          setBackendStatuses((prevState) => ([ ...prevState, res.data.status]));


      })
      .catch(err => {
        console.log('Error', err);
      });
  };



//function to convert our image to base64
  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

function status(status){
  if(status && status!= undefined){
    if(status == 'Success'){
      return <FcCheckmark/>
    }else{
      return( <>
    <FcCancel/>
    <br/>
      {status}
      </>)

    }
  }
}


const handleClick = (event) => {
    event.preventDefault();
    let newArr = fileInput.current.files;
    for (let i = 0; i < newArr.length; i++) {
      setFiles((prevState) => ([ ...prevState, newArr[i].name]));
      uploadImage(newArr[i]);
      //console.log(newArr[i].name)
    }
  };


  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });


    let showForm =
    <Grid item xs={12} sm={6} data-aos="fade-up">
      <Button
        variant="outlined"
        component="label"
        color="primary"
        fullWidth
        size="large"
        className={classes.uploadButton}
      >
        <IconText
          fontIconClass="fas fa-cloud-upload-alt"
          color={theme.palette.primary.main}
          title="Upload Image"
          typographyProps={{
            className: classes.iconText,
          }}
        />
        <input
          type="file"
          multiple
          hidden
          accept="image/*"
          multiple ref={fileInput}
          //onChange={(e) => {uploadImage(e);}}
          onChange={(e) => {handleClick(e);}}
        />
      </Button>
    </Grid>

  return (
    <>
    <div className={className} {...rest}>
      <SectionHeader
        title="Upload multiple images to AWS "
        subtitle="Upload your images and we will detect the plastic in your images"
        subtitleProps={{
          variant: 'body1',
          color: 'textPrimary',
        }}
        data-aos="fade-up"
        align={isMd ? 'center' : 'left'}
      />
      <div className={classes.form}>
        <Grid container spacing={isMd ? 4 : 2}>
          {showForm}
        </Grid>
      </div>
    </div>
    <Grid item xs={12} sm={6} data-aos="fade-up">

    {Object.keys(files).map((keyName, i) => (
    <li className="travelcompany-input" key={i}>
        <span className="input-label"> Filename: {files[keyName]} {backendStatuses[i] ? status(backendStatuses[i]) : <Image
  src={'https://media1.giphy.com/media/3o7bu3XilJ5BOiSGic/200w.webp?cid=ecf05e47pn2fi04f77lmd1v731vpy573o5ghrq1cnmgzbp1e&rid=200w.webp&ct=g'}
  height={10}
  width={10}
  alt={`A cute animal!`}
  unoptimized={true}
/>} </span>

    </li>
))}
    </Grid>
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
