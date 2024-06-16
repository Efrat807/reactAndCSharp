
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css'
import Users from './Components/Users/Users'
// import UserCard from './Components/User/UserCard';
import EditUser from './Components/EditUser/EditUser';
function App() {

  return (
		<>
			<Routes>
				{/* <Router> */}
				<Route path="/" element={<Users />} />
				<Route path="/userCard/:id" element={<EditUser />} />
				<Route path="/userCard" element={<EditUser />} />
				{/* </Router> */}
			</Routes>
		</>
	);
}

export default App
