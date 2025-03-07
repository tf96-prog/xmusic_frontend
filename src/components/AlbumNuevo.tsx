import { Button, Group, Modal, Select, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useContext } from "react";
import { useCookies } from "react-cookie";
import { contAlbum, contArtista } from "../App";

type FormValues = {
    artista: number;
    nombre:string;
    anio: number;
}

type Art={
    value: string;
    label: string;
}



function AlbumNuevo(){

    const form = useForm({
            mode: 'uncontrolled',
            initialValues: {
                artista: 0,
                nombre: '',
                anio: 0
            }
    });

    

    const [opened, { open, close }] = useDisclosure(false);
    const [cookie]=useCookies(['token']);
    const artist=useContext(contArtista);
    const alb=useContext(contAlbum);
    const crearAlbum=(values: FormValues)=>{

        let al={"artista": values.artista, "nombre": values.nombre,"anio": values.anio};
        let json=JSON.stringify(al);
        fetch("http://localhost:8000/albumes/",{method:"POST",body:json, headers: {'Content-Type': 'application/json','Authorization':'Token ' + cookie.token}})
        .then(res => res.json())
        .then(data => {
            console.log(data)
            alb.setAlbumSolo(data)
            close()
        });
    }
    
    let losArtistas: Art[]=[];
    artist.artista?.forEach((art,ind,artistas)=>{
        let art1={"value":art.id.toString(), "label": art.nombre}
        losArtistas.push(art1)
        
    });

    return(
        <>
        <Modal opened={opened} onClose={close} title="Crear Album Nuevo">
                <form onSubmit={form.onSubmit(crearAlbum)}>
                    <Select
                    label="Artista"
                    placeholder="Selecciona artista"
                    data={losArtistas}
                    key={form.key('artista')}{...form.getInputProps('artista')}/>
                    <TextInput label="Nombre" withAsterisk description="Nombre del album" placeholder="Album" key={form.key('nombre')}{...form.getInputProps('nombre')}/>
                    <TextInput label="Anio" withAsterisk description="Anio del album" placeholder="Anio" key={form.key('anio')}{...form.getInputProps('anio')}/>
                    <Group justify="flex-end" mt="md">
                        <Button type="submit">Crear</Button>
                    </Group>
                </form>
        </Modal>
        <Button variant="filled" color="cyan" size="md" radius="md" onClick={open}>Crear Album</Button>
        </>
    )

    
    
}

export default AlbumNuevo