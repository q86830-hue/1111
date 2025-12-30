
/**
 * 平台抽象层
 * 适配 Web (localStorage) 和 微信小程序 (wx.getStorageSync)
 */

// 安全检查 wx 对象是否存在且拥有小程序特有 API
const checkWeChat = () => {
  try {
    return typeof (window as any).wx !== 'undefined' && typeof (window as any).wx.getSystemInfoSync === 'function';
  } catch (e) {
    return false;
  }
};

export const isWeChat = checkWeChat();

export const safeGetStorage = (key: string): string | null => {
  if (isWeChat) {
    try {
      return (window as any).wx.getStorageSync(key) || null;
    } catch (e) {
      return null;
    }
  }
  try {
    return localStorage.getItem(key);
  } catch (e) {
    console.warn('LocalStorage access denied', e);
    return null;
  }
};

export const safeSetStorage = (key: string, value: string): void => {
  if (isWeChat) {
    try {
      (window as any).wx.setStorageSync(key, value);
    } catch (e) {
      console.error('WeChat Storage set failed', e);
    }
  } else {
    try {
      localStorage.setItem(key, value);
    } catch (e) {
      console.error('LocalStorage set failed', e);
    }
  }
};
