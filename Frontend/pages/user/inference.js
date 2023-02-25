import React from 'react';
import InferenceView from '../../src/views/InferenceView';
import Main from '../../src/layouts/Main';
import WithLayout from '../../src/WithLayout';

const Inference = () => {
  return (
    <WithLayout
      component={InferenceView}
      layout={Main}
    />
  )
};

export default Inference;
