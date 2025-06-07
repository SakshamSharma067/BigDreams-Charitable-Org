import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const Donate = () => {
  const { campaignId } = useParams();
  const [donationAmount, setDonationAmount] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [donationType, setDonationType] = useState('one-time');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [selectedCampaign, setSelectedCampaign] = useState(campaignId || '');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    address: '',
    city: '',
    country: '',
    postalCode: ''
  });

  const predefinedAmounts = [25, 50, 100, 250, 500, 1000];
  const navigate = useNavigate();
  const { user, campaigns } = useAppContext();

  // Set initial campaign from URL parameter
  useEffect(() => {
    if (campaignId) {
      setSelectedCampaign(campaignId);
    }
  }, [campaignId]);

  // Get the selected campaign object
  const currentCampaign = campaigns?.find(c => c._id === selectedCampaign);

  const handleAmountSelect = (amount) => {
    setDonationAmount(amount);
    setCustomAmount('');
  };

  const handleCustomAmount = (e) => {
    const value = e.target.value;
    if (value === '' || /^\d+$/.test(value)) {
      setCustomAmount(value);
      setDonationAmount('custom');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!user) {
      toast.error('Please log in to make a donation');
      navigate('/login');
      return;
    }

    const amount = donationAmount === 'custom' ? parseFloat(customAmount) : parseFloat(donationAmount);
    
    if (!amount || amount <= 0) {
      toast.error('Please enter a valid donation amount');
      return;
    }

    // If a campaign is selected, check if donation amount exceeds remaining target
    if (selectedCampaign) {
      const campaign = campaigns.find(c => c._id === selectedCampaign);
      const remainingAmount = campaign.targetAmount - campaign.currentAmount;
      if (amount > remainingAmount) {
        toast.error(`The maximum donation amount for this campaign is $${remainingAmount}`);
        return;
      }
    }

    try {
      const response = await axios.post('/api/donation/create', {
        amount,
        paymentMethod,
        transactionId: Date.now().toString(),
        campaignId: selectedCampaign || null,
        donorName: formData.name,
        donorEmail: formData.email
      });

      if (response.data.success) {
        toast.success('Thank you for your donation!');
        // If donating to a specific campaign, redirect to that campaign's page
        if (selectedCampaign) {
          navigate(`/campaign/${selectedCampaign}`);
        } else {
          navigate('/dashboard');
        }
      } else {
        toast.error(response.data.message || 'Failed to process donation');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to process donation');
      console.error('Donation error:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const impactMetrics = [
    {
      amount: 25,
      impact: "Provides clean water to a family for a month"
    },
    {
      amount: 50,
      impact: "Supplies school materials for two children"
    },
    {
      amount: 100,
      impact: "Funds medical supplies for a rural clinic"
    },
    {
      amount: 250,
      impact: "Supports a community farming project"
    }
  ];

  // Add campaign selection component
  const CampaignSelection = () => {
    // If we're on a specific campaign page, show campaign details instead of dropdown
    if (campaignId && currentCampaign) {
      const remainingAmount = currentCampaign.targetAmount - currentCampaign.currentAmount;
      return (
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Selected Campaign</label>
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h3 className="font-medium text-gray-900">{currentCampaign.title}</h3>
            <p className="text-sm text-gray-600 mt-1">Remaining goal: ${remainingAmount}</p>
          </div>
        </div>
      );
    }

    return (
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Select Campaign (Optional)</label>
        <select
          value={selectedCampaign}
          onChange={(e) => setSelectedCampaign(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all duration-300"
        >
          <option value="">General Donation</option>
          {campaigns?.map((campaign) => {
            const remainingAmount = campaign.targetAmount - campaign.currentAmount;
            if (remainingAmount > 0 && campaign.status === 'active') {
              return (
                <option key={campaign._id} value={campaign._id}>
                  {campaign.title} (${remainingAmount} needed)
                </option>
              );
            }
            return null;
          })}
        </select>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-teal-500 to-emerald-500 mb-4">Make a Donation</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your generosity can make a real difference in someone's life. Choose how you'd like to contribute to our cause.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Donation Form */}
          <div className="lg:col-span-2">
            <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Donation Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Donation Type</label>
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setDonationType('one-time')}
                      className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all duration-300 ${
                        donationType === 'one-time'
                          ? 'border-blue-500 bg-blue-50 text-blue-600'
                          : 'border-gray-200 text-gray-600 hover:border-blue-300'
                      }`}
                    >
                      One-time
                    </button>
                    <button
                      type="button"
                      onClick={() => setDonationType('monthly')}
                      className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all duration-300 ${
                        donationType === 'monthly'
                          ? 'border-blue-500 bg-blue-50 text-blue-600'
                          : 'border-gray-200 text-gray-600 hover:border-blue-300'
                      }`}
                    >
                      Monthly
                    </button>
                  </div>
                </div>

                {/* Campaign Selection */}
                <CampaignSelection />

                {/* Amount Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select Amount</label>
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    {predefinedAmounts.map((amount) => (
                      <button
                        key={amount}
                        type="button"
                        onClick={() => handleAmountSelect(amount)}
                        className={`py-3 px-4 rounded-lg border-2 transition-all duration-300 ${
                          donationAmount === amount
                            ? 'border-blue-500 bg-blue-50 text-blue-600'
                            : 'border-gray-200 text-gray-600 hover:border-blue-300'
                        }`}
                      >
                        ${amount}
                      </button>
                    ))}
                  </div>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                    <input
                      type="text"
                      placeholder="Custom Amount"
                      value={customAmount}
                      onChange={handleCustomAmount}
                      className={`w-full pl-8 pr-4 py-3 rounded-lg border-2 transition-all duration-300 bg-white text-gray-900 ${
                        donationAmount === 'custom'
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200'
                      }`}
                    />
                  </div>
                </div>

                {/* Payment Method */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
                  <div className="grid grid-cols-3 gap-4">
                    {['card', 'paypal', 'bank'].map((method) => (
                      <button
                        key={method}
                        type="button"
                        onClick={() => setPaymentMethod(method)}
                        className={`py-3 px-4 rounded-lg border-2 transition-all duration-300 ${
                          paymentMethod === method
                            ? 'border-blue-500 bg-blue-50 text-blue-600'
                            : 'border-gray-200 text-gray-600 hover:border-blue-300'
                        }`}
                      >
                        {method}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Personal Information */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="mt-1 block w-full px-4 py-3 border border-gray-300 text-gray-900 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="mt-1 block w-full px-4 py-3 border border-gray-300 text-gray-900 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      required
                    />
                  </div>
                </div>

                {/* Card Details */}
                {paymentMethod === 'card' && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleChange}
                        className="mt-1 block w-full px-4 py-3 border border-gray-300 text-gray-900 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                        placeholder="1234 5678 9012 3456"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
                        <input
                          type="text"
                          name="expiryDate"
                          value={formData.expiryDate}
                          onChange={handleChange}
                          className="mt-1 block w-full px-4 py-3 border border-gray-300 text-gray-900 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                          placeholder="MM/YY"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                        <input
                          type="text"
                          name="cvv"
                          value={formData.cvv}
                          onChange={handleChange}
                          className="mt-1 block w-full px-4 py-3 border border-gray-300 text-gray-900 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                          placeholder="123"
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Billing Address */}
                <div className="space-y-6">
                  <h3 className="text-sm font-medium text-gray-700">Billing Address</h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Street Address</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="mt-1 block w-full px-4 py-3 border border-gray-300 text-gray-900 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className="mt-1 block w-full px-4 py-3 border border-gray-300 text-gray-900 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                      <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className="mt-1 block w-full px-4 py-3 border border-gray-300 text-gray-900 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Postal Code</label>
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleChange}
                      className="mt-1 block w-full px-4 py-3 border border-gray-300 text-gray-900 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      required
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-3 px-6 text-white bg-gradient-to-r from-blue-500 via-teal-500 to-emerald-500 hover:from-blue-600 hover:via-teal-600 hover:to-emerald-600 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300"
                >
                  Complete Donation
                </button>
              </form>
            </div>
          </div>

          {/* Impact Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-8 shadow-xl">
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-teal-500 to-emerald-500 mb-6">Your Impact</h2>
              <div className="space-y-6">
                {impactMetrics.map((metric, index) => (
                  <div key={index} className="p-4 rounded-lg bg-gray-50">
                    <div className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-teal-500 to-emerald-500 mb-2">
                      ${metric.amount}
                    </div>
                    <p className="text-gray-600">{metric.impact}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Donate;