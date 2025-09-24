// pages/UploadProduct.js
import React, { useState } from 'react';
import { 
  Upload, 
  Package, 
  Camera, 
  X, 
  DollarSign, 
  Tag, 
  Scale,
  MapPin,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import Layout from '../components/Layout';
import PageHeader from '../components/PageHeader';
import Button from '../components/Button';
import Input from '../components/Input';
import Badge from '../components/Badge';

const UploadProduct = () => {
  const [step, setStep] = useState(1);
  const [images, setImages] = useState([]);
  const [formData, setFormData] = useState({
    // Basic Information
    productName: '',
    category: '',
    description: '',
    
    // Pricing & Quantity
    price: '',
    unit: 'kg',
    minOrder: '',
    availableQuantity: '',
    
    // Specifications
    materialType: '',
    color: '',
    specifications: '',
    
    // Logistics
    location: '',
    deliveryOptions: [],
    
    // Seller Info
    sellerNotes: ''
  });

  const categories = [
    'Plastics & Polymers',
    'Metals & Alloys',
    'Chemicals & Additives',
    'Textiles & Fabrics',
    'Packaging Materials',
    'Construction Materials',
    'Food Raw Materials',
    'Electronics Components',
    'Other'
  ];

  const units = ['kg', 'tons', 'liters', 'pieces', 'rolls', 'sheets', 'bags', 'containers'];
  const locations = ['Lagos', 'Abuja', 'Port Harcourt', 'Kano', 'Ibadan', 'Benin City', 'Enugu', 'Kaduna'];

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }));
    setImages([...images, ...newImages]);
  };

  const removeImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate submission
    console.log('Product submitted:', { ...formData, images });
    alert('Product listed successfully!');
  };

  const isStepValid = () => {
    switch (step) {
      case 1:
        return formData.productName && formData.category && formData.description;
      case 2:
        return formData.price && formData.availableQuantity && formData.minOrder;
      case 3:
        return formData.location && images.length > 0;
      default:
        return true;
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PageHeader
          title="List New Product"
          subtitle="Sell your raw materials to Nigerian SMEs"
          breadcrumbs={[
            { label: 'Home', href: '/' },
            { label: 'Sell Materials', href: '/sell' },
            { label: 'List Product' }
          ]}
        />

        {/* Progress Steps */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-between mb-8">
            {[1, 2, 3, 4].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                  step >= stepNumber 
                    ? 'bg-blue-600 border-blue-600 text-white' 
                    : 'border-gray-300 text-gray-400'
                }`}>
                  {step > stepNumber ? <CheckCircle className="h-5 w-5" /> : stepNumber}
                </div>
                {stepNumber < 4 && (
                  <div className={`w-20 h-1 mx-4 ${
                    step > stepNumber ? 'bg-blue-600' : 'bg-gray-200'
                  }`}></div>
                )}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-4 text-center text-sm font-medium">
            <div className={`${step >= 1 ? 'text-blue-600' : 'text-gray-500'}`}>Basic Info</div>
            <div className={`${step >= 2 ? 'text-blue-600' : 'text-gray-500'}`}>Pricing</div>
            <div className={`${step >= 3 ? 'text-blue-600' : 'text-gray-500'}`}>Media</div>
            <div className={`${step >= 4 ? 'text-blue-600' : 'text-gray-500'}`}>Review</div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          {/* Step 1: Basic Information */}
          {step === 1 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                <Package className="h-5 w-5 mr-2 text-blue-600" />
                Product Information
              </h3>

              <Input
                label="Product Name"
                name="productName"
                value={formData.productName}
                onChange={handleChange}
                required
                placeholder="e.g., Premium Plastic Pellets - Food Grade PP"
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="Describe your product in detail..."
                  required
                />
              </div>
            </div>
          )}

          {/* Step 2: Pricing & Quantity */}
          {step === 2 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                <DollarSign className="h-5 w-5 mr-2 text-green-600" />
                Pricing & Quantity
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input
                  label="Price per Unit (₦)"
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  leftIcon={<span className="text-gray-500">₦</span>}
                  placeholder="0.00"
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Unit *
                  </label>
                  <select
                    name="unit"
                    value={formData.unit}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    required
                  >
                    {units.map(unit => (
                      <option key={unit} value={unit}>{unit}</option>
                    ))}
                  </select>
                </div>

                <Input
                  label="Available Quantity"
                  name="availableQuantity"
                  type="number"
                  value={formData.availableQuantity}
                  onChange={handleChange}
                  required
                  placeholder="1000"
                />
              </div>

              <Input
                label="Minimum Order Quantity"
                name="minOrder"
                type="number"
                value={formData.minOrder}
                onChange={handleChange}
                required
                placeholder="100"
              />

              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-blue-900">Pricing Tip</p>
                    <p className="text-sm text-blue-700 mt-1">
                      Competitive pricing increases visibility. Check similar products on Supplify for market rates.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Media & Location */}
          {step === 3 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                <Camera className="h-5 w-5 mr-2 text-purple-600" />
                Photos & Location
              </h3>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Photos *
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload" className="cursor-pointer">
                    <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-2">Click to upload or drag and drop</p>
                    <p className="text-sm text-gray-500">PNG, JPG up to 10MB each</p>
                  </label>
                </div>

                {/* Image Previews */}
                {images.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-600 mb-3">{images.length} photos selected</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {images.map((image, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={image.preview}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-24 object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location *
                </label>
                <select
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  required
                >
                  <option value="">Select Location</option>
                  {locations.map(location => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* Step 4: Review & Submit */}
          {step === 4 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
                Review Your Listing
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Product Details</h4>
                  <div className="space-y-2">
                    <div><strong>Name:</strong> {formData.productName}</div>
                    <div><strong>Category:</strong> {formData.category}</div>
                    <div><strong>Description:</strong> {formData.description}</div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Pricing</h4>
                  <div className="space-y-2">
                    <div><strong>Price:</strong> ₦{formData.price} per {formData.unit}</div>
                    <div><strong>Available:</strong> {formData.availableQuantity} {formData.unit}</div>
                    <div><strong>Min Order:</strong> {formData.minOrder} {formData.unit}</div>
                    <div><strong>Location:</strong> {formData.location}</div>
                  </div>
                </div>
              </div>

              {images.length > 0 && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Photos ({images.length})</h4>
                  <div className="grid grid-cols-4 gap-2">
                    {images.map((image, index) => (
                      <img
                        key={index}
                        src={image.preview}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-16 object-cover rounded"
                      />
                    ))}
                  </div>
                </div>
              )}

              <div className="bg-green-50 rounded-lg p-4">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                  <p className="text-green-800 font-medium">Your listing is ready to go live!</p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-8 border-t border-gray-200 mt-8">
            <Button
              type="button"
              variant="outline"
              onClick={handleBack}
              disabled={step === 1}
            >
              Back
            </Button>

            {step < 4 ? (
  <Button
    type="button"
    onClick={handleNext}
    disabled={!isStepValid()}
  >
    Continue to {step === 1 ? 'Pricing' : step === 2 ? 'Media' : 'Review'}
  </Button>
) : (
  <Button type="submit">
    Publish Listing
  </Button>
)}
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default UploadProduct;