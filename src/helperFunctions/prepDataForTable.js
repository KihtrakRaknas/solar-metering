export default function prepDataForTable(arr, fields) {
    // const key = arr.shift()
    // const tableData = arr.map(row=>{
    //     let rowObj = {}
    //     row.forEach((rowEl, index)=>rowObj[key[index]] = rowEl)
    //     return rowObj
    // })
    // return {key, tableData}
    for(let timeKey of Object.keys(arr[0]).filter(el=>el.includes("time"))){
        arr.forEach(row=>{
            row[timeKey]=new Date(row[timeKey]).toUTCString();
        })
    }
    return {tableData: arr, key: Object.keys(arr[0]).filter(name=>!fields?true:fields.includes(name)).map(name=>({label: name.split("_").join(" "), field:name}))}
}