const util = require('../../utils/util.js');
Page({
  data: {
    itemData: {},
    recommendData: []
  },
  onLoad: function(options) {
    this.getContentInfo(options.id);
  },
  requestByUrl: function(url, data) {
    return new Promise((resolve, reject) => {
      util.request(url, data, res => {
        resolve(res.value);
      });
    });
  },
  getContentInfo: function(id) {
    Promise.all(
      [this.requestByUrl('api/social/video/detail.shtml', { videoId: id }), 
      this.requestByUrl('api/social/video/recommend.shtml', { videoId: id })])
    .then(datas => {
      console.log(datas);
      this.setData({
        itemData: datas[0],
        recommendData: datas[1]
      });
      wx.setNavigationBarTitle({  title: datas[0].title });
    });
  },
  goContentView: function(event) {
    wx.navigateTo({
      url: `./contentPage?id=${event.currentTarget.dataset && event.currentTarget.dataset.videoid}`
    })
  },
  onShareAppMessage: function( options ) {
    util.sharePage({title: '测试转发', path: '/pages/contentPage/contentPage', imgUrl: 'http://img1.stackcloud.org//8de23cd1-b8a3-4d36-bd63-85f313186d35.jpg'})
  }
})