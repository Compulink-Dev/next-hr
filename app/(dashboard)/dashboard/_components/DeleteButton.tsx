'use client'
import { Button } from '@/components/ui/button'
import { Trash } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'
import Swal from 'sweetalert2'

function DeleteButton({ id, endpoint }: any) {

    const router = useRouter()

    async function handleDelete() {
        try {
            Swal.fire({
                title: 'Are you sure',
                text: 'You wont be able to revert this!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: "#d33",
                confirmButtonText: 'Yes, delete it'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    await fetch(`/api/${endpoint}/${id}`, {
                        method: 'DELETE'
                    })
                    console.log("Api id : " + id);

                    router.refresh()
                    Swal.fire({
                        title: 'Delete',
                        text: 'Your has been deleted',
                        icon: 'success'
                    })
                }
            })
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Button
            onClick={handleDelete}
            className='text-red-600 hover:text-red-400 space-x-2s'
            variant={'ghost'}>
            <Trash />
            <span className="">Delete</span>
        </Button>
    )
}

export default DeleteButton