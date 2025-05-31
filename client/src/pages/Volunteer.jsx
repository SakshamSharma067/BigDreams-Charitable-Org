import React, { useState } from 'react';

const Volunteer = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interests: [],
    availability: '',
    experience: '',
    message: ''
  });

  const opportunities = [
    {
      title: "Community Outreach",
      commitment: "4-6 hours/week",
      description: "Help spread awareness about our campaigns and engage with local communities.",
      skills: ["Communication", "Social Media", "Public Speaking"]
    },
    {
      title: "Event Coordination",
      commitment: "8-10 hours/week",
      description: "Assist in planning and executing fundraising events and awareness programs.",
      skills: ["Organization", "Leadership", "Time Management"]
    },
    {
      title: "Medical Camp Volunteer",
      commitment: "Weekends",
      description: "Support medical professionals during health camps in rural areas.",
      skills: ["Healthcare Experience", "Compassion", "Reliability"]
    },
    {
      title: "Education Mentor",
      commitment: "2-3 hours/week",
      description: "Tutor underprivileged children and support their educational journey.",
      skills: ["Teaching", "Patience", "Subject Expertise"]
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

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

  return (
    <div className="min-h-screen bg-purple-50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-purple-900 mb-4">Volunteer With Us</h1>
          <p className="text-xl text-purple-600 max-w-2xl mx-auto">
            Join our community of dedicated volunteers and help make a lasting impact in the lives of others.
          </p>
        </div>

        {/* Impact Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {[
            { number: "1000+", label: "Active Volunteers" },
            { number: "50+", label: "Communities Served" },
            { number: "10K+", label: "Hours Contributed" },
            { number: "100%", label: "Satisfaction Rate" }
          ].map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 text-center shadow-lg transform hover:scale-105 transition-all duration-300">
              <div className="text-3xl font-bold text-purple-600 mb-2">{stat.number}</div>
              <div className="text-purple-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Opportunities Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-purple-900 mb-8 text-center">Volunteer Opportunities</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {opportunities.map((opportunity, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                <h3 className="text-xl font-semibold text-purple-900 mb-2">{opportunity.title}</h3>
                <div className="text-purple-600 mb-2">🕒 {opportunity.commitment}</div>
                <p className="text-gray-600 mb-4">{opportunity.description}</p>
                <div className="flex flex-wrap gap-2">
                  {opportunity.skills.map((skill, idx) => (
                    <span key={idx} className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Application Form */}
        <div className="bg-white rounded-2xl p-8 shadow-xl max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-purple-900 mb-6 text-center">Volunteer Application</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-purple-900 mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
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
                  className="w-full px-4 py-2 rounded-lg border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-purple-900 mb-2">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-purple-900 mb-2">Areas of Interest</label>
              <div className="grid grid-cols-2 gap-2">
                {opportunities.map((opp, index) => (
                  <label key={index} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.interests.includes(opp.title)}
                      onChange={() => handleInterestChange(opp.title)}
                      className="text-purple-600 rounded focus:ring-purple-500"
                    />
                    <span className="text-purple-900">{opp.title}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-purple-900 mb-2">Availability</label>
              <select
                name="availability"
                value={formData.availability}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              >
                <option value="">Select availability</option>
                <option value="weekdays">Weekdays</option>
                <option value="weekends">Weekends</option>
                <option value="both">Both Weekdays and Weekends</option>
                <option value="flexible">Flexible</option>
              </select>
            </div>

            <div>
              <label className="block text-purple-900 mb-2">Relevant Experience</label>
              <textarea
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                rows="3"
                className="w-full px-4 py-2 rounded-lg border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
              ></textarea>
            </div>

            <div>
              <label className="block text-purple-900 mb-2">Additional Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-2 rounded-lg border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-6 text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg hover:from-purple-500 hover:to-pink-500 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Submit Application
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Volunteer;