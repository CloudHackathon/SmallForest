// let res = [{"id":1,"name":"工作","parentId":0,"created_at":"2016-12-11T05:11:11.000Z","updated_at":"2016-12-11T05:11:11.000Z"},{"id":2,"name":"生活","parentId":0,"created_at":"2016-12-11T05:11:11.000Z","updated_at":"2016-12-11T05:11:11.000Z"},{"id":3,"name":"情感","parentId":0,"created_at":"2016-12-11T05:11:11.000Z","updated_at":"2016-12-11T05:11:11.000Z"},{"id":4,"name":"123","parentId":0,"created_at":"2016-12-11T05:11:11.000Z","updated_at":"2016-12-11T05:11:11.000Z"}]
// let sponsorRes = [{"id":1,"name":"工作","parentId":0,"created_at":"2016-12-11T05:11:11.000Z","updated_at":"2016-12-11T05:11:11.000Z"},{"id":2,"name":"生活","parentId":0,"created_at":"2016-12-11T05:11:11.000Z","updated_at":"2016-12-11T05:11:11.000Z"},{"id":3,"name":"情感","parentId":0,"created_at":"2016-12-11T05:11:11.000Z","updated_at":"2016-12-11T05:11:11.000Z"},{"id":4,"name":"123","parentId":0,"created_at":"2016-12-11T05:11:11.000Z","updated_at":"2016-12-11T05:11:11.000Z"}]

Page({
    data: {
        tab: '',
        sponsorTab: '',
        labels: '',
        sponSorLabels: '',
        labelArr: [],
        selection: '',
        labelSponsorArr: [],
        topics: []
    },
    getTopicList() {
        let self = this;
        let cookies = wx.getStorageSync('cookies');
        wx.request({
            url: 'http://sweetvvck.com:3000/topics?labelIds=' + self.data.selection,
            header: {
                'Cookie': cookies
            },
            success: function (res) {
                // res.data.reverse();
                // self.setData({'tab': res.data[0].id});
                // self.setData({'sponsorTab': res.data[0].id});
                self.setData({'topics': res.data});
            }
        });
    },
    enterIMpage(e) {
        var id = e.currentTarget.id;
        let cookies = wx.getStorageSync('cookies');
        wx.request({
            url: 'http://sweetvvck.com:3000/topics/' + id + '/rooms',
            header: {
                Cookie: cookies
            },
            data: {
                "name": "空房间",
                "state": 1
            },
            success: function (res) {
                console.log('data is: ', res.data);
                if (res.data && res.data.length) {
                  var room = res.data[0];
                  room.topicContent = e.target.dataset.topicContent;
                  room.roomId = room.id;
                  wx.navigateTo({
                    url: '../im/im?data=' + JSON.stringify(room),
                    success: function() {},
                    fail: function() {},
                    complete: function() {}
                  });
                } else {
                  wx.request({
                    method: 'POST',
                    url: 'http://sweetvvck.com:3000/topics/' + id + '/rooms',
                    header: {
                      Cookie: cookies
                    },
                    data: {
                      "name": "空房间",
                      "state": 1
                    },
                    success: function (res) {
                      console.log(res.data);
                      res.data.topicContent = e.target.dataset.topicContent;
                      wx.navigateTo({
                        url: '../im/im?data=' + JSON.stringify(res.data),
                        success: function() {},
                        fail: function() {},
                        complete: function() {}
                      });
                    }
                  });
                }
            }
        });
    },
    selectLabel(e) {
        let label = +e.currentTarget.id;

        console.log('label:', label);
        this.data.selection = label;
        this.setData({'tab': label});
        this.getTopicList();
    },
    selectsSponsorLabel(e) {
        let sponsorLabel = +e.currentTarget.id;
        this.data.labelSponsorArr.push(sponsorLabel);
        this.setData({'sponsorTab': sponsorLabel});
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
    onLoad(e) {
        let self = this;
        let cookies = wx.getStorageSync('cookies');
        wx.request({
            url: 'http://sweetvvck.com:3000/topics?labelIds=',
            header: {
                'Cookie': cookies
            },
            success: function (res) {
                // res.data.reverse();
                self.setData({'tab': res.data[0].id});
                self.setData({'sponsorTab': res.data[0].id});
                self.setData({'topics': res.data});
            }
        });
        self.getLabelList();

    }
});
