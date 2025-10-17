import { Toaster } from 'react-hot-toast';

// components
import AppRoutes from './components/AppRoutes/index';

function App() {
  return (
    <>
      {/* ------ All Routes ------ */}
      <AppRoutes />

      {/* ------ Toast ------ */}
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
