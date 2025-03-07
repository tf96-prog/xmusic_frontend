import { useContext } from "react"
import AlbumNuevo from "./AlbumNuevo";
import { contAlbum } from "../App";

export type Album = {
    id: number;
    artista: number;
    nombre: string;
    anio: number;
}


function Albumes(){

    const album=useContext(contAlbum);
    return(
        <>
            <div>
                <h1>Albumes</h1>
                {album.album.map(album=><li key={album.id}>{album.nombre}</li>)}
                <AlbumNuevo/>
            </div>
        </>
    );
}

export default Albumes