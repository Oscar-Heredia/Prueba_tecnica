import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Button, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import './login.css';

const LogoutButton = () => {
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user'); // Eliminar también los datos del usuario
        window.location.reload(); // Recargar la página para regresar al formulario de login
    };

    return (
        <Button onClick={handleLogout} variant="contained" color="secondary">
            Cerrar Sesión
        </Button>
    );
};

export const Login = () => {
    const [user, setUser] = React.useState(null);
    const { register, handleSubmit, formState: { errors } } = useForm();

    React.useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        } else {
            const token = localStorage.getItem('token');
            if (token) {
                fetchUserDataWithToken(token);
            }
        }
    }, []);

    const paperStyle = {
        padding: 20,
        height: '50vh',
        width: 280,
        margin: "auto",
        backgroundColor: '#E6F4F1',
        borderRadius: '12px',
        boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.25)'
    };
    const btnstyle = { backgroundColor: '#1B6DA1', margin: '12px 0' };

    const fetchUserDataWithToken = async (token) => {
        try {
            const response = await fetch('https://dummyjson.com/auth/user', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('user', JSON.stringify(data)); // Guardar los datos del usuario en localStorage
                setUser(data); // Guardar los datos del usuario en el estado
            } else {
                console.error('Error al obtener la información del usuario');
                localStorage.removeItem('token'); // Eliminar token inválido
            }
        } catch (error) {
            console.error('Error al obtener la información del usuario', error);
        }
    };

    const fetchUserData = async (username, password) => {
        try {
            const response = await fetch('https://dummyjson.com/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data)); // Guardar los datos del usuario en localStorage
                setUser(data);  // Guardar los datos del usuario en el estado
            } else {
                console.error('Error en la autenticación');
            }
        } catch (error) {
            console.error('Error al obtener la información del usuario', error);
        }
    };

    const onSubmit = data => {
        fetchUserData(data.username, data.password);
    };

    return (
        <>
            {user ? (
                <Grid
                    container
                    style={{ minHeight: '100vh' }}
                    alignItems="center"
                    justifyContent="center"
                >
                    <Paper elevation={12} style={paperStyle}>
                        <Grid align='center'>
                            <img src='/logo-color.png' className='image' alt="Logo" />
                            <h2>Bienvenido, {user.firstName} {user.lastName}</h2>
                            <p>Has iniciado sesión como {user.username}</p>
                            <LogoutButton />
                        </Grid>
                    </Paper>
                </Grid>
            ) : (
                <Grid
                    container
                    style={{ minHeight: '100vh' }}
                    alignItems="center"
                    justifyContent="center"
                >
                    <Paper elevation={12} style={paperStyle}>
                        <Grid align='center'>
                            <img src='/logo-color.png' className='image' alt="Logo" />
                            <h2>Login</h2>
                        </Grid>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <TextField
                                id="username-input"
                                label="Username"
                                variant="standard"
                                placeholder='Enter Your Username'
                                fullWidth
                                required
                                {...register("username", { required: true })}
                            />
                            {errors.username && <span style={{ color: 'red' }}>Username is required</span>}
                            <TextField
                                id="password-input"
                                label="Password"
                                variant="standard"
                                placeholder='Enter Your Password'
                                type='password'
                                fullWidth
                                required
                                {...register("password", { required: true })}
                            />
                            {errors.password && <span style={{ color: 'red' }}>Password is required</span>}
                            <Button style={btnstyle} type='submit' color='primary' variant="contained" fullWidth>
                                Login
                            </Button>
                        </form>
                    </Paper>
                </Grid>
            )}
        </>
    );
};

export default Login;
