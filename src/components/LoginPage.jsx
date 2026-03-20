import React, { useState, useEffect } from 'react';
import { User, Lock, Moon, Sun, Mail, Zap } from 'lucide-react';

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
  const [loginMode, setLoginMode] = useState('login'); // 'login', 'signup', 'magic'
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [localShowUnverified, setLocalShowUnverified] = useState(showUnverifiedEmailNotification);
  const [sendingMagic, setSendingMagic] = useState(false);
  const [magicRole, setMagicRole] = useState('student'); // Role selection for magic link

  useEffect(() => {
    setLocalShowUnverified(showUnverifiedEmailNotification);
  }, [showUnverifiedEmailNotification]);

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-[#0f172a] animate-mesh bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900' : 'animate-mesh bg-gradient-to-br from-indigo-50 via-white to-purple-50'} flex items-center justify-center p-4 sm:p-6 transition-colors duration-700 overflow-hidden relative`}>
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full blur-[120px] mix-blend-screen animate-float-slow opacity-30 ${darkMode ? 'bg-indigo-600' : 'bg-indigo-300'}`}></div>
        <div className={`absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full blur-[120px] mix-blend-screen animate-float-slow animation-delay-2000 opacity-30 ${darkMode ? 'bg-purple-600' : 'bg-purple-300'}`}></div>
        <div className={`absolute top-[20%] right-[10%] w-[20%] h-[20%] rounded-full blur-[80px] mix-blend-screen animate-pulse opacity-20 ${darkMode ? 'bg-blue-500' : 'bg-blue-200'}`}></div>
      </div>

      <div className={`w-full max-w-lg relative z-10 animate-scale-in`}>
        {/* Glass Card */}
        <div className={`${darkMode ? 'bg-white/5 border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.8)]' : 'bg-white/40 border-white/40 shadow-[0_8px_32px_0_rgba(31,38,135,0.1)]'} backdrop-blur-xl rounded-[2.5rem] border p-6 sm:p-10 transition-all duration-500`}>

          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg transform -rotate-6 animate-float">
                <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <h2 className={`text-2xl sm:text-3xl font-black tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                Portfolio<span className="text-indigo-500">.</span>
              </h2>
            </div>
            <button
              onClick={toggleDarkMode}
              className={`p-3 rounded-2xl ${darkMode ? 'bg-white/10 text-yellow-400 hover:bg-white/20' : 'bg-slate-900/5 text-slate-600 hover:bg-slate-900/10'} transition-all duration-300 hover:scale-110 active:scale-95`}
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>

          <div className="mb-8">
            <h1 className={`text-3xl sm:text-4xl font-extrabold mb-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              {loginMode === 'login' ? 'Welcome Back' : loginMode === 'signup' ? 'Get Started' : 'Magic Entry'}
            </h1>
            <p className={`${darkMode ? 'text-slate-400' : 'text-slate-600'} text-base font-medium`}>
              {loginMode === 'login' ? 'Sign in to your creative workspace' : loginMode === 'signup' ? 'Join our community of student creators' : 'Enter your email for a passwordless login'}
            </p>
          </div>

        {localShowUnverified && (
          <div className={`mb-3 sm:mb-4 p-2 sm:p-3 ${darkMode ? 'bg-red-900/20 border-red-800 text-red-300' : 'bg-red-50 border-red-200 text-red-800'} border rounded-lg flex flex-col items-center gap-1 sm:gap-2 text-xs sm:text-sm`}>
            <p>Your email is not verified. Please check your inbox for a confirmation link.</p>
            <button
              onClick={() => handleResendVerification(unverifiedEmail)}
              className="font-semibold underline text-xs sm:text-sm"
            >
              Resend Verification Email
            </button>
          </div>
        )}

        {/* Three tabs: Login, Magic Link, Sign Up */}
        <div className={`flex mb-8 ${darkMode ? 'bg-white/5' : 'bg-slate-900/5'} rounded-2xl p-1.5 relative`}>
          <div
            className={`absolute top-1.5 bottom-1.5 transition-all duration-500 ease-out rounded-xl bg-indigo-600 shadow-lg shadow-indigo-500/30`}
            style={{
              width: 'calc(33.33% - 4px)',
              left: loginMode === 'login' ? '6px' : loginMode === 'magic' ? '33.33%' : '66.66%'
            }}
          ></div>
          <button
            onClick={() => { setLoginMode('login'); setLocalShowUnverified(false); }}
            className={`flex-1 py-3 rounded-xl transition-all duration-300 relative z-10 font-bold text-sm flex items-center justify-center gap-2 ${loginMode === 'login' ? 'text-white' : (darkMode ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900')}`}
          >
            <Lock className="w-4 h-4" />
            <span>Login</span>
          </button>
          <button
            onClick={() => { setLoginMode('magic'); setLocalShowUnverified(false); }}
            className={`flex-1 py-3 rounded-xl transition-all duration-300 relative z-10 font-bold text-sm flex items-center justify-center gap-2 ${loginMode === 'magic' ? 'text-white' : (darkMode ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900')}`}
          >
            <Zap className="w-4 h-4" />
            <span>Magic</span>
          </button>
          <button
            onClick={() => { setLoginMode('signup'); setLocalShowUnverified(false); }}
            disabled={!signupEnabled}
            className={`flex-1 py-3 rounded-xl transition-all duration-300 relative z-10 font-bold text-sm flex items-center justify-center gap-2 ${loginMode === 'signup' ? 'text-white' : (darkMode ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900')} ${!signupEnabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <User className="w-4 h-4" />
            <span>Sign Up</span>
          </button>
        </div>

        {!signupEnabled && loginMode === 'signup' && (
          <div className={`mb-4 p-3 ${darkMode ? 'bg-yellow-900/20 border-yellow-800 text-yellow-300' : 'bg-yellow-50 border-yellow-200 text-yellow-800'} border rounded-lg flex items-center gap-2 text-sm`}>
            <Lock className="w-4 h-4" />
            Student signup is currently disabled
          </div>
        )}

        <div className="space-y-5">
          {/* Sign Up Form - Name */}
          {loginMode === 'signup' && signupEnabled && (
            <div className="animate-slide-down relative group">
              <User className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${darkMode ? 'text-slate-500 group-focus-within:text-indigo-400' : 'text-slate-400 group-focus-within:text-indigo-500'}`} />
              <input
                type="text"
                placeholder="Full Name"
                className={`w-full py-4 pl-12 pr-4 bg-transparent border-2 ${darkMode ? 'border-white/10 text-white focus:border-indigo-500/50' : 'border-slate-200 text-slate-900 focus:border-indigo-500/50'} rounded-2xl transition-all duration-300 outline-none`}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
          )}

          {/* Email - always shown */}
          <div className="relative group">
            <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${darkMode ? 'text-slate-500 group-focus-within:text-indigo-400' : 'text-slate-400 group-focus-within:text-indigo-500'}`} />
            <input
              type="email"
              placeholder="Email address"
              className={`w-full py-4 pl-12 pr-4 bg-transparent border-2 ${darkMode ? 'border-white/10 text-white focus:border-indigo-500/50' : 'border-slate-200 text-slate-900 focus:border-indigo-500/50'} rounded-2xl transition-all duration-300 outline-none`}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          {/* Role selector for Magic Link */}
          {loginMode === 'magic' && (
            <div className={`flex p-1 ${darkMode ? 'bg-white/5' : 'bg-slate-900/5'} rounded-2xl animate-fade-in`}>
              <button
                type="button"
                onClick={() => setMagicRole('student')}
                className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-bold transition-all duration-300 ${
                  magicRole === 'student'
                    ? 'bg-white shadow-lg text-indigo-600'
                    : darkMode ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Student
              </button>
              <button
                type="button"
                onClick={() => setMagicRole('teacher')}
                className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-bold transition-all duration-300 ${
                  magicRole === 'teacher'
                    ? 'bg-white shadow-lg text-purple-600'
                    : darkMode ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Teacher
              </button>
            </div>
          )}

          {/* Password - only for login and signup */}
          {loginMode !== 'magic' && (
            <div className="animate-slide-down relative group">
              <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${darkMode ? 'text-slate-500 group-focus-within:text-indigo-400' : 'text-slate-400 group-focus-within:text-indigo-500'}`} />
              <input
                type="password"
                placeholder="Password"
                className={`w-full py-4 pl-12 pr-4 bg-transparent border-2 ${darkMode ? 'border-white/10 text-white focus:border-indigo-500/50' : 'border-slate-200 text-slate-900 focus:border-indigo-500/50'} rounded-2xl transition-all duration-300 outline-none`}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
          )}

          {/* Action Button */}
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
            className={`w-full py-4 rounded-2xl font-bold text-white shadow-xl transition-all duration-500 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden relative group ${
              loginMode === 'login' ? 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-500/25' :
              loginMode === 'magic' ? 'bg-purple-600 hover:bg-purple-700 shadow-purple-500/25' :
              'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-500/25'
            }`}
          >
            {/* Shimmer Effect */}
            <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

            <div className="flex items-center justify-center gap-3 relative z-10">
              {sendingMagic || isLoggingIn ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  {loginMode === 'login' ? 'Sign In' : loginMode === 'magic' ? 'Send Magic Link' : 'Create Account'}
                  <Zap className="w-5 h-5" />
                </>
              )}
            </div>
          </button>

          {/* Magic Link Help */}
          {loginMode === 'magic' && (
            <div className={`text-center text-xs sm:text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              <p>We'll send you a one-time login link to your email.</p>
              <p className="mt-1">No password needed! ✨</p>
            </div>
          )}
        </div>
      </div>
      </div>
    </div>
  );
};

export default LoginPage;
