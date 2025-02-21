import Listado from "./components/Listado";
import '@mantine/core/styles.css';
import { AppShell, Burger, Group, Skeleton, MantineProvider } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

function App() {

  const [opened, { toggle }] = useDisclosure();
  
  return (
    <>
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
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        Navbar
        {Array(15)
          .fill(0)
          .map((_, index) => (
            <Skeleton key={index} h={28} mt="sm" animate={false} />
          ))}
      </AppShell.Navbar>
      <AppShell.Main>
        <Listado/>
      </AppShell.Main>
      <AppShell.Aside p="md">Aside</AppShell.Aside>
      <AppShell.Footer p="md">Footer</AppShell.Footer>
    </AppShell>
    </MantineProvider>
    </>
    
  )
}

export default App





