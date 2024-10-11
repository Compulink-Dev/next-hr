import React from 'react'
import Form from './_components/Form'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import CalendarComponent from './_components/Calender'
import BigCalendar from './_components/Calender'
import Card from '../hr/_components/Card'
import IntegrationCard from './_components/Card'

function Integrations() {
    return (
        <div className=''>
            <div className="p-2">
                <div className="flex items-center justify-between">
                    <p className="">Integrations</p>
                    <div className="flex items-center gap-2">
                        <Button
                            variant={'ghost'}
                        >Invite user</Button>
                        <Button
                            variant={'outline'}
                            className='flex items-center gap-1'>
                            <Plus />
                            <span className="">Create</span>
                        </Button>
                    </div>
                </div>
                <Separator className='w-full my-2.5' />
                <div className="">
                    <Tabs defaultValue="account" className="">
                        <TabsList className="grid w-full grid-cols-6">
                            <TabsTrigger value="all">All</TabsTrigger>
                            <TabsTrigger value="most">Most used</TabsTrigger>
                            <TabsTrigger value="sales">Sales</TabsTrigger>
                            <TabsTrigger value="fleet">Fleet</TabsTrigger>
                            <TabsTrigger value="calender">Calenders</TabsTrigger>
                            <TabsTrigger value="email">Email messaging</TabsTrigger>
                        </TabsList>
                        <TabsContent value="all">
                            <p className="">All integrations</p>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-4">
                                <IntegrationCard />
                                <IntegrationCard />
                                <IntegrationCard />
                                <IntegrationCard />
                            </div>
                        </TabsContent>
                        <TabsContent value="most">
                            <p className="">Most Used</p>
                        </TabsContent>
                        <TabsContent value="sales">
                            <p className="">Sales and Purchases</p>
                        </TabsContent>
                        <TabsContent value="fleet">
                            <p className="">Fleet</p>
                        </TabsContent>
                        <TabsContent value="calender">
                            <p className="">Calenders</p>
                            <BigCalendar />
                        </TabsContent>
                        <TabsContent value="email">
                            <p className="">Email messaging</p>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    )
}

export default Integrations