import { Button,Modal,TextInput,PasswordInput,Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import { useContext } from "react";
import { contUsuario } from "../App";

type FormValues = {
    usuario: string;
    contrasenia: string;
}



function Login(){

    const user=useContext(contUsuario);

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
          usuario: '',
          contrasenia: '',
        }
      });

    const enviarInformacion= (values:FormValues)=>{
        let login={"username": values.usuario, "password": values.contrasenia};
        let json=JSON.stringify(login);
        fetch("http://localhost:8000/login/",{method:"POST",body:json, headers: {'Content-Type': 'application/json'}})
        .then(res => res.json())
        .then(data => {
            fetch('http://localhost:8000/usuarios/yo/',{headers: {'Authorization':'Token ' + data.token}})
            .then(res=>res.json())
            .then(usuario=>{
                user.setUsuario(usuario)
                user.setToken(data.token)
            })
                
                console.log(data)
            });
    }

    const [opened, { open, close }] = useDisclosure(false);
    

    return (
    <>
        <Modal opened={opened} onClose={close} title="Login">
        <form onSubmit={form.onSubmit(enviarInformacion)}>
            <TextInput label="Usuario" withAsterisk description="nombre del usuario que se registrara" placeholder="Nombre de usuario" key={form.key('usuario')}{...form.getInputProps('usuario')}/>
            <PasswordInput label="Contrasenia" withAsterisk description="Contrasenia del usuario que se registrara" placeholder="Contrasenia del usuario" key={form.key('contrasenia')}{...form.getInputProps('contrasenia')}/>
            <Group justify="flex-end" mt="md">
                <Button type="submit">Registarse</Button>
            </Group>
        </form>
        </Modal>
        <Button variant="filled" color="cyan" size="md" radius="md" onClick={open}>Login</Button>
    </>);
}

export default Login