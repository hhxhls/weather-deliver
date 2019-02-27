// components/search/cmp.js
let app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    value:{
      type:String,
      value:'',
    }
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
    onSearch(e){
    // 这里做一层兼容，同时兼容输入框和按搜索键的
    const value = e.detail.value || this.data.value;
    app.searchWord = value;
    wx.switchTab({
        url:`/pages/index/index`
      })
    },

    // 当搜索框失去焦点，在data上设置搜索框内的内容
    onBlur(e){
      const value = e.detail.value;
      this.setData({
        value,
      })
    }
  }
})
