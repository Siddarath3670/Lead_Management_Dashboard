import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';

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
        <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-[#caf0f8] via-[#ade8f4] to-[#90e0ef] overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-[#00b4d8]/20 rounded-full blur-[100px]" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-[#0077b6]/20 rounded-full blur-[100px]" />

            <Card className="w-full max-w-md shadow-2xl border-0 bg-white/80 backdrop-blur-xl relative z-10 transition-all duration-300">
                <CardHeader className="space-y-1 text-center pb-2">
                    <CardTitle className="text-3xl font-bold tracking-tight text-[#03045e]">
                        {isLogin ? 'Welcome Back' : 'Create Account'}
                    </CardTitle>
                    <CardDescription className="text-[#023e8a]/80">
                        {isLogin ? 'Enter your credentials to access your dashboard' : 'Sign up to start managing your leads'}
                    </CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-4">
                        {error && (
                            <div className="bg-[#caf0f8] text-[#03045e] p-3 rounded-md text-sm border border-[#90e0ef] animate-in fade-in slide-in-from-top-2">
                                {error}
                            </div>
                        )}

                        {!isLogin && (
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-[#03045e]">Full Name</label>
                                <Input
                                    className="bg-white/50 border-[#ade8f4] focus:border-[#0077b6] focus:ring-[#0077b6]"
                                    placeholder="John Doe"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-[#03045e]">Email</label>
                            <Input
                                className="bg-white/50 border-[#ade8f4] focus:border-[#0077b6] focus:ring-[#0077b6]"
                                type="email"
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-[#03045e]">Password</label>
                            <Input
                                className="bg-white/50 border-[#ade8f4] focus:border-[#0077b6] focus:ring-[#0077b6]"
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-4 pt-4">
                        <Button type="submit" className="w-full bg-[#0077b6] hover:bg-[#023e8a] text-white shadow-lg shadow-[#0077b6]/30 transition-all active:scale-[0.98]">
                            {isLogin ? 'Sign In' : 'Create Account'}
                        </Button>

                        <div className="text-center text-sm">
                            <span className="text-muted-foreground">
                                {isLogin ? "Don't have an account? " : "Already have an account? "}
                            </span>
                            <button
                                type="button"
                                onClick={() => { setIsLogin(!isLogin); setError(''); }}
                                className="font-semibold text-[#0077b6] hover:underline focus:outline-none"
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
