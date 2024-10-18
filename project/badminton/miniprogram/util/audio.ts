import { request } from './request';
import { host } from '../models/global';
const fs = wx.getFileSystemManager();
const backgroundAudioManager = wx.getBackgroundAudioManager();
const cacheKey = 'audio';
enum audioStatus {
  PLAYING = 'PLAYING',
  WAITING = 'WAITING',
  LOADING = 'LOADING'
}
type CBFunction = (a: string) => void;
let playCb: CBFunction = function (str: string) {
  console.log(str);
};

backgroundAudioManager.title = 'AI口语';
backgroundAudioManager.onPause(() => {
  console.log('onPause');
  playCb(audioStatus.WAITING);
});

backgroundAudioManager.onEnded(() => {
  console.log('onEnded');
  playCb(audioStatus.WAITING);
});

backgroundAudioManager.onStop(() => {
  console.log('onStop');
  playCb(audioStatus.WAITING);
});

backgroundAudioManager.onPlay(() => {
  console.log('onPlay');
  playCb(audioStatus.PLAYING);
});
backgroundAudioManager.onError((err) => {
  console.log('播放异常', err);
  backgroundAudioManager.stop();
  playCb(audioStatus.WAITING);
  wx.showToast({
    title: '文件已过期',
    icon: 'error'
  });
});

// 优先查找是否有缓存的语音
const findCache = (index: string): string | undefined => {
  const cache = wx.getStorageSync(cacheKey) ||  [];
  return cache.includes(index);
};
const cacheIndex = (index: string) => {
  const cache: string[] = wx.getStorageSync('audio') ||  [];
  // 最多缓存50条
  if (cache.length > 200) {
    const index = cache.shift();
    fs.removeSavedFile({
      filePath: `${wx.env.USER_DATA_PATH}/${index}.mp3`
    });
  }
  cache.push(index);
  wx.setStorage({
    key: cacheKey,
    data: cache
  });
};

const saveTmpAudio = (path: string, index: string) => {
  fs.saveFile({
    tempFilePath: path,
    filePath: `${wx.env.USER_DATA_PATH}/${index}.mp3`,
    success (res) {
      console.log('saveTmpAudio', res, `${index}.mp3`);
      cacheIndex(index);
    },
    fail (res) {
      console.error('saveFile fail', res);
    }
  });
};

// 在线合成语音并缓存
const playOnline = async (content: string, index: string) => {
  playCb(audioStatus.LOADING);
  const voice = await request({
    url: `${host}/ai/tts`,
    method: 'POST',
    responseType: 'arraybuffer',
    data: {
      text: content,
      // voice: '',
      // lang: '',
      // style: 'mp3'
    }
  });
  const path = `${wx.env.USER_DATA_PATH}/${index}.mp3`;
  fs.writeFile({
    filePath: path,
    data: voice as ArrayBuffer,
    encoding: 'binary',
    success () {
      playCb(audioStatus.PLAYING);
      backgroundAudioManager.src = path;
      cacheIndex(index);
    },
    fail (res) {
      console.error('writeFile fail', res);
    }
  });
};

const playAudio = async (isUser: boolean, content: string, index: string, cb: CBFunction)=> {
  playCb = cb;
  if (findCache(index)) {
    console.log('playAudio', `${wx.env.USER_DATA_PATH}/${index}.mp3`);
    backgroundAudioManager.src = `${wx.env.USER_DATA_PATH}/${index}.mp3`;
  } else if (isUser) {
    wx.showToast({
      title: '文件已过期',
      icon: 'error'
    });
  } else {
    playOnline(content, index);
  }
};

export {
  playAudio,
  audioStatus,
  saveTmpAudio
};