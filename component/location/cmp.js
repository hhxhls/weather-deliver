// component/location/cmp.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    district:String,
    street:String,
    location:String,
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  attached(){

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLocationTap(){
      wx.switchTab({
        url:'/pages/search/search'
      })
    }
  }
})
