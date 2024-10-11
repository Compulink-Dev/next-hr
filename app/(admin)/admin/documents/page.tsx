import React from 'react'
import Form from './_components/Form'
import { Button } from '@/components/ui/button'
import { Filter, Plus } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import CalendarComponent from './_components/Calender'
import BigCalendar from './_components/Calender'
import Card from '../hr/_components/Card'
import IntegrationCard from './_components/Card'

function Documents() {
    const documentsData = {
        all: [
            { title: 'Google Chrome', description: 'Access and share availability on any web pages', downloadLink: '/documents/chrome.pdf' },
            { title: 'Firefox', description: 'Browse fast and secure with Firefox', downloadLink: '/documents/firefox.pdf' },
            // Add more documents here
        ],
        technical: [
            { title: 'Technical Manual', description: 'Comprehensive guide to technical support', downloadLink: '/documents/technical_manual.pdf' },
            // Add more documents here
        ],
        // Similarly for other categories
    }

    return (
        <div className=''>
            <div className="p-2">
                <div className="flex items-center justify-between">
                    <p className="">Documents</p>
                    <div className="flex items-center gap-2">
                        <Button
                            variant={'ghost'}
                            className='flex items-center gap-2'
                        >
                            <Filter size={14} />
                            Filter</Button>
                        <Button
                            variant={'outline'}
                            className='flex items-center gap-1'>
                            <Plus size={14} />
                            <span className="">Create</span>
                        </Button>
                    </div>
                </div>
                <Separator className='w-full my-2.5' />
                <div className="">
                    <Tabs defaultValue="all" className="">
                        <TabsList className="grid w-full grid-cols-6">
                            <TabsTrigger value="all">All</TabsTrigger>
                            <TabsTrigger value="technical">Technical</TabsTrigger>
                            <TabsTrigger value="sales">Sales</TabsTrigger>
                            <TabsTrigger value="networks">Networks</TabsTrigger>
                            <TabsTrigger value="software">Software</TabsTrigger>
                            <TabsTrigger value="accounts">Accounts</TabsTrigger>
                        </TabsList>
                        <TabsContent value="all">
                            <p className="font-bold text-lg py-2">All documents</p>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-4">
                                {documentsData.all.map((doc, index) => (
                                    <IntegrationCard key={index} {...doc} />
                                ))}
                            </div>
                        </TabsContent>
                        <TabsContent value="technical">
                            <p className="">Technical</p>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-4">
                                {documentsData.technical.map((doc: any, index) => (
                                    <IntegrationCard key={index} {...doc} />
                                ))}
                            </div>
                        </TabsContent>
                        {/* Similarly for other tabs */}
                    </Tabs>
                </div>
            </div>
        </div>
    )
}

export default Documents;
