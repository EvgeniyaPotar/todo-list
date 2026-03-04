import Header from '../components/Header.jsx'
import { Button, Space,Input } from 'antd'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { authUser } from '../redux/slices/authSlice.js'
import { useNavigate } from 'react-router';
import { useCallback, useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useSelector, useDispatch } from 'react-redux'


const LoginPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const { token, errorAuth, isLoading } = useSelector((store) => store.auth)

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm();

    const handleLogin = (data) => {
        dispatch(authUser(data))
    }

    const toRegistrationPage = useCallback(() => {
        navigate('/registration');
    }, [navigate])

    useEffect(() => {
        if (token) {
            navigate('/todo', { replace: true })
        } else {
            navigate('/', { replace: true })
        }
    }, [token, navigate])


    return (
        <div className="border-2">
            <Header title="Вход"></Header>
            <main>
                <div className="form p-5 min-w-sm">
                    <form onSubmit={handleSubmit(handleLogin)}>
                        <div className="mb-4 flex flex-col">
                            <div className="flex justify-between items-center gap-4">
                                <label className="w-20">Email:</label>
                                <Controller
                                    name="email"
                                    control={control}
                                    rules={{
                                        required:
                                            'Поле обязательно для заполнения',
                                    }}
                                    render={({ field }) => (
                                        <Input
                                            {...field}
                                            placeholder="Email"
                                            style={{ width: '70%' }}
                                        />
                                    )}
                                />
                            </div>
                            <p className="max-w-[300px] text-xs self-end text-red-500">
                                {errors.email?.message}
                            </p>
                        </div>
                        <div className="mb-4 flex flex-col">
                            <div className="flex justify-between items-center gap-4">
                                <label className="w-20">Пароль:</label>
                                <Controller
                                    name="password"
                                    control={control}
                                    rules={{
                                        required:
                                            'Поле обязательно для заполнения',
                                    }}
                                    render={({ field }) => (
                                        <Input.Password
                                            {...field}
                                            placeholder="Пароль"
                                            iconRender={(visible) =>
                                                visible ? (
                                                    <EyeTwoTone />
                                                ) : (
                                                    <EyeInvisibleOutlined />
                                                )
                                            }
                                            style={{ width: '70%' }}
                                        />
                                    )}
                                />
                            </div>
                            <p className="max-w-[300px] text-xs self-end text-red-500">
                                {errors.password?.message}
                            </p>
                        </div>

                        {errorAuth && (
                            <div className="text-sm text-red-500 mb-[16px] p-[4px] bg-[#fff2f0] rounded-[6px]">
                                {errorAuth}
                            </div>
                        )}

                        <Space className="p-3">
                            <Button
                                type="primary"
                                htmlType="submit"
                                loading={isLoading}
                            >
                                Войти
                            </Button>
                            <Button type="primary" onClick={toRegistrationPage}>
                                Зарегистроваться
                            </Button>
                        </Space>
                    </form>
                </div>
            </main>
        </div>
    )
}

export default LoginPage