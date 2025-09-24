// pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  TrendingUp, 
  Shield, 
  Truck, 
  Users, 
  Recycle,
  ArrowRight,
  Star,
  Package,
  CheckCircle
} from 'lucide-react';
import Layout from '../components/Layout';
import Button from '../components/Button';
import Badge from '../components/Badge';

const Home = () => {
  const features = [
    {
      icon: Search,
      title: 'Smart Sourcing',
      description: 'Find verified suppliers with best prices and quality materials'
    },
    {
      icon: Recycle,
      title: 'Waste to Profit',
      description: 'Sell your industrial waste materials to recyclers and manufacturers'
    },
    {
      icon: Shield,
      title: 'Verified Quality',
      description: 'All suppliers and materials are thoroughly verified for your peace of mind'
    },
    {
      icon: Truck,
      title: 'Easy Logistics',
      description: 'Seamless delivery and pickup coordination across Nigeria'
    }
  ];

  const stats = [
    { value: '500+', label: 'Active Suppliers' },
    { value: '₦2.5M+', label: 'Monthly Transactions' },
    { value: '1,200+', label: 'SMEs Registered' },
    { value: '85%', label: 'Cost Savings' }
  ];

  const testimonials = [
    {
      name: 'Chinedu Okoro',
      company: 'Prime Plastics Ltd',
      content: 'Supplify cut our raw material costs by 40% and helped us earn extra from waste sales.',
      rating: 5
    },
    {
      name: 'Aisha Bello',
      company: 'Textile Masters NG',
      content: 'The waste marketplace turned our production scraps into a new revenue stream.',
      rating: 5
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <Badge variant="default" className="bg-white/20 text-white mb-4">
              🚀 Transforming Nigerian SME Supply Chains
            </Badge>
            <h1 className="text-5xl font-bold mb-6">
              Smart Sourcing, 
              <span className="text-green-300"> Zero Waste</span>
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Supplify connects Nigerian SMEs directly to verified raw material suppliers 
              and turns industrial waste into profit. Save costs, earn more, grow smarter.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-white text-black hover:bg-gray-100">
                Start Sourcing
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="large" className="border-white text-white hover:bg-white/10">
                List Your Waste
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Supplify?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We're built specifically for Nigerian SMEs to solve real supply chain challenges
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How Supplify Works
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">1</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Register Your Business</h3>
              <p className="text-gray-600">Sign up as an SME and verify your business details</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">2</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Source or Sell</h3>
              <p className="text-gray-600">Buy raw materials or list waste materials for sale</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">3</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Grow Your Business</h3>
              <p className="text-gray-600">Save costs, earn extra, and focus on growth</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gradient-to-r from-blue-600 to-green-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white mb-12">
            <h2 className="text-3xl font-bold mb-4">Trusted by Nigerian SMEs</h2>
            <p className="text-blue-100">See what business owners are saying about Supplify</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-white">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-5 w-5 ${i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-white/40'}`} />
                  ))}
                </div>
                <p className="italic mb-4">"{testimonial.content}"</p>
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-blue-200 text-sm">{testimonial.company}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Your Supply Chain?
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Join hundreds of Nigerian SMEs already saving costs and earning from waste on Supplify
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button size="large" className="bg-green-500 hover:bg-green-600">
                Create Business Account
              </Button>
            </Link>
            <Link to="/waste-marketplace">
              <Button variant="outline" size="large" className="border-white text-white hover:bg-white/10">
                Explore Waste Marketplace
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;