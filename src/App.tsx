import Canciones from "./components/Canciones";
import '@mantine/core/styles.css';
import { AppShell, Burger, Group, MantineProvider } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Albumes from "./components/Albumes";
import { BrowserRouter, Routes, Route, NavLink } from "react-router";
import Login from "./components/Login";
import React, { useState } from "react";
import ReactPlayer from "react-player";
import ListaReproducciones from "./components/ListaReproducciones";

type Usuario={
    id: number
    username: string
    email: string
}

type ContextoUsuarioType = {
  usuario: Usuario | null,
  token: string | null,
  setUsuario: (_usuario:Usuario | null) => void
  setToken: (token:string | null) => void
}

type Cancion = {
  id: number;
    album: number;
    nombre: string;
    duracion: number;
    genero: string;
    colaboradores: number[];
    url: string;
}

type ContextoCancionType = {
  cancion: Cancion | null,
  setCancion: (cancion:Cancion | null) => void
}

type ListaReproduccion={

  id: number;
  nombre: string;
  usuario: Usuario;
  canciones: Cancion[];
}

type ContextoListaType={

  lista: ListaReproduccion | null,
  setLista: (lista:ListaReproduccion | null) => void
}

export const contLista=React.createContext<ContextoListaType>({
  lista: null,
  setLista: (_lista:ListaReproduccion | null) => {}

});

export const contUsuario=React.createContext<ContextoUsuarioType>({
  usuario: null,
  token: '',
  setUsuario: (_usuario:Usuario | null) => {},
  setToken: (_token:string | null) => {}
});

export const contCancion=React.createContext<ContextoCancionType>({
  cancion: null,
  setCancion: (_cancion:Cancion | null) => {}
});


function App() {

  const [opened, { toggle }] = useDisclosure();
  const [usuario, setUsuario]=useState<Usuario | null>(null);
  const [token, setToken]=useState<string | null>(null);
  const [lista, setLista]=useState<ListaReproduccion | null>(null);
  const setUsuarioContext = (usuario: Usuario | null) => {
    setUsuario(usuario)
  }
  const setTokenContext = (token: string | null) => {
    setToken(token)
  }

  const setListaContext = (lista: ListaReproduccion | null) => {
    setLista(lista)
  }

  const [cancionSelect, setCancionSelect] = useState<Cancion | null>(null);
  const setCancionContext=(cancion: Cancion | null) => {
    setCancionSelect(cancion)
  }
  let userContext1: ContextoUsuarioType={
    'usuario': usuario,
    'token': token,
    'setUsuario': setUsuarioContext,
    'setToken': setTokenContext
  };
  let cancionContext1: ContextoCancionType={
    'cancion': null,
    'setCancion': setCancionContext};

  let listaContext1: ContextoListaType={
    'lista': null,
    'setLista': setListaContext};

  return (
    <contUsuario.Provider value={userContext1}>
      <contCancion.Provider value={cancionContext1}>
        <contLista.Provider value={listaContext1}>
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
                {usuario?.username}
                
              </Group>
              
            </AppShell.Header>
            <AppShell.Navbar p="md">
              Seleccion
              <ul>
                <li>
                  <NavLink to="/">Canciones</NavLink>
                </li>
                <li>
                  <NavLink to="albumes">Albumes</NavLink>
                </li>
                <li>
                  <NavLink to="listas">Listas</NavLink>
                </li>
              </ul>
            </AppShell.Navbar>
            <AppShell.Main>
              <Routes>
                <Route index element={<Canciones />} />
                <Route path="albumes" element={<Albumes />} />
                <Route path="listas" element={<ListaReproducciones />} />
              </Routes>
            </AppShell.Main>
              <AppShell.Footer p="md">{cancionSelect && <ReactPlayer url={cancionSelect.url} />}</AppShell.Footer>
            </AppShell>
          </MantineProvider>
        </BrowserRouter>
        </contLista.Provider>
      </contCancion.Provider>
          

    </contUsuario.Provider>
        
    
  )
}

export default App;