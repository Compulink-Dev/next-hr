import React from "react";
import HomeLayout from "../../_components/home-layout";
import { Bell, Megaphone, Users, Calendar, Pin } from "lucide-react";

const recentAnnouncementsData = [
  {
    id: 1,
    title: "System Maintenance",
    date: "2024-10-15",
    content:
      "The system will undergo maintenance from 2 AM to 4 AM. Please save your work.",
    type: "system",
    priority: "high",
  },
  {
    id: 2,
    title: "New Features Released",
    date: "2024-10-10",
    content:
      "We've added new features to the dashboard! Check them out in the updates section.",
    type: "feature",
    priority: "medium",
  },
];

const agentAnnouncementsData = [
  {
    id: 1,
    title: "Weekly Sales Review",
    date: "2024-10-09",
    content:
      "Agents are required to submit their weekly sales reports by Friday EOD.",
    type: "reminder",
    priority: "high",
  },
  {
    id: 2,
    title: "Customer Feedback Training",
    date: "2024-10-12",
    content:
      "Training on customer feedback management will be held this Saturday at 10 AM.",
    type: "training",
    priority: "medium",
  },
];

function Announcement() {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-blue-100 text-blue-800 border-blue-200";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "system":
        return Megaphone;
      case "feature":
        return Bell;
      case "training":
        return Users;
      default:
        return Pin;
    }
  };

  return (
    <HomeLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-orange-50/30 p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-2xl px-6 py-3 shadow-sm border border-slate-200/60 mb-6">
              <Megaphone className="w-6 h-6 text-orange-600" />
              <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                Announcements
              </h1>
            </div>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Stay updated with the latest news and important notifications
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Announcements */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <Bell className="w-6 h-6 text-blue-600" />
                <h2 className="text-2xl font-bold text-slate-800">
                  Recent Announcements
                </h2>
              </div>

              {recentAnnouncementsData.map((announcement) => {
                const Icon = getTypeIcon(announcement.type);
                return (
                  <div
                    key={announcement.id}
                    className="group bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-slate-200/60 hover:shadow-lg transition-all duration-300 hover:border-blue-300"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-50 rounded-lg">
                          <Icon className="w-4 h-4 text-blue-600" />
                        </div>
                        <h3 className="font-semibold text-slate-800 text-lg">
                          {announcement.title}
                        </h3>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium border ${getPriorityColor(
                          announcement.priority
                        )}`}
                      >
                        {announcement.priority}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-slate-500 text-sm mb-3">
                      <Calendar className="w-4 h-4" />
                      {new Date(announcement.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>

                    <p className="text-slate-600 leading-relaxed">
                      {announcement.content}
                    </p>

                    <div className="mt-4 pt-4 border-t border-slate-200/60 flex justify-end">
                      <button className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors duration-200">
                        Mark as Read
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Agent Announcements */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <Users className="w-6 h-6 text-green-600" />
                <h2 className="text-2xl font-bold text-slate-800">
                  Agent Announcements
                </h2>
              </div>

              {agentAnnouncementsData.map((announcement) => {
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
                        className={`px-3 py-1 rounded-full text-xs font-medium border ${getPriorityColor(
                          announcement.priority
                        )}`}
                      >
                        {announcement.priority}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-slate-500 text-sm mb-3">
                      <Calendar className="w-4 h-4" />
                      {new Date(announcement.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>

                    <p className="text-slate-600 leading-relaxed">
                      {announcement.content}
                    </p>

                    <div className="mt-4 pt-4 border-t border-slate-200/60 flex justify-end">
                      <button className="text-green-600 hover:text-green-700 font-medium text-sm transition-colors duration-200">
                        Acknowledge
                      </button>
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

export default Announcement;
