import { history, useModel } from 'umi';
import { getCurrentUserInfo } from '@/services/user';

const fakeUser: API.CurrentUser = {
    id: 0,
    username: '',
    avatar: '',
    gender: 'unknown',
    phone: ''
}

/**
 * @param redirect 用户不存在时是否重定向到登录页
 */
export default (redirect: boolean = false): { currentUser: API.CurrentUser, refreshCurrentUser: () => Promise<any> } => {
    const { initialState, setInitialState } = useModel('@@initialState');

    const refreshCurrentUser = async () => {
        setInitialState({ ...initialState as NonNullable<typeof initialState>, currentUser: await getCurrentUserInfo() });
    }

    if (redirect && !initialState?.currentUser) {
        if (history.location.pathname !== '/user/login') {
            history.push({
                pathname: '/user/login',
                query: {
                    redirect: history.location.pathname,
                },
            });
        }
        // 页面会重定向到登录页, 先返回空用户信息防止后续方法报错
        return { currentUser: fakeUser, refreshCurrentUser };
    }
    // todo 当 redirect 为 true 时 currentUser 不可能为空, 此处返回类型有待优化
    return { currentUser: initialState?.currentUser as API.CurrentUser, refreshCurrentUser };
}