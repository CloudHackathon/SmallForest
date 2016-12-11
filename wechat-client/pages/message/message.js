Page({
    data: {
        lists : [],
        topics: []
    },
    onLoad(e) {
        let cookies = wx.getStorageSync('cookies');
        let userId = wx.getStorageSync('userId');
        let self = this;
        wx.request({
            url: 'http://sweetvvck.com:3000/users/' + userId + '/notices',
            header: {
                'Cookie': cookies
            },
            success: function (res) {
                self.setData({'lists': res.data});
            }
        });
    }
});
