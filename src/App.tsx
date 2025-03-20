import Canciones from "./components/Canciones";
import '@mantine/core/styles.css';
import { AppShell, Burger, Group, MantineProvider } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Albumes from "./components/Albumes";
import { BrowserRouter, Routes, Route, NavLink } from "react-router";
import Login from "./components/Login";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import ListaReproducciones from "./components/ListaReproducciones";
import { CookiesProvider, useCookies } from 'react-cookie';
import Logout from "./components/Logout";
import Artistas from "./components/Artistas";

type Usuario={
    id: number
    username: string
    email: string
}

type ContextoUsuarioType = {
  usuario: Usuario | null,
  setUsuario: (_usuario:Usuario | null) => void
}

type Artista={

  id: number
  nombre: string
}

type ContextoArtistaType={
  artista: Artista[],
  setArtista: (artista:Artista[])=>void
}


type Album={

  id: number
  artista: number
  nombre: string
  anio: number
}

type ContextoAlbumType={
  album: Album[],
  setAlbumSolo: (album:Album)=>void
  setAlbum: (album:Album[])=>void
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
  setCancionSolo: (cancion:Cancion)=>void,
  setCancion: (cancion:Cancion | null) => void
}

export const contUsuario=React.createContext<ContextoUsuarioType>({
  usuario: null,
  setUsuario: (_usuario:Usuario | null) => {}
});

export const contAlbum=React.createContext<ContextoAlbumType>({
  album: [],
  setAlbumSolo: (_album:Album) => {},
  setAlbum: (_album:Album[]) => {}
});

export const contCancion=React.createContext<ContextoCancionType>({
  cancion: null,
  setCancionSolo: (cancion:Cancion) => {},
  setCancion: (_cancion:Cancion | null) => {}
});

export const contArtista=React.createContext<ContextoArtistaType>({
  artista: [],
  setArtista: (_artista: Artista[]) => {}
});



function App() {

  const [opened, { toggle }] = useDisclosure();
  const [usuario, setUsuario]=useState<Usuario | null>(null);
  const [cookie]=useCookies(['token']);
  const setUsuarioContext = (usuario: Usuario | null) => {
    setUsuario(usuario)
  }
  
  const [cancionSelect, setCancionSelect] = useState<Cancion | null>(null);
  const setCancionContext=(cancion: Cancion | null) => {
    setCancionSelect(cancion)
  }

  const [album,setAlbumes]=useState<Album[]>([]);
  const setAlbumContext=(album: Album[]) => {
    setAlbumes(album)
  }

  const [cancion,setCanciones]=useState<Cancion[]>([]);
  const setCancion_Context=(cancion: Cancion[]) => {
    setCanciones(cancion)
  }

  const setAlbumSoloContext=(albumSolo: Album) => {
    const newAlbumes = [
      ...album,
      albumSolo
    ]
    setAlbumes(newAlbumes)
  }


  const setCancionSoloContext=(cancionSolo: Cancion) => {
    const newCanciones = [
      ...cancion,
      cancionSolo
    ]
    setCanciones(newCanciones)
  }

  let userContext1: ContextoUsuarioType={
    'usuario': usuario,
    'setUsuario': setUsuarioContext
  };
  
  let cancionContext1: ContextoCancionType={
    'cancion': null,
    'setCancionSolo': setCancionSoloContext,
    'setCancion': setCancionContext
  };

  let albumContext1: ContextoAlbumType={
    'album': album,
    'setAlbumSolo': setAlbumSoloContext,
    'setAlbum': setAlbumContext
  };

  useEffect(()=>{
          if(cookie.token){
  
              fetch('http://localhost:8000/usuarios/yo/',{headers: {'Authorization':'Token ' + cookie.token}}).then(res=>res.json()).then(usuario=>{
  
                  setUsuario(usuario)
              })
          }
  },[]);
  const [artistas, setArtistas]=useState<Artista[]>([]);
  const setArtistaContext=(artista: Artista[]) => {
    setArtistas(artista)
  }
    

  let artistaContext1: ContextoArtistaType={
    'artista': artistas,
    'setArtista': setArtistaContext
  };

  useEffect(()=>{
    fetch("http://localhost:8000/artistas/").then(res=>res.json().then(data=>{
        setArtistas(data)
    }))
},[]);


    useEffect(()=>{fetch("http://localhost:8000/albumes/").then(response=>response.json()).then(data=>{
      setAlbumes(data)
    });},[]);
  return (
    <CookiesProvider defaultSetOptions={{ path: '/' }}>
      <contUsuario.Provider value={userContext1}>
        <contAlbum.Provider value={albumContext1}>
          <contCancion.Provider value={cancionContext1}>
            <contArtista.Provider value={artistaContext1}>
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
                        {cookie.token? <Logout/>:<Login/>}
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
                          <NavLink to="artistas">Artistas</NavLink>
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
                      <Route path="artistas" element={<Artistas/>}/>
                      <Route path="albumes" element={<Albumes />} />
                      <Route path="listas" element={<ListaReproducciones />} />
                    </Routes>
                  </AppShell.Main>
                    <AppShell.Footer p="md">{cancionSelect && <ReactPlayer url={cancionSelect.url} />}</AppShell.Footer>
                  </AppShell>
                </MantineProvider>
              </BrowserRouter>
            </contArtista.Provider>
        </contCancion.Provider>
        </contAlbum.Provider>
      </contUsuario.Provider>
    </CookiesProvider>
    
  )
}

export default App;