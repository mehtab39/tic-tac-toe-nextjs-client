import { signIn, signOut } from 'next-auth/react';
import useUser from './hooks/useUser';
export default function LoginPage() {
  const user = useUser();
  if (user.isLoading) return <h1> loading... please wait</h1>;
  return (
    <div>
      <button onClick={() => signIn('google')}>sign in with gooogle</button>
    </div>
  );
}
// function LogOutPage({user}){
//     return  (<div>
//         <h1> hi {user.name}</h1>
//         <img src={user.image} alt={user.name + ' photo'} />
//         <button onClick={signOut}>sign out</button>
//       </div>)
// }