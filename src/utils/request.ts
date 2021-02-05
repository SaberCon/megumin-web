import { request } from 'umi';
import type { RequestOptionsInit } from 'umi-request';

export async function sendRequest<D>(
  url: string,
  config?: RequestOptionsInit & { skipErrorHandler?: boolean },
) {
  const result = await request<API.Result<D>>(`/api/${url}`, config);
  return result.data;
}

export async function get<D>(url: string, params?: object | URLSearchParams) {
  return sendRequest<D>(url, { params });
}

export async function del<D>(url: string, params?: object | URLSearchParams) {
  return sendRequest<D>(url, { method: 'DELETE', params });
}

export async function postJson<D>(url: string, data: any) {
  return sendRequest<D>(url, { method: 'POST', data });
}

export async function postForm<D>(url: string, data: any) {
  return sendRequest<D>(url, { method: 'POST', requestType: 'form', data });
}

export async function putJson<D>(url: string, data: any) {
  return sendRequest<D>(url, { method: 'PUT', data });
}

export async function putForm<D>(url: string, data: any) {
  return sendRequest<D>(url, { method: 'PUT', requestType: 'form', data });
}
