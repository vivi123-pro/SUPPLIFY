// pages/Register.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Mail, Lock, Eye, EyeOff, User, Building, Phone, MapPin, ArrowLeft, CheckCircle 
} from 'lucide-react';
import Button from '../components/Button';
import Input from '../components/Input';
import Badge from '../components/Badge';

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    businessName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    businessType: '',
    location: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const businessTypes = [
    'Manufacturing', 'Food Processing', 'Textiles & Garments', 
    'Plastics & Packaging', 'Metal Works', 'Construction', 
    'Retail', 'Other'
  ];

  const nigerianStates = [
    'Lagos', 'Abuja', 'Kano', 'Ibadan', 'Port Harcourt', 'Kaduna', 
    'Benin City', 'Maiduguri', 'Zaria', 'Aba', 'Jos', 'Ilorin', 
    'Oyo', 'Enugu', 'Abeokuta'
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateStep1 = () => {
    if (!formData.fullName.trim()) return 'Please enter your full name';
    if (!formData.businessName.trim()) return 'Please enter your business name';
    if (!formData.email.trim()) return 'Please enter your email address';
    if (!/\S+@\S+\.\S+/.test(formData.email)) return 'Please enter a valid email address';
    if (!formData.phone.trim()) return 'Please enter your phone number';
    return null;
  };

  const validateStep2 = () => {
    if (!formData.password) return 'Please enter a password';
    if (formData.password.length < 8) return 'Password must be at least 8 characters long';
    if (formData.password !== formData.confirmPassword) return "Passwords don't match";
    if (!formData.businessType) return 'Please select your business type';
    if (!formData.location) return 'Please select your location';
    return null;
  };

  const handleNextStep = () => {
    const error = validateStep1();
    if (error) {
      setError(error);
    } else {
      setError('');
      setStep(2);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = validateStep2();
    if (error) {
      setError(error);
      return;
    }

    setLoading(true);
    // Simulate registration
    setTimeout(() => {
      navigate('/login-message');
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center py-8 px-4">
      <div className="max-w-2xl w-full">
        <Link to="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Progress Header */}
          <div className="bg-gradient-to-r from-blue-600 to-green-600 p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold">Create Business Account</h1>
                <p className="text-blue-100">Join Supplify in 2 simple steps</p>
              </div>
              <Badge variant="default" className="bg-white/20">
                Step {step} of 2
              </Badge>
            </div>
            
            <div className="flex items-center">
              <div className={`flex items-center ${step >= 1 ? 'text-white' : 'text-blue-200'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step >= 1 ? 'bg-white text-blue-600 border-white' : 'border-blue-200'}`}>
                  {step > 1 ? <CheckCircle className="h-5 w-5" /> : '1'}
                </div>
                <span className="ml-2 text-sm">Business Info</span>
              </div>
              
              <div className={`w-12 h-1 mx-2 ${step >= 2 ? 'bg-white' : 'bg-blue-200'}`}></div>
              
              <div className={`flex items-center ${step >= 2 ? 'text-white' : 'text-blue-200'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step >= 2 ? 'bg-white text-blue-600 border-white' : 'border-blue-200'}`}>
                  2
                </div>
                <span className="ml-2 text-sm">Account Setup</span>
              </div>
            </div>
          </div>

          <div className="p-8">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {step === 1 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900">Business Information</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                      label="Full Name"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      leftIcon={<User className="h-5 w-5 text-gray-400" />}
                      placeholder="Your full name"
                    />

                    <Input
                      label="Business Name"
                      name="businessName"
                      value={formData.businessName}
                      onChange={handleChange}
                      required
                      leftIcon={<Building className="h-5 w-5 text-gray-400" />}
                      placeholder="Your business name"
                    />

                    <Input
                      label="Email Address"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      leftIcon={<Mail className="h-5 w-5 text-gray-400" />}
                      placeholder="business@email.com"
                    />

                    <Input
                      label="Phone Number"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      leftIcon={<Phone className="h-5 w-5 text-gray-400" />}
                      placeholder="+234 800 000 0000"
                    />

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Business Type
                      </label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {businessTypes.map(type => (
                          <button
                            key={type}
                            type="button"
                            onClick={() => setFormData({...formData, businessType: type})}
                            className={`p-3 rounded-lg border text-sm font-medium transition-all ${
                              formData.businessType === type 
                                ? 'border-blue-500 bg-blue-50 text-blue-700' 
                                : 'border-gray-300 text-gray-700 hover:border-blue-300'
                            }`}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Business Location
                      </label>
                      <select
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-3 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        required
                      >
                        <option value="">Select your state</option>
                        {nigerianStates.map(state => (
                          <option key={state} value={state}>{state}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <Button type="button" onClick={handleNextStep} className="w-full">
                    Continue to Account Setup
                  </Button>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900">Account Setup</h2>
                  
                  <div className="grid grid-cols-1 gap-6">
                    <Input
                      label="Password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={handleChange}
                      required
                      leftIcon={<Lock className="h-5 w-5 text-gray-400" />}
                      rightIcon={
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      }
                      placeholder="Create a strong password"
                    />

                    <Input
                      label="Confirm Password"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                      leftIcon={<Lock className="h-5 w-5 text-gray-400" />}
                      rightIcon={
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      }
                      placeholder="Confirm your password"
                    />
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <label className="flex items-start">
                      <input 
                        type="checkbox" 
                        required 
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 mt-1" 
                      />
                      <span className="ml-3 text-sm text-gray-700">
                        I agree to the Supplify{' '}
                        <a href="#" className="text-blue-600 hover:text-blue-500 font-medium">Terms</a>
                        {' '}and{' '}
                        <a href="#" className="text-blue-600 hover:text-blue-500 font-medium">Privacy Policy</a>.
                        I understand that my business will be verified.
                      </span>
                    </label>
                  </div>

                  <Button type="submit" className="w-full" loading={loading}>
                    Create Business Account
                  </Button>
                </div>
              )}
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="text-blue-600 hover:text-blue-500 font-semibold">
                  Sign in here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;