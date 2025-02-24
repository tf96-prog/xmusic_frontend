import Canciones from "./components/Canciones";
import '@mantine/core/styles.css';
import { AppShell, Burger, Group, MantineProvider } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Albumes from "./components/Albumes";
import { BrowserRouter, Routes, Route, NavLink } from "react-router";
import Login from "./components/Login";

function App() {

  const [opened, { toggle }] = useDisclosure();
  
  return (
    
    <BrowserRouter>
      <MantineProvider>
          <AppShell
        header={{ height: 60 }}
        footer={{ height: 60 }}
        navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
        aside={{ width: 300, breakpoint: 'md', collapsed: { desktop: false, mobile: true } }}
        padding="md"
      >
        <AppShell.Header>
          <Group h="100%" px="md">
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
            <Login/>
          </Group>
          
        </AppShell.Header>
        <AppShell.Navbar p="md">
          Navbar
          <ul>
            <li>
              <NavLink to="/">Canciones</NavLink>
            </li>
            <li>
              <NavLink to="albumes">Albumes</NavLink>
            </li>
          </ul>
        </AppShell.Navbar>
        <AppShell.Main>
          <Routes>
            <Route index element={<Canciones />} />
            <Route path="albumes" element={<Albumes />} />
          </Routes>
        </AppShell.Main>
        <AppShell.Aside p="md">Aside</AppShell.Aside>
          <AppShell.Footer p="md">Footer</AppShell.Footer>
        </AppShell>
      </MantineProvider>
    </BrowserRouter>
    
  )
}

export default App





