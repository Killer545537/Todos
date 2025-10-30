'use client';

import {
    BarChart3,
    CheckSquare2,
    type LucideIcon,
    Tag,
    Copyright,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const links: { href: string; label: string; icon: LucideIcon }[] = [
    { href: '/dashboard', label: 'Dashboard', icon: BarChart3 },
    { href: '/todos', label: 'Todos', icon: CheckSquare2 },
    { href: '/tags', label: 'Tags', icon: Tag },
] as const;

const Sidebar = () => {
    const pathname = usePathname();

    return (
        <aside className='w-64 border-r border-border bg-card h-screen sticky top-0 flex flex-col'>
            <div className='p-6 border-b border-border'>
                <h1 className='text-2xl font-bold text-foreground'>Todos</h1>
                <p>Manage your Todos</p>
            </div>

            <nav className='flex-1 p-4 space-y-2'>
                {links.map(({ href, label, icon: Icon }) => {
                    const isActive = pathname === href;

                    return (
                        <Link
                            key={href}
                            href={{
                                pathname: href,
                            }}
                            className={cn(
                                'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors',
                                isActive
                                    ? 'bg-primary text-primary-foreground'
                                    : 'text-foreground hover:bg-muted',
                            )}
                        >
                            <Icon className='w-5 h-5' />
                            <span>{label}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className='p-4 border-t border-border'>
                <p className='text-xs text-muted-foreground flex items-center gap-1'>
                    <Copyright className='w-4 h-4' /> 2025 Todos
                </p>
            </div>
        </aside>
    );
};

export default Sidebar;
