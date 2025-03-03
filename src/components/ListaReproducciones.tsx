import { useContext, useEffect, useState } from "react";
import { contUsuario } from "../App";
import { Button, Popover, Text } from "@mantine/core";

type ListaReproduccion={

    id: number;
    nombre: string;
    usuario: Usuario;
    canciones: Cancion[];
}

type Usuario={
    id: number
    username: string
    email: string
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


function ListaReproduccion(){
    const user=useContext(contUsuario);
    const [listas,setLista]=useState<ListaReproduccion[]>([]);
    useEffect(()=>{
        if(user.token != null){
            fetch("http://localhost:8000/listas/",{headers:{'Authorization':'Token ' + user.token}}).then(response=>response.json()).then(data=>{
                setLista(data)
            });
        }
    },[])

    if(user.token == null){
        return(
            <>
                <Popover width={200} position="bottom" withArrow shadow="md">
                    <Popover.Target>
                        <Button>Ver tus listas</Button>
                    </Popover.Target>
                    <Popover.Dropdown>
                        <Text size="xs">Registrate para acceder a tus listas</Text>
                    </Popover.Dropdown>
                </Popover>
            
            </>
        )
        
    }else{

        return(
            <>
                <div>
                    <h1>Listas</h1>
                    {listas.map(lista=><li key={lista.id}>{lista.nombre}</li>)}
                </div>
            </>
        );

    }

    

}

export default ListaReproduccion