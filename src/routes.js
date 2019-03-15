// Dependencies
import React from 'react';
import { Route, Switch } from 'react-router-dom';
// Components
import App from './App';
import Balanza from './components/Balanza/Balanza';
import Mapa from './components/Mapa/Mapa';
import Inicio from './components/Inicio/Inicio';
import Dibujo from './components/Dibujo/Dibujo';
import Page404 from './components/Page404/Page404';

const AppRoutes = () =>
    <App>
        <Switch>
            <Route path="/balanza" component={Balanza}/>
            <Route path="/dibujo" component={Dibujo}/>
            <Route path="/mapa" component={Mapa}/>
            <Route path="/pag" component={Page404}/>
            <Route path="/" component={Inicio}/>
            <Route component={Page404}/>
        </Switch>
    </App>;

    export default AppRoutes;