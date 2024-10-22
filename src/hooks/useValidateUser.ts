"use client"
import { getDecodedToken, validateToken } from '@/lib/tokenHandler';
import { useEffect, useState } from 'react';
const useValidateUser = () => {
    const [validating, setValidating] = useState(true)
    const [isValid, setIsValid] = useState(false);
    const [userId, setUserId] = useState(null)

    useEffect(() => {
        const validate = async () => {
            setValidating(true)
            const _isValid = await validateToken();
            const decodedtoken = getDecodedToken();
            setUserId(decodedtoken.claims.userid);
            setIsValid(_isValid);
            setValidating(false)
        }
        validate();
    }, [])


    return { validating, isValid ,userId}
}

export default useValidateUser