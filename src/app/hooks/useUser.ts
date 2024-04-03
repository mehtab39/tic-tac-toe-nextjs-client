import { useContext } from 'react';
import { UserContext } from '../context/UserProvider';

function useUser(callback = (context: any) => context) {
    const ctx = useContext(UserContext);
    return callback(ctx);
}

export default useUser;
