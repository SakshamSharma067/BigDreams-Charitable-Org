import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const Campaigns = () => {
  const { 
    campaigns, 
    isLoading, 
    error, 
    isVolunteer,
    isAuthenticated,
    fetchCampaign,
    deleteCampaign,
    user
  } = useAppContext();

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCampaigns, setFilteredCampaigns] = useState([]);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => {
    fetchCampaign();
  }, []);

  useEffect(() => {
    if (campaigns) {
      const filtered = campaigns.filter(campaign =>
        campaign.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        campaign.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCampaigns(filtered);
    }
  }, [searchTerm, campaigns]);

  const handleDelete = async (campaignId) => {
    if (deleteConfirm === campaignId) {
      const result = await deleteCampaign(campaignId);
      if (result.success) {
        setDeleteConfirm(null);
      }
    } else {
      setDeleteConfirm(campaignId);
    }
  };

  // Check if the user is the owner of the campaign
  const isOwner = (campaign) => {
    if (!user || !campaign) return false;
    
    const userId = user.id || user._id;
    const creatorId = campaign.createdBy?._id || campaign.createdBy;
    
    return userId === creatorId;
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500 text-center">
          <h2 className="text-2xl font-bold mb-2">Error</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-teal-500 to-emerald-500 mb-4">Campaigns</h1>
            <p className="text-xl text-gray-600">Support our ongoing initiatives and make a difference.</p>
          </div>
          {isVolunteer() && (
            <Link
              to="/campaign/create"
              className="inline-flex items-center px-6 py-3 text-base font-medium rounded-md text-white bg-gradient-to-r from-blue-500 via-teal-500 to-emerald-500 hover:from-blue-600 hover:via-teal-600 hover:to-emerald-600 transition-colors duration-300 shadow-md hover:shadow-lg"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Create Campaign
            </Link>
          )}
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search campaigns..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 pl-10 pr-4 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Campaigns Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCampaigns.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                />
              </svg>
              <h3 className="mt-2 text-lg font-medium text-gray-900">No campaigns found</h3>
              <p className="mt-1 text-gray-600">
                {isVolunteer() ? "Get started by creating a new campaign." : "Check back later for new campaigns."}
              </p>
              {isVolunteer() && (
                <div className="mt-6">
                  <Link
                    to="/campaign/create"
                    className="inline-flex items-center px-6 py-3 text-base font-medium rounded-md text-white bg-gradient-to-r from-blue-500 via-teal-500 to-emerald-500 hover:from-blue-600 hover:via-teal-600 hover:to-emerald-600 transition-colors duration-300 shadow-md hover:shadow-lg"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Create Campaign
                  </Link>
                </div>
              )}
            </div>
          ) : (
            filteredCampaigns.map((campaign) => (
              <div
                key={campaign._id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                {/* Campaign Image */}
                <div className="h-48 overflow-hidden relative">
                  <img
                    src={campaign.images?.[0] || '/placeholder-campaign.jpg'}
                    alt={campaign.title}
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                  />
                  {isOwner(campaign) && (
                    <div className="absolute top-2 right-2 flex space-x-2">
                      <Link
                        to={`/campaign/edit/${campaign._id}`}
                        className="bg-yellow-500 p-2 rounded-full text-white hover:bg-yellow-600 transition-colors duration-300"
                        title="Edit Campaign"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </Link>
                      <button
                        onClick={() => handleDelete(campaign._id)}
                        className={`p-2 rounded-full text-white transition-colors duration-300 ${
                          deleteConfirm === campaign._id
                            ? 'bg-red-600 hover:bg-red-700'
                            : 'bg-red-500 hover:bg-red-600'
                        }`}
                        title={deleteConfirm === campaign._id ? 'Confirm Delete' : 'Delete Campaign'}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          {deleteConfirm === campaign._id ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          )}
                        </svg>
                      </button>
                    </div>
                  )}
                </div>

                {/* Campaign Content */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-500 mb-2">{campaign.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{campaign.description}</p>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-gradient-to-r from-blue-500 via-teal-500 to-emerald-500 h-2.5 rounded-full"
                        style={{
                          width: `${Math.min((campaign.currentAmount / campaign.targetAmount) * 100, 100)}%`
                        }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600 mt-2">
                      <span>${campaign.currentAmount?.toLocaleString()}</span>
                      <span>Goal: ${campaign.targetAmount?.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Campaign Details */}
                  <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                    <span>Start: {new Date(campaign.startDate).toLocaleDateString()}</span>
                    <span>End: {new Date(campaign.endDate).toLocaleDateString()}</span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-between items-center">
                    <Link
                      to={`/campaign/${campaign._id}`}
                      className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-300"
                    >
                      View Details
                    </Link>
                    {isAuthenticated() && (
                      <Link
                        to={`/donate/${campaign._id}`}
                        className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-white bg-gradient-to-r from-blue-500 via-teal-500 to-emerald-500 hover:from-blue-600 hover:via-teal-600 hover:to-emerald-600 transition-colors duration-300"
                      >
                        Donate Now
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Campaigns;