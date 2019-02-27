function getWeatherBg(weatherCode){
    let imgUrl = ''
    if(weatherCode <= 100){
        imgUrl = 'https://pic.superbed.cn/item/5c6fd88d5f3e509ed942736a';
    }else if(weatherCode <104){
        imgUrl = 'https://pic.superbed.cn/item/5c6fd7315f3e509ed94252d1';
    }else if(weatherCode < 200){
        imgUrl = 'https://pic.superbed.cn/item/5c6fdbb55f3e509ed942d07b';
    }else if(weatherCode < 300){
        imgUrl = 'https://pic.superbed.cn/item/5c6fdafb5f3e509ed942bef2';
    }else if(weatherCode < 400){
        imgUrl = 'https://pic.superbed.cn/item/5c6fdc465f3e509ed942e3c7';
    }else if(weatherCode < 500){
        imgUrl = 'https://pic.superbed.cn/item/5c6fdd4b5f3e509ed9430b1d';
    }else if(weatherCode <= 502 ||weatherCode===514||weatherCode===515){
        imgUrl = 'https://pic.superbed.cn/item/5c6fdcba5f3e509ed942f51f';
    }else{
        imgUrl = 'https://pic.superbed.cn/item/5c6fde4c5f3e509ed943298f'
    }
    return imgUrl;
}

export {getWeatherBg};
