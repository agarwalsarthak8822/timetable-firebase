'use client';

import { LoginForm } from '@/components/login-form';
import { School, Calendar, Users, BookOpen, Sparkles } from 'lucide-react';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-cyan-400/20 to-blue-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-purple-400/10 to-pink-600/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Floating Icons */}
      <div className="absolute top-20 left-20 text-blue-400/30 animate-bounce">
        <Calendar className="w-8 h-8" />
      </div>
      <div className="absolute top-40 right-32 text-purple-400/30 animate-bounce delay-300">
        <Users className="w-6 h-6" />
      </div>
      <div className="absolute bottom-32 left-16 text-cyan-400/30 animate-bounce delay-700">
        <BookOpen className="w-7 h-7" />
      </div>
      <div className="absolute bottom-20 right-20 text-indigo-400/30 animate-bounce delay-1000">
        <Sparkles className="w-5 h-5" />
      </div>

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Header Section */}
          <div className="mb-8 flex flex-col items-center text-center">
            <div className="mb-6 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur-lg opacity-75 animate-pulse"></div>
              <div className="relative flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-r from-blue-600 to-purple-600 shadow-2xl">
                <School className="w-8 h-8 text-white" />
              </div>
            </div>
            
            <div className="space-y-2">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
                Smart Timetable
              </h1>
              <p className="text-gray-600 font-medium">
                AI-Powered Academic Scheduling
              </p>
              <p className="text-sm text-gray-500 max-w-sm">
                Welcome back! Please sign in to access your personalized timetable management system.
              </p>
            </div>
          </div>

          {/* Login Form */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-2xl blur-xl"></div>
            <div className="relative">
              <LoginForm />
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-xs text-gray-500">
              Secure • Intelligent • Efficient
            </p>
            <div className="flex justify-center items-center mt-2 space-x-4 text-xs text-gray-400">
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                AI Powered
              </span>
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-300"></div>
                Real-time Sync
              </span>
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse delay-700"></div>
                Smart Analytics
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
