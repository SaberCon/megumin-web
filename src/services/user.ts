import { request } from 'umi';

export enum SmsType {
  LOGIN = 1,
  BIND_PHONE = 2,
  UNBIND_PHONE = 3,
  UPDATE_PWD = 4,
}

export async function sendCode(type: SmsType, phone?: string) {
  return request('/api/sms', {
    params: phone ? { type, phone } : { type }
  });
}

export async function checkCode(type: SmsType, code: string) {
  return (await request<API.Result<boolean>>('/api/sms/check', {
    params: { type, code }
  })).data;
}

export async function login(phone: string, code: string, type: 'pwd' | 'sms') {
  return (await request<API.Result<string>>('/api/user/login', {
    method: 'POST',
    requestType: 'form',
    data: { phone, code, type },
  })).data;
}

export async function getCurrentUserInfo() {
  return (await request<API.Result<API.CurrentUser>>('/api/user/current')).data;
}
