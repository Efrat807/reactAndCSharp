import { IUser } from '../../ApiService/Interfaces/IUser';
import { ColDef, ICellRendererParams } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import './Users.module.scss';
import { useNavigate } from 'react-router-dom';
import { useGetAllUsers, useUser } from '../../ApiService/Requests/UseUser';
import { Button } from '@mui/material';
import { IsEditingAtom } from '../../Atoms/Atoms';
import { useSetRecoilState } from 'recoil';

const Users = () => {
	const { users, isLoading, error } = useGetAllUsers();
	const { deleteUser } = useUser();
	const setIsEditingAtom = useSetRecoilState(IsEditingAtom);
	// const { GetAll } = useReactQuery();
	// const { data, error, isLoading } = GetAll('/User', true, 'users');

	const navigate = useNavigate();

	const columnDefs: ColDef[] = [
		{ headerName: 'firstName', field: 'firstName' },
		{ headerName: 'lastName', field: 'lastName' },
		{ headerName: 'Phone', field: 'phone' },
		{ headerName: 'Email', field: 'email' },
		{ headerName: 'Domain', field: 'domain' },
		{
			headerName: 'Delete',
			cellRenderer: (params: ICellRendererParams<IUser>) => (
				<Button onClick={() => deleteUser(params.data?.userId || '')}>X</Button>
			),
		},
	];

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>Error: {(error as Error).message}</div>;

	return (
		<div className="ag-theme-alpine" style={{ height: 800, width: 1300 }}>
			<Button
				onClick={() => {
					// setIsEditingAtom(true);
					navigate('/userCard');
				}}
			>
				create new user
			</Button>
			<h5>Bradford Prohaska</h5>
			<AgGridReact<IUser>
				rowData={users}
				columnDefs={columnDefs}
				defaultColDef={{ sortable: true, filter: true }}
				onRowDoubleClicked={(params) =>
					navigate(`/userCard/${params.data?.userId}`)
				}
			/>
		</div>
	);
};
export default Users;
