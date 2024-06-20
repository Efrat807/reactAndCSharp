import { useNavigate, useParams } from 'react-router-dom';
import classes from './UserCard.module.scss';
import { Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useGetUserById } from '../../ApiService/Requests/UseUser';

const UserCard = ({ onEdit }: { onEdit: () => any }) => {
	const { id } = useParams<{ id: string }>();
	// const { GetAll } = useReactQuery();
	// const { data: users } = GetAll('/User', true, 'Users');
	// const user = users?.find((u) => u.userId == id);
	const navigate = useNavigate();
	const { user } = useGetUserById(id || '');
	
	return (
		<div className={classes.card}>
			<header>
				<h2 className={classes.titleText}>userCard</h2>
				<Button
					style={{ color: 'black', width: '5px' }}
					onClick={() => navigate('/')}
				>
					<ArrowForwardIosIcon />
				</Button>
			</header>
			{user ? (
				<div>
					<div>
						<img src={user.image} className={classes.profileImg} />
						<div className={classes.userName}>
							<span>{user.firstName} </span>
							<span>{user.lastName}</span>
							<Button onClick={() => onEdit()}>
								<EditIcon />
							</Button>
						</div>
						<hr />
						<div className={classes.bodyCard}>
							<p>domain: {user.domain}</p>
							<p>email: {user.email}</p>
							<p>phone: {user.phone}</p>
						</div>
					</div>
				</div>
			) : (
				<div>Loading...</div>
			)}
		</div>
	);
};

export default UserCard;
