import { BaggageClaim, Book, BusFront, Cable, ChevronLeft, CreditCard, FileBarChart, Home, LucideTruck, Minimize2, ShoppingCart, Users2, Webhook } from 'lucide-react'
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
        title: "Invoices",
        href: "sales/invoices"
    },
    {
        title: "Credit Note",
        href: "sales/creditnote"
    },
]

const purchaseLink = [
    {
        title: "suppliers",
        href: "purchases/suppliers"
    },
    {
        title: "Purchase Order",
        href: "purchases/salesorder"
    },
    {
        title: "Invoices",
        href: "purchases/invoices"
    },
    {
        title: "Debit Note",
        href: "purchase/debit-note"
    },
]

const humanLink = [
    {
        title: "Loans",
        href: "hr/loans/"
    },
    {
        title: "Leave Forms",
        href: "hr/leave/"
    },
    {
        title: "Payslips",
        href: "hr/pay-slips/"
    },
    {
        title: "Employees",
        href: "hr/employees/"
    },
    {
        title: "Certification",
        href: "hr/certification/"
    },
    {
        title: "Training",
        href: "hr/training/"
    },
]

const fleetLink = [
    {
        title: "Invoices",
        href: "fleet/invoices/"
    },
    {
        title: "Vehicles",
        href: "fleet/vehicles/"
    },
    {
        title: "Drivers",
        href: "fleet/drivers/"
    },
]



function Sidebar({ showSide, setShowSide }: any) {
    console.log(showSide);

    return (
        <div className={`${showSide ? "w-60 min-h-screen fixed p-4 bg-slate-900 text-white md:flex flex-col  z-50" : "w-60 min-h-screen fixed p-4 bg-slate-900 text-white md:flex flex-col hidden z-50"}`}>

            <div className="flex flex-col gap-2 justify-between">
                <div className="flex items-center justify-between gap-2 border-b border-slate-400 pb-2 ">
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
                        onClick={() => setShowSide(false)}

                    />
                    <DropDownLink
                        href={'sales'}
                        Icon={ShoppingCart}
                        title={'Sales'}
                        links={salesLink}
                        onClick={() => setShowSide(false)}
                    />
                    <DropDownLink
                        href={'purchases'}
                        Icon={CreditCard}
                        title={'Purchase'}
                        links={purchaseLink}
                        onClick={() => setShowSide(false)}
                    />
                    <DropDownLink
                        href={'hr'}
                        Icon={Users2}
                        title={'H.R'}
                        links={humanLink}
                        onClick={() => setShowSide(false)}
                    />
                    <DropDownLink
                        href={'fleet'}
                        Icon={BusFront}
                        title={'Fleet'}
                        links={fleetLink}
                        onClick={() => setShowSide(false)}
                    />
                    <Link
                        className='hover:bg-blue-400 rounded flex gap-1 items-center px-4 py-2'
                        href={'/dashboard/reports'}>
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