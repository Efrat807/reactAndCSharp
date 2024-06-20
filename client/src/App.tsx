import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Users from './Components/Users/Users';
// import UserCard from './Components/User/UserCard';
import EditUser from './Components/EditUser/EditUser';
import { useEffect, useState } from 'react';
import UserCard from './Components/User/UserCard';
function App() {
	const [isEditing, setIsEditing] = useState(false);
	const handleEdit = () => setIsEditing(true);
	const handleSave = () => setIsEditing(false);
	const handleCancel = () => setIsEditing(false);

	// useEffect(() => console.log(isEditing), [isEditing]);

	return (
		// <>
		// <Router>
		<Routes>
			<Route path="/" element={<Users />} />
			<Route
				path="/userCard/:id"
				element={isEditing ? <EditUser onSave={handleSave} onCancel={handleCancel} /> : <UserCard onEdit={handleEdit} />}
			></Route>
			<Route path="/userCard" element={<EditUser />} />
		</Routes>
		// </Router>
		// </>
	);
}

export default App;
