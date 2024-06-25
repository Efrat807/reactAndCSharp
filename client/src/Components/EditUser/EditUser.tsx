import { Formik, Form } from 'formik';
import { IUser } from '../../ApiService/Interfaces/IUser';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, TextField } from '@mui/material';
import classes from './EditUser.module.scss';
import { ChangeEvent } from 'react';
import {
	updateRQCacheAfterCreate,
	updateRQCacheAfterUpdate,
	useGetUserById,
	useUser,
} from '../../ApiService/Requests/UseUser';
import anonymousUserImg from '../../assets/anonymousUserImg.jpg';
import { USER_QUERY_KEY } from '../../ApiService/Requests/QueryKeys';
import { queryClient } from '../../Utils/ReactQueryConfig';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const EditUser = () => {
	const { id } = useParams<{ id: string }>();
	const { updateUser, createUser } = useUser();
	const { user } = useGetUserById(id || '');
	const navigate = useNavigate();

	const initialUserValues: IUser = {
		...(user && !Array.isArray(user)
			? user
			: {
					domain: '',
					email: '',
					firstName: '',
					lastName: '',
					image: '',
					phone: '',
			  }),
	};

	const onSubmit = (values: IUser) => {
		id
			? updateUser(values, {
					onSuccess: (updatedUser) => {
						updateRQCacheAfterUpdate(
							updatedUser,
							queryClient,
							`${USER_QUERY_KEY}/${id}`
						);
						updateRQCacheAfterUpdate(updatedUser, queryClient, USER_QUERY_KEY);
						navigate(`/userCard/${updatedUser.userId}`)
					},
			  })
			: createUser(values, {
					onSuccess: (createdUser) => {
						console.log(createdUser, 'created user');

						updateRQCacheAfterCreate(createdUser, queryClient, USER_QUERY_KEY);
						navigate(`/userCard/${createdUser.userId}`)
					},
			  });
	};

	return (
		<div className={classes.userCard}>
			<div className={classes.title}>
				<h2 className={classes.titleText}>Edit User</h2>
				<Button
					onClick={() => {
						navigate(`/userCard/${id}`);
					}}
					style={{ color: 'black', marginTop: '19px' }}
				>
					<ArrowForwardIosIcon />
				</Button>
			</div>
			<div className={classes.userBody}>
				<img
					src={user ? user.image || anonymousUserImg : anonymousUserImg}
					className={classes.profileImg}
				/>
				<Formik
					initialValues={initialUserValues}
					onSubmit={onSubmit}
					enableReinitialize
				>
					{(formik) => (
						<Form className={classes.form}>
							<TextField
								label="first name"
								name="firstName"
								value={formik.values.firstName}
								onChange={(event: ChangeEvent<HTMLInputElement>) =>
									formik.setFieldValue('firstName', event.target.value)
								}
							/>
							<TextField
								label="last name"
								name="lastName"
								value={formik.values.lastName}
								onChange={(event: ChangeEvent<HTMLInputElement>) =>
									formik.setFieldValue('lastName', event.target.value)
								}
							/>
							<TextField
								label="phone"
								name="phone"
								value={formik.values.phone}
								onChange={(event: ChangeEvent<HTMLInputElement>) =>
									formik.setFieldValue('phone', event.target.value)
								}
							/>
							<TextField
								label="email"
								name="email"
								value={formik.values.email}
								onChange={(event: ChangeEvent<HTMLInputElement>) =>
									formik.setFieldValue('email', event.target.value)
								}
							/>
							<TextField
								label="domain"
								name="domain"
								value={formik.values.domain}
								onChange={(event: ChangeEvent<HTMLInputElement>) =>
									formik.setFieldValue('domain', event.target.value)
								}
							/>
							<Button type="submit">save</Button>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
};

export default EditUser;
