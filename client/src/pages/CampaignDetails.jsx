import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { toast } from 'react-hot-toast';
import axios from 'axios';

const CampaignDetails = () => {
  const { id } = useParams();
  const { getCampaignById, isLoading, user, isVolunteer } = useAppContext();
  const [campaign, setCampaign] = useState(null);
  const [error, setError] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCampaign = async () => {
      const response = await getCampaignById(id);
      if (response.success) {
        setCampaign(response.campaign);
      } else {
        setError(response.message);
      }
    };

    fetchCampaign();
  }, [id]);

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === campaign.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? campaign.images.length - 1 : prev - 1
    );
  };

  const handleDonate = async (amount) => {
    if (!user) {
      toast.error('Please log in to make a donation');
      navigate('/login');
      return;
    }

    try {
      const donationResponse = await axios.post('/api/donation/create', {
        amount,
        paymentMethod: 'card',
        transactionId: Date.now().toString(),
        campaignId: campaign._id,
        donorName: user.name,
        donorEmail: user.email
      });

      if (donationResponse.data.success) {
        toast.success('Thank you for your donation!');
        // Update the campaign data in the UI
        setCampaign({
          ...campaign,
          currentAmount: campaign.currentAmount + amount
        });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to process donation');
      console.error('Donation error:', error);
    }
  };

  const CampaignProgress = ({ campaign }) => {
    const progress = (campaign.currentAmount / campaign.targetAmount) * 100;
    const remainingAmount = campaign.targetAmount - campaign.currentAmount;

    return (
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">Campaign Progress</span>
          <span className="text-sm font-medium text-gray-700">{progress.toFixed(1)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-gradient-to-r from-blue-500 via-teal-500 to-emerald-500 h-2.5 rounded-full"
            style={{ width: `${Math.min(progress, 100)}%` }}
          ></div>
        </div>
        <div className="flex justify-between items-center mt-2">
          <span className="text-sm text-gray-600">Raised: ${campaign.currentAmount}</span>
          <span className="text-sm text-gray-600">Goal: ${campaign.targetAmount}</span>
        </div>
        {remainingAmount > 0 && (
          <div className="mt-4">
            <p className="text-sm text-gray-600">
              Still needed: <span className="font-medium text-gray-900">${remainingAmount}</span>
            </p>
          </div>
        )}
      </div>
    );
  };

  const QuickDonate = ({ campaign }) => {
    const remainingAmount = campaign.targetAmount - campaign.currentAmount;
    const suggestedAmounts = [
      Math.min(50, remainingAmount),
      Math.min(100, remainingAmount),
      Math.min(250, remainingAmount),
      Math.min(500, remainingAmount)
    ].filter((amount, index, self) => amount > 0 && self.indexOf(amount) === index);

    if (remainingAmount <= 0) {
      return (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
          <p className="text-green-800 font-medium">
            Thank you! This campaign has reached its goal.
          </p>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold mb-2">Make a Quick Donation</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {suggestedAmounts.map((amount) => (
            <button
              key={amount}
              onClick={() => handleDonate(amount)}
              className="px-4 py-2 bg-gradient-to-r from-blue-500 via-teal-500 to-emerald-500 text-white rounded-lg hover:from-blue-600 hover:via-teal-600 hover:to-emerald-600 transition-all duration-300"
            >
              Donate ${amount}
            </button>
          ))}
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg relative" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <div className="text-gray-600">Campaign not found</div>
      </div>
    );
  }

  const startDate = new Date(campaign.startDate).toLocaleDateString();
  const endDate = new Date(campaign.endDate).toLocaleDateString();

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Image Carousel */}
        <div className="relative h-96">
          <img
            src={campaign.images[currentImageIndex]}
            alt={campaign.title}
            className="w-full h-full object-cover"
          />
          {campaign.images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all duration-300"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all duration-300"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {campaign.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`h-2 w-2 rounded-full transition-all duration-300 ${
                      index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Campaign Info */}
        <div className="p-8">
          <div className="flex justify-between items-start mb-6">
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-teal-500 to-emerald-500">{campaign.title}</h1>
            {isVolunteer() && user?._id === campaign.createdBy && (
              <Link
                to={`/campaign/edit/${campaign._id}`}
                className="bg-gradient-to-r from-blue-500/10 via-teal-500/10 to-emerald-500/10 text-blue-600 px-4 py-2 rounded-full hover:from-blue-500/20 hover:via-teal-500/20 hover:to-emerald-500/20 transition-all duration-300"
              >
                Edit Campaign
              </Link>
            )}
          </div>

          {/* Campaign Progress */}
          <CampaignProgress campaign={campaign} />

          {/* Campaign Details */}
          <div className="prose max-w-none">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-teal-500 to-emerald-500 mb-2">Campaign Details</h2>
              <p className="text-gray-700 whitespace-pre-line">{campaign.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-teal-500 to-emerald-500">Start Date</h3>
                <p className="text-gray-900">{startDate}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-teal-500 to-emerald-500">End Date</h3>
                <p className="text-gray-900">{endDate}</p>
              </div>
            </div>

            {/* Campaign Status */}
            <div className="mb-8">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                campaign.status === 'completed'
                  ? 'bg-emerald-100 text-emerald-800'
                  : campaign.status === 'active'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
              </span>
            </div>

            {/* Donation Button */}
            {campaign.status === 'active' && (
              <Link
                to={`/donate/${campaign._id}`}
                className="block w-full text-center bg-gradient-to-r from-blue-500 via-teal-500 to-emerald-500 text-white py-3 rounded-xl hover:from-blue-600 hover:via-teal-600 hover:to-emerald-600 transform hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Donate Now
              </Link>
            )}

            {/* Add QuickDonate component after campaign details */}
            <div className="mb-8">
              <QuickDonate campaign={campaign} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetails;