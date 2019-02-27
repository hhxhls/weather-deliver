// component/weather-detail/cmp.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    index:{
      type:Object,
      value:null,
      observer(newValue){
        this.setData({
          windDirectCode:this.windDirect(newValue.windDir)
        });
      }
    },
    airdes:{
      type:Object,
      value:{
        bgColor:'#8fc31f',
        imgCode:1
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    windDirectCode: 0,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    windDirect(Dir){
      let dirCode = 0;
      switch(Dir){
        case'北风':
        dirCode = 0;
        break;
        case'东北风':
        dirCode = 45;
        break;
        case'东风':
        dirCode = 90;
        break;
        case'东南风':
        dirCode = 135;
        break;
        case'南风':
        dirCode = 180;
        break;
        case'西南风':
        dirCode = 225;
        break;
        case'西风':
        dirCode = 270;
        break;
        case'西北风':
        dirCode = 315;
        break;
      }
      return dirCode;
    }
  }
})
