import { Navigate, Outlet } from 'react-router';
import { Spin } from 'antd'
import { useSelector } from 'react-redux'


const PrivateRoute = () => {
    const { token,isLoading } = useSelector((store) => store.auth)

        if (isLoading) {
            return  <Spin className='bg-white' spinning={isLoading} />
        }
        return token ? <Outlet /> : <Navigate to="/" replace />;
};

export default PrivateRoute