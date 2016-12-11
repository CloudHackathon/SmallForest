let res = [{"id":1,"name":"工作","parentId":0,"created_at":"2016-12-11T05:11:11.000Z","updated_at":"2016-12-11T05:11:11.000Z"},{"id":2,"name":"生活","parentId":0,"created_at":"2016-12-11T05:11:11.000Z","updated_at":"2016-12-11T05:11:11.000Z"},{"id":3,"name":"情感","parentId":0,"created_at":"2016-12-11T05:11:11.000Z","updated_at":"2016-12-11T05:11:11.000Z"},{"id":4,"name":"123","parentId":0,"created_at":"2016-12-11T05:11:11.000Z","updated_at":"2016-12-11T05:11:11.000Z"}]
let sponsorRes = [{"id":1,"name":"工作","parentId":0,"created_at":"2016-12-11T05:11:11.000Z","updated_at":"2016-12-11T05:11:11.000Z"},{"id":2,"name":"生活","parentId":0,"created_at":"2016-12-11T05:11:11.000Z","updated_at":"2016-12-11T05:11:11.000Z"},{"id":3,"name":"情感","parentId":0,"created_at":"2016-12-11T05:11:11.000Z","updated_at":"2016-12-11T05:11:11.000Z"},{"id":4,"name":"123","parentId":0,"created_at":"2016-12-11T05:11:11.000Z","updated_at":"2016-12-11T05:11:11.000Z"}]

Page({
    data: {
        tab: '',
        sponsorTab: '',
        labels: res,
        sponSorLabels: sponsorRes,
        labelArr: [],
        labelSponsorArr: []
    },
    getTopicList() {
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

            }
        });
    },
    selectLabel(e) {
        let label = +e.currentTarget.id;
        this.data.labelArr.push(label);
        this.setData({'tab': label});
    },
    selectsSponsorLabel(e) {
        let sponsorLabel = +e.currentTarget.id;
        this.data.labelSponsorArr.push(sponsorLabel);
        this.setData({'sponsorTab': sponsorLabel});
    },
    onLoad(e) {
        // let cookies = wx.getStorageSync('cookies');
        // wx.request({
        //     method: 'POST',
        //     url: 'http://sweetvvck.com:3000/users/' + this.data.userId + '/topics',
        //     header: {
        //         'Cookie': cookies
        //     },
        //     data: {
        //         'content' : this.data.value,
        //         'ownerId' : this.data.userId,
        //         'labelIds': this.data.labelArr
        //     },
        //     success: function (res) {

        //     }
        // });

        this.setData({'tab': res[0].id});
        this.setData({'sponsorTab': res[0].id});
    }
});
