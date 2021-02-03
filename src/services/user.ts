import { get, postForm } from '@/utils/request';

export enum SmsType {
  LOGIN = 1,
  BIND_PHONE = 2,
  UNBIND_PHONE = 3,
  UPDATE_PWD = 4,
}

export async function sendCode(type: SmsType, phone?: string) {
  return get('sms', { type, phone });
}

export async function checkCode(type: SmsType, code: string) {
  return get<boolean>('sms/check', { type, code });
}

export async function login(phone: string, code: string, type: 'pwd' | 'sms') {
  return postForm<string>('user/login', { phone, code, type });
}

export async function getCurrentUserInfo() {
  return get<API.CurrentUser>('user/current');
}
