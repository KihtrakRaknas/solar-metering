import React, { useState, useEffect } from 'react';
import raw from "raw.macro";
import parse from 'csv-parse';
import Table from './components/Table';
import NoData from './components/NoData';
import VBGraph from './components/VBGraph';
import WHCGraph from './components/WHCGraph';
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
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/full-table">FullTable</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/full-table">
            <FullTable />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );

  /** Home page will contain output and table with most important data */
  function Home() {
    return (
      <div className="App">
        <div className="title_component">
          <header className="App-header">
            <h1 className="App-title">Real-Time Solar Output</h1>
          </header>
        </div>
  
        {data.length > 0 ? <VBGraph data={data} /> : <NoData />}
        {data.length > 0 ? <WHCGraph data={data} /> : <NoData />}
        
        <div style={{ padding: 15, overflowX: "auto" }}>
          {data.length > 0 ? <><Table data={data} fields={["time (UTC)", "Vb_max_daily", "Vb_min_daily", "Whc_daily", "alarm_daily", "fault_daily"]}/></> : <NoData />}
        </div>
      </div>
    );
  }
  
  /** This page will contain all table data */
  function FullTable() {
    return (
      <div className="App">
        <div className="title_component">
          <header className="App-header">
            <h1 className="App-title">Complete Solar Data from MSView</h1>
          </header>
        </div>
  
        <div style={{ padding: 15, overflowX: "auto" }}>
          {data.length > 0 ? <><Table data={data}/></> : <NoData />}
        </div>
      </div>
    );
  }  
}
export default App;
