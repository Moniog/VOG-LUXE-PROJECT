import React from 'react';
import Container from '../components/layout/Container';
import { Star } from 'lucide-react';

interface Review {
  id: number;
  author: string;
  avatar: string;
  rating: number;
  date: string;
  title: string;
  content: string;
  product: string;
  verified: boolean;
  helpful: number;
  images?: string[];
}

const reviews: Review[] = [
  {
    id: 1,
    author: "Sarah Johnson",
    avatar: "https://images.pexels.com/photos/1674752/pexels-photo-1674752.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    rating: 5,
    date: "March 15, 2025",
    title: "Exceptional Quality and Style",
    content: "The attention to detail and quality of materials is outstanding. This piece has quickly become a staple in my wardrobe. The fit is perfect and the style is timeless.",
    product: "Wool Blend Coat",
    verified: true,
    helpful: 45,
    images: [
      "https://images.pexels.com/photos/6764040/pexels-photo-6764040.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/6764007/pexels-photo-6764007.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ]
  },
  {
    id: 2,
    author: "David Chen",
    avatar: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    rating: 4,
    date: "March 12, 2025",
    title: "Great Design, Minor Fit Issue",
    content: "Love the design and material quality. The only reason for 4 stars is that it runs slightly large. Consider sizing down for a better fit.",
    product: "Merino Wool Sweater",
    verified: true,
    helpful: 32
  },
  {
    id: 3,
    author: "Emma Wilson",
    avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    rating: 5,
    date: "March 10, 2025",
    title: "Perfect Everyday Bag",
    content: "This bag is everything I was looking for. The leather is beautiful and the size is perfect for daily use. The craftsmanship is exceptional.",
    product: "Leather Tote Bag",
    verified: true,
    helpful: 28,
    images: [
      "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ]
  },
  {
    id: 4,
    author: "Michael Brown",
    avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    rating: 5,
    date: "March 8, 2025",
    title: "Worth Every Penny",
    content: "The quality justifies the price point. These shoes are not only stylish but incredibly comfortable. I've received numerous compliments.",
    product: "Premium Sneakers",
    verified: true,
    helpful: 41
  },
  {
    id: 5,
    author: "Sophie Martin",
    avatar: "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    rating: 4,
    date: "March 5, 2025",
    title: "Beautiful but Delicate",
    content: "The scarf is absolutely beautiful and the silk quality is excellent. Just be careful with jewelry as it can snag easily.",
    product: "Silk Scarf",
    verified: true,
    helpful: 19
  }
];

const ReviewsPage: React.FC = () => {
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
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Customer Reviews</h1>
            <p className="text-gray-300 text-lg">
              See what our customers are saying about their experience
            </p>
          </div>

          <div className="space-y-8">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50"
              >
                <div className="flex items-start gap-4">
                  <img
                    src={review.avatar}
                    alt={review.author}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h3 className="text-white font-medium">{review.author}</h3>
                        <div className="flex items-center gap-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-600'
                                }`}
                              />
                            ))}
                          </div>
                          {review.verified && (
                            <span className="text-green-400 text-sm">Verified Purchase</span>
                          )}
                        </div>
                      </div>
                      <span className="text-gray-400 text-sm">{review.date}</span>
                    </div>

                    <div className="mb-4">
                      <h4 className="text-white font-medium mb-2">{review.title}</h4>
                      <p className="text-gray-300">{review.content}</p>
                    </div>

                    {review.images && (
                      <div className="flex gap-4 mb-4">
                        {review.images.map((image, index) => (
                          <div key={index} className="w-24 h-24 rounded-lg overflow-hidden">
                            <img
                              src={image}
                              alt={`Review image ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-blue-400">Product: {review.product}</span>
                      <button className="text-gray-400 hover:text-white transition-colors">
                        Helpful ({review.helpful})
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ReviewsPage;