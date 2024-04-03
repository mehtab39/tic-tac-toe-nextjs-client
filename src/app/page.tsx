// pages/index.js
"use client"
import Head from 'next/head';
import Game from './components/Game';
import { UserProvider } from '../app/context/UserProvider'
import { SessionProvider } from 'next-auth/react';
import LoginPage from './login'
import useUser from './hooks/useUser';
export default function Home() {
  return (
    <div>
      <Head>
        <title>Tic Tac Toe</title>
        <meta name="description" content="Tic Tac Toe game built with Next.js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SessionProvider>
        <UserProvider>
          <Internal />
        </UserProvider>
      </SessionProvider>
    </div>
  );
}


function Internal() {
  const user = useUser();
  return (<main>
    <h1>Tic Tac Toe</h1>
    {user.isLoggedIn ? <Game userInfo={user.loggedInUserInfo} /> : <LoginPage />}
  </main>)
}