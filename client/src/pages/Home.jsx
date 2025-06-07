import React from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { assets } from '../assets/assets'; 

const Home = () => {
  const { isVolunteer, campaigns, isLoading, isAuthenticated } = useAppContext();

  const impactStats = [
    { number: "50K+", label: "Lives Impacted" },
    { number: "100+", label: "Active Campaigns" },
    { number: "$2M+", label: "Funds Raised" },
    { number: "20K+", label: "Volunteers" },
  ];

  // Get 3 most recent active campaigns
  const featuredCampaigns = campaigns?.filter(campaign => campaign.status === 'active')
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3) || [];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={assets.bgimage}
            alt="Hero Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-teal-900/90"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Make a Difference Today
          </h1>
          <p className="text-xl text-teal-100 mb-8 max-w-2xl mx-auto">
            Join us in our mission to create positive change. Every contribution counts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/donate"
              className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-blue-600 bg-white hover:bg-blue-50 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Donate Now
            </Link>
            {!isVolunteer() && <Link
              to="/volunteer"
              className="inline-flex items-center px-8 py-3 border-2 border-white text-base font-medium rounded-full text-white hover:bg-white/10 transform hover:scale-105 transition-all duration-300"
            >
              Become a Volunteer
            </Link>}
          </div>
        </div>
      </section>

      {/* Impact Statistics */}
      <section className="py-16 bg-gradient-to-b from-blue-900 to-blue-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {impactStats.map((stat, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 transform hover:scale-105 transition-all duration-300"
              >
                <div className="text-4xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-teal-200">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Campaigns */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-teal-500 to-emerald-500 mb-8 text-center">
            Featured Campaigns
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {featuredCampaigns.map((campaign) => (
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
                </div>

                {/* Campaign Content */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{campaign.title}</h3>
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
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-500 hover:bg-green-600 transition-colors duration-300"
                      >
                        Donate Now
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              to="/campaign"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-blue-500 via-teal-500 to-emerald-500 hover:from-blue-600 hover:via-teal-600 hover:to-emerald-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              View All Campaigns
            </Link>
          </div>
        </div>
      </section>

      {/* How to Help */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-teal-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">
            How You Can Help
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Make a Donation",
                description: "Support our causes with a one-time or recurring donation.",
                icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              },
              {
                title: "Volunteer Time",
                description: "Join our community of dedicated volunteers making a difference.",
                icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              },
              {
                title: "Spread Awareness",
                description: "Share our mission and help us reach more people in need.",
                icon: "M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
              }
            ].map((item, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">{item.title}</h3>
                <p className="text-teal-100">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-teal-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-8">Ready to Make a Difference?</h2>
          <p className="text-xl text-teal-100 mb-8 max-w-2xl mx-auto">
            Join our community of change-makers and help us create a better world for those in need.
          </p>
          {!isAuthenticated() && <Link
            to="/register"
            className="inline-flex items-center px-8 py-3 text-lg font-medium text-white bg-white/10 rounded-full hover:bg-white/20 transform hover:scale-105 transition-all duration-300 backdrop-blur-sm"
          >
            Get Started Today
          </Link>}
        </div>
      </section>
    </div>
  );
};

export default Home;