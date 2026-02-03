import Header from '../components/Header.jsx'
import { Button, Space,Input } from 'antd'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import axios from 'axios'
import { useNavigate } from 'react-router';
import React, { useContext, useState, useCallback } from 'react'
import AuthContext from '../context/AuthContext.jsx'
import { Controller, useForm } from 'react-hook-form'
import { API_BASE_URL, ENDPOINTS } from '../config/url.jsx'

const LoginPage = () => {
    const {login} = useContext(AuthContext)
    const navigate = useNavigate();
    const [errorAuth, setErrorAuth] = useState(null)

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm();

    const authUser = async (registerUser) => {
        try {
            const response = await axios.post(
                `${API_BASE_URL}${ENDPOINTS.AUTH_LOGIN}`,
                {email: registerUser.email, password: registerUser.password},
                { headers:{"Content-Type": "application/json"}});
            const token = response.data.token

            login(token);
            navigate('/todo',  { replace: true })
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Ошибка при входе. Проверьте email и пароль.';
            setErrorAuth(errorMessage);
        }
    };

    const toRegistrationPage = useCallback(() => {
        navigate('/registration');
    }, [navigate])


    return(
       <div className="border-2">
           <Header title='Вход'></Header>
           <main>
               <div className="form p-5 min-w-sm">
                       <form onSubmit={handleSubmit(authUser)}>
                           <div className='mb-4 flex flex-col'>
                               <div className='flex justify-between items-center gap-4'>
                                   <label className='w-20'>Email:</label>
                                   <Controller
                                       name="email"
                                       control={control}
                                       rules={{
                                           required: "Поле обязательно для заполнения",
                                       }}
                                       render={({ field }) => <Input {...field} placeholder="Email"  style={{ width: '70%' }} />}
                                   />
                               </div>
                               <p className='max-w-[300px] text-xs self-end text-red-500'>{errors.email?.message}</p>
                           </div>
                           <div className='mb-4 flex flex-col'>
                               <div className='flex justify-between items-center gap-4'>
                                   <label className='w-20'>Пароль:</label>
                                   <Controller
                                       name="password"
                                       control={control}
                                       rules={{
                                           required: "Поле обязательно для заполнения",
                                       }}
                                       render={({ field }) => (
                                           <Input.Password
                                               {...field}
                                               placeholder="Пароль"
                                               iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                               style={{ width: '70%' }}
                                           />
                                       )}
                                   />
                               </div>
                               <p className='max-w-[300px] text-xs self-end text-red-500'>{errors.password?.message}</p>
                           </div>


                           {errorAuth && (
                               <div className='text-sm text-red-500 mb-[16px] p-[4px] bg-[#fff2f0] rounded-[6px]'>
                                   {errorAuth}
                               </div>
                           )}

                           <Space className='p-3'>
                               <Button type="primary" htmlType="submit">
                                   Войти
                               </Button>
                               <Button type="primary" onClick={toRegistrationPage}>Зарегистроваться</Button>
                           </Space>
                       </form>

               </div>
           </main>
       </div>
    )
}

export default LoginPage