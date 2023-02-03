import { RouterProvider } from 'react-router-dom';
import router from './Routes/Routes';
import './App.css';
import { useContext } from 'react';
import { ThemeContext } from './Context';

function App() {
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;

  return (
    <div
      style={{
        backgroundColor: darkMode ? "#222" : "white",
        color: darkMode && "white",
      }}
    >
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
