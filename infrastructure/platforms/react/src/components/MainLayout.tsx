// src/components/MainLayout.tsx

import React, { ReactNode, Dispatch, SetStateAction } from 'react';
import Header from './Header';

interface MainLayoutProps {
  setPage: Dispatch<SetStateAction<string>>;
  children: ReactNode;
}

const MainLayout = ({ setPage, children }: MainLayoutProps) => {
  return (
    <div className="min-h-screen bg-blue-100">
      {/* Le header reçoit `setPage` pour gérer la navigation */}
      <Header setPage={setPage} />
      
      <div className="max-w-4xl mx-auto px-4 py-6">
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
