import { Button, Group, Modal, Select, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useContext } from "react";
import { useCookies } from "react-cookie";
import { contAlbum, contArtista, contCancion } from "../App";

type FormValues = {
    album: number;
    nombre: string;
    duracion: number;
    genero:string;
    colaboradores: number;
    url: string;
}

type Alb={
    value: string;
    label: string;
}

type Col={
    value: string;
    label: string;
}

function CancionNueva(){

    const form = useForm({
                mode: 'uncontrolled',
                initialValues: {
                    album: 0,
                    nombre: '',
                    duracion: 0,
                    genero: '',
                    colaboradores:0,
                    url: ''
                }
    });

    const [opened, { open, close }] = useDisclosure(false);
    const [cookie]=useCookies(['token']);
    const artist=useContext(contArtista);
    const albu=useContext(contAlbum);
    const can=useContext(contCancion);
    const crearCancion=(values: FormValues)=>{

        let ca={"album": values.album, "nombre": values.nombre,"duracion": values.duracion, "genero":values.genero, "colaboradores": values.colaboradores, "url": values.url};
        let json=JSON.stringify(ca);
        fetch("http://localhost:8000/canciones/",{method:"POST",body:json, headers: {'Content-Type': 'application/json','Authorization':'Token ' + cookie.token}})
        .then(res => res.json())
        .then(data => {
            console.log(data)
            can.setCancionSolo(data)
            close()
        });
    }


    let losAlbumes: Alb[]=[];
    albu.album?.forEach((alb,ind,albumes)=>{
        let alb1={"value":alb.id.toString(), "label": alb.nombre}
        losAlbumes.push(alb1)
        
    });

    let losColaboradores: Col[]=[];
    artist.artista?.forEach((art,ind,artistas)=>{
        let art1={"value":art.id.toString(), "label": art.nombre}
        losAlbumes.push(art1)
        
    });



    return (
        <>
            <Modal opened={opened} onClose={close} title="Crear Album Nuevo">
                            <form onSubmit={form.onSubmit(crearCancion)}>
                                <Select
                                label="Album"
                                placeholder="Selecciona album"
                                data={losAlbumes}
                                key={form.key('album')}{...form.getInputProps('album')}/>
                                <TextInput label="Nombre" withAsterisk description="Nombre de la cancion" placeholder="Album" key={form.key('nombre')}{...form.getInputProps('nombre')}/>
                                <TextInput label="Duracion" withAsterisk description="Duracion de la cancion" placeholder="Duracion" key={form.key('duracion')}{...form.getInputProps('duracion')}/>
                                <TextInput label="Genero" withAsterisk description="Genero de la cancion" placeholder="Genero" key={form.key('genero')}{...form.getInputProps('genero')}/>
                                <Select
                                label="Colaboradores"
                                placeholder="Selecciona colaborador"
                                data={losColaboradores}
                                key={form.key('colaborador')}{...form.getInputProps('colaboradores')}/>
                                <Group justify="flex-end" mt="md">
                                    <Button type="submit">Crear</Button>
                                </Group>
                            </form>
            </Modal>
            <Button variant="filled" color="cyan" size="md" radius="md" onClick={open}>Crear Cancion</Button>
        
        </>
    )

}

export default CancionNueva