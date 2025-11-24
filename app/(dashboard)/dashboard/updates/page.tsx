import React from "react";
import HomeLayout from "../../_components/home-layout";
import {
  RefreshCw,
  BookOpen,
  TrendingUp,
  Sparkles,
  Calendar,
  ArrowUpRight,
} from "lucide-react";

const recentUpdatesData = [
  {
    id: 1,
    title: "Performance Enhancements",
    date: "2024-10-08",
    content:
      "We've optimized the performance of the app to load 20% faster with improved caching mechanisms.",
    type: "improvement",
    version: "v2.1.0",
    highlights: ["Faster loading", "Better caching", "Smooth animations"],
  },
  {
    id: 2,
    title: "UI Refresh",
    date: "2024-10-05",
    content:
      "The dashboard now has a cleaner and more modern look with improved accessibility features.",
    type: "design",
    version: "v2.0.5",
    highlights: ["Modern design", "Better accessibility", "Dark mode support"],
  },
];

const blogAnnouncementsData = [
  {
    id: 1,
    title: "Introducing New Features",
    date: "2024-10-07",
    content:
      "Check out the latest blog post covering the new features added this month including advanced analytics.",
    type: "blog",
    readTime: "5 min read",
    category: "Product News",
  },
  {
    id: 2,
    title: "Company News & Milestones",
    date: "2024-10-01",
    content:
      "Read about the recent company milestones and our vision for the upcoming quarter in our blog section.",
    type: "news",
    readTime: "3 min read",
    category: "Company Updates",
  },
];

function Updates() {
  const getTypeColor = (type: string) => {
    switch (type) {
      case "improvement":
        return "bg-blue-100 text-blue-800";
      case "design":
        return "bg-purple-100 text-purple-800";
      case "blog":
        return "bg-green-100 text-green-800";
      case "news":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-slate-100 text-slate-800";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "improvement":
        return TrendingUp;
      case "design":
        return Sparkles;
      case "blog":
        return BookOpen;
      default:
        return RefreshCw;
    }
  };

  return (
    <HomeLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50/30 p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-2xl px-6 py-3 shadow-sm border border-slate-200/60 mb-6">
              <RefreshCw className="w-6 h-6 text-purple-600" />
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Latest Updates
              </h1>
            </div>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              {`Discover what's new and improved in our platform`}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Updates */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <TrendingUp className="w-6 h-6 text-blue-600" />
                <h2 className="text-2xl font-bold text-slate-800">
                  Recent Updates
                </h2>
              </div>

              {recentUpdatesData.map((update) => {
                const Icon = getTypeIcon(update.type);
                return (
                  <div
                    key={update.id}
                    className="group bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-slate-200/60 hover:shadow-lg transition-all duration-300 hover:border-blue-300"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-50 rounded-lg">
                          <Icon className="w-4 h-4 text-blue-600" />
                        </div>
                        <h3 className="font-semibold text-slate-800 text-lg">
                          {update.title}
                        </h3>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(
                          update.type
                        )}`}
                      >
                        {update.type}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 text-slate-500 text-sm mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(update.date).toLocaleDateString()}
                      </div>
                      <span className="text-xs bg-slate-100 px-2 py-1 rounded">
                        {update.version}
                      </span>
                    </div>

                    <p className="text-slate-600 leading-relaxed mb-4">
                      {update.content}
                    </p>

                    {/* Highlights */}
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-slate-700 mb-2">
                        Highlights:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {update.highlights.map((highlight, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-medium"
                          >
                            {highlight}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-slate-200/60">
                      <button className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors duration-200 flex items-center gap-1">
                        Learn More
                        <ArrowUpRight className="w-4 h-4" />
                      </button>
                      <span className="text-xs text-slate-500">
                        Just released
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Blog Announcements */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <BookOpen className="w-6 h-6 text-green-600" />
                <h2 className="text-2xl font-bold text-slate-800">
                  Blog & News
                </h2>
              </div>

              {blogAnnouncementsData.map((announcement) => {
                const Icon = getTypeIcon(announcement.type);
                return (
                  <div
                    key={announcement.id}
                    className="group bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-slate-200/60 hover:shadow-lg transition-all duration-300 hover:border-green-300"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-50 rounded-lg">
                          <Icon className="w-4 h-4 text-green-600" />
                        </div>
                        <h3 className="font-semibold text-slate-800 text-lg">
                          {announcement.title}
                        </h3>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(
                          announcement.type
                        )}`}
                      >
                        {announcement.category}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 text-slate-500 text-sm mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(announcement.date).toLocaleDateString()}
                      </div>
                      <span className="text-xs bg-slate-100 px-2 py-1 rounded">
                        {announcement.readTime}
                      </span>
                    </div>

                    <p className="text-slate-600 leading-relaxed mb-4">
                      {announcement.content}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-slate-200/60">
                      <button className="text-green-600 hover:text-green-700 font-medium text-sm transition-colors duration-200 flex items-center gap-1">
                        Read Article
                        <ArrowUpRight className="w-4 h-4" />
                      </button>
                      <span className="text-xs text-slate-500">Featured</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}

export default Updates;
