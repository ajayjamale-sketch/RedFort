'use strict';
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { RefreshCw, CheckCircle2, ShieldCheck, AlertCircle } from 'lucide-react';

interface CaptchaWidgetProps {
  onValidate: (isValid: boolean) => void;
  required?: boolean;
}

export default function CaptchaWidget({ onValidate }: CaptchaWidgetProps) {
  const [captchaCode, setCaptchaCode] = useState<string>('');
  const [userInput, setUserInput] = useState<string>('');
  const [status, setStatus] = useState<'idle' | 'verified' | 'failed'>('idle');
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Generate random 6-character alphanumeric captcha
  const generateCode = () => {
    const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghkmnpqrstuvwxyz';
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaCode(code);
    setUserInput('');
    setStatus('idle');
    onValidate(false);
  };

  // Draw captcha with noise, distortion and lines on canvas
  const drawCaptcha = (code: string) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Background
    ctx.fillStyle = '#0B0F19';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Grid Noise
    ctx.strokeStyle = '#1E293B';
    ctx.lineWidth = 1;
    for (let i = 0; i < canvas.width; i += 16) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, canvas.height);
      ctx.stroke();
    }
    for (let j = 0; j < canvas.height; j += 14) {
      ctx.beginPath();
      ctx.moveTo(0, j);
      ctx.lineTo(canvas.width, j);
      ctx.stroke();
    }

    // Distortion curves
    const lineColors = ['#F5762E50', '#22C55E50', '#38BDF850'];
    for (let i = 0; i < 3; i++) {
      ctx.strokeStyle = lineColors[i % lineColors.length];
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.bezierCurveTo(
        Math.random() * canvas.width, Math.random() * canvas.height,
        Math.random() * canvas.width, Math.random() * canvas.height,
        Math.random() * canvas.width, Math.random() * canvas.height
      );
      ctx.stroke();
    }

    // Draw characters
    const fonts = ['bold 20px JetBrains Mono, monospace', 'bold 22px monospace', 'bold 20px sans-serif'];
    const colors = ['#FFFFFF', '#F5762E', '#22C55E', '#38BDF8', '#FDBA74'];

    for (let i = 0; i < code.length; i++) {
      ctx.save();
      const x = 14 + i * 20;
      const y = 26 + (Math.random() * 4 - 2);
      const angle = (Math.random() * 0.3 - 0.15);

      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.font = fonts[Math.floor(Math.random() * fonts.length)];
      ctx.fillStyle = colors[i % colors.length];
      ctx.fillText(code[i], 0, 0);
      ctx.restore();
    }

    // Noise dots
    for (let i = 0; i < 25; i++) {
      ctx.fillStyle = Math.random() > 0.5 ? '#F5762E50' : '#22C55E50';
      ctx.beginPath();
      ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, 1, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  useEffect(() => {
    generateCode();
  }, []);

  useEffect(() => {
    if (captchaCode) {
      drawCaptcha(captchaCode);
    }
  }, [captchaCode]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setUserInput(val);

    if (val.length === captchaCode.length) {
      if (val.toLowerCase() === captchaCode.toLowerCase()) {
        setStatus('verified');
        onValidate(true);
      } else {
        setStatus('failed');
        onValidate(false);
      }
    } else {
      setStatus('idle');
      onValidate(false);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs text-[#94A3B8]">
        <label className="flex items-center space-x-1.5 font-medium text-slate-300 text-xs">
          <ShieldCheck className="w-3.5 h-3.5 text-[#F5762E]" />
          <span>Security Verification</span>
        </label>
        <span className="text-[11px] text-[#64748B]">Case-insensitive</span>
      </div>

      <div className="flex items-center gap-2">
        {/* Canvas Rendered Visual */}
        <div className="relative rounded-lg overflow-hidden border border-[#1F2937] bg-[#0B0F19] shrink-0">
          <canvas
            ref={canvasRef}
            width={140}
            height={40}
            className="block cursor-pointer select-none"
            onClick={generateCode}
            title="Click to change security code"
          />
        </div>

        {/* Reload Button */}
        <button
          type="button"
          onClick={generateCode}
          aria-label="Refresh Captcha"
          className="p-2.5 rounded-lg bg-[#0B0F19] border border-[#1F2937] hover:border-[#F5762E] text-[#94A3B8] hover:text-white transition-colors cursor-pointer shrink-0"
          title="Reload code"
        >
          <RefreshCw className="w-4 h-4 hover:rotate-180 transition-transform duration-300" />
        </button>

        {/* Input Box */}
        <div className="relative flex-1 min-w-0">
          <input
            type="text"
            maxLength={6}
            value={userInput}
            onChange={handleInputChange}
            placeholder="Enter code"
            className={`w-full px-3 py-2 rounded-lg bg-[#0B0F19] border text-xs text-white placeholder-[#64748B] tracking-wider font-mono uppercase focus:outline-none transition-all ${
              status === 'verified'
                ? 'border-[#22C55E] focus:border-[#22C55E]'
                : status === 'failed'
                ? 'border-[#EF4444] focus:border-[#EF4444]'
                : 'border-[#1F2937] focus:border-[#F5762E]'
            }`}
          />
          {status === 'verified' && (
            <CheckCircle2 className="w-4 h-4 text-[#22C55E] absolute right-2.5 top-2.5" />
          )}
          {status === 'failed' && (
            <AlertCircle className="w-4 h-4 text-[#EF4444] absolute right-2.5 top-2.5" />
          )}
        </div>
      </div>

      {status === 'verified' && (
        <p className="text-[11px] text-[#22C55E] flex items-center space-x-1">
          <CheckCircle2 className="w-3 h-3 shrink-0" />
          <span>Verified successfully</span>
        </p>
      )}
      {status === 'failed' && (
        <p className="text-[11px] text-[#EF4444] flex items-center space-x-1">
          <AlertCircle className="w-3 h-3 shrink-0" />
          <span>Incorrect code. Please try again.</span>
        </p>
      )}
    </div>
  );
}
