//index.js
//获取应用实例
const app = getApp()
const util = require('../../utils/util.js')

Page({
  onLoad: function() {
    this.getNextVideoList(this.data.currentPage);
  },
  data: {
    video_data: [{
      title: "测试分享按钮",
      content: "测试分享按钮",
      create: "2018-04-01",
      // video_src: "http://pic.ibaotu.com/00/54/74/51e888piCSyv.mp4",
      // video_src: "http://img1.stackcloud.org//WeChatSight216.mp4",
      video_src: "http://img1.stackcloud.org/test_0001_.mp4",
      image: "http://img1.stackcloud.org//8de23cd1-b8a3-4d36-bd63-85f313186d35.jpg"
    }],
    currentPage: 1
  },
  getNextVideoList: function(page) {
    util.request('api/social/video/search.shtml', {currentPage: page}, res => {
      this.setData({ video_data: this.data.video_data.concat(res.value), currentPage: ++page });
    });
  },
  onReachBottom: function() {
    this.getNextVideoList(this.data.currentPage);
  },
  onShareAppMessage: function( options ) {
    util.sharePage({title: '测试转发', path: '/pages/index/index', imgUrl: 'http://img1.stackcloud.org//8de23cd1-b8a3-4d36-bd63-85f313186d35.jpg'})
  }
})
