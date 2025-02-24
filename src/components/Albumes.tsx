import { useEffect, useState } from "react"

type Album = {
    id: number;
    artista: number;
    nombre: string;
    anio: number;
}

function Albumes(){

    const [albumes,setAlbum]=useState<Album[]>([]);
    useEffect(()=>{fetch("http://localhost:8000/albumes/").then(response=>response.json()).then(data=>{
        setAlbum(data)
    });},[])
    return(
        <>
            <div>
                <h1>Albumes</h1>
                {albumes.map(album=><li key={album.id}>{album.nombre}</li>)}
            </div>
        </>
    );
}

export default Albumes