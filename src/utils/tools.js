import Cookies from 'js-cookie'
//检测登录名
export function VerifyUserName(str) {
  const reg = /^[a-zA-Z0-9]{5,16}$/i;
  return reg.test(str.trim());
}

//检测密码
export function VerifyPassword(str) {
  const reg = /^[a-zA-Z0-9_]{6,16}$/i;
  return reg.test(str.trim())
}
//检测数字
export function VerifyNumber(str) {
  const reg=/^\d+$/i;
  return reg.test(str)
}
//检测电话
export function VerifyPhone(str) {
  const reg = /^1[345789]\d{9}$/i;
  return reg.test(str)
}
//检测身份证
export function VerifyIDCard(str) {
  const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
  return reg.test(str)
}

export function Setcookie(config) {
  var conf = {};
  Object.assign(conf,config);
  for(let key in conf){
    Cookies.set(key,conf[key])
  }
}



export function clearAllCookie() {
  var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
  if(keys) {
    for(var i = keys.length; i--;)
      document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
  }
}
export function Setlocal(key,val) {
  localStorage.setItem(key,JSON.stringify(val));
}

