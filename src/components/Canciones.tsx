import { useEffect, useState } from "react";
import ReactPlayer from 'react-player'
import { Button } from '@mantine/core';
import { Table } from '@mantine/core';

type Cancion = {
    id: number;
    album: number;
    nombre: string;
    duracion: number;
    genero: string;
    colaboradores: number[];
    url: string;
}

function Canciones(){

    const [cancionAsignada, setCancion]=useState<Cancion[]>([]);
    const [cancionSeleccionada, setCancionSeleccionada] = useState<Cancion | null>(null);
    useEffect(()=>{fetch("http://localhost:8000/canciones/").then(response=>response.json()).then(data=>{
        setCancion(data)
    })},[cancionSeleccionada]);
    let urlCancion='';
    if(cancionSeleccionada!=null){
        urlCancion=cancionSeleccionada.url;
    }

    const elementosCanciones = cancionAsignada.map(cancion=> 
        <Table.Tr key={cancion.id}>
            <Table.Th>{cancion.id}</Table.Th>
            <Table.Td>{cancion.nombre}</Table.Td>
            <Table.Td><Button variant="outline" color="lime" onClick={()=>setCancionSeleccionada(cancion)}>Reproducir</Button></Table.Td>
        </Table.Tr>);
    return (
        <>
            <Table>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>ID</Table.Th>
                        <Table.Th>Nombre</Table.Th>
                        <Table.Th>Reproduccion</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {elementosCanciones}
                </Table.Tbody>
            </Table>
            <ReactPlayer url={urlCancion} />
        </>
    )
}
export default Canciones