import { get, postForm } from '@/utils/request';

export type Community = {
  id: number;
  name: string;
  logo: string;
  about?: string;
  banner?: string;
  members: number;
  joined: boolean;
  ctime: string;
};

export async function listHotCommunity(p?: number, s?: number) {
  return get<API.Page<Community>>('community/hot', { p, s });
}

export async function listJoinedCommunity(p?: number, s?: number) {
  return get<API.Page<Community>>('community/joined', { p, s });
}

export async function getCommunity(id: number) {
  return get<Community>('community', { id });
}

export async function joinCommunity(id: number, undo: boolean = false) {
  return postForm<void>('community/join', { id, undo });
}
