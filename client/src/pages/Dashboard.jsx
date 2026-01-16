import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import LeadsPage from './LeadsPage';
import { API_URL } from '../config';

const Dashboard = () => {
    const [stats, setStats] = useState(null);
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user?.token;

    useEffect(() => {
        const fetchStats = async () => {
            if (!token) return;
            try {
                const res = await fetch(`${API_URL}/api/leads/dashboard`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                if (res.ok) {
                    const data = await res.json();
                    setStats(data);
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchStats();
    }, [token]);

    if (!stats) return <div className="p-8">Loading dashboard...</div>;


    return (
        <div className="space-y-8">
            <div className="flex flex-col space-y-2">
                <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent font-heading">
                    Dashboard Overview
                </h2>
                <p className="text-muted-foreground">Here's what's happening with your leads today.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <Card className="hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/20 hover:-translate-y-1">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Total Leads</CardTitle>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-primary"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold font-heading">{stats.totalLeads}</div>
                    </CardContent>
                </Card>
                <Card className="hover:shadow-lg transition-all duration-300 border-border/50 hover:border-green-500/20 hover:-translate-y-1">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Converted Leads</CardTitle>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-emerald-500"><polyline points="20 6 9 17 4 12" /></svg>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-emerald-600 font-heading">{stats.convertedLeads}</div>
                    </CardContent>
                </Card>
                <Card className="hover:shadow-lg transition-all duration-300 border-border/50 hover:border-blue-500/20 hover:-translate-y-1">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Conversion Rate</CardTitle>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-blue-500"><line x1="12" x2="12" y1="20" y2="10" /><line x1="18" x2="18" y1="20" y2="4" /><line x1="6" x2="6" y1="20" y2="16" /></svg>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold font-heading">
                            {stats.totalLeads ? ((stats.convertedLeads / stats.totalLeads) * 100).toFixed(1) : 0}%
                        </div>
                    </CardContent>
                </Card>
            </div>

            <h3 className="text-xl font-semibold mt-8">Leads by Status</h3>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {stats.leadsByStatus.map((status) => (
                    <Card key={status._id}>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">{status._id}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{status.count}</div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="pt-8">
                <LeadsPage />
            </div>
        </div>
    );
};

export default Dashboard;
