export default function prepDataForTable(arr, fields) {
    // const key = arr.shift()
    // const tableData = arr.map(row=>{
    //     let rowObj = {}
    //     row.forEach((rowEl, index)=>rowObj[key[index]] = rowEl)
    //     return rowObj
    // })
    // return {key, tableData}

    // for(let timeKey of Object.keys(arr[0]).filter(el=>el.includes("time"))){
    //     arr.forEach(row=>{
    //         row[timeKey] = new Date(row[timeKey]).toUTCString();
    //     })
    // }
    arr.forEach(row=>{
        const timeKey = "time (UTC)"
        row[timeKey] = new Date(row[timeKey]).toUTCString();
    })

    const key = Object.keys(arr[0])
    .filter(name=>!fields?true:fields.includes(name))
    .map(name=>({
        label: name.split("_").join(" ").replace("Vb max daily", "Battery Voltage Max (Daily)")
        .replace("Vb min daily", "Battery Voltage Min (Daily)")
        .replace("Whc daily", "Battery Wh (Daily)")
        .replace("fault daily", "Fault Daily")
        .replace("alarm daily", "Alarm Daily"),

        field: name
    }))
    return {
        tableData: arr,
        key
    }
}