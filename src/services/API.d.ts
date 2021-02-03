declare namespace API {
  export type Result<D = any> = {
    success: boolean;
    code: string;
    msg: string;
    data: D;
  };

  export type CurrentUser = {
    id: number;
    username: string;
    avatar: string;
    phone?: string;
    about?: string;
    gender?: 'unknown' | 'boy' | 'girl';
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
