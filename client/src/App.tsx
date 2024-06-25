import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Users from './Components/Users/Users';
// import UserCard from './Components/User/UserCard';
import EditUser from './Components/EditUser/EditUser';
import UserCard from './Components/User/UserCard';
import { useRecoilValue } from 'recoil';
import { IsEditingAtom } from './Atoms/Atoms';
function App() {
	const isEditingAtom = useRecoilValue(IsEditingAtom);
	
	return (
		// <Router>
		<Routes>
			<Route path="/" element={<Users />} />
			<Route
				path="/userCard/:id"
				element={isEditingAtom ? <EditUser /> : <UserCard />}
			></Route>
			<Route path="/userCard" element={<EditUser />} />
		</Routes>
		// </Router>
	);
}

export default App;
