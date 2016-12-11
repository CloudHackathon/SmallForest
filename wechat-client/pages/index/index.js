const moment = require('../../modules/moment');

Page({
    data: {
        tab: 0,
        topics: []
    },
    enterIMpage(event) {
        var data = event.target.dataset;
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
        var email = wx.getStorageSync('email');
        var userId = wx.getStorageSync('userId');
        var cookies = wx.getStorageSync('cookies');
        wx.request({
            method: 'GET',
            url: 'http://sweetvvck.com:3000/users/' + userId + '/topics',
            header: {
                'Cookie': cookies
            },
            success: function(res) {
                res.data.forEach((element) => {
                    element.date = new Date(element.created_at).toLocaleString().slice(0, 7);
                });

                self.setData({'topics': res.data});
            },
            fail: function () {
                console.log(arguments);
                wx.request({
                    method: 'POST',
                    url: 'http://sweetvvck.com:3000/auth/login',
                    data: {
                        email: email,
                        password: '12345678'
                    },
                    success: function(res) {
                        var response = res.data;
                        wx.setStorageSync('cookies', response.headers['set-cookie'].join(';'));

                        self.getOwnedTopics();
                    }
                })

            }
        });
    },
    showContent(e) {
        let isShowContentId = e.currentTarget.id;

        console.log(isShowContentId);

        if (isShowContentId === 'show') {
            this.setData({ 'isShowContentId': 'hide' });
        } else {
            this.setData({ 'isShowContentId': 'true' });
        }
    },
    onLoad() {
        // 登陆
        // wx.clearStorageSync();
        var self = this;
        var userId = wx.getStorageSync('userId');
        var email = wx.getStorageSync('email');
        var cookies = wx.getStorageSync('cookies');

        if (!userId || !cookies) {
            wx.request({
                method: 'POST',
                url: 'http://sweetvvck.com:3000/auth/random',
                success: function(res) {
                    console.log(res);
                    var response = res.data;
                    wx.setStorageSync('userId', response.userId);
                    wx.setStorageSync('username', response.username);
                    wx.setStorageSync('email', response.email);
                    wx.setStorageSync('cookies', response.headers['set-cookie'].join(';'));

                    self.getOwnedTopics();
                }
            });
        } else {
            console.log('已登录');
            console.log('用户Id是： ', userId);
            wx.request({
                method: 'POST',
                url: 'http://sweetvvck.com:3000/auth/login',
                data: {
                    email: email,
                    password: '12345678'
                },
                success: function(res) {
                    var response = res.data;
                    wx.setStorageSync('cookies', response.headers['set-cookie'].join(';'));

                    self.getOwnedTopics();
                }
            });
        }

    }
});
