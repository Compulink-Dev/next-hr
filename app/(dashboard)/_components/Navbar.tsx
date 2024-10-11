import { Webhook, Minimize2, Home, BaggageClaim, ShoppingCart, CreditCard, Users2, BusFront, FileBarChart, Cable, Book, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import SubscriptionCard from './SubscriptionCard';
import { Button } from '@/components/ui/button';
import DropDownLink from './DropDownLink';
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import Image from "next/image";

// Menu items from the other file
const menuItems = [
    {
        title: "MENU",
        items: [
            { icon: "/home.png", label: "Home", href: "/", visible: ["admin", "teacher", "student", "parent"] },
            { icon: "/teacher.png", label: "Teachers", href: "/list/teachers", visible: ["admin", "teacher"] },
            { icon: "/student.png", label: "Students", href: "/list/students", visible: ["admin", "teacher"] },
            { icon: "/parent.png", label: "Parents", href: "/list/parents", visible: ["admin", "teacher"] },
            { icon: "/subject.png", label: "Subjects", href: "/list/subjects", visible: ["admin"] },
            { icon: "/class.png", label: "Classes", href: "/list/classes", visible: ["admin", "teacher"] },
            { icon: "/lesson.png", label: "Lessons", href: "/list/lessons", visible: ["admin", "teacher"] },
            { icon: "/exam.png", label: "Exams", href: "/list/exams", visible: ["admin", "teacher", "student", "parent"] },
            { icon: "/assignment.png", label: "Assignments", href: "/list/assignments", visible: ["admin", "teacher", "student", "parent"] },
            { icon: "/result.png", label: "Results", href: "/list/results", visible: ["admin", "teacher", "student", "parent"] },
            { icon: "/attendance.png", label: "Attendance", href: "/list/attendance", visible: ["admin", "teacher", "student", "parent"] },
            { icon: "/calendar.png", label: "Events", href: "/list/events", visible: ["admin", "teacher", "student", "parent"] },
            { icon: "/message.png", label: "Messages", href: "/list/messages", visible: ["admin", "teacher", "student", "parent"] },
            { icon: "/announcement.png", label: "Announcements", href: "/list/announcements", visible: ["admin", "teacher", "student", "parent"] },
        ],
    },
    {
        title: "OTHER",
        items: [
            { icon: "/profile.png", label: "Profile", href: "/profile", visible: ["admin", "teacher", "student", "parent"] },
            { icon: "/setting.png", label: "Settings", href: "/settings", visible: ["admin", "teacher", "student", "parent"] },
            { icon: "/logout.png", label: "Logout", href: "/logout", visible: ["admin", "teacher", "student", "parent"] },
        ],
    },
];

// Sidebar component
function Sidebar({ showSide, setShowSide }: any) {
    const [role, setRole] = React.useState<string | null>(null);

    React.useEffect(() => {
        // Fetch session and set role
        const fetchSession = async () => {
            try {
                const session = await getServerSession(options);
                if (session && session.user) {
                    setRole(session.user.role || "");
                }
            } catch (error) {
                console.error("Error fetching user role:", error);
            }
        };
        fetchSession();
    }, []);

    return (
        <div className={`${showSide ? "w-60 min-h-screen fixed p-4 bg-slate-900 text-white md:flex flex-col  z-50" : "w-60 min-h-screen fixed p-4 bg-slate-900 text-white md:flex flex-col hidden z-50"}`}>
            <div className="flex flex-col gap-2 justify-between">
                <div className="flex items-center justify-between gap-2 border-b border-slate-400 pb-2">
                    <div className="flex items-center gap-2">
                        <Webhook />
                        <span className="text-lg font-bold">Compulink</span>
                    </div>
                    <Button
                        onClick={() => setShowSide(false)}
                        className='flex md:hidden'
                    >
                        <Minimize2 className='h-5 w-5' />
                    </Button>
                </div>

                {/* Render filtered menu items */}
                <nav className="flex flex-col gap-1">
                    {menuItems.map((section) => (
                        <div key={section.title}>
                            <span className="text-gray-400 font-light my-2">{section.title}</span>
                            {section.items.map((item) => (
                                role && item.visible.includes(role) ? (
                                    <Link
                                        href={item.href}
                                        key={item.label}
                                        className='flex gap-2 items-center px-4 py-2 hover:bg-blue-400 rounded'
                                    >
                                        <Image src={item.icon} alt={item.label} width={20} height={20} />
                                        <span>{item.label}</span>
                                    </Link>
                                ) : null
                            ))}
                        </div>
                    ))}
                </nav>
            </div>

            <div className="flex flex-col items-center justify-center">
                <SubscriptionCard />
                <Button className='bg-slate-950 hover:bg-slate-900'>
                    <ChevronLeft className='w-4 h-4' />
                </Button>
            </div>
        </div>
    );
}

export default Sidebar;
