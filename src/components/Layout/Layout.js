import React from 'react';

import NavigationBar from '../Navigation/NavigationBar';

const Layout = (props) => (
  <>
    <NavigationBar />
    <main>{props.children}</main>
  </>
);

export default Layout;
