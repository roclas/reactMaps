import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import context from './components/Context';
import reportWebVitals from './reportWebVitals';


context.detailText=<p>Find the closest center to you by using the search bar (and either search by address or by post code) or directly select one of the available centers on the map, to see its detail</p>;

let center={ lat: 53.562567, lng:-0.22591054, }
let markers=[
	{lat:51.5686331,lng:-0.8200169,address:"4-5 Burrell St, London SE1 0UN",telephone:"047210864",open:"from 9am to 5pm",href:"https://www.yahoo.com"},
	{lat:51.4934851,lng:-0.2259109,address:"10 Hammersmith Broadway,W6 7AL",telephone:"018749427",open:"from 10pm to 5.30pm",href:"www.independent.ie"},
]

const api_key=process.env.REACT_APP_GOOGLE_API_KEY;

ReactDOM.render(
  <React.StrictMode>
    <>
    <div>
    <App markers={markers}  center={center} height="300px" apikey={api_key}/>
    </div>
    </>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
