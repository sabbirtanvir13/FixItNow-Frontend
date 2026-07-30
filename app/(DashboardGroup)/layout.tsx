import { GetMe } from '@/components/service/getme';
import { Footer } from '@/components/shared/footer';
import { Navbar } from '@/components/shared/navbar';
import React from 'react';

export default async function  LayoutDashboard({
  children,
}: {
  children: React.ReactNode;
}) {

 let user = null;
  try {
    user = await GetMe();
  } catch (error) {
    user = null;
  }


  return (
    <div className="  ">
<Navbar user={user}></Navbar>
    
      {children}

      <Footer></Footer>
    </div>
  );
}