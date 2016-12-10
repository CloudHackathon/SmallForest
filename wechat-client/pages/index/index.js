Page({
	data: {
        tab: 0
	},
    selectIndexTab(e) {
        console.log(e);
        this.setData({
            tab: +e.currentTarget.id
        });
    },
    startRecord() {
        console.log(123);
        wx.startRecord({
          success: function(res) {
            var tempFilePath = res.tempFilePath
            console.log(tempFilePath);
          },
          fail: function(res) {
             console.log('fail:', res);
          },
          complete:function(res) {
            console.log(res);
          }
        })
        setTimeout(function() {
          // 结束录音
          wx.stopRecord()
        }, 1000)
    },
    playRecord() {
        wx.startRecord({
          success: function(res) {
            var tempFilePath = res.tempFilePath

            console.log(tempFilePath);
            wx.playVoice({
              filePath: tempFilePath,
              complete: function(){
              }
            })
          }
        })
    },
    onLoad() {

    }
});
