import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
//import env from './env';
import './index.css';
import Details from 'Pages/Details/Details';
import UserList from 'Pages/UserList/UserList';

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_ENDPOINT,
  // uri: env.GRAPHQL_ENDPOINT,
  request: (operation) => {
    operation.setContext({
      headers: {
        'x-api-key': process.env.REACT_APP_GRAPHQL_API_KEY,
        // 'x-api-key': env.GRAPHQL_API_KEY,
      },
    });
  },
});

const Root = () => {
  const [selectedUser, setSelectedUser] = useState({});

  return (
    <ApolloProvider client={client}>
      <Router>
        <Switch>
          <Route exact path="/">
            <Redirect to="/list" />
          </Route>
          <Route path="/list">
            <UserList handleSelectUser={setSelectedUser} />
          </Route>
          <Route path="/details">
            <Details selectedUser={selectedUser} />
          </Route>
        </Switch>
      </Router>
    </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.getElementById('root'));
