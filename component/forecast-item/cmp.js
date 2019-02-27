// component/forecast-item/cmp.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    date:{
      type:String,
      value:'24',
    },
    dailyWeather:{
      type:Object,
      value:{},
    },
    sunrise:String,
    sunset:String,
    tmpMax:String,
    tmpMin:String,
    weatherCode:String,
    weatherDesD:String,
    weatherDesN:String,
    windDir:String,
    first:{
      type:Boolean,
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
