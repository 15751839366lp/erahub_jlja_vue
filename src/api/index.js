import service from "../utils/request";

export function fetchData(query){
    return service.request({
        url: '../table.json',
        method: 'get',
        query
    })
}