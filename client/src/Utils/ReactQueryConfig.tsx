import { AxiosRequestConfig } from 'axios';
import { QueryClient } from 'react-query';
import apiClient from '../ApiService/http-common';

const Minute = 60 * 1000;

export type FetchMethod = 'Post' | 'Patch' | 'Put' | 'Delete';

interface IMutation<TData> {
	path: string;
	method: FetchMethod;
	data: TData;
	headers?: AxiosRequestConfig['headers'];
}

const mutateFunction = async (variables: unknown) => {
	const { method, path, data, headers } = variables as IMutation<unknown>;
	const requestHeaders: AxiosRequestConfig['headers'] = {
		Accept: 'application/json',
		...headers,
	};

	if (!(data instanceof FormData)) requestHeaders['content-type'] = 'application/json';

	const { data: updatedData } = await apiClient({
		url: `${path}`,
		method,
		data,
		headers: requestHeaders,
	});

	return updatedData;
};

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchInterval: Minute,
			refetchIntervalInBackground: false,
			retryOnMount: false,
			refetchOnReconnect: false,
			refetchOnWindowFocus: false,
			refetchOnMount: false,
			retry: 3,
			retryDelay: 1000,
			staleTime: 1 * Minute,
			cacheTime: 24 * 60 * Minute,
		},
		mutations:  {mutationFn: mutateFunction} ,
	},
});
