'use client'

import CardBox from '@/app/components/shared/CardBox'
import Image from 'next/image'
import Link from 'next/link'
import { JSX } from 'react'

interface BreadcrumbItem {
  title: string
  to?: string
}

interface BreadCrumbType {
  subtitle?: string
  items?: BreadcrumbItem[]
  title: string
  children?: JSX.Element
}

const BreadcrumbComp = ({ items, title }: BreadCrumbType) => {
  return (
    <>
      <CardBox
        className={`mb-6 py-4 bg-lightsecondary overflow-hidden rounded-md border-none shadow-none! dark:shadow-none! relative`}>
        <div className=' items-center grid grid-cols-12 gap-6'>
          <div className='col-span-10'>
            <h4 className='font-semibold text-xl mb-3'>
              {title}
            </h4>
            <ol
              className='flex items-center whitespace-nowrap'
              aria-label='Breadcrumb'>
              <li className='flex items-center'>
                <Link
                  className='opacity-80 text-sm text-muted-foreground leading-none'
                  href='/'>
                  Home
                </Link>
              </li>
              <li>
                <div className='p-0.5 rounded-full bg-muted-foreground mx-2.5 flex items-center'></div>
              </li>
              <li
                className='flex items-center text-sm text-muted-foreground leading-none'
                aria-current='page'>
                {title}
              </li>
            </ol>
          </div>
          <div className='col-span-2 flex justify-center -mb-7 max-h-[120px] max-w-[140px]'>
            <div className='hidden sm:block absolute right-7 bottom-0'>
              <Image
                src='/images/dashboard/customer-support-img.png'
                alt='support-img'
                width={145}
                height={95}
              />
            </div>
          </div>
        </div>
      </CardBox>
    </>
  )
}

export default BreadcrumbComp
