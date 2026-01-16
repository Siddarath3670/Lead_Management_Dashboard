import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const Dashboard = () => {
    const [stats, setStats] = useState(null);
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user?.token;

    useEffect(() => {
        const fetchStats = async () => {
            if (!token) return;
            try {
                const res = await fetch('http://localhost:5000/api/leads/dashboard', {
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
        <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>

            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.totalLeads}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Converted Leads</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-600">{stats.convertedLeads}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
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
        </div>
    );
};

export default Dashboard;
