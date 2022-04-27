import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import Alerta from '../components/Alerta'
import ClienteAxios from '../config/axios'
import clienteAxios from '../config/axios'

const OlvidePassword = () => {

  const [ email, setEmail ] = useState('')
  const [alerta, setAlerta ] = useState({})

  const handleSubmit = async (e) => {
    e.preventDefault()

    if(email === '' || email < 6) {
      setAlerta({
        msg: 'El Correo electronico es obligatorio',
        error: true
      })
      return;
    }

    try {
      const {data} = await clienteAxios.post('/veterinarios/olvide-password', { email })
      console.log(data);
      setAlerta({msg: data.msg})
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error:true
      })
    }
  }

  const { msg } = alerta

  return (
    <>
      <div>
        <h1 className='text-indigo-600 font-black text-6xl'>
        Recupera tu acceso y no piertas tus 
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
          <input
                type="submit"
                value="Olvide mi contraseña"
                className=" bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase mt-5 font-bold hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
              />
        </form>
        <nav className='mt-10 lg:flex lg:justify-between'>
          <Link
            className='block text-center my-2 text-gray-500'
            to="/">¿Ya tienes una cuenta? Inicia Sesion</Link>
          <Link
            className='block text-center my-2 text-gray-500'
            to="/registrar">¿No tienes una cuenta? Registrate</Link>
        </nav>
      </div>
    </>
  )
}

export default OlvidePassword