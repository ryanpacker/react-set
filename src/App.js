import React from 'react';
import './App.css';
import { Button } from 'reactstrap';
import { AppSwitch } from '@coreui/react';

function App() {
  return (
    <div className="App">
      <Button color="primary">This is a button</Button>
      <AppSwitch className={'mx-1'} variant={'pill'} color={'primary'} checked />
    </div>
  );
}

export default App;
