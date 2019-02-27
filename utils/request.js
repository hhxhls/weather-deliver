import {
  getUrl
} from './url'
class Request {

  constructor(data = {}) {
    this.key = 'd1ff9139483740dcad409de2fcace407';
    this.rnd = new Date().getTime();
    this.data = data;
  }

  getRawData(type, queryData = this.data) {
    const url = getUrl(type);
    return new Promise((resolved, rejected) => {
      const data = this.parseData(queryData);
      wx.request({
        url,
        data,
        success(res) {
          // 和风天气相关的API返回数据
          if(type!=='luna'){
            if (res.data.HeWeather6[0].status === 'ok') {
              resolved(res.data.HeWeather6[0]);
            } else {
              rejected(res.data.HeWeather6[0].status);
            }
          }else{
            // 农历相关的返回数据
            if (res.data.status === 200) {
              resolved(res.data.data);
            } else {
              rejected(res.data.HeWeather6[0].status);
            }
          }
        },
        fail(res) {
          rejected(res.data.message);
        }
      })
    });
  }

  getAirQuality() {
    return this.getRawData('air', {
      // 由于接口限制，只能用当前地级市的空气质量来代替
      location: this.data.parentCity
    }).then((res) => {
      return Promise.resolve(res.air_now_city);
    })
  }

  getLifeStyle() {
    return this.getRawData('life', {
      location: this.data.cid
    }).then((res) => {
      return Promise.resolve(res.lifestyle);
    })
  }

  getSunInfo() {
    return this.getRawData('sun', {
      location: this.data.cid
    }).then((res) => {
      return Promise.resolve(res.sunrise_sunset);
    })
  }

  getWeatherCurrent() {
    return this.getRawData('now', {
      location: this.data.cid
    }).then((res) => {
      return Promise.resolve(res.now);
    })
  }

  getWeatherForecast() {
    return this.getRawData('forecast', {
      location: this.data.cid
    }).then((res) => {
      return Promise.resolve(res.daily_forecast);
    })
  }

  getWeatherHourly() {
    return this.getRawData('hourly', {
      location: this.data.cid
    }).then((res) => {
      return Promise.resolve(res.hourly);
    })
  }

  getLunaInfo() {
    return this.getRawData('luna',{}).then((res) => {
      return Promise.resolve(res);
    })
  }

  showError(info) {
    wx.showToast({
      title: "请求错误",
      icon: "none"
    });
    throw new Error(`Invalid request, error information as"${info}"`);
  }

  parseData(data) {
    return Object.assign(data, {
      key: this.key,
      rnd: this.rnd
    });
  }
}


export {
  Request,
}
