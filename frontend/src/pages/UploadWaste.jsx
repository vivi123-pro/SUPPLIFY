// pages/UploadWaste.js
import React, { useState } from 'react';
import { 
  Upload, 
  Recycle, 
  Camera, 
  X, 
  DollarSign, 
  AlertTriangle,
  MapPin,
  Calendar,
  CheckCircle
} from 'lucide-react';
import Layout from '../components/Layout';
import PageHeader from '../components/PageHeader';
import Button from '../components/Button';
import Input from '../components/Input';
import Badge from '../components/Badge';

const UploadWaste = () => {
  const [step, setStep] = useState(1);
  const [images, setImages] = useState([]);
  const [formData, setFormData] = useState({
    // Waste Information
    wasteName: '',
    category: '',
    description: '',
    condition: '',
    
    // Quantity & Pricing
    price: '',
    unit: 'kg',
    quantity: '',
    
    // Collection Details
    location: '',
    pickupAddress: '',
    availableDate: '',
    
    // Waste Specifics
    contaminationLevel: '',
    storageMethod: '',
    frequency: 'one-time'
  });

  const wasteCategories = [
    'Plastic Waste',
    'Metal Scraps',
    'Textile Waste',
    'Wood Waste',
    'Paper & Cardboard',
    'E-Waste',
    'Organic Waste',
    'Construction Waste',
    'Hazardous Waste',
    'Other'
  ];

  const conditions = ['Excellent', 'Good', 'Fair', 'Poor'];
  const contaminationLevels = ['None', 'Low', 'Medium', 'High'];
  const frequencies = ['One-time', 'Weekly', 'Monthly', 'Quarterly'];

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
    console.log('Waste submitted:', { ...formData, images });
    alert('Waste material listed successfully!');
  };

  const isStepValid = () => {
    switch (step) {
      case 1:
        return formData.wasteName && formData.category && formData.description;
      case 2:
        return formData.price && formData.quantity && formData.condition;
      case 3:
        return formData.location && formData.pickupAddress;
      default:
        return true;
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PageHeader
          title="List Waste Material"
          subtitle="Turn your industrial waste into profit"
          breadcrumbs={[
            { label: 'Home', href: '/' },
            { label: 'Waste Marketplace', href: '/waste-marketplace' },
            { label: 'List Waste' }
          ]}
        />

        {/* Progress Steps */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-between mb-8">
            {[1, 2, 3, 4].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                  step >= stepNumber 
                    ? 'bg-green-600 border-green-600 text-white' 
                    : 'border-gray-300 text-gray-400'
                }`}>
                  {step > stepNumber ? <CheckCircle className="h-5 w-5" /> : stepNumber}
                </div>
                {stepNumber < 4 && (
                  <div className={`w-20 h-1 mx-4 ${
                    step > stepNumber ? 'bg-green-600' : 'bg-gray-200'
                  }`}></div>
                )}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-4 text-center text-sm font-medium">
            <div className={`${step >= 1 ? 'text-green-600' : 'text-gray-500'}`}>Waste Info</div>
            <div className={`${step >= 2 ? 'text-green-600' : 'text-gray-500'}`}>Pricing</div>
            <div className={`${step >= 3 ? 'text-green-600' : 'text-gray-500'}`}>Collection</div>
            <div className={`${step >= 4 ? 'text-green-600' : 'text-gray-500'}`}>Review</div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          {/* Step 1: Waste Information */}
          {step === 1 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                <Recycle className="h-5 w-5 mr-2 text-green-600" />
                Waste Information
              </h3>

              <Input
                label="Waste Material Name"
                name="wasteName"
                value={formData.wasteName}
                onChange={handleChange}
                required
                placeholder="e.g., Plastic PP Scraps, Aluminum Shavings"
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Waste Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-3 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                  required
                >
                  <option value="">Select Waste Category</option>
                  {wasteCategories.map(cat => (
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
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                  placeholder="Describe the waste material, its source, and any special handling requirements..."
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Condition *
                  </label>
                  <select
                    name="condition"
                    value={formData.condition}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-3 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                    required
                  >
                    <option value="">Select Condition</option>
                    {conditions.map(cond => (
                      <option key={cond} value={cond}>{cond}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contamination Level
                  </label>
                  <select
                    name="contaminationLevel"
                    value={formData.contaminationLevel}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-3 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                  >
                    <option value="">Select Level</option>
                    {contaminationLevels.map(level => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                </div>
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

                <Input
                  label="Available Quantity"
                  name="quantity"
                  type="number"
                  value={formData.quantity}
                  onChange={handleChange}
                  required
                  placeholder="500"
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Unit *
                  </label>
                  <select
                    name="unit"
                    value={formData.unit}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-3 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                    required
                  >
                    <option value="kg">Kilograms (kg)</option>
                    <option value="tons">Tons</option>
                    <option value="pieces">Pieces</option>
                    <option value="liters">Liters</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Availability Frequency
                  </label>
                  <select
                    name="frequency"
                    value={formData.frequency}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-3 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                  >
                    {frequencies.map(freq => (
                      <option key={freq} value={freq.toLowerCase()}>{freq}</option>
                    ))}
                  </select>
                </div>

                <Input
                  label="Storage Method"
                  name="storageMethod"
                  value={formData.storageMethod}
                  onChange={handleChange}
                  placeholder="e.g., Baled, Loose, Packaged"
                />
              </div>

              <div className="bg-yellow-50 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-yellow-900">Important Notice</p>
                    <p className="text-sm text-yellow-700 mt-1">
                      Ensure proper disclosure of any hazardous materials. Non-compliance may result in listing removal.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Collection Details */}
          {step === 3 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-green-600" />
                Collection Details
              </h3>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Waste Photos (Recommended)
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="waste-image-upload"
                  />
                  <label htmlFor="waste-image-upload" className="cursor-pointer">
                    <Camera className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-2">Upload photos of the waste material</p>
                    <p className="text-sm text-gray-500">Helps buyers assess quality</p>
                  </label>
                </div>

                {images.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-600 mb-3">{images.length} photos selected</p>
                    <div className="grid grid-cols-4 gap-2">
                      {images.map((image, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={image.preview}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-16 object-cover rounded"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="h-2 w-2" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location *
                  </label>
                  <select
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-3 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                    required
                  >
                    <option value="">Select City</option>
                    <option value="Lagos">Lagos</option>
                    <option value="Abuja">Abuja</option>
                    <option value="Port Harcourt">Port Harcourt</option>
                    <option value="Kano">Kano</option>
                    <option value="Ibadan">Ibadan</option>
                  </select>
                </div>

                <Input
                  label="Available From"
                  name="availableDate"
                  type="date"
                  value={formData.availableDate}
                  onChange={handleChange}
                  leftIcon={<Calendar className="h-4 w-4 text-gray-400" />}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pickup Address *
                </label>
                <textarea
                  name="pickupAddress"
                  value={formData.pickupAddress}
                  onChange={handleChange}
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                  placeholder="Full address for waste collection..."
                  required
                />
              </div>
            </div>
          )}

          {/* Step 4: Review & Submit */}
          {step === 4 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
                Review Your Waste Listing
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Waste Details</h4>
                  <div className="space-y-2 text-sm">
                    <div><strong>Name:</strong> {formData.wasteName}</div>
                    <div><strong>Category:</strong> {formData.category}</div>
                    <div><strong>Condition:</strong> {formData.condition}</div>
                    <div><strong>Contamination:</strong> {formData.contaminationLevel || 'Not specified'}</div>
                    <div><strong>Description:</strong> {formData.description}</div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Collection & Pricing</h4>
                  <div className="space-y-2 text-sm">
                    <div><strong>Price:</strong> ₦{formData.price} per {formData.unit}</div>
                    <div><strong>Quantity:</strong> {formData.quantity} {formData.unit}</div>
                    <div><strong>Frequency:</strong> {formData.frequency}</div>
                    <div><strong>Location:</strong> {formData.location}</div>
                    <div><strong>Pickup Address:</strong> {formData.pickupAddress}</div>
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
                  <Recycle className="h-5 w-5 text-green-600 mr-2" />
                  <p className="text-green-800 font-medium">Ready to turn waste into profit!</p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-8 border-t border-gray-200 mt-8 ">
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
                variant="outline"
                onClick={handleNext}
                disabled={!isStepValid()}
                
              >
                Continue to {step === 1 ? 'Pricing' : step === 2 ? 'Collection' : 'Review'}
              </Button>
            ) : (
              <Button type="submit" variant="secondary">
                List Waste Material
              </Button>
            )}
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default UploadWaste;