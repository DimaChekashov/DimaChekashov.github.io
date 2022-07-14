import React from 'react';
import Greeting from '../components/Greeting/Greeting';
import Sidebar from '../components/Sidebar/Sidebar';
import Skills from '../components/Skills/Skills';
import { AppProps } from './App.props';
import './App.scss';

const App: React.FC<AppProps> = () => {
  return (
    <div className="App">
      <Sidebar />
      <Greeting />
      <Skills />
    </div>
  );
};

export default App;
