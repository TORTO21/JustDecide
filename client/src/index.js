import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import Root from './components/Root';
import Splash from '../src/components/splash/Splash';


// ReactDOM.render(<App />, document.getElementById('root'));

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root');
  ReactDOM.render(<Root />, root)
})


