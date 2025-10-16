// components
import AppRoutes from './components/AppRoutes/index';
import Login from './pages/Login';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
      {/* ------ All Routes ------ */}
      <AppRoutes />
      {/* Temporary test - uncomment to test Login component directly */}
      {/* <Login /> */}

      {/* ------ Toast, Skeleton Loader Etc. ------ */}
      <Toaster
        position='top-right'
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
        }}
      />
    </>
  );
}

export default App;
