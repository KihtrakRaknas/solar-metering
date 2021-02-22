import React, { useState, useEffect } from 'react';
import raw from "raw.macro";
import parse from 'csv-parse';

import Home from './screens/Home';
import FullTable from './screens/FullTable';
import NavBar from './components/NavBar';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


function App() {
  const [data, setData] = useState([]);

  let update = () => {
    const logFile = raw("../please.csv")//raw("C:/Program Files (x86)/Morningstar Corporation/MSView/please.csv");
    // Create the parser
    parse(logFile, {
      comment: '#',
      delimiter: ',',
      columns: true
    }, function (err, output) {
      // console.log(output)
      if (err)
        console.error(err)
      else
        setData(output)
    })
  }

  useEffect(update, [true])

  return (
    <Router basename="/solar-metering">
        <NavBar/>

        <Switch>
          <Route path="/full-table">
            <FullTable data={data}/>
          </Route>
          <Route path="/">
            <Home data={data}/>
          </Route>
        </Switch>
    </Router>
  );
}
export default App;
