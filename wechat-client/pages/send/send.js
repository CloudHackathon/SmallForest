// let labels = [{id: 0, label:'xxx'}, {id: 1, label:'ssssss'},{id: 2, label:'sfsdfweffef'}];

Page({
    data: {
        height: 20,
        focus: false,
        cotent: '',
        tab: '',
        labelArr: [],
        userId: '',
        labels: ''
    },
    bindKeyInput(e) {
        let content = e.detail.value;
        if (!content) {
            this.setData({'value': ''});
            return;
        }

        this.setData({'value': content});
    },
    sendTopic() {
        if (!this.data.value) {
            wx.showModal({
                title: '提示',
                content: '请输入吐槽内容～',
                success: function(res) {}
            });
            return;
        }

        let cookies = wx.getStorageSync('cookies');
        wx.request({
            method: 'POST',
            url: 'http://sweetvvck.com:3000/users/' + this.data.userId + '/topics',
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
    selectLabel(e) {
        let label = +e.currentTarget.id;
        this.data.labelArr.push(label);
        this.setData({'tab': label});

        this.getLabelList();
    },
    getLabelList() {
        let cookies = wx.getStorageSync('cookies');
        let self = this;
        wx.request({
            url: 'http://sweetvvck.com:3000/labels',
            header: {
                'Cookie': cookies
            },
            success: function(res) {
                self.setData({'labels': res.data});
            }
        });
    },
    onLoad() {
        let userId = wx.getStorageSync('userId');
        this.setData({'userId': userId});
        this.getLabelList();
    }
})
