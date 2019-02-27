// component/tag-list/cmp.js
let app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title:String,
    content:Array,
    current:Boolean,
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
    onTagTap(e){
      const position = e.target.dataset.keyword;
      let url = '/pages/index/index';
      if(position==='定位'){
        app.searchWord = null;
      }else{
        app.searchWord = position;
      }
      wx.switchTab({
        url
      })
  },
}
})
