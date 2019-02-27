
// 根据接口类型获得相应的API地址

function getUrl(type = 'search'){

    if(type == 'luna'){
        let date = new Date().toLocaleDateString().replace(/\//g,'-');
        return `https://www.sojson.com/open/api/lunar/json.shtml?date=${date}`;
    }else if(type == 'search'){
        return 'https://search.heweather.net/find'
    }

    const baseUrl = 'https://free-api.heweather.net/s6/';
    let subUrl = '';
    switch(type){
        case 'air':
        subUrl = 'air/now';
        break;
        case'life':
        subUrl = 'weather/lifestyle';
        break;
        case 'sun':
        subUrl = 'solar/sunrise-sunset';
        break;
        case 'collection':
        subUrl = 'weather';
        break;
        case 'forecast':
        subUrl = 'weather/forecast';
        break;
        case 'now':
        subUrl = 'weather/now';
        break;
        case 'hourly':
        subUrl = 'weather/hourly';
        break;
        default:
        break;

    }

    return baseUrl + subUrl;
}

export {
    getUrl
}