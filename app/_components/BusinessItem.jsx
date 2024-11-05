import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function BusinessItem({business}) {
  return (
    <Link 
    href={'/restaurant/'+business?.slug}
    className='p-3
    hover:border rounded-xl
    hover:border-primary cursor-pointer
    hover:bg-orange-50'>
        <Image src={business.banner?.url} alt={business.name}
            width={500}
            height={130}
            className='h-[130px] rounded-xl object-cover'
        />
        <div className='mt-2'>
            <h2 className='font-bold text-lg'>{business.name}</h2>
            <div className='flex justify-between items-center'>
                <div className='flex gap-2 items-center'>
                    <p className='text-gray-500'>{business.description}</p>
                </div>
            </div>
        </div>
    </Link>
  )
}

export default BusinessItem