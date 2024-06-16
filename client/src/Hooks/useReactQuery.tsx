import { useMutation, useQuery } from 'react-query';
import apiClient from '../ApiService/http-common';
import { IUser } from '../ApiService/Interfaces/IUser';
import { queryClient } from '../Utils/ReactQueryConfig';

export function useReactQuery() {
	const GetAll = (path: string, enabled?: boolean, queryKey: string = path) => {
		const { isLoading, data, error, isError } = useQuery<IUser[]>(
			queryKey,
			() => {
				return apiClient
					.get(path)
					.then((res) => res.data)
					.catch((error) => {
						return Promise.reject({ status: 'fail', message: error.message });
					});
			},
			{ enabled: enabled, onSuccess: ()=> queryClient.invalidateQueries({queryKey: ['User']}) }		
		);
		return { isLoading, data, error, isError };
	};

	const UpdateItem = useMutation(
		async (props: { path: string; item: Partial<IUser>; queryKey: string }) => {
			try {
				const res = await apiClient.patch(props.path, props.item);
				queryClient.invalidateQueries(
					{
						queryKey: 'User'
					},
				);
				return res;
			} catch (error) {
				return Promise.reject({ status: 'fail', message: error });
			}
		}
	);

	

	return { GetAll, UpdateItem };
}
