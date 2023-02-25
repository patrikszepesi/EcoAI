import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Divider } from '@material-ui/core';
import { Section, SectionAlternate } from '../../components/organisms';
import { Application} from './components';

import UserRoute from "../../../routes/UserRoute";



const useStyles = makeStyles(theme => ({
  pagePaddingTop: {
    paddingTop: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      paddingTop: theme.spacing(5),
    },
  },
}));

const PredictView = () => {
  const classes = useStyles();

  return (
    <UserRoute>
    <div>
      <SectionAlternate innerNarrowed>
        <Application />
      </SectionAlternate>
      <Divider />
    </div>
    </UserRoute>
  );
};

export default PredictView;
