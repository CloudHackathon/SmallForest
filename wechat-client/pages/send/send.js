Page({
    data: {
        height: 20,
        focus: false,
        value: ''
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
        console.log(123, this.data.value);
        if (!this.data.value) {
            wx.showModal({
                title: '提示',
                content: '请输入吐槽内容～',
                success: function(res) {}
            });
            return;
        }

        console.log(this.data.value);
    }
})
