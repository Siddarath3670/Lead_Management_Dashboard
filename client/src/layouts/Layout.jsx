import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Layout = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
            {/* Top Header - Glassmorphism */}
            <header className="h-16 border-b bg-card/70 backdrop-blur-md flex items-center justify-between px-6 md:px-10 sticky top-0 z-50 shadow-sm transition-all duration-300">
                <div className="flex items-center gap-4">
                    <div className="bg-primary/10 p-2 rounded-xl">
                        {/* Simple Logo Icon */}
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-primary"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                    </div>
                    <h1 className="text-xl font-bold tracking-tight text-foreground/90 font-heading">LeadManager</h1>
                </div>
                <div className="flex items-center gap-4">
                    <span className="text-sm font-medium hidden md:inline text-muted-foreground hover:text-foreground transition-colors cursor-default">{user?.name || 'User'}</span>
                    <Button variant="outline" size="sm" onClick={handleLogout} className="hover:bg-destructive hover:text-destructive-foreground transition-colors border-input">
                        Logout
                    </Button>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 p-6 md:p-10 bg-muted/20 animate-in fade-in duration-500">
                <div className="mx-auto max-w-7xl space-y-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default Layout;
