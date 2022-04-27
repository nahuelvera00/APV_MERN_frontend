import React, { useState } from 'react';
import AdminNav from '../components/AdminNav';
import Alerta from '../components/Alerta';
import useAuth from '../hooks/useAuth'

const CambiarPassword = () => {

    const { guardarPassword } = useAuth()

    const [alerta, setAlerta] = useState({})
    const [password, setPassword] = useState({
        pwd_actual: '',
        pwd_nuevo: ''
    })

    const handleSubmit = async e => {
        e.preventDefault()

        if( Object.values(password).some(campo => campo === '')) {
            setAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            })
            return
        }

        if( password.pwd_nuevo.length < 6 ) {
            setAlerta({
                msg: 'La contraseña debe tener minimo 6 caracteres',
                error: true
            })
            return
        }

        const respuesta = await guardarPassword(password)

        setAlerta(respuesta)
    }

    const {msg} = alerta

  return (
    <>
        <AdminNav />

        <h2 className='font-black text-3xl text-center mt-10'>Cambiar Contraseña</h2>
        <p className='text-xl mt- text-center mb-10'>Modifica tu {''}
            <span className='text-indigo-600 font-bold'>Contraseña aquí</span>
        </p>

        <div className='flex justify-center mx-1'>
            <div className='w-full md:w-1/2 bg-white shadow rounded-lg p-5'>
                
                {msg && <Alerta alerta={alerta} />}

                <form
                onSubmit={handleSubmit}
                >
                    <div className='my-3'>
                        <label htmlFor="" className='uppercase font-bold text-gray-500'>
                        Contraseña Actual
                        </label>
                        <input
                            type="password"
                            className='borber bg-gray-200 p-2 w-full mt-5 rounded-lg'
                            name="pwd_actual"
                            placeholder='Escribe tu Contraseña Actual'
                            onChange={ e => setPassword({
                                ...password,
                                [e.target.name] : e.target.value
                            })}
                        />
                    </div>

                    <div className='my-3'>
                        <label htmlFor="" className='uppercase font-bold text-gray-500'>
                        Contraseña Nueva
                        </label>
                        <input
                            type="password"
                            className='borber bg-gray-200 p-2 w-full mt-5 rounded-lg'
                            name="pwd_nuevo"
                            placeholder='Escribe tu Nueva Contraseña'
                            onChange={ e => setPassword({
                                ...password,
                                [e.target.name] : e.target.value
                            })}
                        />
                    </div>

                    <input type="submit" value="Actualizar Contraseña" className='bg-indigo-500 px-10 py-3 font-bold text-white rounded-lg uppercase w-full hover:bg-indigo-700 mt-5'/>
                </form>
            </div>
        </div>
    </>
  )
}

export default CambiarPassword