import React from 'react'
import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import Alerta from '../components/Alerta'
import clienteAxios from '../config/axios'

const NuevaContraseña = () => {

    const [password, setPassword] = useState('')
    const [alerta, setAlerta] = useState({})
    const [tokenValido, setTokenValido] = useState(false)
    const [passwordModificado, setPasswordModificado] = useState(false)

    const params = useParams()
    const { token } = params

    useEffect(() => {
        const comprobarToken = async () => {

            try {
                await clienteAxios(`/veterinarios/olvide-password/${token}`)
                setAlerta({
                    msg: "Coloca tu nuevo password"
                })
                setTokenValido(true)
            } catch (error) {
                setAlerta({
                    msg: 'Hubo un error con el enlace',
                    error: true,
                })
            }
        }
        comprobarToken()
    }, [])

    const handleSumbit = async (e) => {
        e.preventDefault();

        if(password.length < 6){
            setAlerta({
                msg: "La contraseña debe tener minimo 6 caracteres",
                error: true
            })
            return;
        }

        try {
            const url=`/veterinarios/olvide-password/${token}`
            const { data } = await clienteAxios.post(url, {
                password,
            })
            setAlerta({
                msg: data.msg
            })
            setPasswordModificado(true)
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true,
            })
        }
    }


    const { msg } = alerta
  return (
    <>
    <div>
        <h1 className='text-indigo-600 font-black text-6xl'>
          Restable tu Contraseña y no pierdas acceso a tus
          <span className='text-black'> Pacientes</span>
        </h1>
    </div>

    <div className='mt-20 md:mt-5 shadow-lg px-5 py-5 rounded-xl bg-white'>
        {msg && <Alerta
        alerta={alerta}
        />}

        { tokenValido && (
            <>
                <form 
                    onSubmit={handleSumbit}
                    >
                    <div className='my-5'>
                        <label
                        className='uppercase text-gray-600 block text-xl font-bold'
                        >
                        Nueva Contraseña
                        </label>

                        <input
                        type="password"
                        placeholder='Tu nueva Contraseña'
                        className='border w-full p-3 mt-3 bg-gray-50 rounded-xl'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        />
                    </div>

                    <input
                    type="submit"
                    value="Restablecer Contraseña"
                    className=" bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase mt-5 font-bold hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
                    />
                </form>
                {passwordModificado &&
                    <Link
                    className='block text-center my-2 text-gray-500'
                    to="/">Iniciar Sesion
                    </Link>
                }
            </>
        )}
    </div>
    </>
  )
}

export default NuevaContraseña