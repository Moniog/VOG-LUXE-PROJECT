import React, { useRef, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Truck, Clock, Globe } from 'lucide-react';
import Container from './layout/Container';

interface ShippingPartner {
  id: number;
  name: string;
  logo: string;
  description: string;
  deliveryTime: string;
  coverage: string;
}

const shippingPartners: ShippingPartner[] = [
  {
    id: 1,
    name: "DHL Express",
    logo: "https://images.pexels.com/photos/5025669/pexels-photo-5025669.jpeg",
    description: "Global express shipping with real-time tracking",
    deliveryTime: "1-3 business days",
    coverage: "Worldwide"
  },
  {
    id: 2,
    name: "FedEx",
    logo: "https://images.pexels.com/photos/5025670/pexels-photo-5025670.jpeg",
    description: "Premium international shipping solutions",
    deliveryTime: "2-4 business days",
    coverage: "International"
  },
  {
    id: 3,
    name: "UPS",
    logo: "https://images.pexels.com/photos/5025671/pexels-photo-5025671.jpeg",
    description: "Reliable worldwide delivery services",
    deliveryTime: "2-5 business days",
    coverage: "Global"
  },
  {
    id: 4,
    name: "EMS",
    logo: "https://images.pexels.com/photos/5025672/pexels-photo-5025672.jpeg",
    description: "Express mail service for international shipping",
    deliveryTime: "3-7 business days",
    coverage: "International"
  }
];

const ShippingPartners: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [autoScroll, setAutoScroll] = useState(true);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const checkScrollButtons = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

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
      }, 50);
    }

    return () => clearInterval(scrollInterval);
  }, [autoScroll]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 bg-gray-50">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Shipping Partners
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We partner with leading logistics providers to ensure reliable and efficient delivery worldwide.
          </p>
        </div>

        <div className="relative group">
          {showLeftArrow && (
            <button
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-white transition-all duration-300 opacity-0 group-hover:opacity-100"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-6 h-6 text-gray-700" />
            </button>
          )}

          {showRightArrow && (
            <button
              onClick={() => scroll('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-white transition-all duration-300 opacity-0 group-hover:opacity-100"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-6 h-6 text-gray-700" />
            </button>
          )}

          <div
            ref={scrollRef}
            className="flex overflow-x-auto gap-6 pb-4 -mb-4 scrollbar-hide"
            onMouseEnter={() => setAutoScroll(false)}
            onMouseLeave={() => setAutoScroll(true)}
            onScroll={checkScrollButtons}
          >
            {shippingPartners.map((partner) => (
              <div
                key={partner.id}
                className="flex-none w-[300px] group/card"
              >
                <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-xl transition-all duration-300">
                  <div className="aspect-video mb-4 rounded-lg overflow-hidden bg-gray-100">
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover/card:scale-105"
                    />
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {partner.name}
                  </h3>
                  
                  <p className="text-gray-600 mb-4">
                    {partner.description}
                  </p>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center text-gray-700">
                      <Clock className="w-4 h-4 mr-2 text-blue-600" />
                      <span>{partner.deliveryTime}</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <Globe className="w-4 h-4 mr-2 text-blue-600" />
                      <span>{partner.coverage}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ShippingPartners;