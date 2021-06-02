import './App.css';
import GoogleMap from './components/GoogleMap';
import SearchInput from './components/SearchInput';
import Detail from './components/Detail';
import React, { useState } from 'react';

function App(props) {

  const [value, setValue] = useState(0); // integer state
  console.log(`rendering whole App with value=${value}`);
  
  return (
    <div className="App">
    <div style={{width:"100%",position:"relative"}}>
     <div style={{witdh:"70%",float:"left"}}> 
	<SearchInput refreshParent={setValue} style={{width:"100%",backgroundColor:"red"}}/>
    	<GoogleMap markers={props.markers}  center={props.center} refreshParent={setValue} height={props.height} apikey={props.apikey?props.apikey:""}/>
     </div>
     <div className="Detail" style={{width:"30%", height:`${props.height}`, float:"right"}}> 
    	<Detail />
     </div>
    </div>
    </div>
  );
}

export default App;
