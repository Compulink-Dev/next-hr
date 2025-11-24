import React from "react";
import { Lightbulb, Users, Rocket } from "lucide-react";

function Content() {
  const features = [
    {
      icon: <Lightbulb className="h-8 w-8" />,
      title: "Innovation First",
      description:
        "We constantly evolve with cutting-edge technology to deliver solutions that keep you ahead of the competition.",
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "User-Centric Design",
      description:
        "Our solutions are built with your team in mind, ensuring intuitive workflows and maximum productivity.",
    },
    {
      icon: <Rocket className="h-8 w-8" />,
      title: "Rapid Implementation",
      description:
        "Get up and running quickly with our streamlined setup process and comprehensive onboarding support.",
    },
  ];

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
              Built for{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Modern Businesses
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              We combine strategic thinking, elegant design, and robust
              development to create solutions that are both powerful and easy to
              use. Small enough to be agile, but comprehensive enough to handle
              your most complex business needs.
            </p>

            {/* Feature List */}
            <div className="space-y-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image Grid */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <img
                  className="w-full rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                  alt="Modern office workspace"
                />
                <img
                  className="w-full rounded-2xl shadow-lg hover:shadow-xl transition-shadow mt-8"
                  src="https://images.unsplash.com/photo-1565688534245-05d6b5be184a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                  alt="Team collaboration"
                />
              </div>
              <div className="space-y-4 pt-8">
                <img
                  className="w-full rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
                  src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                  alt="Business meeting"
                />
                <img
                  className="w-full rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                  alt="Data analytics dashboard"
                />
              </div>
            </div>

            {/* Floating Element */}
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl opacity-10 animate-float"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Content;
