import React, { useState, useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectCoverflow } from 'swiper/modules';
import type SwiperCore from 'swiper';
import { services, serviceCategories } from '../data/services';
import {
  Presentation, FileText, Video, Globe, Image, Film,
  Megaphone, BarChart, Database, Headphones, Code,
  Cpu, Users, Briefcase, ShoppingCart
} from 'lucide-react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

const iconMap = {
  'presentation': Presentation,
  'file-text': FileText,
  'video': Video,
  'language': Globe,
  'image': Image,
  'film': Film,
  'megaphone': Megaphone,
  'bar-chart': BarChart,
  'database': Database,
  'headphones': Headphones,
  'code': Code,
  'cpu': Cpu,
  'users': Users,
  'briefcase': Briefcase,
  'shopping-cart': ShoppingCart,
};

export const ServiceCarousel: React.FC<{ onGetInTouch: (service?: string) => void }> = ({ onGetInTouch }) => {
  const swiperRef = useRef<SwiperCore | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState(serviceCategories[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (swiperRef.current) {
        swiperRef.current.slideNext();
      }
    }, 5000); // 5 seconds automatic slider

    return () => clearInterval(interval);
  }, []);

  const handleCategoryClick = (category: string) => {
    const firstIndex = services.findIndex(s => s.category === category);
    if (firstIndex !== -1 && swiperRef.current) {
      swiperRef.current.slideToLoop(firstIndex, 500);
      setActiveCategory(category);
    }
  };

  const handleSlideChange = (swiper: SwiperCore) => {
    const realIndex = swiper.realIndex;
    setActiveIndex(realIndex);
    setActiveCategory(services[realIndex].category);
  };

  return (
    <div className="relative hero-gradient py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl text-white text-center font-bold mb-8">
          70+ Offerings that allow you to Focus on your core tasks
        </h1>

        {/* All category pills */}
        <div className="flex flex-wrap md:flex-nowrap justify-center items-center mb-10 gap-4">
          {serviceCategories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              className={`text-white text-sm md:text-base px-4 py-2 rounded-full transition-all duration-300 whitespace-nowrap
                ${activeCategory === category
                  ? 'bg-blue-600 shadow-lg'
                  : 'bg-blue-600/20 hover:bg-blue-600/40'}`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Swiper Carousel */}
        <Swiper
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          modules={[Navigation, Pagination, EffectCoverflow]}
          slidesPerView={1}
          slidesPerGroup={1}
          loop={true}
          centeredSlides={true}
          effect="coverflow"
          coverflowEffect={{
            rotate: 0,
            stretch: 100,
            depth: 200,
            modifier: 2,
            slideShadows: false,
          }}
          pagination={{
            clickable: true,
            renderBullet: (index, className) => {
              if (index >= 6) return '';
              return `<span class="${className} !bg-white !opacity-40 w-3 h-3 mx-1 rounded-full inline-block"></span>`;
            }
          }}
          navigation={{
            prevEl: '.swiper-button-prev',
            nextEl: '.swiper-button-next',
          }}
          onSlideChange={handleSlideChange}
          breakpoints={{
            640: { slidesPerView: 1.5 },
            1024: { slidesPerView: 2.5 },
          }}
          className="!pb-16"
        >
          {services.map((service) => {
            const Icon = iconMap[service.icon as keyof typeof iconMap] || Presentation;
            return (
              <SwiperSlide key={service.id}>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 text-white h-[450px] flex flex-col border border-white/20 shadow-lg transition-transform duration-300">
                  <div className="w-16 h-16 bg-blue-600/20 rounded-full mb-6 flex items-center justify-center">
                    <Icon size={26} className="text-blue-400" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{service.name}</h3>
                  <p className="text-gray-300 text-lg flex-grow">{service.description}</p>
                  <div className="mt-6">
                    <button
                      onClick={() => onGetInTouch(service.name)}
                      className="text-blue-400 hover:text-blue-300 transition-colors text-lg font-semibold"
                    >
                      Learn More →
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>

        {/* Navigation */}
        <div className="swiper-button-prev !text-white !left-2 md:!left-10 after:!text-xl"></div>
        <div className="swiper-button-next !text-white !right-2 md:!right-10 after:!text-xl"></div>

        {/* CTA */}
        <div className="text-center mt-10">
          <button
            onClick={() => onGetInTouch()}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold
              hover:bg-blue-700 transform hover:scale-105 transition-all duration-300
              shadow-lg hover:shadow-xl"
          >
            GET IN TOUCH
          </button>
        </div>

        <div className="text-center text-white mt-8">
          <p className="text-xl mb-2">Send us your requirements, and get a response</p>
          <p className="text-3xl font-bold text-blue-400">within 10 minutes</p>
        </div>
      </div>
    </div>
  );
};
