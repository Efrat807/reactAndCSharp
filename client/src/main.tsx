import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { QueryClientProvider } from 'react-query';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { queryClient } from './Utils/ReactQueryConfig.tsx';
import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<BrowserRouter>
			<QueryClientProvider client={queryClient}>
				<App />
				{/* <ReactQueryDevtools client={queryClient}/> */}
			</QueryClientProvider>
		</BrowserRouter>
	</StrictMode>
);
