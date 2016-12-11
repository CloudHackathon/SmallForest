Page({
    data: {
        time: '',
        label: '',
        content: '',
        topicId: ''
    },
    deleteTopic() {
        let cookies = wx.getStorageSync('cookies');
        let userId = wx.getStorageSync('userId');
        wx.request({
            method: 'POST',
            url: 'http://sweetvvck.com:3000/delete/users/' + userId + '/topics/' + this.data.topicId,
            header: {
                'Cookie': cookies
            },
            data: {
                'content' : this.data.value,
                'ownerId' : this.data.userId,
                'labelIds': this.data.labelArr
            },
            success: function (res) {
                wx.navigateTo({
                    url: '../index/index',
                    success: function() {},
                    fail: function() {},
                    complete: function() {}
                });
            }
        });
    },
    onLoad(options) {
        this.setData({'time': options.time});
        this.setData({'label': options.label});
        this.setData({'content': options.content});
        this.setData({'topicId': options.topicId});
    }
});
