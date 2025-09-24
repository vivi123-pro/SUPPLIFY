// pages/WasteDetail.js
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Clock, User, Shield, Star, MessageCircle } from 'lucide-react';
import Layout from '../components/Layout';
import PageHeader from '../components/PageHeader';
import Button from '../components/Button';
import Badge from '../components/Badge';

const WasteDetail = () => {
  const { id } = useParams();

  const wasteMaterial = {
    id: id || '1',
    name: 'Premium Plastic Scraps - PP',
    category: 'plastics',
    price: 150,
    unit: 'kg',
    quantity: 500,
    location: 'Lagos',
    description: 'Clean polypropylene scraps from our manufacturing process. These are offcuts and trimmings from injection molding production. The material is uncontaminated and ready for recycling into new products.',
    specifications: {
      'Material': 'Polypropylene (PP)',
      'Color': 'Mixed (mostly white and clear)',
      'Contamination': 'Less than 1%',
      'Melt Flow': '12 g/10min',
      'Density': '0.9 g/cm³'
    },
    seller: {
      name: 'Prime Manufacturing Ltd',
      rating: 4.8,
      responseRate: '95%',
      memberSince: '2022',
      verified: true
    },
    image: 'https://images.unsplash.com/photo-1633713368365-30ca38ed5d98?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    posted: '2 hours ago',
    pickupAddress: '12 Industrial Avenue, Ikeja, Lagos'
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PageHeader
          breadcrumbs={[
            { label: 'Home', href: '/' },
            { label: 'Waste Marketplace', href: '/waste-marketplace' },
            { label: wasteMaterial.name }
          ]}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Waste Image */}
          <div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-4">
              <img 
                src={wasteMaterial.image} 
                alt={wasteMaterial.name}
                className="w-full h-96 object-cover"
              />
            </div>
          </div>

          {/* Waste Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-3">
                <Badge variant="info">{wasteMaterial.category}</Badge>
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{wasteMaterial.posted}</span>
                </div>
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{wasteMaterial.name}</h1>
              
              <div className="text-4xl font-bold text-gray-900 mb-2">
                ₦{wasteMaterial.price.toLocaleString()}
                <span className="text-lg font-normal text-gray-600">/{wasteMaterial.unit}</span>
              </div>
              
              <p className="text-gray-600">{wasteMaterial.quantity.toLocaleString()} {wasteMaterial.unit} available</p>
            </div>

            {/* Description */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Description</h3>
              <p className="text-gray-700 leading-relaxed">{wasteMaterial.description}</p>
            </div>

            {/* Specifications */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Specifications</h3>
              <div className="grid grid-cols-1 gap-2">
                {Object.entries(wasteMaterial.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-2 border-b border-gray-100">
                    <span className="font-medium text-gray-700">{key}</span>
                    <span className="text-gray-600">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Seller Info */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Seller Information</h3>
              <div className="bg-gray-50 rounded-lg p-4 flex items-start space-x-4">
                <User className="h-8 w-8 text-gray-400" />
                <div>
                  <p className="font-medium text-gray-900">{wasteMaterial.seller.name}</p>
                  <div className="flex items-center text-sm text-gray-600">
                    <Star className="h-4 w-4 mr-1 text-yellow-500" />
                    <span>{wasteMaterial.seller.rating} rating</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <MessageCircle className="h-4 w-4 mr-1" />
                    <span>{wasteMaterial.seller.responseRate} response rate</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Shield className="h-4 w-4 mr-1 text-green-500" />
                    <span>Member since {wasteMaterial.seller.memberSince}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Pickup Info */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Pickup Information</h3>
              <div className="flex items-center text-gray-700">
                <MapPin className="h-5 w-5 mr-2 text-gray-500" />
                <span>{wasteMaterial.pickupAddress}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex space-x-4">
              <Button variant="primary">Contact Seller</Button>
              <Button variant="secondary">Add to Favorites</Button>
            </div>
          </div>
        </div>

        {/* Back link */}
        <div className="mt-8">
          <Link to="/waste-marketplace" className="flex items-center text-blue-600 hover:underline">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Marketplace
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default WasteDetail;
