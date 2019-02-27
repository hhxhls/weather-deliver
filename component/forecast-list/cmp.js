// component/forecast-list/cmp.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    forecast:{
      type:Object,
      value:{},
      observer(newValue){
        if(newValue===null){
          return;
        }
        const temp = [];
        // 不能直接去push到this.data.dailyWeather里，否则无法被getter
        // setter拦截到，不像vue一样做过类似处理
        newValue.forEach((ele)=>{
          temp.push({
            weatherCode : ele.cond_code_d,
            weatherDesD : ele.cond_txt_d,
            weatherDesN : ele.cond_txt_n,
            date: this.getDateDes(ele.date),
            sunrise : ele.sr,
            sunset: ele.ss,
            tmpMax:ele.tmp_max,
            tmpMin:ele.tmp_min,
            windDir:ele.wind_dir
        })
        });
        this.setData({
          dailyWeather:temp
        })
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    dailyWeather:[]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getDateDes(date){
      const today = String(new Date().getDate()).padStart(2,0),
            dateDay =date.split('-')[2];
      if(dateDay === today){
        return '今天'
      }else{
        return `${dateDay}日`;
      }
    }
  }
})
