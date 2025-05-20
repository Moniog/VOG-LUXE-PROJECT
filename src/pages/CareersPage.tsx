import React from 'react';
import Container from '../components/layout/Container';
import { MapPin, Clock, Briefcase, ChevronRight } from 'lucide-react';

interface JobPosting {
  id: number;
  title: string;
  department: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract';
  description: string;
  requirements: string[];
}

const jobPostings: JobPosting[] = [
  {
    id: 1,
    title: 'Senior Fashion Designer',
    department: 'Design',
    location: 'New York, NY',
    type: 'Full-time',
    description: 'Lead the design of our premium essentials collection, bringing innovative and sustainable approaches to modern fashion.',
    requirements: [
      '7+ years of fashion design experience',
      'Strong portfolio demonstrating minimalist aesthetic',
      'Experience with sustainable materials and practices',
      'Proficiency in Adobe Creative Suite and CLO 3D'
    ]
  },
  {
    id: 2,
    title: 'E-commerce Manager',
    department: 'Digital',
    location: 'Remote',
    type: 'Full-time',
    description: 'Drive our online retail strategy and optimize the digital shopping experience for our global customer base.',
    requirements: [
      '5+ years of e-commerce management experience',
      'Strong analytical and data-driven decision making',
      'Experience with Shopify Plus and digital marketing',
      'Understanding of luxury retail market'
    ]
  },
  {
    id: 3,
    title: 'Sustainability Coordinator',
    department: 'Operations',
    location: 'London, UK',
    type: 'Full-time',
    description: 'Oversee sustainability initiatives and ensure ethical practices throughout our supply chain.',
    requirements: [
      'Degree in Environmental Science or related field',
      'Experience with sustainability certifications',
      'Strong project management skills',
      'Knowledge of textile industry sustainability practices'
    ]
  },
  {
    id: 4,
    title: 'Visual Merchandiser',
    department: 'Retail',
    location: 'Los Angeles, CA',
    type: 'Full-time',
    description: 'Create compelling visual displays that embody our minimalist aesthetic and enhance the customer experience.',
    requirements: [
      '3+ years of visual merchandising experience',
      'Strong understanding of retail design principles',
      'Experience with luxury brands',
      'Creative problem-solving skills'
    ]
  },
  {
    id: 5,
    title: 'Content Writer',
    department: 'Marketing',
    location: 'Remote',
    type: 'Contract',
    description: 'Create engaging content for our blog, social media, and marketing materials that reflects our brand voice.',
    requirements: [
      'Proven experience in fashion writing',
      'Strong understanding of SEO principles',
      'Experience with content management systems',
      'Portfolio of published work'
    ]
  }
];

const CareersPage: React.FC = () => {
  return (
    <div className="relative min-h-screen pt-32 pb-16">
      {/* Background Design */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="absolute inset-0 opacity-[0.15]" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #60A5FA 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent" />
        <div className="absolute -left-64 -top-64 w-128 h-128 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute -right-64 -bottom-64 w-128 h-128 bg-blue-500/20 rounded-full blur-3xl" />
      </div>

      <Container>
        <div className="relative">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Join Our Team
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Be part of a team dedicated to redefining modern fashion through innovation, 
              sustainability, and exceptional design.
            </p>
          </div>

          {/* Values Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700/50">
              <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-6">
                <div className="w-6 h-6 border-2 border-blue-400 rounded-sm transform rotate-45" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Innovation</h3>
              <p className="text-gray-300">
                We encourage creative thinking and embrace new technologies to push the 
                boundaries of sustainable fashion.
              </p>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700/50">
              <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-6">
                <div className="w-6 h-6 border-2 border-blue-400 rounded-sm transform rotate-45" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Growth</h3>
              <p className="text-gray-300">
                We invest in our team's development through mentorship, training, and 
                opportunities for advancement.
              </p>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700/50">
              <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-6">
                <div className="w-6 h-6 border-2 border-blue-400 rounded-sm transform rotate-45" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Impact</h3>
              <p className="text-gray-300">
                Every role contributes to our mission of creating positive change in 
                the fashion industry.
              </p>
            </div>
          </div>

          {/* Benefits Section */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700/50 mb-16">
            <h2 className="text-2xl font-bold text-white mb-8">Benefits & Perks</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                'Competitive salary & equity',
                'Health, dental & vision insurance',
                'Flexible work arrangements',
                'Professional development budget',
                'Generous vacation policy',
                'Employee discount program',
                'Wellness programs',
                'Parental leave',
                'Sustainable commuter benefits'
              ].map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full" />
                  <span className="text-gray-300">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Open Positions */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-8">Open Positions</h2>
            <div className="space-y-6">
              {jobPostings.map((job) => (
                <div
                  key={job.id}
                  className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">{job.title}</h3>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-300">
                        <div className="flex items-center gap-2">
                          <Briefcase className="w-4 h-4 text-blue-400" />
                          <span>{job.department}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-blue-400" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-blue-400" />
                          <span>{job.type}</span>
                        </div>
                      </div>
                    </div>
                    <button className="mt-4 md:mt-0 inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors">
                      Apply Now
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                  <p className="text-gray-300 mb-4">{job.description}</p>
                  <div className="space-y-2">
                    <h4 className="text-white font-medium">Requirements:</h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {job.requirements.map((req, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm text-gray-300">
                          <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CareersPage;