import type { Metadata } from 'next';
import type React from 'react';
import Sidebar from '@/components/todos/sidebar';

export const metadata: Metadata = {
    title: 'Todo App',
    description: 'A simple todo application with Next.js',
};

const Layout = ({ children }: Readonly<{ children: React.ReactNode }>) => (
    <div className='flex h-screen'>
        <Sidebar />
        {children}
    </div>
);

export default Layout;
