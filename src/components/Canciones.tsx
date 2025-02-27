import { useContext, useEffect, useState } from "react";
import { Button } from '@mantine/core';
import { Table } from '@mantine/core';
import { contCancion } from "../App";

type Cancion = {
    id: number;
    album: number;
    nombre: string;
    duracion: number;
    genero: string;
    colaboradores: number[];
    url: string;
}

type Album = {
    id: number;
    artista: number;
    nombre: string;
    anio: number;
}



function Canciones(){
    const can=useContext(contCancion);
    const [canciones, setCancion]=useState<Cancion[]>([]);
    const [albumes, setAlbum]=useState<Album[]>([]);
    useEffect(()=>{
        fetch("http://localhost:8000/canciones/").then(response=>response.json()).then(data=>{
            setCancion(data)
        });
        fetch("http://localhost:8000/albumes/").then(response=>response.json()).then(data=>{
            setAlbum(data)
        })
    },[]);

    const obtenerAlbum = (cancion: Cancion) => {
        for(const album of albumes){
            if(cancion.album==album.id){
                return album;
            }
        }

        return null;
    }
    
    return (
        <>
            <Table>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>ID</Table.Th>
                        <Table.Th>Nombre</Table.Th>
                        <Table.Th>Album</Table.Th>
                        <Table.Th>Reproduccion</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody >
                {canciones.map(cancion=>
                    <Table.Tr key={cancion.id}>
                        <Table.Th>{cancion.id}</Table.Th>
                        <Table.Td>{cancion.nombre}</Table.Td>
                        <Table.Td>{obtenerAlbum(cancion)?.nombre}</Table.Td>
                        <Table.Td><Button variant="outline" color="lime" onClick={()=>can.setCancion(cancion)}>Reproducir</Button></Table.Td>
                    </Table.Tr>)}
                </Table.Tbody>
            </Table>
        </>
    )
}




export default Canciones