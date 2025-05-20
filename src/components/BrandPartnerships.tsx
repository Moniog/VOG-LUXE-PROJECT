import React from 'react';
import Container from './layout/Container';
import { ExternalLink } from 'lucide-react';

interface BrandPartner {
  id: number;
  name: string;
  logo: string;
  url: string;
}

const brandPartners: BrandPartner[] = [
  {
    id: 1,
    name: "Nordic Design Co",
    logo: "https://images.pexels.com/photos/5473955/pexels-photo-5473955.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    url: "#"
  },
  {
    id: 2,
    name: "Urban Essentials",
    logo: "https://images.pexels.com/photos/5473950/pexels-photo-5473950.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    url: "#"
  },
  {
    id: 3,
    name: "Artisan Collective",
    logo: "https://images.pexels.com/photos/5473957/pexels-photo-5473957.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    url: "#"
  },
  {
    id: 4,
    name: "Eco Living",
    logo: "https://images.pexels.com/photos/5473961/pexels-photo-5473961.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    url: "#"
  }
];

const BrandPartnerships: React.FC = () => {
  return (
    <section id="brands" className="py-24 bg-white">
      <Container>
        <div className="max-w-4xl mx-auto text-center mb-16">
          <span className="text-blue-600 font-medium tracking-wider uppercase text-sm mb-3 block">
            Our Partners
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Partnering with Industry Leaders
          </h2>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
            We collaborate with leading brands to bring you the finest selection of premium products, 
            ensuring exceptional quality and design in every piece.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {brandPartners.map((partner) => (
            <a
              key={partner.id}
              href={partner.url}
              className="group relative aspect-[3/2] bg-gray-50 rounded-xl overflow-hidden flex items-center justify-center p-6 transition-all duration-500 hover:bg-gray-100"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end justify-center pb-4">
                <div className="text-center">
                  <h3 className="text-white font-medium text-lg mb-1">{partner.name}</h3>
                  <span className="inline-flex items-center text-sm text-blue-200">
                    View Collection <ExternalLink className="w-4 h-4 ml-1" />
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="text-center">
          <a
            href="/brands"
            className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800 transition-colors group"
          >
            Explore All Brand Partners
            <ExternalLink className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </Container>
    </section>
  );
};

export default BrandPartnerships;