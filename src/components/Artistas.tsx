import { useContext } from "react"
import { contArtista } from "../App"




function Artistas(){
    const art=useContext(contArtista)
    return(
        <div>
            <h1>Artistas</h1>
            {art.artista.map(artista=><li key={artista.id}>{artista.nombre}</li>)}
        </div>

    )

}

export default Artistas