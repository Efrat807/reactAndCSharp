import { Route, Routes } from 'react-router-dom';
import './App.css';
import Users from './Components/Users/Users';
// import UserCard from './Components/User/UserCard';
import EditUser from './Components/EditUser/EditUser';
import UserCard from './Components/User/UserCard';
function App() {
	return (
		<Routes>
			<Route path="/" element={<Users />} />
			<Route path="/userCard/:id" element={<UserCard />}></Route>
			<Route path="/createUpdateUser/:id" element={<EditUser />}></Route>
			<Route path="/createUpdateUser" element={<EditUser />} />
		</Routes>
	);
}

export default App;
