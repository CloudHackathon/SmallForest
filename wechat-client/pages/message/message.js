Page({
    data: {

    },
    onLoad(e) {
        let cookies = wx.getStorageSync('cookies');
        wx.request({
            method: 'POST',
            url: 'http://sweetvvck.com:3000/users/' + this.data.userId + '/notices',
            header: {
                'Cookie': cookies
            },
            data: {
                'content' : this.data.value,
                'ownerId' : this.data.userId,
                'labelIds': this.data.labelArr
            },
            success: function (res) {

            }
        });
    }
});
