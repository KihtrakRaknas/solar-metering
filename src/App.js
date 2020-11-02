import React, { useState, useEffect } from 'react';
import raw from "raw.macro";
import parse from 'csv-parse';
import Table from './components/Table';
import NoData from './components/NoData';
import Graph from './components/Graph';


function App() {
  const [data, setData] = useState([]);

  let update = () => {
    const logFile = raw("../please.csv")//raw("C:/Program Files (x86)/Morningstar Corporation/MSView/please.csv");
    // Create the parser
    parse(logFile, {
      comment: '#',
      delimiter: ',',
      columns: true
    }, function(err, output){
      // console.log(output)
      if(err)
        console.error(err)
      else
        setData(output)
    }) 
  }

  useEffect(update,[true])

  return (
    <div className="App">
      <div className="title_component">
        <header className="App-header">
        </header>
      </div>

      {data.length>0?<Graph data={data}/>:<NoData/>}
      <div style={{padding:15, overflowX:"auto"}}>
        {data.length>0?<Table data={data}/>:<NoData/>}
      </div>
    </div>
  );
}

export default App;
