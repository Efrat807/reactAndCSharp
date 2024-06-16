import axios from 'axios';
// import process from 'process';

const apiClient = axios.create({
	baseURL: 'https://localhost:7196/',
	// baseURL: `${process.env.REACT_APP_SERVER_URL}/`,
	withCredentials: true,
	headers: {
		'Content-Type': 'application/json',
	},
});

export default apiClient;
