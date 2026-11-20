import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { LogIn, UserPlus, ShieldAlert, GraduationCap, Briefcase, Users } from 'lucide-react';
import { useGameStore } from '../store';
import { supabase } from '../supabaseClient';
import { projectId } from '../../../utils/supabase/info';

export function AuthView() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setLocalRole] = useState('student');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const { setUser, setRole } = useGameStore();

    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        // 1. Authenticate with Supabase
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        
        if (error) throw error;
        
        // 2. Fetch role from user metadata
        const userRole = data.user?.user_metadata?.role || 'student';
        setRole(userRole);

        navigate('/');
      } else {
        // 1. Sign up through our server to set user_metadata and auto-confirm
        const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-0615a924/signup`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password, name, role }),
        });
        
        const result = await response.json();
        
        if (!response.ok) {
          throw new Error(result.error || 'Signup failed. Did you deploy the edge function?');
        }

        // 2. Auto-login after signup
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        
        if (signInError) throw signInError;

        setRole(role);

        // 3. Route appropriately
        if (role === 'student') {
          setUser({ name: name || 'Tiger', emblem: 'User', color: '#F76902' });
          navigate('/onboarding');
        } else {
          navigate('/');
        }
      }
    } catch (err: any) {
      alert(`Supabase Error: ${err.message}\n\nFalling back to Dev Bypass Mode for testing!`);
      
      // FALLBACK TO DEV MODE SO WE DONT GET STUCK
      setRole(isLogin ? 'student' : role);
      if (!isLogin && role === 'student') {
        setUser({ name: name || 'Tiger', emblem: 'User', color: '#F76902' });
        navigate('/onboarding');
      } else if (isLogin) {
        navigate('/');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-app-bg p-4">
      <div className="w-full max-w-md bg-card-surface border border-desktop-bg rounded-3xl p-8 shadow-xl relative overflow-hidden">
        
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-rit-orange/10 rounded-full blur-3xl z-0" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-rit-orange/10 rounded-full blur-3xl z-0" />
        
        <div className="relative z-10">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-extrabold text-primary-text mb-2 tracking-tight">
              {isLogin ? 'Welcome Back' : 'Join Tiger Trail'}
            </h1>
            <p className="text-secondary-text text-sm">
              Sign in or create an account to securely access your data across devices.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <>
                <div>
                  <label className="block text-xs font-bold text-muted-text uppercase tracking-wider mb-1.5">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-desktop-bg border border-progress-track rounded-xl px-4 py-3 text-primary-text focus:outline-none focus:border-rit-orange transition-colors"
                    placeholder="Jane Doe"
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-bold text-muted-text uppercase tracking-wider mb-1.5">Account Role</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <button
                      type="button"
                      onClick={() => setLocalRole('student')}
                      className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all ${role === 'student' ? 'border-rit-orange bg-rit-orange/10 text-rit-orange' : 'border-transparent bg-desktop-bg text-secondary-text hover:bg-progress-track'}`}
                    >
                      <GraduationCap size={20} className="mb-1" />
                      <span className="text-[10px] font-bold uppercase tracking-wider">Student</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setLocalRole('advisor')}
                      className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all ${role === 'advisor' ? 'border-rit-orange bg-rit-orange/10 text-rit-orange' : 'border-transparent bg-desktop-bg text-secondary-text hover:bg-progress-track'}`}
                    >
                      <Briefcase size={20} className="mb-1" />
                      <span className="text-[10px] font-bold uppercase tracking-wider">Advisor</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setLocalRole('peer-mentor')}
                      className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all ${role === 'peer-mentor' ? 'border-rit-orange bg-rit-orange/10 text-rit-orange' : 'border-transparent bg-desktop-bg text-secondary-text hover:bg-progress-track'}`}
                    >
                      <Users size={20} className="mb-1" />
                      <span className="text-[10px] font-bold uppercase tracking-wider">Peer Mentor</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setLocalRole('it')}
                      className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all ${role === 'it' ? 'border-rit-orange bg-rit-orange/10 text-rit-orange' : 'border-transparent bg-desktop-bg text-secondary-text hover:bg-progress-track'}`}
                    >
                      <ShieldAlert size={20} className="mb-1" />
                      <span className="text-[10px] font-bold uppercase tracking-wider">IT Admin</span>
                    </button>
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="block text-xs font-bold text-muted-text uppercase tracking-wider mb-1.5">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-desktop-bg border border-progress-track rounded-xl px-4 py-3 text-primary-text focus:outline-none focus:border-rit-orange transition-colors"
                placeholder="you@rit.edu"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-muted-text uppercase tracking-wider mb-1.5">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-desktop-bg border border-progress-track rounded-xl px-4 py-3 text-primary-text focus:outline-none focus:border-rit-orange transition-colors"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-rit-orange text-white font-extrabold text-lg py-4 rounded-xl shadow-lg shadow-rit-orange/30 hover:-translate-y-1 transition-all disabled:opacity-50 disabled:hover:translate-y-0 flex items-center justify-center gap-2 mt-6"
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : isLogin ? (
                <><LogIn size={20} /> Sign In</>
              ) : (
                <><UserPlus size={20} /> Create Account</>
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-secondary-text hover:text-rit-orange font-bold text-sm transition-colors"
            >
              {isLogin ? "Want to test an Admin role? Create Account" : "Already have an account? Sign in"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
