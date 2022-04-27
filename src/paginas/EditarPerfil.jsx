import React, { useEffect, useState } from 'react'
import AdminNav from '../components/AdminNav'
import useAuth from '../hooks/useAuth'
import Alerta from '../components/Alerta'

const EditarPerfil = () => {

    const { auth, actualizarPerfil } = useAuth()
    const [perfil, setPerfil] = useState({})
    const [alerta, setAlerta] = useState({})

    useEffect(() => {
        setPerfil(auth)

    }, [auth])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const { nombre, email } = perfil
        if([nombre, email].includes('')) {
            setAlerta({
                msg: 'Email y Nombre, son obligatorios',
                error: true
            })
            return;
        }
        const resultado = await actualizarPerfil(perfil)

        setAlerta(resultado)
    }

    const {msg} = alerta

  return (
    <>
        <AdminNav />

        <h2 className='font-black text-3xl text-center mt-10'>Editar Perfil</h2>
        <p className='text-xl mt- text-center mb-10'>Modifica tu {''}
            <span className='text-indigo-600 font-bold'>Informacion aquí</span>
        </p>

        <div className='flex justify-center'>
            <div className='w-full md:w-1/2 bg-white shadow rounded-lg p-5'>
                
                {msg && <Alerta alerta={alerta} />}
                <form
                onSubmit={handleSubmit}
                action="">
                    <div className='my-3'>
                        <label htmlFor="" className='uppercase font-bold text-gray-500'>
                        Nombre
                        </label>
                        <input
                            type="text"
                            className='borber bg-gray-200 p-2 w-full mt-5 rounded-lg'
                            name="nombre"
                            value={perfil.nombre || ''}
                            onChange={e => setPerfil({
                                ...perfil,
                                [e.target.name] : e.target.value
                            })}
                        />
                    </div>

                    <div className='my-3'>
                        <label htmlFor="" className='uppercase font-bold text-gray-500'>
                        Sitio Web
                        </label>
                        <input
                            type="text"
                            className='borber bg-gray-200 p-2 w-full mt-5 rounded-lg'
                            name="web"
                            value={perfil.web || ''}
                            onChange={e => setPerfil({
                                ...perfil,
                                [e.target.name] : e.target.value
                            })}
                        />
                    </div>

                    <div className='my-3'>
                        <label htmlFor="" className='uppercase font-bold text-gray-500'>
                        Telefono
                        </label>
                        <input
                            type="text"
                            className='borber bg-gray-200 p-2 w-full mt-5 rounded-lg'
                            name="telefono"
                            value={perfil.telefono || ''}
                            onChange={e => setPerfil({
                                ...perfil,
                                [e.target.name] : e.target.value
                            })}
                        />
                    </div>

                    <div className='my-3'>
                        <label htmlFor="" className='uppercase font-bold text-gray-500'>
                        Correo Electronico
                        </label>
                        <input
                            type="email"
                            className='borber bg-gray-200 p-2 w-full mt-5 rounded-lg'
                            name="email"
                            value={perfil.email || ''}
                            onChange={e => setPerfil({
                                ...perfil,
                                [e.target.name] : e.target.value
                            })}
                        />
                    </div>

                    <input type="submit" value="Guardar Cambios" className='bg-indigo-500 px-10 py-3 font-bold text-white rounded-lg uppercase w-full hover:bg-indigo-700 mt-5'/>
                </form>
            </div>
        </div>
    </>
  )
}

export default EditarPerfil