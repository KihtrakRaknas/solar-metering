export default function prepDataForTable(arr) {
    // const key = arr.shift()
    // const tableData = arr.map(row=>{
    //     let rowObj = {}
    //     row.forEach((rowEl, index)=>rowObj[key[index]] = rowEl)
    //     return rowObj
    // })
    // return {key, tableData}
    return {tableData: arr, key: Object.keys(arr[0])}
}