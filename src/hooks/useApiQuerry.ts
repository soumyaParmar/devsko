"use client"
import { getConfigHeader } from '@/helpers/getConfigHeader'
import { baseUrl as constBaseUrl } from '@/lib/constString'
import { validateToken } from '@/lib/tokenHandler'
import { Response } from '@/utils/types'
// import { validateToken } from '@/lib/tokenHandler'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { useEffect, useState } from 'react'

interface ApiQuerryProps {
    baseUrl?: string,
    endPoint: string,
    dependencies?: Array<unknown>,
    condition?: boolean
}

const useApiQuerry = <T,>({ baseUrl = constBaseUrl, endPoint, dependencies = [], condition = true }: ApiQuerryProps) => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<AxiosError | null>(null);

    useEffect(() => {
        if (condition) {
            validateToken()
            setLoading(true);
            const baseApiUrl = `${baseUrl}`

            const handleResponse = (res: Response<T>) => {
                if (res.success) {
                    setData(res.data);
                }
            }

            const apiCall = async () => {
                const config = getConfigHeader();
                try {
                    const response: AxiosResponse<unknown, unknown> = await axios.get(`${baseApiUrl}${endPoint}`, { headers: config });
                    const responseData = response.data as Response<T>;
                    if (responseData) {
                        handleResponse(responseData);
                    }
                } catch (error) {
                    console.error("Some error occured in fetcching data:", error);
                    const _error = error as AxiosError;
                    setError(_error)
                    return null;
                } finally {
                    setLoading(false)
                }
            };
            apiCall();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [baseUrl, endPoint, ...dependencies, condition])


    return { data, loading, error }
}

export default useApiQuerry