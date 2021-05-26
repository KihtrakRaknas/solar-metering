import Table from '../components/Table';
import NoData from '../components/NoData';
import Graph from '../components/Graph';
import { fileNames } from '../helperFunctions/globals'

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

            {/* {Object.keys(data).length > 0 ? <Graph data={data} categories={["Vb min daily", "Vb max daily"]} title="Vb Over Time" yTitle="Vb Value (unit goes here)" /> : <NoData />}
            {Object.keys(data).length > 0 ? <Graph data={data} categories={["Whc daily"]} title="Whc Value" yTitle="Whc Value (unit goes here)" /> : <NoData />} */}
            {Object.keys(data).length > 0 ? <Graph data={data} categories={["Array Voltage (V)"]} title="Array Voltage" yTitle="Array Voltage (V)" /> : <NoData />}
            {Object.keys(data).length > 0 ? <Graph data={data} categories={["Array Current (A)"]} title="Array Current" yTitle="Array Current (A)" /> : <NoData />}
            {Object.keys(data).length > 0 ? <Graph data={data} categories={["Input Power (W)"]} title="Input Power" yTitle="Input Power (W)" /> : <NoData />}
            {Object.keys(data).length > 0 ? <Graph data={data} categories={["Output Power (W)"]} title="Output Power" yTitle="Output Power (W)" /> : <NoData />}
            {Object.keys(data).length > 0 ? <Graph data={data} categories={["Battery Voltage (V)"]} title="Battery Voltage" yTitle="Battery Voltage (V)" /> : <NoData />}
            {Object.keys(data).length > 0 ? <Graph data={data} categories={["Battery Terminal Voltage (V)"]} title="Battery Terminal Voltage" yTitle="Battery Terminal Voltage (V)" /> : <NoData />}
            {Object.keys(data).length > 0 ? <Graph data={data} categories={["Battery Sense Voltage (V)"]} title="Battery Sense Voltage" yTitle="Battery Sense Voltage (V)" /> : <NoData />}
            {Object.keys(data).length > 0 ? <Graph data={data} categories={["Battery Current (A)"]} title="Battery Current" yTitle="Battery Current (A)" /> : <NoData />}
            {Object.keys(data).length > 0 ? <Graph data={data} categories={["Output Power (W)"]} title="Output Power" yTitle="Output Power (W)" /> : <NoData />}
            {Object.keys(data).length > 0 ? <Graph data={data} categories={["Target Regulation Voltage (V)"]} title="Target Regulation Voltage" yTitle="Target Regulation Voltage (V)" /> : <NoData />}
            {Object.keys(data).length > 0 ? <Graph data={data} categories={["RTS Temperature (C)"]} title="RTS Temperature" yTitle="RTS Temperature (C)" /> : <NoData />}
            {Object.keys(data).length > 0 ? <Graph data={data} categories={["Battery Temperature (C)"]} title="Battery Temperature" yTitle="Battery Temperature (C)" /> : <NoData />}
            {Object.keys(data).length > 0 ? <Graph data={data} categories={["Heatsink Temperature (C)"]} title="Heatsink Temperature" yTitle="Heatsink Temperature (C)" /> : <NoData />}
            {Object.keys(data).length > 0 ? <Graph data={data} categories={["Ah Charge Resetable (Ah)"]} title="Ah Charge Resetable" yTitle="Ah Charge Resetable (Ah)" /> : <NoData />}
            {Object.keys(data).length > 0 ? <Graph data={data} categories={["Ah Charge Total (Ah)"]} title="Ah Charge Total" yTitle="Ah Charge Total (Ah)" /> : <NoData />}
            {Object.keys(data).length > 0 ? <Graph data={data} categories={["kWh Charge Resetable (kWh)"]} title="kWh Charge Resetable" yTitle="kWh Charge Resetable (kWh)" /> : <NoData />}
            {Object.keys(data).length > 0 ? <Graph data={data} categories={["kWh Charge Total (kWh)"]} title="kWh Charge Total" yTitle="kWh Charge Total (kWh)" /> : <NoData />}
            

            <div style={{ padding: 15, overflowX: "auto" }}>
                {Object.keys(data).length > 0 ? <>
                {fileNames.map((filename)=><><h1 className="title" style={{ textAlign: "center" }}>{filename} Summary</h1><Table data={data[filename]} fields={["time (UTC)", "Alarms ()", "Faults ()", "Array Voltage (V)", "Array Current (A)", "Input Power (W)", "Battery Voltage (V)", "Battery Current (A)", "Output Power (W)",  "Heatsink Temperature (C)"]} /></>)}
                </> : <NoData />}
            </div>
        </div>
    );
}

