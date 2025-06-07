import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const Volunteer = () => {
  const navigate = useNavigate();
  const { user, isVolunteer, volunteer } = useAppContext();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    password: '',
    confirmPassword: '',
    role: 'volunteer'
  });

  const stats = [
    {
      number: "500+",
      label: "Active Volunteers"
    },
    {
      number: "50+",
      label: "Projects Completed"
    },
    {
      number: "10K+",
      label: "Lives Impacted"
    },
    {
      number: "25+",
      label: "Communities Served"
    }
  ];

  const opportunities = [
    {
      title: "Community Health Worker",
      commitment: "10-15 hours/week",
      description: "Support local health initiatives by providing basic healthcare education and assistance to community members.",
      skills: ["Healthcare", "Communication", "Empathy"]
    },
    {
      title: "Education Mentor",
      commitment: "8-12 hours/week",
      description: "Help students with their studies and provide guidance in their educational journey.",
      skills: ["Teaching", "Patience", "Leadership"]
    },
    {
      title: "Environmental Steward",
      commitment: "5-10 hours/week",
      description: "Participate in conservation projects and educate communities about environmental sustainability.",
      skills: ["Environmental Knowledge", "Physical Work", "Team Player"]
    },
    {
      title: "Digital Skills Trainer",
      commitment: "6-8 hours/week",
      description: "Teach basic computer and internet skills to community members to enhance their digital literacy.",
      skills: ["Tech Savvy", "Teaching", "Patience"]
    }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleInterestChange = (interest) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('/api/user/register', formData);
      
      if (response.data.success) {
        toast.success('Volunteer registration successful! Please log in.');
        navigate('/login');
      } else {
        toast.error(response.data.message || 'Registration failed');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to register');
      console.error('Volunteer registration error:', error);
    }
  };

  // Volunteer Dashboard Component
  const VolunteerDashboard = () => {
    const [campaigns, setCampaigns] = useState([]);
    const [totalAmountRaised, setTotalAmountRaised] = useState(0);
    const [totalDonors, setTotalDonors] = useState(0);
    const [recentActivity, setRecentActivity] = useState([]);

    useEffect(() => {
      const fetchVolunteerData = async () => {
        try {
          const [campaignsRes, recentActivityRes] = await Promise.all([
            axios.get('/api/campaign/get-all'),
            axios.get('/api/activity/get-recent')
          ]);

          if (campaignsRes.data.success) {
            const activeCampaigns = campaignsRes.data.campaigns.filter(c => c.status === 'active');
            setCampaigns(activeCampaigns);
            setTotalAmountRaised(activeCampaigns.reduce((total, campaign) => total + (campaign.currentAmount || 0), 0));
            setTotalDonors(recentActivityRes.data.length);
          }

          if (recentActivityRes.data.success) {
            setRecentActivity(recentActivityRes.data);
          }
        } catch (error) {
          console.error('Error fetching volunteer data:', error);
        }
      };

      fetchVolunteerData();
    }, []);

    return (
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-teal-500 to-emerald-500 mb-4">
            Welcome, {volunteer?.name}
          </h1>
          <p className="text-xl text-gray-600">
            Thank you for being part of our mission to create positive change.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-500 mb-2">
              {campaigns?.length || 0}
            </div>
            <div className="text-gray-600">Active Campaigns</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-500 mb-2">
              ${totalAmountRaised?.toLocaleString() || 0}
            </div>
            <div className="text-gray-600">Total Amount Raised</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-500 mb-2">
              {totalDonors || 0}
            </div>
            <div className="text-gray-600">Total Donors</div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-500 mb-6">Recent Activity</h2>
          {recentActivity && recentActivity.length > 0 ? (
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 via-teal-500 to-emerald-500 rounded-full flex items-center justify-center text-white">
                      {activity.type === 'donation' ? '$' : 'C'}
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-900 font-medium">{activity.title}</p>
                    <p className="text-gray-600">{activity.description}</p>
                  </div>
                  <div className="text-gray-500 text-sm">
                    {new Date(activity.date).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 text-center">No recent activity to display.</p>
          )}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-500 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              to="/campaign/create"
              className="flex items-center justify-center p-4 bg-gradient-to-r from-blue-500 via-teal-500 to-emerald-500 rounded-lg text-white hover:from-blue-600 hover:via-teal-600 hover:to-emerald-600 transition-colors duration-300"
            >
              Create New Campaign
            </Link>
            <Link
              to="/campaign"
              className="flex items-center justify-center p-4 bg-gradient-to-r from-blue-500 via-teal-500 to-emerald-500 rounded-lg text-white hover:from-blue-600 hover:via-teal-600 hover:to-emerald-600 transition-colors duration-300"
            >
              View All Campaigns
            </Link>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {isVolunteer() ? (
          // Show Volunteer Dashboard
          <VolunteerDashboard />
        ) : (
          // Show Volunteer Registration
          <>
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-teal-500 to-emerald-500 mb-4">
                Become a Volunteer
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Join our community of dedicated volunteers and help make a lasting impact in the lives of others.
              </p>
            </div>

            {/* Registration Form */}
            <div className="max-w-2xl mx-auto">
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-500 mb-6">
                  Registration Form
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">ZIP Code</label>
                      <input
                        type="text"
                        name="zip"
                        value={formData.zip}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full px-6 py-3 text-white bg-gradient-to-r from-blue-500 via-teal-500 to-emerald-500 rounded-lg hover:from-blue-600 hover:via-teal-600 hover:to-emerald-600 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Register as Volunteer
                  </button>
                </form>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Volunteer;