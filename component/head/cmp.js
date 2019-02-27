// component/head/cmp.js

import {getWeatherBg} from '../../utils/weather-bg'

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    district:String,
    street:String,
    index:Object,
    airdes:Object,
    weatherCode:{
      type:Number,
      value:100,
      observer(){
        this.setData({
          imgUrl: getWeatherBg(this.data.weatherCode),
        })
      }
    },
    tmp:{
      type:Number,
      value: 0
    },
    luna:Object,
    location:String,
  },

  /**
   * 组件的初始数据
   */
  data: {
    imgUrl:'',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getWeatherBg:getWeatherBg,
  }
})
