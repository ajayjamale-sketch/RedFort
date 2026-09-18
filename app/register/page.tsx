'use strict';
'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  Lock, 
  Mail, 
  User, 
  Building2, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle, 
  Cpu, 
  Server, 
  Terminal, 
  ArrowLeft,
  Check
} from 'lucide-react';
import Logo from '@/components/Logo';
import CaptchaWidget from '@/components/CaptchaWidget';

export default function RegisterPage() {
  const [fullName, setFullName] = useState('');
  const [workEmail, setWorkEmail] = useState('');
  const [organization, setOrganization] = useState('');
  const [securityDomain, setSecurityDomain] = useState('gsoc');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isCaptchaValid, setIsCaptchaValid] = useState(false);
  const [isProvisioning, setIsProvisioning] = useState(false);
  const [provisionStep, setProvisionStep] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Password strength calculation
  const passwordStrength = useMemo(() => {
    if (!password) return { score: 0, label: 'None', color: 'bg-slate-700' };
    
    let score = 0;
    if (password.length >= 8) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;

    let label = 'Weak';
    let color = 'bg-[#EF4444]';
    if (score === 2) {
      label = 'Fair';
      color = 'bg-[#F59E0B]';
    } else if (score === 3) {
      label = 'Good';
      color = 'bg-[#3B82F6]';
    } else if (score === 4) {
      label = 'Strong';
      color = 'bg-[#22C55E]';
    }

    return { score, label, color };
  }, [password]);

  const domainOptions = [
    { id: 'gsoc', label: 'GSOC Command', icon: Terminal },
    { id: 'physical', label: 'Physical Security', icon: Building2 },
    { id: 'cyber', label: 'Cyber Defense', icon: Cpu },
    { id: 'infra', label: 'Critical Infra', icon: Server }
  ];

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    if (passwordStrength.score < 2) {
      setErrorMessage('Password is too weak. Please include 8+ chars and numbers.');
      return;
    }

    if (!isCaptchaValid) {
      setErrorMessage('Please complete the security verification code.');
      return;
    }

    if (!agreedToTerms) {
      setErrorMessage('Please agree to the service terms.');
      return;
    }

    setIsProvisioning(true);
    setProvisionStep(1);

    setTimeout(() => {
      setProvisionStep(2);
      setTimeout(() => {
        setProvisionStep(3);
        setTimeout(() => {
          setIsProvisioning(false);
          setIsCompleted(true);
        }, 800);
      }, 800);
    }, 800);
  };

  return (
    <div className="min-h-screen w-full bg-[#0B0F19] text-white flex flex-col justify-between p-4 sm:p-6 lg:p-8 relative overflow-hidden selection:bg-[#F5762E] selection:text-white">
      
      {/* Ambient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[550px] h-[320px] bg-[#F5762E]/10 blur-[140px] pointer-events-none rounded-full"></div>

      {/* Top Bar with Home Link */}
      <div className="w-full max-w-lg mx-auto flex items-center justify-between relative z-10">
        <Link 
          href="/" 
          className="inline-flex items-center space-x-1.5 text-xs text-[#94A3B8] hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
      </div>

      {/* Main Container */}
      <div className="w-full max-w-lg mx-auto my-auto py-6 relative z-10 space-y-6">
        
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-block focus:outline-none">
            <Logo variant="full" theme="dark" size="md" showSubtitle={false} />
          </Link>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            Create Workspace
          </h1>
          <p className="text-xs text-[#94A3B8]">
            Deploy your enterprise security cluster in seconds
          </p>
        </div>

        {/* Card */}
        <div className="bg-[#111827] border border-[#1F2937] rounded-xl p-5 sm:p-7 shadow-2xl">
          
          {/* Completed State */}
          {isCompleted ? (
            <div className="text-center space-y-4 py-6">
              <div className="w-12 h-12 rounded-full bg-[#22C55E]/15 text-[#22C55E] border border-[#22C55E]/30 flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-6 h-6" />
              </div>

              <div>
                <h3 className="text-lg font-bold text-white">Workspace Ready</h3>
                <p className="text-xs text-[#94A3B8] mt-1">
                  Tenant partition configured for <span className="text-white font-medium">{organization || 'your organization'}</span>
                </p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-2.5 justify-center">
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center space-x-2 px-5 py-2.5 rounded-lg bg-[#F5762E] hover:bg-[#FF9A5A] text-white text-xs font-semibold transition-all shadow-md"
                >
                  <span>Sign In to Console</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/products/soc-dashboard"
                  className="inline-flex items-center justify-center space-x-1.5 px-5 py-2.5 rounded-lg bg-[#0B0F19] border border-[#1F2937] hover:border-[#F5762E] text-slate-300 hover:text-white text-xs transition-all"
                >
                  <span>Preview Dashboard</span>
                </Link>
              </div>
            </div>
          ) : isProvisioning ? (
            /* Provisioning Animation */
            <div className="py-10 text-center space-y-5">
              <div className="relative w-12 h-12 mx-auto">
                <div className="w-12 h-12 rounded-full border-2 border-[#1F2937] border-t-[#F5762E] animate-spin"></div>
                <Cpu className="w-5 h-5 text-[#F5762E] absolute inset-0 m-auto animate-pulse" />
              </div>

              <div className="space-y-1">
                <h4 className="text-base font-semibold text-white">
                  {provisionStep === 1 && 'Allocating Cluster...'}
                  {provisionStep === 2 && 'Configuring Security Keys...'}
                  {provisionStep === 3 && 'Finalizing Perimeter Rules...'}
                </h4>
                <p className="text-xs text-[#94A3B8]">
                  Setting up environment for {organization || 'enterprise'}
                </p>
              </div>

              <div className="w-full bg-[#0B0F19] rounded-full h-1.5 overflow-hidden">
                <div 
                  className="bg-[#F5762E] h-full transition-all duration-500 ease-out"
                  style={{ width: `${provisionStep * 33.3}%` }}
                ></div>
              </div>
            </div>
          ) : (
            /* Registration Form */
            <form onSubmit={handleRegister} className="space-y-3.5">
              
              {errorMessage && (
                <div className="p-3 rounded-lg bg-[#EF4444]/10 border border-[#EF4444]/30 text-xs text-[#EF4444] flex items-center space-x-2">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Name and Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-xs font-medium text-slate-300">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-[#64748B] absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Jane Doe"
                      className="w-full pl-9 pr-3 py-2 rounded-lg bg-[#0B0F19] border border-[#1F2937] text-xs text-white placeholder-[#64748B] focus:outline-none focus:border-[#F5762E] transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-medium text-slate-300">
                    Work Email
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#64748B] absolute left-3 top-3" />
                    <input
                      type="email"
                      required
                      value={workEmail}
                      onChange={(e) => setWorkEmail(e.target.value)}
                      placeholder="name@company.com"
                      className="w-full pl-9 pr-3 py-2 rounded-lg bg-[#0B0F19] border border-[#1F2937] text-xs text-white placeholder-[#64748B] focus:outline-none focus:border-[#F5762E] transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Organization */}
              <div className="space-y-1">
                <label className="block text-xs font-medium text-slate-300">
                  Organization Name
                </label>
                <div className="relative">
                  <Building2 className="w-4 h-4 text-[#64748B] absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    placeholder="e.g. Acme Corporation"
                    className="w-full pl-9 pr-3 py-2 rounded-lg bg-[#0B0F19] border border-[#1F2937] text-xs text-white placeholder-[#64748B] focus:outline-none focus:border-[#F5762E] transition-colors"
                  />
                </div>
              </div>

              {/* Domain Selector */}
              <div className="space-y-1">
                <label className="block text-xs font-medium text-slate-300">
                  Primary Domain Focus
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {domainOptions.map((opt) => {
                    const Icon = opt.icon;
                    const isSelected = securityDomain === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setSecurityDomain(opt.id)}
                        className={`p-2 rounded-lg border text-left flex items-center space-x-2 text-xs transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#F5762E]/10 border-[#F5762E] text-white'
                            : 'bg-[#0B0F19] border-[#1F2937] text-[#94A3B8] hover:border-slate-700'
                        }`}
                      >
                        <Icon className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-[#F5762E]' : 'text-[#64748B]'}`} />
                        <span className="truncate">{opt.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Passwords */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <label className="font-medium text-slate-300">
                      Password
                    </label>
                    <span className={`text-[10px] ${passwordStrength.color.replace('bg-', 'text-')}`}>
                      {passwordStrength.label}
                    </span>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-[#64748B] absolute left-3 top-3" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full pl-9 pr-10 py-2 rounded-lg bg-[#0B0F19] border border-[#1F2937] text-xs text-white placeholder-[#64748B] focus:outline-none focus:border-[#F5762E] transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2.5 text-[#64748B] hover:text-white transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-medium text-slate-300">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-[#64748B] absolute left-3 top-3" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className={`w-full pl-9 pr-3 py-2 rounded-lg bg-[#0B0F19] border text-xs text-white placeholder-[#64748B] focus:outline-none transition-colors ${
                        confirmPassword && confirmPassword === password
                          ? 'border-[#22C55E]'
                          : confirmPassword && confirmPassword !== password
                          ? 'border-[#EF4444]'
                          : 'border-[#1F2937] focus:border-[#F5762E]'
                      }`}
                    />
                  </div>
                </div>
              </div>

              {/* Password Strength Bar */}
              {password && (
                <div className="w-full bg-[#0B0F19] rounded-full h-1 overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${passwordStrength.color}`}
                    style={{ width: `${(passwordStrength.score / 4) * 100}%` }}
                  ></div>
                </div>
              )}

              {/* Captcha */}
              <div className="pt-2 border-t border-[#1F2937]/80">
                <CaptchaWidget onValidate={setIsCaptchaValid} />
              </div>

              {/* Terms Checkbox */}
              <div className="pt-1">
                <label className="flex items-start space-x-2 text-xs text-[#94A3B8] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    className="mt-0.5 w-3.5 h-3.5 rounded border-[#1F2937] bg-[#0B0F19] text-[#F5762E] focus:ring-[#F5762E]"
                  />
                  <span>
                    I agree to RedFort&apos;s{' '}
                    <Link href="/company/trust-and-security" className="text-[#F5762E] hover:underline">
                      Terms of Service
                    </Link>{' '}
                    and Privacy Policy.
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-2.5 rounded-lg bg-[#F5762E] hover:bg-[#FF9A5A] text-white font-semibold text-xs tracking-wide transition-all shadow-md flex items-center justify-center space-x-2 cursor-pointer mt-3"
              >
                <span>Create Workspace</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </form>
          )}

        </div>

        {/* Footer Link to Login */}
        <div className="text-center text-xs text-[#94A3B8]">
          <span>Already have an account? </span>
          <Link href="/login" className="text-[#F5762E] hover:underline font-semibold">
            Sign In
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
