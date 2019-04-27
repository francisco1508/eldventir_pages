// Dependencies
import React from 'react';
import { render } from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';

// Routes
//import AppRoutes from './routes';
import Mapa from './components/Mapa/Mapa'

//Assets
import './index.css';

import * as serviceWorker from './serviceWorker';
import Dibujo from './components/Dibujo/Dibujo';

/*render(
    <Router>
        <AppRoutes/>
    </Router>
    , document.getElementById('root')
);*/

render(
    <Dibujo />
    , document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
