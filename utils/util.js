const STR_CONST = require('../consts/stringConsts');

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const getRequestUrl = (url, data) => {
  let urlLink = url,
      dataList = [];
  if(data && typeof data === 'object') {
    Object.keys(data).map(dataKey => {
      if(typeof data[dataKey] === 'object') {
        dataList.push(`${dataKey}=${JSON.stringify(data[dataKey])}`);
      }
      else {
        dataList.push(`${dataKey}=${data[dataKey]}`);
      }
    })
  }
  urlLink = (/^http(s):\/\//).test(url) ? url : (STR_CONST.HOST + url);
  urlLink = url.indexOf('?') >= 0 ? `${urlLink}&${dataList.join('&')}` : `${urlLink}?${dataList.join('&')}`
  return urlLink;
}

const request = (url, data, callback) => {
  let requestUrl = (/^http(s):\/\//).test(url) ? url : (STR_CONST.HOST + url);
  wx.request({
    url: requestUrl,
    data,
    success: res => {
      if(callback && typeof callback === 'function') {
        callback(res.data);
      }
    },
    fail: err => {
      console.log(err);
    }
  });
}

const sharePage = ({title, path, imgUrl, isButton}) => {
  var shareObj = {
    title,
    path,
    imgUrl,
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

module.exports = {
  formatTime: formatTime,
  request: request,
  sharePage: sharePage
}
