import React from 'react';
import PredictView from '../../src/views/PredictView';
import Main from '../../src/layouts/Main';
import WithLayout from '../../src/WithLayout';

const Predict = () => {
  return (
    <WithLayout
      component={PredictView}
      layout={Main}
    />
  )
};

export default Predict;
