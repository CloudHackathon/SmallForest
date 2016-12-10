Page({
    data: {
        tab: 0,
        topics: []
    },
    enterIMpage(event) {
        // console.log(event);
        var data = event.target.dataset;
        console.log(data);
        wx.navigateTo({
            url: '../im/im?data=' + JSON.stringify(data),
            success: function() {},
            fail: function() {},
            complete: function() {}
        });
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
    getOwnedTopics() {
        var self = this;
        var userId = wx.getStorageSync('userId');
        var cookies = wx.getStorageSync('cookies');
        wx.request({
            method: 'GET',
            url: 'http://sweetvvck.com:3000/users/' + userId + '/topics',
            header: {
                'Cookie': cookies
            },
            success: function(res) {
                self.setData({'topics': res.data});
            }
        });
    },
    onLoad() {
        // wx.clearStorageSync();
        var self = this;
        var userId = wx.getStorageSync('userId');
        var cookies = wx.getStorageSync('cookies');
        if (!userId || !cookies) {
            wx.request({
                method: 'POST',
                url: 'http://sweetvvck.com:3000/auth/random',
                success: function(res) {
                    var response = res.data;
                    wx.setStorageSync('userId', response.userId);
                    wx.setStorageSync('username', response.username);
                    wx.setStorageSync('email', response.email);
                    wx.setStorageSync('cookies', response.headers['set-cookie'].join(';'));

                    self.getOwnedTopics();
                }
            })
        } else {
            console.log('已登录');
            console.log('用户Id是： ', userId);
            self.getOwnedTopics();
        }

    }
});
