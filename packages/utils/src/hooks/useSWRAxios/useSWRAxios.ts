import axios, { AxiosError, AxiosResponse } from 'axios';
import useSWR, { SWRConfiguration } from 'swr';
import { AxiosConfig, Return, SWRConfig } from './types';

const defaultSWRConfig = { revalidateOnMount: true, errorRetryCount: 5 };

/**
 * This react hook can be used to call the api using SWR and axios. SWR helps to cache the data. With SWR, components will get a stream of data updates constantly and automatically. And the UI will be always fast and reactive.
 *
 * @param {string | AxiosConfig} config can be either url or AxiosRequestConfig
 * @param {SWRConfig<Data, Error>} SWRConfig SWR config
 *
 * @returns {Return<Data, Error>} An object with data, response, request, isLoading and error
 */
export const useSWRAxios = <Data = unknown, Error = unknown, Config extends SWRConfiguration<Data, Error> = SWRConfiguration<Data, Error>>(
    config: string | AxiosConfig,
    { fallbackData, ...swrConfig }: SWRConfig<Data, Error> = {}
): Return<Data, Error, Config> => {
    const axiosConfig = typeof config === 'string' ? { url: config } : config;
    const {
        data: axiosSuccessResponse,
        error: axiosErrorResponse,
        ...swrResponse
    } = useSWR<AxiosResponse<Data>, AxiosError<Error>>(axiosConfig.url, () => axios(axiosConfig), {
        ...defaultSWRConfig,
        ...swrConfig,
        fallbackData: fallbackData && {
            status: 200,
            statusText: 'InitialData',
            config: axiosConfig,
            headers: {},
            data: fallbackData
        }
    });

    return {
        // @ts-ignore
        data: axiosSuccessResponse?.data,
        response: axiosSuccessResponse || axiosErrorResponse?.response,
        error: axiosErrorResponse?.response?.data,
        ...swrResponse
    };
};
