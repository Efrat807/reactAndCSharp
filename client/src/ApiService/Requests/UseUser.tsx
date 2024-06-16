import { AxiosRequestConfig } from 'axios';
import { IUser } from '../Interfaces/IUser';
import {
	QueryClient,
	QueryOptions,
	UseMutationOptions,
	useMutation,
	useQuery,
} from 'react-query';
import { queryClient } from '../../Utils/ReactQueryConfig';
import { USER_QUERY_KEY } from './QueryKeys';
import apiClient from '../http-common';

// export const fetchUsers = async (): Promise<IUser[]> => {
// 	const response = await axios.get<IUser[]>('https://localhost:7196/User');
// 	return response.data;
// };
export type FetchMethod = 'Post' | 'Patch' | 'Put' | 'Delete';

interface IMutation<TData> {
	path: string;
	method: FetchMethod;
	data: TData;
	headers?: AxiosRequestConfig['headers'];
}
export const useGetAllUsers = (options?: QueryOptions<IUser[]>) => {
	const { data: users, ...queryInfo } = useQuery<IUser[]>({
		queryKey: [USER_QUERY_KEY],
		queryFn: async ({ queryKey: [USER_QUERY_KEY] }) => {
			const { data } = await apiClient.get<IUser[]>(`${USER_QUERY_KEY}`);
			return data;
		},
		...options,
	});
	return { users, ...queryInfo };
};
function compareObjects(oldQueryData: unknown, newQueryData: unknown) {
	if (oldQueryData === newQueryData) {
		const errorMsg =
			'The object you supplies to the create/update/delete React Query cache are the same objects!\nYou probably changed a data object manually instead of updating react query cache';
		// eslint-disable-next-line no-console
		console.error(errorMsg);
		throw Error(errorMsg);
	}
}
export const updateRQCacheAfterUpdate = (
	UpdatedData: any,
	queryClient: QueryClient,
	queryKey: string
) => {
	queryClient.setQueryData([queryKey], (oldData: any) => {
		compareObjects(oldData, UpdatedData);

		return Array.isArray(oldData)
			? oldData?.map((data: any) =>
					data.userId === UpdatedData.userId ? UpdatedData : data
			  )
			: UpdatedData;
	});
};

export const updateRQCacheAfterCreate = <T,>(
	createdData: T,
	queryClient: QueryClient,
	queryKey: string
) => {
	queryClient.setQueryData<T[] | T>([queryKey], (oldData) => {
		compareObjects(oldData, createdData);
		if (!Array.isArray(oldData)) return createdData;
		if (Array.isArray(oldData)) return [...oldData, createdData];

		return [];
	});
};
export const useUser = () => {
	const { mutate: UpdateUser, ...updateMutateInfo } = useMutation<
		IUser,
		unknown,
		IMutation<IUser>
	>({});
	const { mutate: CreateUser, ...createMutateInfo } = useMutation<
		IUser,
		unknown,
		IMutation<IUser>
	>({});

	const { mutate: DeleteUser, ...deleteMutateInfo } = useMutation<
		IUser,
		unknown,
		IMutation<IUser>
	>({});

	const createUser = (
		data: IUser,
		options?: UseMutationOptions<IUser, unknown, IMutation<IUser>>
	) => {
		CreateUser(
			{ method: 'Post', path: USER_QUERY_KEY, headers: {}, data },
			{
				onSuccess: (createdUser: IUser) => {
					updateRQCacheAfterCreate(createdUser, queryClient, USER_QUERY_KEY);
				},
				...options,
			}
		);
	};

	const updateUser = (
		data: IUser,
		options?: UseMutationOptions<IUser, unknown, IMutation<IUser>>
	) => {
		UpdateUser(
			{
				method: 'Put',
				path: `${USER_QUERY_KEY}?id=${data.userId}`,
				headers: {},
				data,
			},
			{
				onSuccess: (updatedUser) => {
					updateRQCacheAfterUpdate(
						updatedUser,
						queryClient,
						`${USER_QUERY_KEY}`
					);
				},
				...options,
			}
		);
	};

	const deleteUser = (
		id: string,
		options?: UseMutationOptions<unknown, unknown, IMutation<Partial<IUser>>>
	) => {
		DeleteUser(
			{
				method: 'Delete',
				path: `${USER_QUERY_KEY}?id=${id}`,
				headers: {},
				data: {
					firstName: '',
					lastName: '',
					email: '',
					phone: '',
					image: '',
					domain: '',
				},
			},
			{
				onSuccess: () => {
					console.log(`user in id: ${id} was deleted`);

					queryClient.invalidateQueries({ queryKey: [USER_QUERY_KEY] });
				},
				...options,
			}
		);
	};

	return {
		updateUser,
		updateMutateInfo,
		createUser,
		createMutateInfo,
		deleteUser,
		deleteMutateInfo,
	};
};
