import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { welcome } from '../src/components/Welcome/Welcome.js';

ReactDOM.render(<App />, document.getElementById('root'));

// ReactDOM.render(
//     <Router>
//         <Route exact path="/" component={welcome}/>
//     </Router>,
//     document.getElementById('root')
// )
