// component/favor-item/cmp.js
let app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    favor:Object,
    color:String,
    index:Number
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
    onFavorTap(){
      app.searchWord = this.data.favor.location;
      wx.switchTab({
          url:`/pages/index/index`
        })
    },

    onItemDeleted(){
      const favorate = wx.getStorageSync('favorate');
      favorate.some((ele,index,self)=>{
        if(ele === this.data.favor.location){
          self.splice(index,1);
          return true;
        }
      });
      wx.setStorageSync('favorate',favorate);
      this.triggerEvent('onitemdeleted',{index:this.data.index});
    }
  }
})
