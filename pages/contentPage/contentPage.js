const util = require('../../utils/util.js');
Page({
  onLoad: function(options) {
    this.getContentInfo();
  },
  getContentInfo: function(id) {
    util.request('api/social/video/search.shtml', {currentPage: 1}, res => {
      this.setData({itemData: res.value[0] });
      wx.setNavigationBarTitle({  title: res.value[0].title });
    });
  },
  onShareAppMessage: function( options ) {
    util.sharePage({title: '测试转发', path: '/pages/contentPage/contentPage', imgUrl: 'http://img1.stackcloud.org//8de23cd1-b8a3-4d36-bd63-85f313186d35.jpg'})
  }
})