// pages/WasteMarketplace.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, MapPin, Clock, ChevronDown, Plus, Eye, Star, Shield } from 'lucide-react';
import Layout from '../components/Layout';
import PageHeader from '../components/PageHeader';
import Button from '../components/Button';
import Input from '../components/Input';
import Badge from '../components/Badge';

const WasteMarketplace = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);

  const wasteMaterials = [
    {
      id: '1',
      name: 'Premium Plastic Scraps - PP',
      category: 'plastics',
      price: 150,
      unit: 'kg',
      quantity: 500,
      location: 'Lagos',
      description: 'Clean polypropylene scraps from manufacturing process. No contaminants. Ready for recycling.',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnn6mbHMIN75e-4ix-gFTkpnJBSGpAPWoaGw&s',
      posted: '2 hours ago',
      seller: { name: 'Prime Manufacturing Ltd', rating: 4.8, verified: true },
      featured: true,
      urgent: false
    },
    {
      id: '2',
      name: 'Aluminum Metal Shavings',
      category: 'metals',
      price: 320,
      unit: 'kg',
      quantity: 250,
      location: 'Abuja',
      description: 'High-quality aluminum shavings from CNC machining. Minimal oil contamination.',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      posted: '1 day ago',
      seller: { name: 'Metro Metal Works', rating: 4.5, verified: true },
      featured: false,
      urgent: true
    },
    {
      id: '3',
      name: 'Cotton Textile Offcuts',
      category: 'textiles',
      price: 80,
      unit: 'kg',
      quantity: 300,
      location: 'Ibadan',
      description: 'Assorted cotton fabric offcuts from garment production. Various colors available.',
      image: 'data:image/jpeg;base64,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',
      posted: '3 days ago',
      seller: { name: 'Textile Masters NG', rating: 4.7, verified: true },
      featured: true,
      urgent: false
    }
  ];

  const categories = [
    { value: 'all', label: 'All Categories', count: wasteMaterials.length },
    { value: 'plastics', label: 'Plastics', count: wasteMaterials.filter(m => m.category === 'plastics').length },
    { value: 'metals', label: 'Metals', count: wasteMaterials.filter(m => m.category === 'metals').length },
    { value: 'textiles', label: 'Textiles', count: wasteMaterials.filter(m => m.category === 'textiles').length },
    { value: 'wood', label: 'Wood', count: 0 },
    { value: 'paper', label: 'Paper', count: 0 },
    { value: 'e-waste', label: 'E-Waste', count: 0 }
  ];

  const filteredWaste = wasteMaterials.filter(material => {
    const matchesSearch = material.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || material.category === categoryFilter;
    const matchesLocation = locationFilter === 'all' || material.location.toLowerCase().includes(locationFilter);
    return matchesSearch && matchesCategory && matchesLocation;
  });

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PageHeader
          title="Waste Marketplace"
          subtitle="Turn your industrial waste into profit. Buy and sell waste materials across Nigeria."
          breadcrumbs={[
            { label: 'Home', href: '/' },
            { label: 'Waste Marketplace' }
          ]}
          action={
            <Button className="flex items-center">
              <Plus className="h-4 w-4 mr-2" />
              List Your Waste
            </Button>
          }
        />

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 text-center">
            <div className="text-2xl font-bold text-blue-600">{wasteMaterials.length}+</div>
            <div className="text-gray-600">Active Listings</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 text-center">
            <div className="text-2xl font-bold text-green-600">₦2.1M+</div>
            <div className="text-gray-600">Waste Sold</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 text-center">
            <div className="text-2xl font-bold text-purple-600">85+</div>
            <div className="text-gray-600">Verified Sellers</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 text-center">
            <div className="text-2xl font-bold text-orange-600">₦450K+</div>
            <div className="text-gray-600">Savings Created</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Input
              placeholder="Search waste materials..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              leftIcon={<Search className="h-4 w-4" />}
            />
            
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            >
              {categories.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label} ({option.count})
                </option>
              ))}
            </select>

            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            >
              <option value="all">All Locations</option>
              <option value="lagos">Lagos</option>
              <option value="abuja">Abuja</option>
              <option value="ibadan">Ibadan</option>
            </select>

            <Button 
              variant="outline" 
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center justify-center"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
              <ChevronDown className={`h-4 w-4 ml-2 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </Button>
          </div>
        </div>

        {/* Waste Listings */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWaste.map(material => (
            <div key={material.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={material.image} 
                  alt={material.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 space-y-1">
                  {material.featured && <Badge variant="primary">Featured</Badge>}
                  {material.urgent && <Badge variant="danger">Urgent</Badge>}
                </div>
              </div>
              
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-gray-900 line-clamp-2">{material.name}</h3>
                  <Badge variant="info">{material.category}</Badge>
                </div>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{material.description}</p>
                
                <div className="flex items-center text-sm text-gray-600 mb-4">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{material.location}</span>
                  <span className="mx-2">•</span>
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{material.posted}</span>
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-2">
                      <span className="text-xs font-medium text-blue-600">
                        {material.seller.name.charAt(0)}
                      </span>
                    </div>
                    <span className="text-sm text-gray-700">{material.seller.name}</span>
                    {material.seller.verified && <Shield className="h-3 w-3 text-green-500 ml-1" />}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Star className="h-3 w-3 text-yellow-400 fill-current mr-1" />
                    <span>{material.seller.rating}</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-xl font-bold text-gray-900">
                      ₦{material.price.toLocaleString()}/{material.unit}
                    </div>
                    <div className="text-sm text-gray-600">
                      {material.quantity.toLocaleString()} {material.unit} available
                    </div>
                  </div>
                  
                  <Link to={`/waste/${material.id}`}>
                    <Button size="small" className="flex items-center">
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredWaste.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">No waste materials found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or filters</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default WasteMarketplace;