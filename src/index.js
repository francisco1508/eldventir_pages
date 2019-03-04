// Dependencies
import React from 'react';
import { render } from 'react-dom';
//import {BrowserRouter as Router} from 'react-router-dom';

// Routes
//import AppRoutes from './routes';

//Assets
import './index.css';

import * as serviceWorker from './serviceWorker';
import Balanza from './components/Balanza/student/Balanza'
//import Dibujo from './components/Dibujo/Dibujo'

render(
    <Balanza/>
    , document.getElementById('root')
);

/*render(
    <Router>
        <AppRoutes/>
    </Router>
    , document.getElementById('root')
);*/

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
