import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const Layout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const user = JSON.parse(localStorage.getItem('user'));

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    };

    const navItems = [
        { name: 'Dashboard', path: '/dashboard' },
        { name: 'Leads', path: '/leads' },
    ];

    const toggleMenu = () => setMobileMenuOpen(!mobileMenuOpen);

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col md:flex-row">
            {/* Sidebar (Desktop) */}
            <aside className="w-64 border-r bg-card hidden md:flex flex-col h-screen sticky top-0">
                <div className="p-6 border-b">
                    <h1 className="text-xl font-bold tracking-tight">LeadManager</h1>
                </div>
                <nav className="flex-1 p-4 space-y-2">
                    {navItems.map((item) => (
                        <Link key={item.path} to={item.path}>
                            <Button
                                variant={location.pathname.startsWith(item.path) ? 'secondary' : 'ghost'}
                                className="w-full justify-start"
                            >
                                {item.name}
                            </Button>
                        </Link>
                    ))}
                </nav>
                <div className="p-4 border-t">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-sm font-medium">{user?.name || 'User'}</span>
                    </div>
                    <Button variant="outline" className="w-full" onClick={handleLogout}>
                        Logout
                    </Button>
                </div>
            </aside>

            {/* Mobile Header */}
            <header className="h-16 border-b bg-card flex items-center px-4 md:hidden justify-between sticky top-0 z-50">
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" onClick={toggleMenu}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" /></svg>
                    </Button>
                    <h1 className="text-lg font-bold">LeadManager</h1>
                </div>
                <Button variant="ghost" size="sm" onClick={handleLogout}>Logout</Button>
            </header>

            {/* Mobile Menu Overlay */}
            {mobileMenuOpen && (
                <div className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden" onClick={() => setMobileMenuOpen(false)}>
                    <div className="fixed inset-y-0 left-0 w-3/4 max-w-xs bg-card p-6 shadow-lg border-r" onClick={(e) => e.stopPropagation()}>
                        <h2 className="text-xl font-bold mb-6">Menu</h2>
                        <nav className="space-y-2">
                            {navItems.map((item) => (
                                <Link key={item.path} to={item.path} onClick={() => setMobileMenuOpen(false)}>
                                    <Button
                                        variant={location.pathname.startsWith(item.path) ? 'secondary' : 'ghost'}
                                        className="w-full justify-start"
                                    >
                                        {item.name}
                                    </Button>
                                </Link>
                            ))}
                        </nav>
                    </div>
                </div>
            )}

            {/* Main Content */}
            <main className="flex-1 p-4 md:p-6 overflow-auto bg-muted/20 min-h-[calc(100vh-4rem)] md:min-h-screen">
                <div className="mx-auto max-w-6xl">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default Layout;
