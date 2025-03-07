import { useEffect, useState } from "react";
import { Button, Popover, Text } from "@mantine/core";
import { useCookies } from "react-cookie";

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
    const [cookie]=useCookies(['token']);
    const [listas,setLista]=useState<ListaReproduccion[]>([]);
    useEffect(()=>{
        if(cookie.token != null){
            fetch("http://localhost:8000/listas/",{headers:{'Authorization':'Token ' + cookie.token}}).then(response=>response.json()).then(data=>{
                setLista(data)
                console.log(cookie)
            });
        }
    },[])

    if(cookie.token == null){
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