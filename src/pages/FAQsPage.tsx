import React, { useState } from 'react';
import Container from '../components/layout/Container';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQ {
  question: string;
  answer: string;
  category: string;
}

const faqs: FAQ[] = [
  {
    category: 'Orders & Shipping',
    question: 'How long does shipping take?',
    answer: 'Domestic orders typically arrive within 3-5 business days. International shipping can take 7-14 business days. Express shipping options are available at checkout.'
  },
  {
    category: 'Orders & Shipping',
    question: 'Do you ship internationally?',
    answer: 'Yes, we ship to most countries worldwide. Shipping costs and delivery times vary by location. You can see exact shipping costs at checkout.'
  },
  {
    category: 'Orders & Shipping',
    question: 'How can I track my order?',
    answer: 'Once your order ships, you\'ll receive a tracking number via email. You can use this number to track your package on our website or the carrier\'s website.'
  },
  {
    category: 'Returns & Exchanges',
    question: 'What is your return policy?',
    answer: 'We offer a 30-day return policy for unworn items in original condition with tags attached. Returns are free for domestic orders.'
  },
  {
    category: 'Returns & Exchanges',
    question: 'How do I start a return?',
    answer: 'Log into your account and visit the Orders section to initiate a return. You\'ll receive a return shipping label via email.'
  },
  {
    category: 'Returns & Exchanges',
    question: 'Can I exchange an item?',
    answer: 'Yes, exchanges are available for different sizes or colors of the same item. Start the exchange process through your account\'s Orders section.'
  },
  {
    category: 'Product Information',
    question: 'How do I find my size?',
    answer: 'Each product page includes a detailed size guide. Measure yourself and compare to our size charts for the best fit. If you\'re between sizes, we recommend sizing up.'
  },
  {
    category: 'Product Information',
    question: 'Are your materials sustainable?',
    answer: 'Yes, we prioritize sustainable and eco-friendly materials. Each product page lists detailed material information and our sustainability certifications.'
  },
  {
    category: 'Product Information',
    question: 'How should I care for my items?',
    answer: 'Care instructions are provided on each product\'s label and product page. Generally, we recommend gentle washing and following garment-specific care guidelines.'
  },
  {
    category: 'Payment & Security',
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards, PayPal, Apple Pay, and Google Pay. All payments are securely processed and encrypted.'
  },
  {
    category: 'Payment & Security',
    question: 'Is my payment information secure?',
    answer: 'Yes, we use industry-standard SSL encryption to protect your payment information. We never store your full credit card details.'
  },
  {
    category: 'Account & Orders',
    question: 'How do I create an account?',
    answer: 'Click the "Account" icon in the top navigation and select "Create Account". Enter your email and create a password to get started.'
  }
];

const FAQsPage: React.FC = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', ...new Set(faqs.map(faq => faq.category))];

  const toggleItem = (index: number) => {
    setOpenItems(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const filteredFaqs = selectedCategory === 'all'
    ? faqs
    : faqs.filter(faq => faq.category === selectedCategory);

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
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-gray-300 text-lg">
              Find answers to common questions about our products and services
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full transition-all ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>

          {/* FAQ Items */}
          <div className="max-w-3xl mx-auto space-y-4">
            {filteredFaqs.map((faq, index) => (
              <div
                key={index}
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden"
              >
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-700/50 transition-colors"
                >
                  <span className="text-white font-medium">{faq.question}</span>
                  {openItems.includes(index) ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </button>
                <div
                  className={`px-6 transition-all duration-300 ease-in-out ${
                    openItems.includes(index)
                      ? 'max-h-48 py-4 opacity-100'
                      : 'max-h-0 py-0 opacity-0'
                  }`}
                >
                  <p className="text-gray-300">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Contact Support */}
          <div className="mt-12 text-center">
            <p className="text-gray-300">
              Can't find what you're looking for?{' '}
              <a href="/contact" className="text-blue-400 hover:text-blue-300">
                Contact our support team
              </a>
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default FAQsPage;