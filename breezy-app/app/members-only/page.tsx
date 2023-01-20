'use client';

import React from 'react';
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import Logo from '../../public/LOGO 2.png';
import Image from 'next/image';
import style from '../../styles/sidebar.module.css';
// TODO: test if the component would work without withPageAuthRequired now that auth0 wraps everything in app
export default withPageAuthRequired(function MembersOnly() {
  return (
    <div className={style.logoContainer}>
      <Image alt='logo of the application' src={Logo} width={600} />
    </div>
  );
});
