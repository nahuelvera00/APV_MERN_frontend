import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import clienteAxios from '../config/axios';
import Alerta from '../components/Alerta';

const Registrar = () => {

  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repetirPassword, setRepetirPassword] = useState('')
  const [alerta, setAlerta] = useState({})

  const handleSubmit = async e => {
    e.preventDefault();

    if ([nombre, email, password, repetirPassword].includes('')) {
      setAlerta({ msg: 'Hay campos vacios', error: true });
      return;
    }
    if (password !== repetirPassword) {
      setAlerta({ msg: 'Las contraseñas no son iguales', error: true });
      return;
    }
    if (password.length < 6) {
      setAlerta({ msg: 'La contraseña es muy corta, agrega minimo 6 caracteres', error: true });
      return;
    }
    setAlerta({})

    //Podemos crear el usuario en la API
    try {
      await clienteAxios.post('/veterinarios', { nombre, email, password })
      setAlerta({
        msg: 'Creado Correctamente, revisa tu Correo Electronico',
        error: false
      })
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }


  }
  const { msg } = alerta

  return (
    <>
      <div>
        <h1 className='text-indigo-600 font-black text-6xl'>
          Registrate y Administra tus
          <span className='text-black'> Pacientes</span>
        </h1>
      </div>
      <div className='mt-20 md:mt-5 shadow-lg px-5 py-5 rounded-xl bg-white'>
        {msg && <Alerta
          alerta={alerta}
        />}
        <form
          onSubmit={handleSubmit}
        >
          <div className='my-5'>
            <label
              className='uppercase text-gray-600 block text-xl font-bold'
            >
              Nombre
            </label>
            <input
              type="text"
              placeholder='Introduzca su Nombre'
              className='border w-full p-3 mt-3 bg-gray-50 rounded-xl'
              value={nombre}
              onChange={e => setNombre(e.target.value)}
            />
          </div>
          <div className='my-5'>
            <label
              className='uppercase text-gray-600 block text-xl font-bold'
            >
              Correo Electronico
            </label>
            <input
              type="email"
              placeholder='Introduzca su Correo'
              className='border w-full p-3 mt-3 bg-gray-50 rounded-xl'
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className='my-5'>
            <label
              className='uppercase text-gray-600 block text-xl font-bold'
            >
              Contraseña
            </label>
            <input
              type="password"
              placeholder='Introduzca su Contraseña'
              className='border w-full p-3 mt-3 bg-gray-50 rounded-xl'
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <div className='my-5'>
            <label
              className='uppercase text-gray-600 block text-xl font-bold'
            >
              Confirmar Contraseña
            </label>
            <input
              type="password"
              placeholder='Vuelva a escribir su Contraseña'
              className='border w-full p-3 mt-3 bg-gray-50 rounded-xl'
              value={repetirPassword}
              onChange={e => setRepetirPassword(e.target.value)}
            />
          </div>

          <input
            type="submit"
            value="Crear Cuenta"
            className=" bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase mt-5 font-bold hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
          />
        </form>
        <nav className='mt-10 lg:flex lg:justify-between'>
          <Link
            className='block text-center my-2 text-gray-500'
            to="/">¿Ya tienes cuenta? Inicia Sesion
          </Link>
        </nav>
      </div>
    </>
  )
}

export default Registrar