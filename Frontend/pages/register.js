import React from 'react';
import RegisterView from '../src/views/RegisterView';
import Main from '../src/layouts/Main';
import WithLayout from '../src/WithLayout';
const Register = () => {
  return (
    <WithLayout
      component={RegisterView}
      layout={Main}
    />
  )
};

export default Register;
