
import React from 'react'
import HomeLayout from '../../_components/home-layout'

const recentAnnouncementsData = [
    { id: 1, title: "System Maintenance", date: "2024-10-15", content: "The system will undergo maintenance from 2 AM to 4 AM. Please save your work." },
    { id: 2, title: "New Features", date: "2024-10-10", content: "We've added new features to the dashboard! Check them out." },
];

const agentAnnouncementsData = [
    { id: 1, title: "Weekly Sales Review", date: "2024-10-09", content: "Agents are required to submit their weekly sales reports by Friday." },
    { id: 2, title: "Customer Feedback Training", date: "2024-10-12", content: "Training on customer feedback will be held this Saturday." },
];


function Announcement() {
    return (
        <HomeLayout>
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-6">Announcements</h1>

                {/* Recent Announcements Section */}
                <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-4">Recent Announcements</h2>
                    <div className="space-y-4">
                        {recentAnnouncementsData.map((announcement) => (
                            <div key={announcement.id} className="bg-white shadow rounded-lg p-4">
                                <h3 className="text-md font-semibold">{announcement.title}</h3>
                                <p className="text-gray-500">{announcement.date}</p>
                                <p>{announcement.content}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Agent Announcements Section */}
                <div>
                    <h2 className="text-xl font-semibold mb-4">Agent Announcements</h2>
                    <div className="space-y-4">
                        {agentAnnouncementsData.map((announcement) => (
                            <div key={announcement.id} className="bg-white shadow rounded-lg p-4">
                                <h3 className="text-md font-semibold">{announcement.title}</h3>
                                <p className="text-gray-500">{announcement.date}</p>
                                <p>{announcement.content}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </HomeLayout>
    )
}

export default Announcement