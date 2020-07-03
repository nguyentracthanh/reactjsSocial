import React from 'react';
import logo from './logo.svg';
import './App.css';
import Facebook_login from './components/Facebook_login'
import Page_facebook from './components/Page_facebook'
function App() {
  return (
      <div className="App">
          <p>
              Facebook Authentication
        </p>
          <Facebook_login />
          
      </div>
  );
}

export default App;
