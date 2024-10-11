import React from 'react'
import HomeLayout from '../../_components/home-layout'

function Updates() {

    const recentUpdatesData = [
        { id: 1, title: "Performance Enhancements", date: "2024-10-08", content: "We've optimized the performance of the app to load 20% faster." },
        { id: 2, title: "UI Refresh", date: "2024-10-05", content: "The dashboard now has a cleaner and more modern look." },
    ];

    const blogAnnouncementsData = [
        { id: 1, title: "Introducing New Features", date: "2024-10-07", content: "Check out the latest blog post covering the new features added this month." },
        { id: 2, title: "Company News", date: "2024-10-01", content: "Read about the recent company milestones in our blog section." },
    ];


    return (
        <HomeLayout>
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-6">Updates</h1>

                {/* Recent Updates Section */}
                <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-4">Recent Updates</h2>
                    <div className="space-y-4">
                        {recentUpdatesData.map((update) => (
                            <div key={update.id} className="bg-white shadow rounded-lg p-4">
                                <h3 className="text-md font-semibold">{update.title}</h3>
                                <p className="text-gray-500 text-xs">{update.date}</p>
                                <p className='text-sm'>{update.content}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Blog Announcements Section */}
                <div>
                    <h2 className="text-xl font-semibold mb-4">Blog Announcements</h2>
                    <div className="space-y-4">
                        {blogAnnouncementsData.map((announcement) => (
                            <div key={announcement.id} className="bg-white shadow rounded-lg p-4">
                                <h3 className="text-md font-semibold">{announcement.title}</h3>
                                <p className="text-gray-500 text-xs">{announcement.date}</p>
                                <p className='text-sm'>{announcement.content}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </HomeLayout>
    )
}

export default Updates