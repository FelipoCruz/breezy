import React from 'react';
import LandingPage from '../components/landing-page';
import { UserProvider, withPageAuthRequired } from '@auth0/nextjs-auth0/client';

function Page() {
  return (
    <main aria-labelledby='home' >
      {/* <h1 className='invisible-heading-home'>Home</h1> */}
      <title>Breezy app Dep - Home</title>
      <UserProvider>
        <LandingPage data-testid="LandingPage" />
      </UserProvider>
    </main>
  );
};


export default Page

