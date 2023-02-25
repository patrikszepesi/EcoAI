import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Section, SectionAlternate } from '../../components/organisms';
import {
  Hero,
  Pricings,
  Solutions,
} from './components';

import {
  solutions,
  pricings,
} from './data';

const useStyles = makeStyles(theme => ({
  sectionTrucking: {
    maxWidth: '100%',
    paddingRight: 0,
    paddingLeft: 0,
  },
  featuresSection: {
    background: 'url(https://assets.maccarianagency.com/the-front/illustrations/patterns-bg.svg) no-repeat center',
    backgroundSize: 'contain',
  },
  integrationsSection: {
    background: '#0c133e',
  },
  sectionNoPaddingTop: {
    paddingTop: 0,
  },
  reviewSection: {
    background: theme.palette.primary.dark,
  },
  aboutSection: {
    background: '#0c133e',
  },
}));

const IndexView = () => {
  const classes = useStyles();

  return (
    <div>
      <Hero />
      <Section className={classes.sectionTrucking}>
        <Solutions data={solutions} />
      </Section>
      <Section>
        <Pricings data={pricings} />
      </Section>
    </div>
  );
};

export default IndexView;
