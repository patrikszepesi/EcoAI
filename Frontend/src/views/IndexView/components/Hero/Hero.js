import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { Image } from '../../../../components/atoms';
import { SectionHeader } from '../../../../components/molecules';
import { HeroShaped } from '../../../../components/organisms';

const useStyles = makeStyles(theme => ({
  root: {
    background:
      'url(https://assets.maccarianagency.com/the-front/illustrations/patterns-bg.svg) no-repeat left bottom',
    backgroundSize: 'contain',
    backgroundColor: theme.palette.alternate.main,
  },
  cover: {
    position: 'relative',
    zIndex: 9,
    width: '100%',
    height: '100%',
  },
  image: {
    objectFit: 'cover',
  },
}));

const Hero = props => {
  const { className, ...rest } = props;
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <HeroShaped
        leftSide={
          <SectionHeader
            title="EcoAI for a cleaner future"
            subtitle="We use cutting edge Artificial Intelligence to detect pollution in our rivers, forests, and beaches"
            subtitleColor="textPrimary"
            ctaGroup={[
              <Button variant="contained" color="primary" size="large">
              Get Started with Plastic Detection
              </Button>,
            ]}
            align="left"
            data-aos="fade-up"
            titleVariant="h3"
          />
        }
        rightSide={
          <div className={classes.cover}>
            <Image
              src="https://images.unsplash.com/photo-1563245159-f793f19d8c37?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1771&q=80"
              srcSet="https://images.unsplash.com/photo-1563245159-f793f19d8c37?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1771&q=80"
              className={classes.image}
              lazyProps={{
                width: '100%',
                height: '100%',
              }}
            />
          </div>
        }
      />
    </div>
  );
};

Hero.propTypes = {
  /**
   * External classes
   */
  className: PropTypes.string,
};

export default Hero;
