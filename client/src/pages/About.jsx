import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  const values = [
    {
      title: "Compassion",
      description: "We believe in treating everyone with kindness and understanding, recognizing the dignity in every individual.",
      icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
    },
    {
      title: "Transparency",
      description: "We maintain open communication and accountability in all our operations and financial dealings.",
      icon: "M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
    },
    {
      title: "Impact",
      description: "We focus on creating sustainable, long-term positive change in communities we serve.",
      icon: "M13 10V3L4 14h7v7l9-11h-7z"
    }
  ];

  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "Executive Director",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
      bio: "10+ years in nonprofit leadership"
    },
    {
      name: "Michael Chen",
      role: "Operations Manager",
      image: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
      bio: "Expert in community development"
    },
    {
      name: "Emily Rodriguez",
      role: "Program Director",
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
      bio: "Passionate about social change"
    },
    {
      name: "David Kim",
      role: "Volunteer Coordinator",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
      bio: "Community engagement specialist"
    }
  ];

  const milestones = [
    {
      year: "2018",
      title: "Foundation Established",
      description: "HopeHarbor was founded with a mission to create lasting positive change."
    },
    {
      year: "2019",
      title: "First Major Campaign",
      description: "Successfully launched our first community development project."
    },
    {
      year: "2020",
      title: "COVID-19 Response",
      description: "Mobilized resources to support communities during the pandemic."
    },
    {
      year: "2021",
      title: "Global Expansion",
      description: "Extended our reach to support international communities."
    },
    {
      year: "2022",
      title: "Digital Transformation",
      description: "Launched our digital platform to increase accessibility and impact."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-teal-500 to-emerald-500 mb-4">
            Our Story
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            At HopeHarbor, we believe in the power of collective action to create meaningful change in the world.
            Our journey began with a simple idea: everyone deserves a chance at a better life.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white rounded-2xl p-8 shadow-xl">
            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-500 mb-4">
              Our Mission
            </h2>
            <p className="text-gray-600">
              To empower communities through sustainable development initiatives, providing resources and support to create lasting positive change. 
              We work tirelessly to address critical needs in healthcare, education, and environmental conservation.
            </p>
          </div>
          <div className="bg-white rounded-2xl p-8 shadow-xl">
            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-emerald-500 mb-4">
              Our Vision
            </h2>
            <p className="text-gray-600">
              A world where every individual has access to basic necessities, quality education, and opportunities for growth. 
              We envision communities thriving together, supporting one another in building a better future for all.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-teal-500 to-emerald-500 mb-8 text-center">
            Our Values
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-teal-500 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={value.icon} />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-500 mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-teal-500 to-emerald-500 mb-8 text-center">
            Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                <img src={member.image} alt={member.name} className="w-32 h-32 rounded-full mx-auto mb-4 object-cover" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">{member.name}</h3>
                <p className="text-gray-600 text-center mb-4">{member.role}</p>
                <p className="text-gray-600 text-center">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Milestones */}
        <div className="bg-white rounded-2xl p-8 shadow-xl">
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-teal-500 to-emerald-500 mb-8 text-center">Our Journey</h2>
          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-blue-500 via-teal-500 to-emerald-500 rounded-full flex items-center justify-center text-white">
                  {index + 1}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{milestone.year}</h3>
                  <p className="text-gray-600">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-blue-600 to-teal-600 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Join Us in Making a Difference</h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Whether you want to volunteer, donate, or spread awareness, there are many ways to contribute to our mission.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/volunteer"
              className="inline-flex items-center px-8 py-3 text-lg font-medium text-blue-600 bg-white rounded-full hover:bg-blue-50 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Become a Volunteer
            </Link>
            <Link
              to="/donate"
              className="inline-flex items-center px-8 py-3 text-lg font-medium text-white bg-blue-500 bg-opacity-30 rounded-full hover:bg-opacity-40 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl backdrop-blur-sm"
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