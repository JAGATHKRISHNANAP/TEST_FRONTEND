// import React from 'react';
// import ReactDOM from 'react-dom';
// import { Provider } from 'react-redux';
// import store from './app/store';
// import App from './App';
// import { BrowserRouter as Router } from 'react-router-dom';

// ReactDOM.render(
//     <Provider store={store}>
//         <Router>
//             <App />
//         </Router>
//     </Provider>,
//     document.getElementById('root')
// );







import React from 'react';
import ReactDOM from 'react-dom/client'; // Note the change here
import { Provider } from 'react-redux';
import store from './app/store';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';

// Create the root
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the application
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>
);



