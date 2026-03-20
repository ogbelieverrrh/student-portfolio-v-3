import React, { useState, useEffect } from 'react';
import { User, Lock, Moon, Sun, Mail, Zap, GraduationCap, Sparkles, ArrowRight, MailOpen } from 'lucide-react';

const LoginPage = ({
  darkMode,
  toggleDarkMode,
  showNotification,
  signupEnabled,
  handleSignup,
  handleLogin,
  handleResendVerification,
  handleMagicLink,
  showUnverifiedEmailNotification,
  unverifiedEmail,
  isLoggingIn,
}) => {
  const [loginMode, setLoginMode] = useState('login');
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [localShowUnverified, setLocalShowUnverified] = useState(showUnverifiedEmailNotification);
  const [sendingMagic, setSendingMagic] = useState(false);
  const [magicRole, setMagicRole] = useState('student');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setLocalShowUnverified(showUnverifiedEmailNotification);
  }, [showUnverifiedEmailNotification]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 20,
        y: (e.clientY / window.innerHeight) * 20,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className={`min-h-screen relative overflow-hidden ${darkMode ? 'bg-gray-950' : 'bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900'}`}>
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Orbs */}
        <div 
          className="absolute w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse"
          style={{ 
            top: '10%', 
            left: '10%', 
            transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
            animationDuration: '8s'
          }}
        />
        <div 
          className="absolute w-80 h-80 bg-pink-500/25 rounded-full blur-3xl animate-pulse"
          style={{ 
            bottom: '20%', 
            right: '15%', 
            transform: `translate(${-mousePosition.x}px, ${-mousePosition.y}px)`,
            animationDuration: '10s',
            animationDelay: '2s'
          }}
        />
        <div 
          className="absolute w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl animate-pulse"
          style={{ 
            top: '50%', 
            left: '50%', 
            transform: `translate(${-mousePosition.x * 1.5}px, ${mousePosition.y * 1.5}px)`,
            animationDuration: '12s',
            animationDelay: '4s'
          }}
        />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />
      </div>

      {/* Main Container */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        {/* Login Card */}
        <div 
          className="w-full max-w-md"
          style={{ transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)` }}
        >
          {/* Header Section */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-2xl mb-4 shadow-2xl shadow-purple-500/30 animate-bounce" style={{ animationDuration: '3s' }}>
              <GraduationCap className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">
              Student<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-pink-400">Portfolio</span>
            </h1>
            <p className="text-gray-400 text-lg">Showcase your brilliance to the world</p>
          </div>

          {/* Verification Warning */}
          {localShowUnverified && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-xl backdrop-blur-sm animate-shake">
              <div className="flex items-center gap-3 text-red-300">
                <MailOpen className="w-5 h-5 flex-shrink-0" />
                <p className="text-sm">Please verify your email. Check your inbox for the confirmation link.</p>
              </div>
              <button
                onClick={() => handleResendVerification(unverifiedEmail)}
                className="mt-2 text-sm text-red-200 underline hover:text-white transition-colors"
              >
                Resend verification email
              </button>
            </div>
          )}

          {/* Main Card */}
          <div className={`backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden ${darkMode ? 'bg-gray-900/80' : 'bg-white/10'}`}>
            {/* Tab Navigation */}
            <div className="flex p-2 gap-2">
              {[
                { id: 'login', icon: Lock, label: 'Welcome Back' },
                { id: 'magic', icon: Zap, label: 'Magic Link' },
                { id: 'signup', icon: Sparkles, label: 'Join Us' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => tab.id !== 'signup' || signupEnabled ? (setLoginMode(tab.id), setLocalShowUnverified(false)) : null}
                  disabled={tab.id === 'signup' && !signupEnabled}
                  className={`flex-1 relative py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-300 ${
                    loginMode === tab.id 
                      ? 'text-white' 
                      : `${darkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-300 hover:text-white'}`
                  } ${tab.id === 'signup' && !signupEnabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  {loginMode === tab.id && (
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-lg shadow-purple-500/25" />
                  )}
                  <span className="relative flex items-center justify-center gap-2">
                    <tab.icon className="w-4 h-4" />
                    {tab.label}
                  </span>
                </button>
              ))}
            </div>

            {/* Form Section */}
            <div className="p-6 sm:p-8">
              {/* Sign Up Name Field */}
              {loginMode === 'signup' && signupEnabled && (
                <div className="mb-4 animate-slide-down">
                  <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Enter your full name"
                      className="w-full py-3 pl-12 pr-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                </div>
              )}

              {/* Email Field */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full py-3 pl-12 pr-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              {/* Role Selector for Magic Link */}
              {loginMode === 'magic' && (
                <div className="mb-4 animate-fade-in">
                  <label className="block text-sm font-medium text-gray-300 mb-2">I am a</label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { id: 'student', label: 'Student', icon: User, color: 'from-indigo-500 to-purple-500' },
                      { id: 'teacher', label: 'Teacher', icon: GraduationCap, color: 'from-pink-500 to-rose-500' }
                    ].map((role) => (
                      <button
                        key={role.id}
                        type="button"
                        onClick={() => setMagicRole(role.id)}
                        className={`relative py-3 px-4 rounded-xl border transition-all duration-300 overflow-hidden ${
                          magicRole === role.id
                            ? 'border-transparent'
                            : 'border-white/10 hover:border-white/30'
                        }`}
                      >
                        {magicRole === role.id && (
                          <div className={`absolute inset-0 bg-gradient-to-r ${role.color}`} />
                        )}
                        <span className={`relative flex items-center justify-center gap-2 font-medium ${
                          magicRole === role.id ? 'text-white' : 'text-gray-400'
                        }`}>
                          <role.icon className="w-4 h-4" />
                          {role.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Password Field */}
              {loginMode !== 'magic' && (
                <div className={`mb-6 ${loginMode === 'signup' ? 'animate-slide-down' : ''}`}>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="password"
                      placeholder="Enter your password"
                      className="w-full py-3 pl-12 pr-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <button
                onClick={async () => {
                  if (loginMode === 'signup' && signupEnabled) {
                    const success = await handleSignup(formData.name, formData.email, formData.password, 'student', false);
                    if (success) {
                      setFormData({ name: '', email: '', password: '' });
                      setLoginMode('login');
                    }
                  } else if (loginMode === 'login') {
                    handleLogin(formData.email, formData.password);
                  } else if (loginMode === 'magic') {
                    setSendingMagic(true);
                    await handleMagicLink(formData.email, magicRole);
                    setSendingMagic(false);
                  }
                }}
                disabled={(loginMode === 'signup' && !signupEnabled) || sendingMagic || isLoggingIn}
                className="w-full relative py-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-semibold rounded-xl shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none overflow-hidden group"
              >
                <span className="relative flex items-center justify-center gap-2">
                  {sendingMagic || isLoggingIn ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Please wait...</span>
                    </>
                  ) : (
                    <>
                      {loginMode === 'login' ? 'Sign In' : loginMode === 'magic' ? 'Send Magic Link' : 'Create Account'}
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </span>
              </button>

              {/* Magic Link Help */}
              {loginMode === 'magic' && (
                <div className="mt-4 text-center animate-fade-in">
                  <p className="text-gray-400 text-sm">
                    We'll send you a <span className="text-purple-400 font-semibold">magic link</span> to your email.
                  </p>
                  <p className="text-gray-500 text-xs mt-1">No password needed • Just click and login</p>
                </div>
              )}

              {/* Signup Disabled Notice */}
              {!signupEnabled && loginMode === 'signup' && (
                <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
                  <p className="text-yellow-400 text-sm text-center flex items-center justify-center gap-2">
                    <Lock className="w-4 h-4" />
                    New student registrations are currently disabled
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-8">
            <p className="text-gray-500 text-sm">
              © 2026 Student Portfolio. All rights reserved.
            </p>
          </div>
        </div>
      </div>

      {/* Dark Mode Toggle */}
      <button
        onClick={toggleDarkMode}
        className="absolute top-4 right-4 p-3 bg-white/10 backdrop-blur-sm rounded-xl text-white hover:bg-white/20 transition-all duration-300 hover:scale-110"
      >
        {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </button>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default LoginPage;
