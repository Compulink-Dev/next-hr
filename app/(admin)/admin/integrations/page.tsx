import React from 'react'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import BigCalendar from './_components/Calender'
import IntegrationCard from './_components/Card'
import Link from 'next/link'
import { getData } from '@/lib/apiResponse'

async function Integrations() {

    const download = await getData('integrations')

    const data = download.map((obj: any) => {
        return {
            id: obj.id,
            name: obj.name,
            subTitle: obj.subTitle,
            attachment: obj.attachment,
            category: obj.category,
            createdAt: obj.createdAt
        }
    })

    console.log("Download : ", { data });

    return (
        <div className=''>
            <div className="p-2">
                <div className="flex items-center justify-between">
                    <p className="">Integrations</p>
                    <div className="flex items-center gap-2">
                        <Button variant={'ghost'}>Invite user</Button>
                        <Button variant={'outline'} className='flex items-center gap-1'>
                            <Plus />
                            <Link href='/admin/integrations/new' className="">Create</Link>
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

                        {/* All Integrations Tab */}
                        <TabsContent value="all">
                            <p className="">All integrations</p>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-4">
                                {data.map((doc: any) => (
                                    <IntegrationCard
                                        key={doc.id}
                                        name={doc.name}
                                        subtitle={doc.subTitle}
                                        attachment={doc.attachment}
                                    />
                                ))}
                            </div>
                        </TabsContent>

                        {/* Most Used Tab */}
                        <TabsContent value="most">
                            <p className="">Most Used</p>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-4">
                                {data.filter((doc: any) => doc.category === 'most').map((doc: any) => (
                                    <IntegrationCard
                                        key={doc.id}
                                        name={doc.name}
                                        subtitle={doc.subTitle}
                                        attachment={doc.attachment}
                                    />
                                ))}
                            </div>
                        </TabsContent>

                        {/* Sales Tab */}
                        <TabsContent value="sales">
                            <p className="">Sales and Purchases</p>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-4">
                                {data.filter((doc: any) => doc.category === 'sales').map((doc: any) => (
                                    <IntegrationCard
                                        key={doc.id}
                                        name={doc.name}
                                        subtitle={doc.subTitle}
                                        attachment={doc.attachment}
                                    />
                                ))}
                            </div>
                        </TabsContent>

                        {/* Fleet Tab */}
                        <TabsContent value="fleet">
                            <p className="">Fleet</p>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-4">
                                {data.filter((doc: any) => doc.category === 'fleet').map((doc: any) => (
                                    <IntegrationCard
                                        key={doc.id}
                                        name={doc.name}
                                        subtitle={doc.subTitle}
                                        attachment={doc.attachment}
                                    />
                                ))}
                            </div>
                        </TabsContent>

                        {/* Calender Tab */}
                        <TabsContent value="calender">
                            <p className="">Calenders</p>
                            <BigCalendar />
                        </TabsContent>

                        {/* Email Tab */}
                        <TabsContent value="email">
                            <p className="">Email messaging</p>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-4">
                                {data.filter((doc: any) => doc.category === 'email').map((doc: any) => (
                                    <IntegrationCard
                                        key={doc.id}
                                        name={doc.name}
                                        subtitle={doc.subTitle}
                                        attachment={doc.attachment}
                                    />
                                ))}
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    )
}

export default Integrations
