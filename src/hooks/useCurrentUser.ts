import { history, useModel } from 'umi';
import { getCurrentUserInfo } from '@/services/user';

const fakeUser: API.CurrentUser = {
    id: 0,
    username: '',
    avatar: '',
    gender: 'unknown',
    phone: ''
}

export const useCurrentUser = () => {
    const { initialState, setInitialState } = useModel('@@initialState');

    const refreshCurrentUser = async () => {
        try {
            setInitialState({ ...initialState!, currentUser: await getCurrentUserInfo() });
        } catch (error) {
            setInitialState({ ...initialState!, currentUser: undefined });
        }
    }

    return { currentUser: initialState?.currentUser, refreshCurrentUser };
}

export const useCurrentUserOrGoToLogin = (): { currentUser: API.CurrentUser, refreshCurrentUser: () => Promise<any> } => {
    const { currentUser, refreshCurrentUser } = useCurrentUser();
    if (!currentUser) {
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
    return { currentUser, refreshCurrentUser };
}