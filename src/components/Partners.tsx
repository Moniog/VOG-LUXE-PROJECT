import React, { useRef, useEffect, useState } from 'react';
import Container from './layout/Container';

interface Partner {
  id: number;
  name: string;
  category: 'Luxury Fashion House' | 'Premium Accessories' | 'High-end Retail' | 'Emerging Designer' | 'Lifestyle Brand';
  description: string;
  expertise: string[];
  contact: {
    name: string;
    title: string;
  };
  location: {
    city: string;
    country: string;
  };
  marketAlignment: {
    demographic: string;
    pricePoint: string;
    distribution: string[];
  };
  collaborationOpportunities: string[];
  recentCollaborations: string[];
  geographicalStrength: string[];
  status: 'Active' | 'Pending' | 'Potential';
  estimatedValue: string;
  logo: React.ReactNode;
}

const Partners: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [autoScroll, setAutoScroll] = useState(true);
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Partner['category'] | 'All'>('All');

  useEffect(() => {
    let scrollInterval: NodeJS.Timeout;
    
    if (autoScroll && scrollRef.current) {
      scrollInterval = setInterval(() => {
        if (scrollRef.current) {
          const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
          
          if (scrollLeft + clientWidth >= scrollWidth) {
            scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
          } else {
            scrollRef.current.scrollBy({ left: 1, behavior: 'smooth' });
          }
        }
      }, 30);
    }

    return () => clearInterval(scrollInterval);
  }, [autoScroll]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (scrollRef.current?.offsetLeft || 0));
    setScrollLeft(scrollRef.current?.scrollLeft || 0);
    setAutoScroll(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    if (scrollRef.current) {
      const x = e.pageX - (scrollRef.current.offsetLeft || 0);
      const walk = (x - startX) * 2;
      scrollRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setAutoScroll(true);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartX(e.touches[0].clientX - (scrollRef.current?.offsetLeft || 0));
    setScrollLeft(scrollRef.current?.scrollLeft || 0);
    setAutoScroll(false);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (scrollRef.current) {
      const x = e.touches[0].clientX - (scrollRef.current.offsetLeft || 0);
      const walk = (x - startX) * 2;
      scrollRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleTouchEnd = () => {
    setAutoScroll(true);
  };

  const partners: Partner[] = [
    {
      id: 1,
      name: "MAISON ÉLÉGANCE",
      category: "Luxury Fashion House",
      description: "Heritage luxury fashion house known for timeless elegance",
      expertise: ["Haute Couture", "Ready-to-Wear", "Leather Goods"],
      contact: {
        name: "Marie-Claire Dubois",
        title: "Global Partnership Director"
      },
      location: {
        city: "Paris",
        country: "France"
      },
      marketAlignment: {
        demographic: "Ultra-high-net-worth individuals, 30-55",
        pricePoint: "$2,000 - $50,000+",
        distribution: ["Flagship Boutiques", "Selected Luxury Department Stores"]
      },
      collaborationOpportunities: [
        "Limited Edition Collections",
        "Co-branded Accessories",
        "Exclusive Event Series"
      ],
      recentCollaborations: [
        "Artist Series with Jeff Koons",
        "Limited Edition with Takashi Murakami"
      ],
      geographicalStrength: ["Europe", "North America", "Asia Pacific"],
      status: "Active",
      estimatedValue: "$5M - $8M annual",
      logo: (
        <div className="relative w-48 h-16 bg-black rounded-none overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-white font-light tracking-[0.3em] text-xl">
              MAISON<span className="font-normal">ÉLÉGANCE</span>
            </div>
          </div>
          <div className="absolute inset-0 bg-white/5 transform -translate-x-full animate-[shimmer_2s_infinite]"></div>
        </div>
      )
    },
    {
      id: 2,
      name: "ARTISAN & CO",
      category: "Premium Accessories",
      description: "Renowned for handcrafted leather goods and accessories",
      expertise: ["Leather Craftsmanship", "Bespoke Services", "Heritage Techniques"],
      contact: {
        name: "Alessandro Romano",
        title: "Creative Director"
      },
      location: {
        city: "Florence",
        country: "Italy"
      },
      marketAlignment: {
        demographic: "Luxury connoisseurs, 35-60",
        pricePoint: "$1,000 - $15,000",
        distribution: ["Boutiques", "Online Exclusive Platform"]
      },
      collaborationOpportunities: [
        "Custom Hardware Development",
        "Limited Edition Accessories",
        "Artisanal Workshops"
      ],
      recentCollaborations: [
        "Heritage Collection with British Museum",
        "Sustainable Leather Initiative"
      ],
      geographicalStrength: ["Italy", "Western Europe", "Middle East"],
      status: "Active",
      estimatedValue: "$3M - $5M annual",
      logo: (
        <div className="relative w-48 h-16 bg-stone-900 rounded-none overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-stone-100 font-light tracking-[0.25em] text-xl">
              ARTISAN <span className="font-normal">&</span> CO
            </div>
          </div>
          <div className="absolute inset-0 bg-white/10 transform translate-x-full animate-[shimmer_2s_infinite]"></div>
        </div>
      )
    },
    {
      id: 3,
      name: "LUXE AVENUE",
      category: "High-end Retail",
      description: "Global luxury multi-brand retailer",
      expertise: ["Luxury Retail", "Customer Experience", "Digital Innovation"],
      contact: {
        name: "James Chen",
        title: "Head of Brand Partnerships"
      },
      location: {
        city: "Hong Kong",
        country: "China"
      },
      marketAlignment: {
        demographic: "Affluent professionals, 25-45",
        pricePoint: "$500 - $10,000",
        distribution: ["Flagship Stores", "Digital Platform"]
      },
      collaborationOpportunities: [
        "Exclusive Retail Distribution",
        "Pop-up Experiences",
        "Digital Integration"
      ],
      recentCollaborations: [
        "Virtual Showroom Launch",
        "Sustainable Fashion Initiative"
      ],
      geographicalStrength: ["Asia", "Middle East", "Australia"],
      status: "Pending",
      estimatedValue: "$4M - $6M annual",
      logo: (
        <div className="relative w-48 h-16 bg-gradient-to-r from-zinc-900 to-zinc-800 rounded-none overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-zinc-100 font-light tracking-[0.2em] text-xl">
              LUXE AVENUE
            </div>
          </div>
          <div className="absolute inset-0 bg-white/10 transform -translate-x-full animate-[shimmer_2s_infinite]"></div>
        </div>
      )
    },
    {
      id: 4,
      name: "NOUVEAU ATELIER",
      category: "Emerging Designer",
      description: "Innovative sustainable luxury brand",
      expertise: ["Sustainable Design", "Digital Fashion", "Advanced Materials"],
      contact: {
        name: "Sofia Patel",
        title: "Founder & Creative Director"
      },
      location: {
        city: "London",
        country: "United Kingdom"
      },
      marketAlignment: {
        demographic: "Tech-savvy luxury consumers, 25-40",
        pricePoint: "$300 - $3,000",
        distribution: ["Direct-to-Consumer", "Selected Boutiques"]
      },
      collaborationOpportunities: [
        "Tech Integration Projects",
        "Sustainable Collections",
        "Digital Fashion Launches"
      ],
      recentCollaborations: [
        "NFT Collection Launch",
        "Recycled Materials Innovation"
      ],
      geographicalStrength: ["UK", "Northern Europe", "North America"],
      status: "Potential",
      estimatedValue: "$1.5M - $2.5M annual",
      logo: (
        <div className="relative w-48 h-16 bg-gradient-to-br from-emerald-900 to-emerald-800 rounded-none overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-emerald-50 font-light tracking-[0.2em] text-xl">
              NOUVEAU ATELIER
            </div>
          </div>
          <div className="absolute inset-0 bg-white/10 transform -translate-x-full animate-[shimmer_2s_infinite]"></div>
        </div>
      )
    },
    {
      id: 5,
      name: "HERITAGE HOUSE",
      category: "Lifestyle Brand",
      description: "Luxury lifestyle and home accessories",
      expertise: ["Home Décor", "Lifestyle Accessories", "Bespoke Services"],
      contact: {
        name: "Henrik Larsson",
        title: "Brand Director"
      },
      location: {
        city: "Stockholm",
        country: "Sweden"
      },
      marketAlignment: {
        demographic: "Design-conscious affluents, 30-55",
        pricePoint: "$200 - $5,000",
        distribution: ["Concept Stores", "Online Platform"]
      },
      collaborationOpportunities: [
        "Home Collection Launch",
        "Lifestyle Accessories",
        "Interior Styling Services"
      ],
      recentCollaborations: [
        "Designer Home Collection",
        "Luxury Hotel Partnership"
      ],
      geographicalStrength: ["Scandinavia", "Europe", "North America"],
      status: "Active",
      estimatedValue: "$2M - $4M annual",
      logo: (
        <div className="relative w-48 h-16 bg-gradient-to-r from-stone-100 to-white border border-stone-200 rounded-none overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-stone-800 font-light tracking-[0.25em] text-xl">
              HERITAGE HOUSE
            </div>
          </div>
          <div className="absolute inset-0 bg-white/20 transform translate-x-full animate-[shimmer_2s_infinite]"></div>
        </div>
      )
    }
  ];

  const filteredPartners = selectedCategory === 'All' 
    ? partners 
    : partners.filter(partner => partner.category === selectedCategory);

  return (
    <section className="relative py-16 overflow-hidden">
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
        <div className="text-center mb-16 relative">
          <h2 className="text-3xl font-light tracking-wide text-white mb-4">Strategic Partners</h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto font-light">
            Collaborating with industry leaders to elevate luxury fashion through innovation and craftsmanship
          </p>
        </div>

        <div className="flex justify-center mb-8 space-x-4">
          {['All', 'Luxury Fashion House', 'Premium Accessories', 'High-end Retail', 'Emerging Designer', 'Lifestyle Brand'].map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category as Partner['category'] | 'All')}
              className={`px-4 py-2 rounded-full transition-all ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div 
          ref={scrollRef}
          className="flex gap-16 overflow-x-auto scrollbar-hide no-select transition-gpu mb-12"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {filteredPartners.map((partner) => (
            <div
              key={partner.id}
              className="flex-none transform transition-all duration-500 hover:scale-105"
              onClick={() => setSelectedPartner(partner)}
            >
              <div className="group relative overflow-hidden transition-all duration-500 hover:shadow-xl cursor-pointer">
                {partner.logo}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </div>
          ))}
        </div>

        {selectedPartner && (
          <div className="bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-lg p-8 mb-8 transition-all duration-300">
            <div className="flex justify-between items-start mb-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-2xl font-light tracking-wide text-white">{selectedPartner.name}</h3>
                  <span className="px-3 py-1 bg-gray-700/50 text-gray-300 text-sm rounded-full">
                    {selectedPartner.category}
                  </span>
                </div>
                <p className="text-gray-300">{selectedPartner.description}</p>
              </div>
              <button 
                onClick={() => setSelectedPartner(null)}
                className="text-gray-400 hover:text-gray-200 transition-colors"
              >
                ×
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div>
                <h4 className="font-medium text-white mb-3">Contact & Location</h4>
                <p className="text-gray-300">{selectedPartner.contact.name}</p>
                <p className="text-gray-400 text-sm">{selectedPartner.contact.title}</p>
                <p className="text-gray-400 text-sm mt-2">
                  {selectedPartner.location.city}, {selectedPartner.location.country}
                </p>
              </div>

              <div>
                <h4 className="font-medium text-white mb-3">Expertise</h4>
                <ul className="space-y-2">
                  {selectedPartner.expertise.map((item, index) => (
                    <li key={index} className="text-gray-300 flex items-center">
                      <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-medium text-white mb-3">Market Alignment</h4>
                <p className="text-gray-300 mb-2">
                  <span className="text-gray-400">Target: </span>
                  {selectedPartner.marketAlignment.demographic}
                </p>
                <p className="text-gray-300 mb-2">
                  <span className="text-gray-400">Price Range: </span>
                  {selectedPartner.marketAlignment.pricePoint}
                </p>
              </div>

              <div>
                <h4 className="font-medium text-white mb-3">Collaboration Opportunities</h4>
                <ul className="space-y-2">
                  {selectedPartner.collaborationOpportunities.map((opportunity, index) => (
                    <li key={index} className="text-gray-300 flex items-center">
                      <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2"></span>
                      {opportunity}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-medium text-white mb-3">Recent Collaborations</h4>
                <ul className="space-y-2">
                  {selectedPartner.recentCollaborations.map((collab, index) => (
                    <li key={index} className="text-gray-300 flex items-center">
                      <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2"></span>
                      {collab}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-medium text-white mb-3">Partnership Details</h4>
                <p className="text-gray-300 mb-2">Status: <span className={`inline-block px-2 py-0.5 text-sm rounded ${
                  selectedPartner.status === 'Active' ? 'bg-green-900/50 text-green-300' :
                  selectedPartner.status === 'Pending' ? 'bg-yellow-900/50 text-yellow-300' :
                  'bg-blue-900/50 text-blue-300'
                }`}>{selectedPartner.status}</span></p>
                <p className="text-gray-300">Estimated Value: {selectedPartner.estimatedValue}</p>
                <div className="mt-3">
                  <p className="text-gray-400 text-sm">Geographical Strength:</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedPartner.geographicalStrength.map((region, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-700/50 text-gray-300 text-sm rounded">
                        {region}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Container>
    </section>
  );
};

export default Partners;