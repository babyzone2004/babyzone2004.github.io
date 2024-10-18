


// const siPlugin = requirePlugin('WechatSI');

Component({
  externalClasses: ['my-class'],
  properties: {
    text: String,
    inversion: Boolean,
    voiceType: {
      type: String,
      value: 'stop',
      // observer: function (newVal) {
      //   console.log('observer', newVal);
      //   if (newVal == 'play') {
      //     this.textToSpeech(this.data.text);
      //   }
      // }
    },
    isShowAvatar: {
      type: Boolean,
      value: true
    }
  },
  data: {
    botAvatar: '/images/avatar.jpg',
    userAvatar: '/images/user.svg',
    playing: false, // 播放状态
    playType: ''
  },
  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () {
      // console.log('attached', this.data.text);
      // backgroundAudioManager.src = 'https://dldir1.qq.com/music/release/upload/t_mm_file_publish/2339610.m4a'
    }
  },
  methods: {
    async textToSpeech (content: string) {
      // const self = this;
      // siPlugin.textToSpeech({
      //   lang: 'en_US',
      //   content: content,
      //   success: (resTrans: any) => {
      //     console.log('succ textToSpeech', resTrans);
      //     if (resTrans.retcode == 0) {
      //       console.log('resTrans.retcode', resTrans.retcode);
      //       backgroundAudioManager.src = resTrans.filename;
      //       self.setData({
      //         playType: 'playing'
      //       });
      //     } else {
      //       console.warn('语音合成失败', resTrans);
      //     }
      //   },
      //   fail: function (resTrans: any) {
      //     console.warn('语音合成失败', resTrans);
      //   }
      // });

    },
    copy () {
      // wx.setClipboardData({
      //   data: this.data.text,
      //   success: () => {
      //     wx.showToast({
      //       title: '复制成功',
      //       icon: 'success',
      //       duration: 1000,
      //       success: function (res) {
      //         console.log('show succ', res);
      //       },
      //       fail: function (res) {
      //         console.log('fail', res);
      //       }
      //     });
      //   }
      // });
    }
  }
});
