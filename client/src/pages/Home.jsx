import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  // Sample data - replace with actual data from your backend
  const featuredCampaigns = [
    {
      id: 1,
      title: "Clean Water Initiative",
      description: "Providing clean water to rural communities",
      image: "/images/water.jpg",
      raised: 15000,
      goal: 20000,
    },
    {
      id: 2,
      title: "Education for All",
      description: "Supporting underprivileged children's education",
      image: "/images/education.jpg",
      raised: 25000,
      goal: 50000,
    },
    {
      id: 3,
      title: "Food Security Program",
      description: "Ensuring no one goes to bed hungry",
      image: "/images/food.jpg",
      raised: 10000,
      goal: 30000,
    },
  ];

  const impactStats = [
    { number: "50K+", label: "Lives Impacted" },
    { number: "100+", label: "Active Campaigns" },
    { number: "$2M+", label: "Funds Raised" },
    { number: "20K+", label: "Volunteers" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/hero-bg.jpg"
            alt="Hero Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/90 to-blue-900/90"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            <span className="block">Making a Difference</span>
            <span className="block mt-2 text-purple-200">One Life at a Time</span>
          </h1>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Join us in our mission to create positive change and build a better future for those in need.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/donate"
              className="inline-flex items-center px-8 py-3 text-lg font-medium text-white bg-gradient-to-r from-pink-600 to-purple-600 rounded-full hover:from-pink-500 hover:to-purple-500 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Donate Now
            </Link>
            <Link
              to="/volunteer"
              className="inline-flex items-center px-8 py-3 text-lg font-medium text-white bg-white/20 rounded-full hover:bg-white/30 transform hover:scale-105 transition-all duration-300 backdrop-blur-sm"
            >
              Become a Volunteer
            </Link>
          </div>
        </div>
      </section>

      {/* Impact Statistics */}
      <section className="py-16 bg-gradient-to-b from-purple-900 to-purple-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {impactStats.map((stat, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 transform hover:scale-105 transition-all duration-300"
              >
                <div className="text-4xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-purple-200">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Campaigns */}
      <section className="py-20 bg-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-purple-900 mb-4">Featured Campaigns</h2>
            <p className="text-purple-600 max-w-2xl mx-auto">
              Support our ongoing initiatives and help us make a lasting impact in communities around the world.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {featuredCampaigns.map((campaign) => (
              <div
                key={campaign.id}
                className="bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-300"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={campaign.image}
                    alt={campaign.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-purple-900 mb-2">{campaign.title}</h3>
                  <p className="text-purple-600 mb-4">{campaign.description}</p>
                  <div className="mb-4">
                    <div className="h-2 bg-purple-100 rounded-full">
                      <div
                        className="h-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"
                        style={{ width: `${(campaign.raised / campaign.goal) * 100}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between mt-2 text-sm text-purple-600">
                      <span>${campaign.raised.toLocaleString()} raised</span>
                      <span>${campaign.goal.toLocaleString()} goal</span>
                    </div>
                  </div>
                  <Link
                    to={`/campaigns/${campaign.id}`}
                    className="block text-center py-2 px-4 bg-purple-100 text-purple-600 rounded-full hover:bg-purple-200 transition-colors duration-300"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              to="/campaigns"
              className="inline-flex items-center px-6 py-3 text-lg font-medium text-purple-600 border-2 border-purple-600 rounded-full hover:bg-purple-600 hover:text-white transition-all duration-300"
            >
              View All Campaigns
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-purple-800 via-violet-900 to-purple-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Make a Difference?</h2>
          <p className="text-xl text-purple-200 mb-8 max-w-2xl mx-auto">
            Your support can help us continue our mission of creating positive change in communities worldwide.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/donate"
              className="inline-flex items-center px-8 py-3 text-lg font-medium text-white bg-gradient-to-r from-pink-600 to-purple-600 rounded-full hover:from-pink-500 hover:to-purple-500 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Donate Now
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center px-8 py-3 text-lg font-medium text-white bg-white/10 rounded-full hover:bg-white/20 transform hover:scale-105 transition-all duration-300 backdrop-blur-sm"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;