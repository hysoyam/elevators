import { useObserver } from 'mobx-react';
import React, { useState } from 'react';
import './App.css';
import Field from './common/Field';
import { useStore } from './common/FieldContext';


function App() {

  return useObserver(() =>
    <>
      <Field />
    </>
  );
}

export default App;
