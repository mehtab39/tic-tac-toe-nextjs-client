// pages/index.js
"use client"
import Head from 'next/head';
import Game from './components/Game';
import { UserProvider } from '../app/context/UserProvider'
import SignInForm from '../app/components/SignInForm'
import CreateAccountForm from '../app/components/CreateAccountForm'
import {  useState } from 'react';
import useUser from './hooks/useUser';
export default function Home() {
  return (
    <div>
      <Head>
        <title>Tic Tac Toe</title>
        <meta name="description" content="Tic Tac Toe game built with Next.js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <UserProvider>
        <Internal />
      </UserProvider>
    </div>
  );
}


function Internal() {
  const user = useUser();


  return (<main>
    <h1>Tic Tac Toe</h1>
    {!user.isLoggedIn ? <Unauth /> : <Game userInfo={user.loggedInUserInfo} />}


  </main>)
}

const CreateAccount = () => {
  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Create Account</h1>
      <CreateAccountForm />
    </div>
  )
}

const Unauth = () => {
  const [loginPage, setLoginPage] = useState(true);
  return loginPage ? <div className="container mx-auto mt-8">
    <h1 className="text-2xl font-bold mb-4">Sign In</h1>
    <SignInForm />
    <a onClick={() => setLoginPage(false)}>Create account</a>
  </div> : <CreateAccount />
}