import React, { useState, useEffect } from 'react';

import Home from './screens/Home';
import FullTable from './screens/FullTable';
import NavBar from './components/NavBar';
import {
  HashRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import firebase from "firebase";

const fetch = require('node-fetch');

require("firebase/firestore");
try {
  firebase.initializeApp({
    apiKey: "AIzaSyD2K0qINs7uoG6-2whLT8Wgab_AvAhVEzI",
    authDomain: "sierra-leone-cec24.firebaseapp.com",
    projectId: "sierra-leone-cec24",
    storageBucket: "sierra-leone-cec24.appspot.com",
    messagingSenderId: "458713135578",
    appId: "1:458713135578:web:d5a3e153fa883269ace8e3"
  });
} catch (err) {
  // ignore app already initialized error
}
const db = firebase.firestore();

function App() {
  const [data, setData] = useState([]);
  const [firebaseTimestamp, setFirebaseTimestamp] = useState(-1);

  let update = () => {
    console.log("fetching!")
    fetch('http://localhost:4001/logfile').then(res=>res.json()).then(data=>{
      console.log(data)
      setData(data)
      if(global.firebaseListener){
        global.firebaseListener() //unsubscribe
        global.firebaseListener = null
      }
    }).catch(err=>{
      if(global.firebaseListener == null){
        const logFileRef = db.collection('logData').doc("data");
        global.firebaseListener = logFileRef.onSnapshot((doc) => {
          setData(doc.data().data)
          console.log(doc.data().timestamp.seconds)
          setFirebaseTimestamp(doc.data().timestamp.seconds * 1000)
        });
      }
      console.log(err)
    })
  }

  useEffect(()=>{
    update()
    setInterval(update, 1000*30) // request file from web server every 30 seconds
  }, [true])

  return (
    <Router basename="/solar-metering">
      <NavBar firebaseTimestamp={firebaseTimestamp}/>

      <Switch>
        <Route path="/full-table">
          <FullTable data={data} />
        </Route>
        <Route path="/">
          <Home data={data} />
        </Route>
      </Switch>
    </Router>
  );
}
export default App;
