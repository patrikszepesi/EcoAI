import React from 'react';
import LoginView from '../src/views/LoginView';
import Main from '../src/layouts/Main';
import WithLayout from '../src/WithLayout';
const Login = () => {
  return (
    <WithLayout
      component={LoginView}
      layout={Main}
    />
  )
};

export default Login;
