import { playAudio, audioStatus } from '../../util/audio.js';

Component({
  // options: {
  //   virtualHost: true
  // },
  properties: {
    time: {
      value: '',
      type: String
    },
    text: {
      value: '',
      type: String
    },
    key: {
      value: '',
      type: String
    },
    isUser: {
      value: false,
      type: Boolean
    }
  },
  data: {
    realPlayType: audioStatus.WAITING,
    loadingStartTime: 0,
  },
  methods: {
    playAudio () {
      playAudio(this.data.isUser, this.data.text, this.data.key, (status: string) => {
        switch (status) {
        case audioStatus.LOADING:
          this.setData({
            realPlayType: audioStatus.LOADING
          });
          break;
        case audioStatus.WAITING:
          this.setData({
            realPlayType: audioStatus.WAITING
          });
          break;
        case audioStatus.PLAYING:
          this.setData({
            realPlayType: audioStatus.PLAYING
          });
          break;
        }
      });
    }
  }
});