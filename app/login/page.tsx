'use strict';
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle, 
  KeyRound,
  ShieldCheck,
  Shield,
  Scale,
  Key,
  Server,
  ArrowLeft,
  Radio,
  ShieldAlert,
  Smartphone
} from 'lucide-react';
import Logo from '@/components/Logo';
import CaptchaWidget from '@/components/CaptchaWidget';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isCaptchaValid, setIsCaptchaValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!isCaptchaValid) {
      setErrorMessage('Please complete the security verification code.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setLoginSuccess(true);
      if (typeof window !== 'undefined') {
        const isCso = email.toLowerCase().includes('cso') || email.toLowerCase().includes('executive');
        const isGuard = email.toLowerCase().includes('guard') || email.toLowerCase().includes('field') || email.toLowerCase().includes('officer');
        const isAuditor = email.toLowerCase().includes('auditor') || email.toLowerCase().includes('compliance') || email.toLowerCase().includes('audit');
        const isAdmin = email.toLowerCase().includes('admin') && !email.toLowerCase().includes('super') || email.toLowerCase().includes('devops') || email.toLowerCase().includes('infra');
        const isSuperAdmin = email.toLowerCase().includes('super') || email.toLowerCase().includes('governance');
        const isEmployee = email.toLowerCase().includes('employee') || email.toLowerCase().includes('contractor') || email.toLowerCase().includes('portal') || email.toLowerCase().includes('staff');
        const userData = {
          name: isEmployee ? 'Elena Rostova, Staff Systems Architect' : (isSuperAdmin ? 'Victoria Sterling, Chief Governance Officer' : (isCso ? 'Helena Vance' : (isGuard ? 'Officer Marcus Sterling' : (isAuditor ? 'Evelyn Archer, CISA' : (isAdmin ? 'Devon Vance, Lead DevOps' : (email.toLowerCase().includes('analyst') ? 'Alex Mercer' : email.split('@')[0])))))),
          email: email,
          role: isEmployee ? 'Employee / Contractor' : (isSuperAdmin ? 'Platform Super Admin' : (isCso ? 'Chief Security Officer (CSO)' : (isGuard ? 'Security Guard / Field Officer' : (isAuditor ? 'Compliance Auditor' : (isAdmin ? 'IT Administrator' : 'Security Analyst (GSOC)')))))
        };
        localStorage.setItem('redfort_user', JSON.stringify(userData));
        window.dispatchEvent(new Event('redfort_auth_change'));
      }
    }, 1000);
  };

  const handleAutoFillAnalyst = () => {
    setEmail('analyst@redfort.enterprise');
    setPassword('RedFort@2026#Secure');
    setErrorMessage('');
  };

  const handleAutoFillCSO = () => {
    setEmail('cso@redfort.enterprise');
    setPassword('RedFort@2026#Executive');
    setErrorMessage('');
  };

  const handleAutoFillGuard = () => {
    setEmail('guard@redfort.enterprise');
    setPassword('RedFort@2026#Guard');
    setErrorMessage('');
  };

  const handleAutoFillAuditor = () => {
    setEmail('auditor@redfort.enterprise');
    setPassword('RedFort@2026#Auditor');
    setErrorMessage('');
  };

  const handleAutoFillAdmin = () => {
    setEmail('admin@redfort.enterprise');
    setPassword('RedFort@2026#Admin');
    setErrorMessage('');
  };

  const handleAutoFillSuperAdmin = () => {
    setEmail('superadmin@redfort.enterprise');
    setPassword('RedFort@2026#Governance');
    setErrorMessage('');
  };

  const handleAutoFillEmployee = () => {
    setEmail('employee@redfort.enterprise');
    setPassword('RedFort@2026#Employee');
    setErrorMessage('');
  };

  const isCsoUser = email.toLowerCase().includes('cso') || email.toLowerCase().includes('executive');
  const isGuardUser = email.toLowerCase().includes('guard') || email.toLowerCase().includes('field') || email.toLowerCase().includes('officer');
  const isAuditorUser = email.toLowerCase().includes('auditor') || email.toLowerCase().includes('compliance') || email.toLowerCase().includes('audit');
  const isAdminUser = email.toLowerCase().includes('admin') && !email.toLowerCase().includes('super') || email.toLowerCase().includes('devops') || email.toLowerCase().includes('infra');
  const isSuperAdminUser = email.toLowerCase().includes('super') || email.toLowerCase().includes('governance');
  const isEmployeeUser = email.toLowerCase().includes('employee') || email.toLowerCase().includes('contractor') || email.toLowerCase().includes('portal') || email.toLowerCase().includes('staff');

  const redirectUrl = isEmployeeUser ? '/dashboard/portal' : (isSuperAdminUser ? '/dashboard/governance' : (isCsoUser ? '/dashboard/cso' : (isGuardUser ? '/dashboard/guard' : (isAuditorUser ? '/dashboard/auditor' : (isAdminUser ? '/dashboard/admin' : '/dashboard')))));
  const redirectLabel = isEmployeeUser ? 'Enter Employee Self-Service Portal' : (isSuperAdminUser ? 'Enter Platform Governance Console' : (isCsoUser ? 'Enter CSO Executive Console' : (isGuardUser ? 'Enter Field Operations Console' : (isAuditorUser ? 'Enter Compliance Auditor Console' : (isAdminUser ? 'Enter IT Administrator Console' : 'Enter GSOC Command Center')))));
  const redirectDesc = isEmployeeUser ? 'Launching Employee Digital Badge & Safety Portal...' : (isSuperAdminUser ? 'Launching Super Admin & Platform Governance Console...' : (isCsoUser ? 'Launching Chief Security Officer (CSO) Console...' : (isGuardUser ? 'Launching Security Guard Field Operations Console...' : (isAuditorUser ? 'Launching Compliance Auditor & Evidence Vault...' : (isAdminUser ? 'Launching IT Infrastructure & IAM Console...' : 'Launching Security Analyst GSOC Console...')))));

  return (
    <div className="min-h-screen w-full bg-[#0B0F19] text-white flex flex-col justify-between p-4 sm:p-6 lg:p-8 relative overflow-hidden selection:bg-[#F5762E] selection:text-white">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-[#F5762E]/10 blur-[130px] pointer-events-none rounded-full"></div>

      {/* Top Bar with Home Link */}
      <div className="w-full max-w-md mx-auto flex items-center justify-between relative z-10">
        <Link 
          href="/" 
          className="inline-flex items-center space-x-1.5 text-xs text-[#94A3B8] hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
      </div>

      {/* Center Card */}
      <div className="w-full max-w-md mx-auto my-auto py-6 relative z-10 space-y-6">
        
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-block focus:outline-none">
            <Logo variant="full" theme="dark" size="md" showSubtitle={false} />
          </Link>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            Sign in to Console
          </h1>
          <p className="text-xs text-[#94A3B8]">
            Access your unified security command center
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-[#111827] border border-[#1F2937] rounded-xl p-5 sm:p-7 shadow-2xl space-y-4">
          
          {/* Quick Demo Auto-Fill Buttons */}
          <div className="space-y-1.5">
            <div className="text-[10px] font-semibold text-[#64748B] uppercase tracking-wider text-center">
              Quick Demo Auto-Fill
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              <button
                type="button"
                onClick={handleAutoFillAnalyst}
                className="w-full py-1.5 px-2 rounded-lg bg-[#F5762E]/10 hover:bg-[#F5762E]/20 border border-[#F5762E]/30 hover:border-[#F5762E] text-[#F5762E] text-[11px] font-mono font-semibold flex items-center justify-center space-x-1.5 transition-all cursor-pointer truncate"
              >
                <KeyRound className="w-3 h-3 shrink-0" />
                <span className="truncate">GSOC Analyst</span>
              </button>
              
              <button
                type="button"
                onClick={handleAutoFillCSO}
                className="w-full py-1.5 px-2 rounded-lg bg-[#38BDF8]/10 hover:bg-[#38BDF8]/20 border border-[#38BDF8]/30 hover:border-[#38BDF8] text-[#38BDF8] text-[11px] font-mono font-semibold flex items-center justify-center space-x-1.5 transition-all cursor-pointer truncate"
              >
                <ShieldCheck className="w-3 h-3 shrink-0" />
                <span className="truncate">CSO Executive</span>
              </button>

              <button
                type="button"
                onClick={handleAutoFillGuard}
                className="w-full py-1.5 px-2 rounded-lg bg-[#22C55E]/10 hover:bg-[#22C55E]/20 border border-[#22C55E]/30 hover:border-[#22C55E] text-[#22C55E] text-[11px] font-mono font-semibold flex items-center justify-center space-x-1.5 transition-all cursor-pointer truncate"
              >
                <Radio className="w-3 h-3 shrink-0" />
                <span className="truncate">Field Officer</span>
              </button>

              <button
                type="button"
                onClick={handleAutoFillAuditor}
                className="w-full py-1.5 px-2 rounded-lg bg-[#818CF8]/10 hover:bg-[#818CF8]/20 border border-[#818CF8]/30 hover:border-[#818CF8] text-[#818CF8] text-[11px] font-mono font-semibold flex items-center justify-center space-x-1.5 transition-all cursor-pointer truncate"
              >
                <Scale className="w-3 h-3 shrink-0" />
                <span className="truncate">Auditor</span>
              </button>

              <button
                type="button"
                onClick={handleAutoFillAdmin}
                className="w-full py-1.5 px-2 rounded-lg bg-[#38BDF8]/10 hover:bg-[#38BDF8]/20 border border-[#38BDF8]/30 hover:border-[#38BDF8] text-[#38BDF8] text-[11px] font-mono font-semibold flex items-center justify-center space-x-1.5 transition-all cursor-pointer truncate"
              >
                <Key className="w-3 h-3 shrink-0" />
                <span className="truncate">IT Admin</span>
              </button>

              <button
                type="button"
                onClick={handleAutoFillSuperAdmin}
                className="w-full py-1.5 px-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 hover:border-rose-500 text-rose-400 text-[11px] font-mono font-semibold flex items-center justify-center space-x-1.5 transition-all cursor-pointer truncate"
              >
                <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">Super Admin</span>
              </button>

              <button
                type="button"
                onClick={handleAutoFillEmployee}
                className="w-full py-1.5 px-2 rounded-lg bg-[#F5762E]/10 hover:bg-[#F5762E]/20 border border-[#F5762E]/30 hover:border-[#F5762E] text-[#F5762E] text-[11px] font-mono font-semibold flex items-center justify-center space-x-1.5 transition-all cursor-pointer truncate col-span-2 sm:col-span-3"
              >
                <Smartphone className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">Employee / Contractor Portal</span>
              </button>
            </div>
          </div>
          
          {loginSuccess ? (
            <div className="text-center space-y-4 py-6">
              <div className="w-12 h-12 rounded-full bg-[#22C55E]/15 text-[#22C55E] border border-[#22C55E]/30 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Authenticated</h3>
                <p className="text-xs text-[#94A3B8] mt-1 font-mono">
                  {redirectDesc}
                </p>
              </div>
              <div className="pt-2">
                <Link
                  href={redirectUrl}
                  className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-lg bg-[#F5762E] hover:bg-[#FF9A5A] text-white text-xs font-semibold transition-all shadow-md"
                >
                  <span>{redirectLabel}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleLogin} className="space-y-4">
              
              {errorMessage && (
                <div className="p-3 rounded-lg bg-[#EF4444]/10 border border-[#EF4444]/30 text-xs text-[#EF4444] flex items-center space-x-2">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Work Email */}
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-slate-300">
                  Work Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#64748B] absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="analyst@company.com"
                    className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-[#0B0F19] border border-[#1F2937] text-xs text-white placeholder-[#64748B] focus:outline-none focus:border-[#F5762E] transition-colors"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <label className="font-medium text-slate-300">
                    Password
                  </label>
                  <a href="#forgot" className="text-[11px] text-[#F5762E] hover:underline">
                    Forgot?
                  </a>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#64748B] absolute left-3 top-3" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-9 pr-10 py-2.5 rounded-lg bg-[#0B0F19] border border-[#1F2937] text-xs text-white placeholder-[#64748B] focus:outline-none focus:border-[#F5762E] transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-[#64748B] hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center text-xs text-[#94A3B8]">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-3.5 h-3.5 rounded border-[#1F2937] bg-[#0B0F19] text-[#F5762E] focus:ring-[#F5762E]"
                  />
                  <span>Remember this device</span>
                </label>
              </div>

              {/* Captcha */}
              <div className="pt-2 border-t border-[#1F2937]/80">
                <CaptchaWidget onValidate={setIsCaptchaValid} />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 rounded-lg bg-[#F5762E] hover:bg-[#FF9A5A] text-white font-semibold text-xs tracking-wide transition-all shadow-md flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50 mt-2"
              >
                {isLoading ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              {/* Divider */}
              <div className="relative my-3">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#1F2937]"></div>
                </div>
                <div className="relative flex justify-center text-[10px] uppercase">
                  <span className="bg-[#111827] px-2 text-[#64748B]">Or continue with</span>
                </div>
              </div>

              {/* SSO Buttons */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => alert('Redirecting to Okta SSO...')}
                  className="py-2 px-3 rounded-lg bg-[#0B0F19] border border-[#1F2937] hover:border-[#F5762E] text-slate-300 hover:text-white flex items-center justify-center space-x-1.5 transition-colors cursor-pointer"
                >
                  <KeyRound className="w-3.5 h-3.5 text-[#F5762E]" />
                  <span>Okta</span>
                </button>
                <button
                  type="button"
                  onClick={() => alert('Redirecting to Microsoft Entra ID...')}
                  className="py-2 px-3 rounded-lg bg-[#0B0F19] border border-[#1F2937] hover:border-[#F5762E] text-slate-300 hover:text-white flex items-center justify-center space-x-1.5 transition-colors cursor-pointer"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-[#22C55E]" />
                  <span>Entra ID</span>
                </button>
              </div>

            </form>
          )}

        </div>

        {/* Footer Link to Register */}
        <div className="text-center text-xs text-[#94A3B8]">
          <span>Don&apos;t have an account? </span>
          <Link href="/register" className="text-[#F5762E] hover:underline font-semibold">
            Create Workspace
          </Link>
        </div>

      </div>

      {/* Clean Copyright footer */}
      <div className="w-full text-center text-[11px] text-[#64748B] relative z-10">
        &copy; {new Date().getFullYear()} RedFort Security Inc. All rights reserved.
      </div>

    </div>
  );
}
