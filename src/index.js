import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import 'lib-flexible';//pxtorem配置需要
import Routers from './routes/index'

ReactDOM.render(
    <Routers/>,
    document.getElementById('root')
);


