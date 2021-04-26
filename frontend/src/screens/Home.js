import Table from '../components/Table';
import NoData from '../components/NoData';
import Graph from '../components/Graph';

/** Home page will contain output and table with most important data */
export default function Home({ data }) {
    return (
        <div className="App">
            <br/>
            <div className="title_component">
                <header className="App-header">
                    <h1 className="App-title" style={{ textAlign: "center" }}>Real-Time Solar Output</h1>
                </header>
            </div>

            {data.length > 0 ? <Graph data={data} categories={["Vb min daily", "Vb max daily"]} title="Daily Battery Voltage" yTitle="Voltage (volts)" /> : <NoData />}
            {data.length > 0 ? <Graph data={data} categories={["Whc daily"]} title="Daily Energy Output" yTitle="Watt Hours" /> : <NoData />}

            <div style={{ padding: 15, overflowX: "auto" }}>
                {data.length > 0 ? <><Table data={data} fields={["time (UTC)", "Vb_max_daily", "Vb_min_daily", "Whc_daily", "alarm_daily"]} /></> : <NoData />}
            </div>
        </div>
    );
}

