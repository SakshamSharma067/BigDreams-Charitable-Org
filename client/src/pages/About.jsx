import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "Executive Director",
      image: "/images/team/sarah.jpg",
      bio: "With over 15 years of experience in nonprofit management, Sarah leads our organization with passion and dedication."
    },
    {
      name: "Michael Chen",
      role: "Operations Manager",
      image: "/images/team/michael.jpg",
      bio: "Michael ensures our campaigns run smoothly and efficiently, maximizing the impact of every donation."
    },
    {
      name: "Dr. Emily Rodriguez",
      role: "Medical Programs Director",
      image: "/images/team/emily.jpg",
      bio: "Dr. Rodriguez oversees our healthcare initiatives, bringing medical aid to communities in need."
    },
    {
      name: "David Kumar",
      role: "Community Outreach",
      image: "/images/team/david.jpg",
      bio: "David builds and maintains relationships with local communities, understanding their needs and coordinating support."
    }
  ];

  const milestones = [
    {
      year: "2015",
      title: "Foundation Established",
      description: "HopeHarbor was founded with a mission to create lasting positive change."
    },
    {
      year: "2017",
      title: "First Major Campaign",
      description: "Successfully provided clean water to 10,000 people in rural communities."
    },
    {
      year: "2019",
      title: "Global Expansion",
      description: "Extended our reach to 15 countries across three continents."
    },
    {
      year: "2021",
      title: "Innovation Award",
      description: "Recognized for innovative approaches to charitable giving and community development."
    }
  ];

  return (
    <div className="min-h-screen bg-purple-50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-purple-900 mb-4">Our Story</h1>
          <p className="text-xl text-purple-600 max-w-3xl mx-auto">
            At HopeHarbor, we believe in the power of collective action to create meaningful change in the world.
            Our journey began with a simple idea: everyone deserves a chance at a better life.
          </p>
        </div>

        {/* Mission and Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
            <h2 className="text-2xl font-bold text-purple-900 mb-4">Our Mission</h2>
            <p className="text-purple-600">
              To empower communities through sustainable development initiatives, providing resources and support to create lasting positive change. We work tirelessly to address critical needs in healthcare, education, and environmental conservation.
            </p>
          </div>
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
            <h2 className="text-2xl font-bold text-purple-900 mb-4">Our Vision</h2>
            <p className="text-purple-600">
              A world where every individual has access to basic necessities, quality education, and opportunities for growth. We envision communities thriving together, supporting one another in building a better future for all.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-purple-900 mb-8 text-center">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Transparency",
                icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",
                description: "We maintain complete transparency in our operations and use of funds."
              },
              {
                title: "Sustainability",
                icon: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15",
                description: "Our solutions are designed to create long-lasting positive impact."
              },
              {
                title: "Empowerment",
                icon: "M13 10V3L4 14h7v7l9-11h-7z",
                description: "We believe in empowering communities to build their own future."
              }
            ].map((value, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={value.icon} />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-purple-900 mb-2">{value.title}</h3>
                <p className="text-purple-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-purple-900 mb-8 text-center">Our Team</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=8B5CF6&color=fff`;
                    }}
                  />
                </div>
                <h3 className="text-xl font-semibold text-purple-900 text-center mb-2">{member.name}</h3>
                <p className="text-purple-600 text-center mb-2">{member.role}</p>
                <p className="text-gray-600 text-center text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Milestones */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-purple-900 mb-8 text-center">Our Journey</h2>
          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex items-start">
                <div className="flex-shrink-0 w-24 pt-1">
                  <div className="text-xl font-bold text-purple-600">{milestone.year}</div>
                </div>
                <div className="flex-grow bg-white rounded-2xl p-6 shadow-lg ml-4">
                  <h3 className="text-xl font-semibold text-purple-900 mb-2">{milestone.title}</h3>
                  <p className="text-purple-600">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Join Us in Making a Difference</h2>
          <p className="text-purple-100 mb-8 max-w-2xl mx-auto">
            Whether you want to volunteer, donate, or spread awareness, there are many ways to contribute to our mission.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/volunteer"
              className="inline-flex items-center px-8 py-3 text-lg font-medium text-purple-600 bg-white rounded-full hover:bg-purple-50 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Become a Volunteer
            </Link>
            <Link
              to="/donate"
              className="inline-flex items-center px-8 py-3 text-lg font-medium text-white bg-purple-500 bg-opacity-30 rounded-full hover:bg-opacity-40 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl backdrop-blur-sm"
            >
              Make a Donation
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;