// import userStore from '../stores/user';

export default Behavior({
  properties: {

  },
  data: {
  },
  async attached () {
    console.log('Behavior attached', this.data);
    // userStore.bind(this);
    // await userStore.init();
    // userStore.getUserInfo();
  },
  methods: {

  }
});