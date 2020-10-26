import React, { useState, useEffect } from 'react';
import raw from "raw.macro";
import parse from 'csv-parse';
import Table from './components/Table';
import NoData from './components/NoData';

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
      
      <div style={{padding:15, overflowX:"auto"}}>
        {data.length>0?<Table data={data}/>:<NoData/>}
      </div>
      <p>test</p>
    </div>
  );
}

export default App;
