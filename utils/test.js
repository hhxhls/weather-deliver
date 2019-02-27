// 由于没有24小时预报，故做了一个假数据

class Test{
    getWeatherHourly() {
        const hoursNow = new Date().getHours();
        const demoInfo = [
            {
                time: `${String(hoursNow + 3 <24?hoursNow + 3:hoursNow + 3-24).padStart(2,0)}:00`,
                weatherCode:100,
                weatherDes:'晴',
                tmp: 7,
            },
            {
                time: `${String(hoursNow + 6 <24?hoursNow + 6:hoursNow + 6-24).padStart(2,0)}:00`,
                weatherCode:101,
                weatherDes:'多云',
                tmp: 11,
            },
            {
                time: `${String(hoursNow + 9 <24?hoursNow + 9:hoursNow + 9-24).padStart(2,0)}:00`,
                weatherCode:305,
                weatherDes:'小雨',
                tmp: 5,
            },
            {
                time: `${String(hoursNow + 12 <24?hoursNow + 12:hoursNow + 12 -24).padStart(2,0)}:00`,
                weatherCode:305,
                weatherDes:'小雨',
                tmp: 6,
            },
            {
                time: `${String(hoursNow + 15 <24?hoursNow + 15:hoursNow + 15 -24).padStart(2,0)}:00`,
                weatherCode:305,
                weatherDes:'小雨',
                tmp: 3,
            },
            {
                time: `${String(hoursNow + 18 <24?hoursNow + 18:hoursNow + 18-24).padStart(2,0)}:00`,
                weatherCode:104,
                weatherDes:'阴',
                tmp: 8,
            },
            {
                time: `${String(hoursNow + 21 <24?hoursNow + 21:hoursNow +21 -24).padStart(2,0)}:00`,
                weatherCode:102,
                weatherDes:'多云',
                tmp: 11,
            },
            {
                time: `${String(hoursNow).padStart(2,0)}:00`,
                weatherCode:100,
                weatherDes:'晴',
                tmp: 13,
            },
        ]
          return Promise.resolve(demoInfo);
      }
}

export {Test}