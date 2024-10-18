

class AbortController {
  rqTask: WechatMiniprogram.RequestTask;
  addTask (_rqTask: WechatMiniprogram.RequestTask) {
    this.rqTask = _rqTask;
  }

  abort () {
    this.rqTask && this.rqTask.abort();
  }
}

export default AbortController;