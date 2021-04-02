import React from 'react';
import { Switch, Route } from 'react-router-dom';
import MainPage from './mainPage';

const App = () => (
    <Switch>
        <Route exact path="/" component={ MainPage }></Route>
    </Switch>
);

export default App;