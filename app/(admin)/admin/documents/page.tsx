import React from 'react'
import Form from './_components/Form'
import { Button } from '@/components/ui/button'
import { Filter, Plus } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import IntegrationCard from './_components/Card'
import { getData } from '@/lib/apiResponse'
import Link from 'next/link'

async function Documents() {
    const documentsData = {
        all: [
            { title: 'Google Chrome', description: 'Access and share availability on any web pages', downloadLink: '/documents/chrome.pdf' },
            { title: 'Firefox', description: 'Browse fast and secure with Firefox', downloadLink: '/documents/firefox.pdf' },
        ],
        technical: [
            { title: 'Technical Manual', description: 'Comprehensive guide to technical support', downloadLink: '/documents/technical_manual.pdf' },
        ],
        sales: [
            { title: 'Sales Presentation', description: 'Detailed sales strategies and pitches', downloadLink: '/documents/sales_presentation.pdf' },
        ],
        networks: [
            { title: 'Network Setup', description: 'Step-by-step guide to setting up a network', downloadLink: '/documents/network_setup.pdf' },
        ],
        software: [
            { title: 'Software Installation Guide', description: 'Install software with ease', downloadLink: '/documents/software_installation.pdf' },
        ],
        accounts: [
            { title: 'Account Management', description: 'Manage accounts effectively', downloadLink: '/documents/account_management.pdf' },
        ]
    }

    const documents = await getData('documents')

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
                            Filter
                        </Button>
                        <Button
                            variant={'outline'}
                            className='flex items-center gap-1'>
                            <Plus size={14} />
                            <Link href={'/admin/documents/new'}>
                                <span className="">Create</span>
                            </Link>
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

                        {/* All Documents */}
                        <TabsContent value="all">
                            <p className="font-bold text-lg py-2">All documents</p>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-4">
                                {documentsData.all.map((doc, index) => (
                                    <IntegrationCard key={index}
                                        name={doc.title}
                                        subTitle={doc.description}
                                        attachment={doc.downloadLink}
                                    />
                                ))}
                            </div>
                        </TabsContent>

                        {/* Technical Documents */}
                        <TabsContent value="technical">
                            <p className="font-bold text-lg py-2">Technical documents</p>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-4">
                                {documentsData.technical.map((doc, index) => (
                                    <IntegrationCard key={index}
                                        name={doc.title}
                                        subTitle={doc.description}
                                        attachment={doc.downloadLink}
                                    />
                                ))}
                            </div>
                        </TabsContent>

                        {/* Sales Documents */}
                        <TabsContent value="sales">
                            <p className="font-bold text-lg py-2">Sales documents</p>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-4">
                                {documentsData.sales.map((doc, index) => (
                                    <IntegrationCard key={index}
                                        name={doc.title}
                                        subTitle={doc.description}
                                        attachment={doc.downloadLink}
                                    />
                                ))}
                            </div>
                        </TabsContent>

                        {/* Networks Documents */}
                        <TabsContent value="networks">
                            <p className="font-bold text-lg py-2">Network documents</p>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-4">
                                {documentsData.networks.map((doc, index) => (
                                    <IntegrationCard key={index}
                                        name={doc.title}
                                        subTitle={doc.description}
                                        attachment={doc.downloadLink}
                                    />
                                ))}
                            </div>
                        </TabsContent>

                        {/* Software Documents */}
                        <TabsContent value="software">
                            <p className="font-bold text-lg py-2">Software documents</p>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-4">
                                {documentsData.software.map((doc, index) => (
                                    <IntegrationCard key={index}
                                        name={doc.title}
                                        subTitle={doc.description}
                                        attachment={doc.downloadLink}
                                    />
                                ))}
                            </div>
                        </TabsContent>

                        {/* Accounts Documents */}
                        <TabsContent value="accounts">
                            <p className="font-bold text-lg py-2">Accounts documents</p>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-4">
                                {documentsData.accounts.map((doc, index) => (
                                    <IntegrationCard key={index}
                                        name={doc.title}
                                        subTitle={doc.description}
                                        attachment={doc.downloadLink}
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

export default Documents;
