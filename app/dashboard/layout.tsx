import { GetMe } from '@/components/service/getme';
import { Footer } from '@/components/shared/footer';
import { Navbar } from '@/components/shared/navbar';
import React from 'react';
import Sidebar from './_component/sidebar';

export default async function LayoutDashboard({
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
    <div className="min-h-screen flex flex-col bg-background">
      {/* Desktop Sidebar (Fixed Left) & Mobile Sheet Header */}
      <Sidebar user={user} />

      {/* Main Content Area - Offset left by 72 (18rem) on large screens */}
      <div className="flex flex-1 flex-col lg:pl-72">
        <Navbar user={user} />
        
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </main>

        <Footer />
      </div>
    </div>
  );
}