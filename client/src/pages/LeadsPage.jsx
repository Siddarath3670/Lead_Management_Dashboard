import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

const LeadsPage = () => {
    const [leads, setLeads] = useState([]);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [sort, setSort] = useState('createdAt:desc');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [debouncedSearch, setDebouncedSearch] = useState(search);

    const user = JSON.parse(localStorage.getItem('user'));
    const token = user?.token;

    // Debounce Search
    useEffect(() => {
        const timer = setTimeout(() => setDebouncedSearch(search), 500);
        return () => clearTimeout(timer);
    }, [search]);

    useEffect(() => {
        if (!token) return;

        const fetchLeads = async () => {
            const query = new URLSearchParams({
                page,
                limit: 10,
                search: debouncedSearch,
                status: statusFilter,
                sort,
            });

            try {
                const res = await fetch(`http://localhost:5000/api/leads?${query}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const data = await res.json();
                setLeads(data.leads || []);
                setTotalPages(data.pages || 1);
            } catch (error) {
                console.error(error);
            }
        };

        fetchLeads();
    }, [page, debouncedSearch, statusFilter, sort, token]);

    const getStatusVariant = (status) => {
        switch (status) {
            case 'New': return 'secondary';
            case 'Engaged': return 'default';
            case 'Proposal': return 'outline';
            case 'Closed': return 'default'; // Using default for now, could be green custom
            case 'Lost': return 'destructive';
            default: return 'outline';
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <h2 className="text-3xl font-bold tracking-tight">Leads</h2>
            </div>

            <Card>
                <CardContent className="p-4 space-y-4">
                    <div className="flex flex-col md:flex-row gap-4">
                        <Input
                            placeholder="Search name or email..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="md:w-64"
                        />
                        <Select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="md:w-40"
                        >
                            <option value="All">All Statuses</option>
                            <option value="New">New</option>
                            <option value="Engaged">Engaged</option>
                            <option value="Proposal">Proposal</option>
                            <option value="Closed">Closed</option>
                            <option value="Lost">Lost</option>
                        </Select>
                        <Select
                            value={sort}
                            onChange={(e) => setSort(e.target.value)}
                            className="md:w-40"
                        >
                            <option value="createdAt:desc">Newest First</option>
                            <option value="createdAt:asc">Oldest First</option>
                            <option value="score:desc">Highest Score</option>
                        </Select>
                    </div>

                    {/* Desktop View: Table */}
                    <div className="hidden md:block rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {leads.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={5} className="text-center h-24">
                                            No leads found.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    leads.map((lead) => (
                                        <TableRow key={lead._id}>
                                            <TableCell className="font-medium">{lead.name}</TableCell>
                                            <TableCell>{lead.email}</TableCell>
                                            <TableCell>
                                                <Badge variant={getStatusVariant(lead.status)}>{lead.status}</Badge>
                                            </TableCell>
                                            <TableCell>{new Date(lead.createdAt).toLocaleDateString()}</TableCell>
                                            <TableCell className="text-right">
                                                <Link to={`/leads/${lead._id}`}>
                                                    <Button variant="ghost" size="sm">View</Button>
                                                </Link>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>

                    {/* Mobile View: Cards */}
                    <div className="md:hidden space-y-4">
                        {leads.length === 0 ? (
                            <div className="text-center py-8 text-muted-foreground">No leads found.</div>
                        ) : (
                            leads.map((lead) => (
                                <div key={lead._id} className="border rounded-lg p-4 space-y-3 bg-card shadow-sm">
                                    <div className="flex justify-between items-start gap-4">
                                        <div className="min-w-0 flex-1">
                                            <div className="font-semibold truncate">{lead.name}</div>
                                            <div className="text-sm text-muted-foreground truncate">{lead.email}</div>
                                        </div>
                                        <Badge variant={getStatusVariant(lead.status)} className="shrink-0">{lead.status}</Badge>
                                    </div>
                                    <div className="flex justify-between items-center text-sm text-muted-foreground">
                                        <div>{new Date(lead.createdAt).toLocaleDateString()}</div>
                                        <Link to={`/leads/${lead._id}`}>
                                            <Button variant="outline" size="sm">View Details</Button>
                                        </Link>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Pagination */}
                    <div className="flex items-center justify-between">
                        <div className="text-sm text-muted-foreground">
                            Page {page} of {totalPages}
                        </div>
                        <div className="space-x-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setPage((p) => Math.max(1, p - 1))}
                                disabled={page === 1}
                            >
                                Previous
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                                disabled={page === totalPages}
                            >
                                Next
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default LeadsPage;
