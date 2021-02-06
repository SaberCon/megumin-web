import { get, postForm, putForm } from '@/utils/request';

export enum SmsType {
  LOGIN = 1,
  BIND_PHONE = 2,
  UNBIND_PHONE = 3,
  UPDATE_PWD = 4,
}

export async function getOssData() {
  return get<API.OssData>('oss');
}

export async function sendCode(type: SmsType, phone?: string) {
  return get<void>('sms', { type, phone });
}

export async function checkCode(type: SmsType, code: string, phone?: string) {
  return get<boolean>('sms/check', { type, code, phone });
}

export async function login(phone: string, code: string, type: 'pwd' | 'sms') {
  return postForm<string>('user/login', { phone, code, type });
}

export async function getCurrentUserInfo() {
  return get<API.CurrentUser>('user/current');
}

export async function getUserInfo(id: number) {
  return get<API.User>('user', { id });
}

export async function updatePhone(phone: string, unbindCode: string, bindCode: string) {
  return putForm<void>('user/phone', { phone, unbindCode, bindCode });
}

export async function updatePwd(pwd: string, code: string) {
  return putForm<void>('user/pwd', { pwd, code });
}

export async function updateUser(user: API.User) {
  return putForm<void>('user', user);
}
