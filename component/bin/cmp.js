// component/bin/cmp.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    text:Boolean,
    target:String,
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
    onBinTap(){
      if(this.data.target==='searchHistory'){
        wx.removeStorageSync(this.data.target);
        this.triggerEvent('historychange');
      }else if(this.data.target==='favorate'){
        this.triggerEvent('ondelete');
      }
    }
  }
})
