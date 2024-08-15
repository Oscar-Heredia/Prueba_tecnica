import React, { useEffect, useState } from 'react';

const LogoutButton = () => {
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = "/login";
  };

  return (
    <button onClick={handleLogout}>Cerrar Sesión</button>
  );
}



const Home = () => {
  const [user, setUser] = useState(null);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token')

      if (!token) {
        console.log("Error, no se encontro el token")
        return
      }

      const response = await fetch('https://dummyjson.com/auth/login', { method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },})
    } catch(error) {
      console.log("error al obtener la informcaion del usuario")
    }


  }

  // useEffect(() => {
  //   fetch(`https://dummyjson.com/users`, {
  //     method: 'GET',
  //     headers: {
  //       'Authorization': `Bearer ${localStorage.getItem('token')}`,
  //       'Content-Type': 'application/json'
  //     },
  //   })
  //   .then(response => response.json())
  //   .then(data => setUser(data))
  //   .catch(error => console.error('Error al obtener la información del usuario', error));
  // }, []);

  return (
    <div>
      {
        user ? (
          <div>
          <h1>Bienvenido, {user?.firstName} {user?.lastName}</h1>
          <p>Has iniciado sesión como {user?.username}</p>
          <LogoutButton />
          </div>

        ) : (
          <div> 
            <h3>cargando...</h3>
          </div>
        )
      }
    </div>
  );
}

export default Home;
