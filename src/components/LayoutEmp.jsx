import React from 'react'
import { Outlet,Navigate, useActionData } from 'react-router-dom'
import { useAuthContext } from '../useAuth'

const LayoutEmp = () => {
    const {user} = useAuthContext();
    if(user?.id && user.id.startsWith('employe')){
        return <Outlet />
    }else{
        return <Navigate to="/" replace/>
    }
}


export default LayoutEmp
