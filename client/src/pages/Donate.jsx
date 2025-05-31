import React, { useState } from 'react';

const Donate = () => {
  const [donationAmount, setDonationAmount] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [donationType, setDonationType] = useState('one-time');
  const [paymentMethod, setPaymentMethod] = useState('card');
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle payment processing
    console.log('Processing donation:', {
      amount: donationAmount === 'custom' ? customAmount : donationAmount,
      type: donationType,
      method: paymentMethod,
      ...formData
    });
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

  return (
    <div className="min-h-screen bg-purple-50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-purple-900 mb-4">Make a Donation</h1>
          <p className="text-xl text-purple-600 max-w-2xl mx-auto">
            Your generosity can make a real difference in someone's life. Choose how you'd like to contribute to our cause.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Donation Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-8 shadow-xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Donation Type */}
                <div>
                  <label className="block text-purple-900 mb-4 text-lg font-medium">Donation Type</label>
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setDonationType('one-time')}
                      className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all duration-300 ${
                        donationType === 'one-time'
                          ? 'border-purple-600 bg-purple-50 text-purple-600'
                          : 'border-gray-200 text-gray-600 hover:border-purple-300'
                      }`}
                    >
                      One-time
                    </button>
                    <button
                      type="button"
                      onClick={() => setDonationType('monthly')}
                      className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all duration-300 ${
                        donationType === 'monthly'
                          ? 'border-purple-600 bg-purple-50 text-purple-600'
                          : 'border-gray-200 text-gray-600 hover:border-purple-300'
                      }`}
                    >
                      Monthly
                    </button>
                  </div>
                </div>

                {/* Amount Selection */}
                <div>
                  <label className="block text-purple-900 mb-4 text-lg font-medium">Select Amount</label>
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    {predefinedAmounts.map((amount) => (
                      <button
                        key={amount}
                        type="button"
                        onClick={() => handleAmountSelect(amount)}
                        className={`py-3 px-4 rounded-lg border-2 transition-all duration-300 ${
                          donationAmount === amount
                            ? 'border-purple-600 bg-purple-50 text-purple-600'
                            : 'border-gray-200 text-gray-600 hover:border-purple-300'
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
                      className={`w-full pl-8 pr-4 py-3 rounded-lg border-2 transition-all duration-300 ${
                        donationAmount === 'custom'
                          ? 'border-purple-600 bg-purple-50'
                          : 'border-gray-200'
                      }`}
                    />
                  </div>
                </div>

                {/* Payment Method */}
                <div>
                  <label className="block text-purple-900 mb-4 text-lg font-medium">Payment Method</label>
                  <div className="grid grid-cols-3 gap-4">
                    {['card', 'paypal', 'bank'].map((method) => (
                      <button
                        key={method}
                        type="button"
                        onClick={() => setPaymentMethod(method)}
                        className={`py-3 px-4 rounded-lg border-2 capitalize transition-all duration-300 ${
                          paymentMethod === method
                            ? 'border-purple-600 bg-purple-50 text-purple-600'
                            : 'border-gray-200 text-gray-600 hover:border-purple-300'
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
                    <label className="block text-purple-900 mb-2">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-purple-900 mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      required
                    />
                  </div>
                </div>

                {/* Card Details */}
                {paymentMethod === 'card' && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-purple-900 mb-2">Card Number</label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleChange}
                        placeholder="1234 5678 9012 3456"
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-purple-900 mb-2">Expiry Date</label>
                        <input
                          type="text"
                          name="expiryDate"
                          value={formData.expiryDate}
                          onChange={handleChange}
                          placeholder="MM/YY"
                          className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-purple-900 mb-2">CVV</label>
                        <input
                          type="text"
                          name="cvv"
                          value={formData.cvv}
                          onChange={handleChange}
                          placeholder="123"
                          className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Billing Address */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-purple-900 mb-2">Address</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-purple-900 mb-2">City</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-purple-900 mb-2">Postal Code</label>
                      <input
                        type="text"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        required
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 px-6 text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg hover:from-purple-500 hover:to-pink-500 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl font-medium text-lg"
                >
                  Complete Donation
                </button>
              </form>
            </div>
          </div>

          {/* Impact Information */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h2 className="text-xl font-semibold text-purple-900 mb-4">Your Impact</h2>
              <div className="space-y-4">
                {impactMetrics.map((metric, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                      (donationAmount === metric.amount || (donationAmount === 'custom' && parseInt(customAmount) === metric.amount))
                        ? 'border-purple-600 bg-purple-50'
                        : 'border-gray-200'
                    }`}
                  >
                    <div className="font-medium text-purple-900">${metric.amount}</div>
                    <div className="text-purple-600">{metric.impact}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-6 text-white">
              <h2 className="text-xl font-semibold mb-4">Why Donate?</h2>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  100% of donations go to programs
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Tax-deductible contributions
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Transparent impact reporting
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Regular updates on projects
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Donate;