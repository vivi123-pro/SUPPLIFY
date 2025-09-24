// pages/LoginMessage.js
import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Mail, Clock, Shield } from 'lucide-react';
import Button from '../components/Button';

const LoginMessage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center py-8 px-4">
      <div className="max-w-md w-full text-center">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Account Created Successfully!
          </h1>
          
          <p className="text-gray-600 mb-6">
            We've sent a verification link to your email address. Please verify your account to start using Supplify.
          </p>

          <div className="bg-blue-50 rounded-lg p-4 mb-6 text-left">
            <div className="flex items-start space-x-3">
              <Mail className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-blue-900">Check your inbox</p>
                <p className="text-sm text-blue-700 mt-1">
                  If you don't see the email, check your spam folder or request a new verification link.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Button className="w-full">
              <Mail className="h-4 w-4 mr-2" />
              Resend Verification Email
            </Button>
            
            <Link to="/login" className="block">
              <Button variant="outline" className="w-full">
                Back to Login
              </Button>
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="bg-white/50 backdrop-blur-sm rounded-lg p-4">
            <Shield className="h-6 w-6 text-green-600 mx-auto mb-2" />
            <div className="text-sm font-medium text-gray-700">Secure Verification</div>
          </div>
          <div className="bg-white/50 backdrop-blur-sm rounded-lg p-4">
            <Clock className="h-6 w-6 text-blue-600 mx-auto mb-2" />
            <div className="text-sm font-medium text-gray-700">Quick Setup</div>
          </div>
          <div className="bg-white/50 backdrop-blur-sm rounded-lg p-4">
            <CheckCircle className="h-6 w-6 text-purple-600 mx-auto mb-2" />
            <div className="text-sm font-medium text-gray-700">Ready in Minutes</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginMessage;