import React from 'react';
import { GreetingProps } from './Greeting.props';
import './Greeting.scss';

const Greeting: React.FC<GreetingProps> = () => {
  return (
    <div className="greeting">
      Greeting
    </div>
  );
};

export default Greeting;
