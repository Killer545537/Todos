import type React from 'react';
import Sidebar from '@/components/todos/sidebar';

const Layout = ({ children }: Readonly<{ children: React.ReactNode }>) => (
    <div className='flex h-screen'>
        <Sidebar />
        {children}
    </div>
);

export default Layout;
