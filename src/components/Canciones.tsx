import { useEffect, useState } from "react";
import ReactPlayer from 'react-player'
import { Button } from '@mantine/core';

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
    
    return (
        <>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Reproduccion</th>
                    </tr>
                </thead>
                <tbody>
                    {cancionAsignada.map(cancion=> 
                    <tr key={cancion.id}>
                        <th scope="row">{cancion.id}</th>
                        <td>{cancion.nombre}</td>
                        <td><Button variant="outline" color="lime" onClick={()=>setCancionSeleccionada(cancion)}>Reproducir</Button></td>
                    </tr>)}
                </tbody>
            </table>
            <ReactPlayer url={urlCancion} />
        </>
    )
}
export default Canciones