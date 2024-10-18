
export default Behavior({
  properties: {
    url: String,
    stream: {
      type: Boolean,
      value: true
    },
    chatList: {
      type: Array,
      value: []
    },
    conversationId: {
      type: String,
      value: ''
    },
    templateName: String,
    guideTxt: String,
    askPlaceHolder: Array
  },
  data: {
    showStopBtn: false
  },
  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () {
      console.log('chat components attached', this.data.chatList);
    },
  },
  methods: {

  }
});