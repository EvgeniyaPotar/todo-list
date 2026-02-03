import React, { useState} from 'react';
import { Button, Input, Space, Radio, message} from 'antd'
import Header from '../components/Header.jsx'
import { useNavigate } from 'react-router';
import axios from 'axios'
import { useForm, Controller } from "react-hook-form";
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'
import { API_BASE_URL, ENDPOINTS } from '../config/url.jsx'

const RegistrationPage = () => {
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm();

    const [messageApi, contextHolder] = message.useMessage();

    const success = () => {
        messageApi.open({
            type: 'success',
            content: 'Успешно зарегистрирован',
        });
    };


    const navigate = useNavigate();
    const [errorRegistr, setErrorRegistr] = useState(null)

    const registrationUser = async(newUser) => {
        try {
             await axios.post(
                 `${API_BASE_URL}${ENDPOINTS. AUTH_REGISTER}`,
                newUser,
                {headers: {
                        "Content-Type": "application/json"
                    }}
            );
            success()

            setTimeout(() => {
                navigate('/')
            }, 1500)

        }
        catch (error) {
            console.log(error.response?.data?.message)
            const errorMessage = error.response?.data?.message || 'Ошибка при регистрации.';
            setErrorRegistr(errorMessage);
        }
    }

    const toLoginPage = () => {
        navigate('/');
    }

    return (
        <div className="border-2">
            {contextHolder}
            <Header title='Регистрация'></Header>
            <main>
        <div className="p-5 min-w-sm">
            <div className='form'>
                <form onSubmit={handleSubmit(registrationUser)}>
                    <div className='mb-4 flex flex-col'>
                        <div className='flex items-center gap-4'>
                            <label className='w-24'>Логин:</label>
                            <Controller
                                name="username"
                                control={control}
                                rules={{ required: "Поле обязательно для заполнения" }}
                                render={({ field }) => (
                                    <Input {...field} placeholder="Введите логин" />
                                )}
                            />
                        </div>
                        <p className='max-w-[300px] text-xs text-right self-end text-red-500'>{errors.username?.message}</p>
                    </div>
                    <div className='mb-4 flex flex-col'>
                        <div className='mb flex items-center gap-4'>
                            <label className='w-24'>E-mail:</label>
                            <Controller
                                name="email"
                                control={control}
                                rules={{
                                    required: "Поле обязательно для заполнения",
                                    pattern: {
                                        value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
                                        message: "Введите корректный email",
                                    },
                                }}
                                render={({ field }) => <Input {...field} placeholder="Email" />}
                            />
                        </div>
                        <p className='max-w-[300px] text-xs text-right self-end text-red-500'>{errors.email?.message}</p>
                    </div>
                    <div className='mb-4 flex flex-col'>
                        <div className='mb flex items-center gap-4'>
                        <label className='w-24'>Пароль:</label>
                        <Controller
                            name="password"
                            control={control}
                            rules={{
                                required: "Поле обязательно для заполнения",
                                pattern: {
                                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/,
                                    message: "Минимум 8 символов, минимум 1 заглавная буква, 1 прописная, 1 число и 1 символ",
                                },
                            }}
                            render={({ field }) => (
                                <Input.Password
                                    {...field}
                                    placeholder="Пароль"
                                    iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                />
                            )}
                        />
                    </div>
                        <p className='max-w-[300px] text-xs text-right self-end text-red-500'>{errors.password?.message}</p>
                </div>
                    <div className='mb-4 flex flex-col'>
                        <div className='flex items-center gap-4'>
                            <label className='w-24'>Возраст: </label>
                            <Controller
                                name="age"
                                control={control}
                                rules={{ required: "Поле обязательно для заполнения" }}
                                render={({ field }) => (
                                    <Input {...field} placeholder="Возраст" />
                                )}
                            />
                        </div>
                        <p className='max-w-[300px] text-xs text-right self-end text-red-500'>{errors.age?.message}</p>
                    </div>
                    <div className='mb-4 flex flex-col'>
                        <div className='flex items-center gap-4'>
                            <label className='w-24'>Пол: </label>
                            <Controller
                                name="gender"
                                control={control}
                                rules={{ required: "Выберите пол" }}
                                render={({ field }) => (
                                    <Radio.Group {...field}>
                                        <Radio value="male">Мужской</Radio>
                                        <Radio value="female">Женский</Radio>
                                    </Radio.Group>
                                )}
                            />
                        </div>
                        <p className='max-w-[300px] text-xs text-right self-end text-red-500'>{errors.gender?.message}</p>
                    </div>

                    {errorRegistr && (
                        <div style={{ color: 'red', marginBottom: '16px', padding: '8px', backgroundColor: '#fff2f0', borderRadius: '6px' }}>
                            {errorRegistr}
                        </div>
                    )}

                    <Space>
                        <Button type="primary"  onClick={toLoginPage}>
                            Войти
                        </Button>
                        <Button type="primary" htmlType="submit">Зарегистроваться</Button>
                    </Space>
                </form>
            </div>

        </div>
            </main>
        </div>
    );
};
export default RegistrationPage