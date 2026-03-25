export const authMiddleware =(store) => (next) => (action) => {
     if (action.type === 'auth/authUser/fulfilled') {
         localStorage.setItem('token', action.payload);
     }

     if (action.type === 'auth/logout') {
        localStorage.removeItem('token');
     }

    return next(action);
}