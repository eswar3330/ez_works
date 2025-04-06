import React from 'react';
import { timelineSteps, uspCards } from "../data/usps";

const USPSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
          What Makes Us So Special
        </h2>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Timeline Section */}
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
            <h3 className="text-xl font-semibold text-blue-600 mb-6 text-center">
            The 10-20-30 Rule at EZ
            </h3>
            <div className="space-y-6">
              {timelineSteps.map((step, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600 font-bold text-lg">{step.time}</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{step.time} {step.unit}</h4>
                    <p className="text-gray-600 mt-1">{step.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* USP Cards */}
          <div className="grid grid-cols-2 gap-4">
            {uspCards.map((card, idx) => (
              <div 
                key={idx} 
                className="group h-full min-h-[180px] [perspective:1000px]"
              >
                <div className="relative w-full h-full transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                  {/* Front Side */}
                  <div className="absolute inset-0 bg-gray-900 rounded-xl p-6 flex flex-col items-center justify-center text-center [backface-visibility:hidden] border-2 border-gray-800">
                    <card.icon className="w-8 h-8 text-blue-400 mb-4" />
                    <h3 className="text-lg font-semibold text-white">{card.title}</h3>
                  </div>
                  
                  {/* Back Side */}
                  <div className="absolute inset-0 bg-gray-900 rounded-xl p-6 flex flex-col justify-center items-center text-center [transform:rotateY(180deg)] [backface-visibility:hidden] border-2 border-gray-800">
                    <p className="text-gray-300 text-sm mb-4 px-2">{card.description}</p>
                    <a
                      href={card.link}
                      className="text-blue-400 hover:text-blue-300 text-sm font-medium"
                    >
                      Read More →
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default USPSection;