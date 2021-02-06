declare namespace API {
  export type Result<D = any> = {
    success: boolean;
    code: string;
    msg: string;
    data: D;
  };

  export type Page<D = any> = {
    list: D[];
    total: number;
  };

  export type OssData = {
    accessId: string;
    policy: string;
    signature: string;
    host: string;
    expire: number;
  };

  export type Gender = 'unknown' | 'boy' | 'girl';

  export type User = {
    id: number;
    username: string;
    avatar: string;
    about?: string;
    gender?: Gender;
  };

  export type CurrentUser = User & {
    phone: string;
  };

  export type NoticeIconData = {
    id: string;
    key: string;
    avatar: string;
    title: string;
    datetime: string;
    type: string;
    read?: boolean;
    description: string;
    clickClose?: boolean;
    extra: any;
    status: string;
  };
}
