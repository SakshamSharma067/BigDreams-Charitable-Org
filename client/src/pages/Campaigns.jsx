import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Campaigns = () => {
  // Sample data - replace with actual data from your backend
  const allCampaigns = [
    {
      id: 1,
      title: "Clean Water Initiative",
      description: "Providing clean water to rural communities in need. Our initiative aims to install water purification systems and wells in areas with limited access to safe drinking water.",
      image: "/images/water.jpg",
      raised: 15000,
      goal: 20000,
      category: "Health",
      location: "Rural India",
      daysLeft: 45,
    },
    {
      id: 2,
      title: "Education for All",
      description: "Supporting underprivileged children's education by providing school supplies, uniforms, and funding for teachers in low-income areas.",
      image: "/images/education.jpg",
      raised: 25000,
      goal: 50000,
      category: "Education",
      location: "Kenya",
      daysLeft: 60,
    },
    {
      id: 3,
      title: "Food Security Program",
      description: "Ensuring no one goes to bed hungry by establishing sustainable food banks and supporting local farmers in vulnerable communities.",
      image: "/images/food.jpg",
      raised: 10000,
      goal: 30000,
      category: "Food",
      location: "Brazil",
      daysLeft: 30,
    },
    {
      id: 4,
      title: "Medical Aid Relief",
      description: "Providing essential medical supplies and healthcare services to underserved communities and emergency response teams.",
      image: "/images/medical.jpg",
      raised: 75000,
      goal: 100000,
      category: "Health",
      location: "Global",
      daysLeft: 90,
    },
    {
      id: 5,
      title: "Women Empowerment Initiative",
      description: "Supporting women entrepreneurs with microloans and business training to help them achieve financial independence.",
      image: "/images/women.jpg",
      raised: 35000,
      goal: 60000,
      category: "Social",
      location: "Bangladesh",
      daysLeft: 75,
    },
    {
      id: 6,
      title: "Environmental Conservation",
      description: "Protecting endangered ecosystems through conservation efforts and community education programs.",
      image: "/images/environment.jpg",
      raised: 45000,
      goal: 80000,
      category: "Environment",
      location: "Amazon Rainforest",
      daysLeft: 120,
    },
  ];

  const categories = ["All", "Health", "Education", "Food", "Social", "Environment"];
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("progress"); // progress, daysLeft, goal

  // Filter and sort campaigns
  const filteredCampaigns = allCampaigns
    .filter(campaign => 
      (selectedCategory === "All" || campaign.category === selectedCategory) &&
      (campaign.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
       campaign.description.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "progress":
          return (b.raised / b.goal) - (a.raised / a.goal);
        case "daysLeft":
          return a.daysLeft - b.daysLeft;
        case "goal":
          return b.goal - a.goal;
        default:
          return 0;
      }
    });

  return (
    <div className="min-h-screen bg-purple-50 pt-24 pb-12">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-purple-900 mb-4">Active Campaigns</h1>
          <p className="text-xl text-purple-600 max-w-2xl mx-auto">
            Browse our current campaigns and help make a difference in the causes you care about.
          </p>
        </div>

        {/* Filters and Search */}
        <div className="mt-8 mb-12">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? "bg-purple-600 text-white"
                      : "bg-white text-purple-600 hover:bg-purple-100"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Sort and Search */}
            <div className="flex gap-4 w-full md:w-auto">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 rounded-full bg-white text-purple-600 border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-300"
              >
                <option value="progress">Progress</option>
                <option value="daysLeft">Days Left</option>
                <option value="goal">Goal Amount</option>
              </select>

              <input
                type="text"
                placeholder="Search campaigns..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 md:w-64 px-4 py-2 rounded-full bg-white text-purple-600 border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-300"
              />
            </div>
          </div>
        </div>

        {/* Campaign Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCampaigns.map((campaign) => (
            <div
              key={campaign.id}
              className="bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-300"
            >
              <div className="h-48 overflow-hidden relative">
                <img
                  src={campaign.image}
                  alt={campaign.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-purple-600 text-white px-3 py-1 rounded-full text-sm">
                  {campaign.category}
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold text-purple-900">{campaign.title}</h3>
                  <span className="text-sm text-purple-600">{campaign.daysLeft} days left</span>
                </div>
                <p className="text-purple-600 mb-4 line-clamp-2">{campaign.description}</p>
                <div className="mb-4">
                  <div className="h-2 bg-purple-100 rounded-full">
                    <div
                      className="h-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"
                      style={{ width: `${(campaign.raised / campaign.goal) * 100}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between mt-2 text-sm">
                    <span className="text-purple-600">${campaign.raised.toLocaleString()} raised</span>
                    <span className="text-purple-600">${campaign.goal.toLocaleString()} goal</span>
                  </div>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-purple-600">📍 {campaign.location}</span>
                  <span className="text-sm text-purple-600">
                    {Math.round((campaign.raised / campaign.goal) * 100)}% funded
                  </span>
                </div>
                <div className="flex gap-2">
                  <Link
                    to={`/campaigns/${campaign.id}`}
                    className="flex-1 text-center py-2 px-4 bg-purple-100 text-purple-600 rounded-full hover:bg-purple-200 transition-colors duration-300"
                  >
                    Learn More
                  </Link>
                  <Link
                    to={`/donate/${campaign.id}`}
                    className="flex-1 text-center py-2 px-4 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-full hover:from-pink-500 hover:to-purple-500 transition-all duration-300"
                  >
                    Donate
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredCampaigns.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium text-purple-900 mb-2">No campaigns found</h3>
            <p className="text-purple-600">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Campaigns;