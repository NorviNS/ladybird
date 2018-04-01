Component({
  properties: {
    needNavigate: {
      type: Boolean,
      value: false
    },
    item: {
      type: Object
    }
  },
  methods: {
    goContentView: function() {
      if(this.properties.needNavigate) {
        wx.navigateTo({
          url: '../contentPage/contentPage?id=1'
        })
      };
    }
  },
  onShareAppMessage: function( options ) {
    var shareObj = {
      title: "测试转发",        // 默认是小程序的名称(可以写slogan等)
      path: '/pages/contentPage/contentPage',        // 默认是当前页面，必须是以‘/’开头的完整路径
      imgUrl: 'http://img1.stackcloud.org//8de23cd1-b8a3-4d36-bd63-85f313186d35.jpg',     //自定义图片路径，可以是本地文件路径、代码包文件路径或者网络图片路径，支持PNG及JPG，不传入 imageUrl 则使用默认截图。显示图片长宽比是 5:4
      success: function(res){
        // 转发成功之后的回调
        if(res.errMsg == 'shareAppMessage:ok'){
          console.log(res);
        }
      },
      fail: function(res){
        // 转发失败之后的回调
        if(res.errMsg == 'shareAppMessage:fail cancel'){
          // 用户取消转发
        }else if(res.errMsg == 'shareAppMessage:fail'){
          // 转发失败，其中 detail message 为详细失败信息
        }
      },
      complete: function() {

      }
    };
    return shareObj;
  }
})
