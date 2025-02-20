import Canciones from "./components/Canciones";
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';

function App() {
  
  return (
    <>
      <MantineProvider><Canciones /></MantineProvider>
    </>
    
  )
}

export default App
