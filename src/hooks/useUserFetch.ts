import { useAppDispatch } from '@/utils/store/hooks';
import useApiQuerry from './useApiQuerry'
import { UserInfo, UserInfoB, userInfoMapper } from '@/models/UserInfo';
import { setUserId, setUserInfo } from '@/utils/store/features/userInfo/userInfoSlice';
import useValidateUser from './useValidateUser';
import { getDecodedToken } from '@/lib/tokenHandler';
import { useEffect } from 'react';
import { userInfoGetEP } from '@/lib/endPoints';

const useUserFetch = () => {

    const { validating, isValid, userId } = useValidateUser();
    const dispatch = useAppDispatch();
    const { data, error, loading } = useApiQuerry<UserInfoB>({ endPoint: userInfoGetEP(userId), condition: isValid });

    let userInfo: UserInfo = null;

    useEffect(() => {
        if (isValid) {
            const decodedtoken = getDecodedToken();
            dispatch(setUserId(decodedtoken.claims.userid))
        }
    }, [isValid, dispatch])


    if (data) {
        userInfo = userInfoMapper(data);
        const decodedtoken = getDecodedToken();
        dispatch(setUserInfo({ ...userInfo, profilePic: decodedtoken.picture, userId: userId }))
    }

    return { data: userInfo, error, loading: loading || validating }
}

export default useUserFetch;