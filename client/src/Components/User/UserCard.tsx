import { useParams } from 'react-router-dom';
import { useReactQuery } from '../../Hooks/useReactQuery';
import classes from './UserCard.module.scss';
import ModeOutlinedIcon from '@mui/icons-material/ModeOutlined';
import { Button } from '@mui/material';

const UserCard = () => {
	const { id } = useParams<{ id: string }>();
	const { GetAll } = useReactQuery();
	const { data: users } = GetAll('/User', true, 'Users');
	const user = users?.find((u) => u.userId == id);
	console.log(ModeOutlinedIcon);

	return (
		<div className={classes.card}>
			{user ? (
				<div>
					<img src={user.image} className={classes.profileImg} />
					<div className={classes.userName}>
						<span>{user.firstName} </span>
						<span>{user.lastName}</span>
						<Button>
							<ModeOutlinedIcon />
						</Button>
					</div>
					<hr />
					<div className={classes.bodyCard}>
						<p>domain: {user.domain}</p>
						<p>email: {user.email}</p>
						<p>phone: {user.phone}</p>
					</div>
				</div>
			) : (
				<div>Loading...</div>
			)}
		</div>
	);
};

export default UserCard;
