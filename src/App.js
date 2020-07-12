import React from 'react';

import Layout from './components/Layout/Layout';
import UsersList from './components/Users/UsersList';

function App() {
  return (
    <div>
      <Layout>
        <UsersList />
      </Layout>
    </div>
  );
}

export default App;
