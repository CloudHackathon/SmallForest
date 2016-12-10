Page({
    data: {
        topicContent: '',
        message: []
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
                self.setData({'messages': res.data});
            }
        });
    },
    onLoad(options) {
        var data = JSON.parse(options.data);
        var topicsId = data.topicsId;
        var roomId = data.roomId;
        console.log(data);
        this.setData({'topicContent': data.topicContent})
        this.getMessages(roomId);

    }
});
