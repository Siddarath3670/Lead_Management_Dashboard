import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const LeadDetailsPage = () => {
    const { id } = useParams();
    const [lead, setLead] = useState(null);
    const [loading, setLoading] = useState(true);
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user?.token;

    useEffect(() => {
        if (!token) return;

        const fetchLead = async () => {
            try {
                const res = await fetch(`http://localhost:5000/api/leads/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                if (res.ok) {
                    const data = await res.json();
                    setLead(data);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchLead();
    }, [id, token]);

    if (loading) return <div>Loading details...</div>;
    if (!lead) return <div>Lead not found.</div>;

    return (
        <div className="space-y-6">
            <Link to="/leads">
                <Button variant="outline">← Back to Leads</Button>
            </Link>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle className="text-2xl">{lead.name}</CardTitle>
                        <p className="text-muted-foreground">{lead.email}</p>
                    </div>
                    <Badge className="text-lg px-3 py-1">{lead.status}</Badge>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="font-semibold mb-2">Contact Info</h3>
                            <div className="space-y-1 text-sm">
                                <p><span className="text-muted-foreground">Phone:</span> {lead.phone}</p>
                                <p><span className="text-muted-foreground">Company:</span> {lead.company}</p>
                                <p><span className="text-muted-foreground">Source:</span> {lead.source}</p>
                            </div>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-2">Lead Scoring</h3>
                            <div className="text-3xl font-bold">{lead.score}</div>
                            <p className="text-xs text-muted-foreground">Automated engagement score</p>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-2">Timeline</h3>
                        <div className="text-sm text-muted-foreground">
                            Created on {new Date(lead.createdAt).toLocaleString()}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default LeadDetailsPage;
