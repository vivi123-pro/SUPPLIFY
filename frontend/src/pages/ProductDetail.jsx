// pages/ProductDetail.js
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Truck, Shield, ArrowLeft, Heart, Share2, Minus, Plus, MapPin, CheckCircle } from 'lucide-react';
import Layout from '../components/Layout';
import PageHeader from '../components/PageHeader';
import Button from '../components/Button';
import Badge from '../components/Badge';

const ProductDetail = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  const product = {
    id: id || '1',
    name: 'Premium Plastic Pellets - Food Grade PP',
    price: 950,
    unit: 'kg',
    minOrder: 100,
    rating: 4.7,
    reviewCount: 142,
    description: 'High-quality food-grade polypropylene pellets perfect for manufacturing food containers, packaging, and other food-safe products. FDA approved with certification.',
    features: [
      'FDA Approved Food Grade',
      'Consistent Melt Flow Index',
      'Low Moisture Content',
      'Excellent Thermal Stability',
      'UV Stabilized'
    ],
    specifications: {
      'Material Type': 'Polypropylene (PP)',
      'Color': 'Natural White',
      'Melt Flow Rate': '25 g/10min',
      'Density': '0.9 g/cm³',
      'Tensile Strength': '35 MPa',
      'Impact Strength': '4 kJ/m²'
    },
    supplier: {
      name: 'Lagos Plastics Ltd',
      rating: 4.8,
      responseRate: '98%',
      deliveryTime: '2-5 days',
      verified: true,
      location: 'Lagos, Nigeria'
    },
    images: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1620744670076-6c8310916343?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1633713368365-30ca38ed5d98?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ]
  };

  const incrementQuantity = () => setQuantity(quantity + 1);
  const decrementQuantity = () => quantity > 1 && setQuantity(quantity - 1);

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PageHeader
          breadcrumbs={[
            { label: 'Home', href: '/' },
            { label: 'Raw Materials', href: '/materials' },
            { label: product.name }
          ]}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-4">
              <img 
                src={product.images[activeImage]} 
                alt={product.name}
                className="w-full h-96 object-cover"
              />
            </div>
            <div className="flex space-x-2">
              {product.images.map((img, index) => (
                <button 
                  key={index}
                  onClick={() => setActiveImage(index)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
                    activeImage === index ? 'border-blue-500' : 'border-gray-200'
                  }`}
                >
                  <img src={img} alt={`View ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-3">
                <Badge variant="success">In Stock</Badge>
                <div className="flex space-x-2">
                  <button className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200">
                    <Heart className="h-5 w-5 text-gray-600" />
                  </button>
                  <button className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200">
                    <Share2 className="h-5 w-5 text-gray-600" />
                  </button>
                </div>
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                    />
                  ))}
                  <span className="ml-2 text-gray-600">{product.rating} ({product.reviewCount})</span>
                </div>
              </div>

              <div className="text-4xl font-bold text-gray-900 mb-2">
                ₦{product.price.toLocaleString()}<span className="text-lg font-normal text-gray-600">/{product.unit}</span>
              </div>
              
              <p className="text-gray-600">Minimum order: {product.minOrder} {product.unit}</p>
            </div>

            {/* Features */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Key Features</h3>
              <div className="grid grid-cols-1 gap-2">
                {product.features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="border-t border-gray-200 pt-6">
              <div className="flex items-center justify-between mb-6">
                <span className="font-semibold text-gray-900">Quantity</span>
                <div className="flex items-center space-x-3">
                  <button onClick={decrementQuantity} className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-12 text-center font-semibold">{quantity}</span>
                  <button onClick={incrementQuantity} className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                    <Plus className="h-4 w-4" />
                  </button>
                  <span className="text-gray-600">{product.unit}</span>
                </div>
              </div>

              <div className="flex space-x-4">
                <Button className="flex-1">Add to Cart</Button>
                <Button variant="secondary" className="flex-1">
                  Request Quote
                </Button>
              </div>

              <div className="flex items-center justify-center space-x-6 mt-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <Truck className="h-4 w-4 mr-1" />
                  <span>Delivery in {product.supplier.deliveryTime}</span>
                </div>
                <div className="flex items-center">
                  <Shield className="h-4 w-4 mr-1" />
                  <span>Quality Guaranteed</span>
                </div>
              </div>
            </div>

            {/* Supplier Info */}
            <div className="bg-gray-50 rounded-xl p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Supplier Information</h3>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="font-semibold text-blue-600">{product.supplier.name.charAt(0)}</span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{product.supplier.name}</div>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-3 w-3 mr-1" />
                      {product.supplier.location}
                    </div>
                  </div>
                </div>
                {product.supplier.verified && (
                  <Badge variant="success" className="flex items-center">
                    <Shield className="h-3 w-3 mr-1" />
                    Verified
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Details Tabs */}
        <div className="mt-12 bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button className="border-b-2 border-blue-500 py-4 px-1 text-sm font-medium text-blue-600">
                Specifications
              </button>
              <button className="border-b-2 border-transparent py-4 px-1 text-sm font-medium text-gray-500 hover:text-gray-700">
                Reviews
              </button>
              <button className="border-b-2 border-transparent py-4 px-1 text-sm font-medium text-gray-500 hover:text-gray-700">
                Shipping
              </button>
            </nav>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="flex justify-between py-3 border-b border-gray-100">
                  <span className="font-medium text-gray-700">{key}</span>
                  <span className="text-gray-900">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;