Page({
    data: {
        topicContent: '',
        message: [],
        userId: 0,
        value: '',
        roomId: 0
    },
    generateAvatar(id) {
        var path = '../../images/avatar/t' + (id%5 + 1) + '.jpg';
        console.log('path is: ', path);
        return path;
    },
    getMessages(roomId) {
        var self = this;
        var userId = wx.getStorageSync('userId');
        var cookies = wx.getStorageSync('cookies');
        wx.request({
            method: 'GET',
            header: {
                'Cookie': cookies
            },
            url: 'http://sweetvvck.com:3000/rooms/' + roomId + '/messages',
            success: function(res) {
                var messages = res.data;
                if (messages && messages.length) {
                  messages = messages.map(function(item) {
                    item.avatar = self.generateAvatar(item.id);
                  });
                }
                self.setData({'messages': res.data});
            }
        });
    },
    sendMessage() {
        var self = this;
        var content = this.data.value;
        var cookies = wx.getStorageSync('cookies');
        wx.request({
            method: 'POST',
            header: {
                'Cookie': cookies,
                'Content-Type': 'application/json'
            },
            data: {
                "type": 1,
                "text": content,
            },
            url: 'http://sweetvvck.com:3000/rooms/' + self.data.roomId + '/messages',
            success: function(res) {
                self.getMessages(self.data.roomId);
                self.setData({value: ''});
            }
        });
    },
    contentBlur(e) {
        var value = e.detail.value;
        this.setData({'value': value});
    },
    onLoad(options) {
        var self = this;
        var userId = wx.getStorageSync('userId');
        var data = JSON.parse(options.data);
        var topicId = data.topicId;
        var roomId = data.roomId;
        console.log(data);
        this.setData({'topicContent': data.topicContent})
        this.setData({'userId': userId})
        this.setData({'roomId': roomId})
        this.getMessages(roomId);
        setInterval(function () {
            self.getMessages(roomId);
        }, 5000);
    }
});
