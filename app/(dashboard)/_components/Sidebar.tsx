import { BaggageClaim, Book, BusFront, Cable, ChevronLeft, CreditCard, FileBarChart, Home, LucideTruck, ShoppingCart, Users2 } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import SubscriptionCard from './SubscriptionCard'
import { Button } from '@/components/ui/button'
import DropDownLink from './DropDownLink'

const inventoryLinks = [
    {
        title: "Items",
        href: "inventory/items/"
    },
    {
        title: "Categories",
        href: "inventory/categories/"
    },
    {
        title: "Brands",
        href: "inventory/brands/"
    },
    {
        title: "Units",
        href: "inventory/units/"
    },
    {
        title: "Warehouse",
        href: "inventory/warehouse/"
    },
    {
        title: "Adjustments",
        href: "inventory/adjustments/"
    },
    {
        title: "Suppliers",
        href: "inventory/suppliers/"
    },
]

const salesLink = [
    {
        title: "Customers",
        href: "sales/customers"
    },
    {
        title: "Sales Order",
        href: "sales/salesorder"
    },
    {
        title: "Shipments",
        href: "sales/shipments"
    },
    {
        title: "Invoices",
        href: "sales/invoices"
    },
    {
        title: "Receipts",
        href: "sales/receipts"
    },
    {
        title: "Payments",
        href: "sales/payments"
    },
    {
        title: "Sales Order",
        href: "sales/salesorder"
    },
    {
        title: "Credit Note",
        href: "sales/creditnote"
    },
]

function Sidebar() {
    return (
        <div className="w-60 p-4 bg-slate-900 text-white md:flex flex-col hidden">

            <div className="flex flex-col gap-2 justify-between">
                <div className="flex items-center gap-1 border-b border-slate-400 pb-2 ">
                    <ShoppingCart />
                    <span className="text-lg font-bold">Inventory</span>
                </div>
                <nav className="flex flex-col gap-1">
                    <Link
                        className='bg-blue-600 hover:bg-blue-400 rounded flex gap-1 items-center px-4 py-2'
                        href={'/dashboard/home'}>
                        <Home className='w-4 h-4' />
                        <span className="text-sm">Home</span>
                    </Link>
                    <DropDownLink
                        href={'inventory'}
                        Icon={BaggageClaim}
                        title={'Inventory'}
                        links={inventoryLinks}
                    />
                    <DropDownLink
                        href={'sales'}
                        Icon={ShoppingCart}
                        title={'Sales'}
                        links={salesLink}
                    />
                    <Link
                        className='hover:bg-blue-400 rounded flex gap-1 items-center px-4 py-2'
                        href={'/dashboard/home'}>
                        <CreditCard className='w-4 h-4' />
                        <span className="text-sm">Purchase</span>
                    </Link>
                    <Link
                        className='hover:bg-blue-400 rounded flex gap-1 items-center px-4 py-2'
                        href={'/dashboard/home'}>
                        <Users2 className='w-4 h-4' />
                        <span className="text-sm">Human Resource</span>
                    </Link>
                    <Link
                        className='hover:bg-blue-400 rounded flex gap-1 items-center px-4 py-2'
                        href={'/dashboard/fleet'}>
                        <BusFront className='w-4 h-4' />
                        <span className="text-sm">Fleet</span>
                    </Link>
                    <Link
                        className='hover:bg-blue-400 rounded flex gap-1 items-center px-4 py-2'
                        href={'/dashboard/home'}>
                        <FileBarChart className='w-4 h-4' />
                        <span className="text-sm">Reports</span>
                    </Link>
                    <Link
                        className='hover:bg-blue-400 rounded flex gap-1 items-center px-4 py-2'
                        href={'/dashboard/integrations'}>
                        <Cable className='w-4 h-4' />
                        <span className="text-sm">Integration</span>
                    </Link>
                    <Link
                        className='hover:bg-blue-400 rounded flex gap-1 items-center px-4 py-2'
                        href={'/dashboard/documents'}>
                        <Book className='w-4 h-4' />
                        <span className="text-sm">Documents</span>
                    </Link>

                </nav>
            </div>
            <div className="flex flex-col items-center justify-center">
                <SubscriptionCard />
                <Button className='bg-slate-950 hover:bg-slate-900'>
                    <ChevronLeft className='w-4 h-4' />
                </Button>
            </div>
        </div>
    )
}

export default Sidebar