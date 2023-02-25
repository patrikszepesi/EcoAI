import React from 'react';
import IndexView from '../src/views/IndexView';
import Main from '../src/layouts/Main';
import WithLayout from '../src/WithLayout';

const Index = () => {
  return (
    <WithLayout
      component={IndexView}
      layout={Main}
    />
  )
};

export default Index;
