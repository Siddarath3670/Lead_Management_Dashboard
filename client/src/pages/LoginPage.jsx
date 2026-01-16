import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { LayoutGrid } from 'lucide-react';

const LoginPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const endpoint = isLogin ? 'login' : 'register';
        const body = isLogin ? { email, password } : { name, email, password };

        try {
            const res = await fetch(`http://localhost:5000/api/auth/${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });

            const data = await res.json();

            if (res.ok) {
                localStorage.setItem('user', JSON.stringify(data));
                navigate('/dashboard');
            } else {
                setError(data.message || 'Authentication failed');
            }
        } catch (err) {
            setError('Server error. Ensure backend is running.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-white font-sans">
            <Card className="w-full max-w-md shadow-2xl border-0 bg-white">
                <CardHeader className="space-y-4 text-center pb-6">
                    <div className="flex justify-center">
                        <div className="h-12 w-12 bg-primary/10 rounded-xl flex items-center justify-center">
                            <LayoutGrid className="h-6 w-6 text-primary" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <CardTitle className="text-2xl font-bold tracking-tight text-foreground font-heading">
                            {isLogin ? 'Welcome to LeadManager' : 'Create an Account'}
                        </CardTitle>
                        <CardDescription className="text-muted-foreground">
                            {isLogin ? 'Sign in to access your lead management dashboard' : 'Enter your details to create your account'}
                        </CardDescription>
                    </div>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-4">
                        {error && (
                            <div className="bg-destructive/10 text-destructive p-3 rounded-md text-sm border border-destructive/20">
                                {error}
                            </div>
                        )}

                        {!isLogin && (
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-foreground">Full Name</label>
                                <Input
                                    className="bg-secondary/20 border-border focus:border-primary focus:ring-primary"
                                    placeholder="John Doe"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-foreground">Email</label>
                            <Input
                                className="bg-secondary/20 border-border focus:border-primary focus:ring-primary"
                                type="email"
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-foreground">Password</label>
                            <Input
                                className="bg-secondary/20 border-border focus:border-primary focus:ring-primary"
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-4 pt-2">
                        <Button type="submit" className="w-full shadow-lg hover:shadow-xl transition-all h-10 text-base font-medium">
                            {isLogin ? 'Sign In' : 'Sign Up'}
                        </Button>

                        {isLogin && (
                            <div className="w-full bg-secondary/30 p-4 rounded-lg text-sm text-muted-foreground space-y-1">
                                <p className="font-semibold text-foreground">Demo Credentials:</p>
                                <p>Email: <span className="font-mono text-primary">admin@example.com</span></p>
                                <p>Password: <span className="font-mono text-primary">password123</span></p>
                            </div>
                        )}

                        <div className="text-center text-sm text-muted-foreground">
                            <span>
                                {isLogin ? "Don't have an account? " : "Already have an account? "}
                            </span>
                            <button
                                type="button"
                                onClick={() => { setIsLogin(!isLogin); setError(''); }}
                                className="font-semibold text-primary hover:underline focus:outline-none"
                            >
                                {isLogin ? 'Sign Up' : 'Log In'}
                            </button>
                        </div>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
};

export default LoginPage;
