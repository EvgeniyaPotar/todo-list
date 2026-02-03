import { Navigate, Outlet } from 'react-router';
import AuthContext from '../context/AuthContext.jsx'
import { useContext } from 'react'
import { Spin } from 'antd'


const PrivateRoute = () => {
        const {token, isLoading } = useContext(AuthContext)

        if (isLoading) {
            return  <Spin className='bg-white' spinning={isLoading} />
        }
        return token ? <Outlet /> : <Navigate to="/" replace />;
};

export default PrivateRoute