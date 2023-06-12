'use client';
import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { StarIcon, XMarkIcon } from '@heroicons/react/20/solid';
import { useBookmarkContext } from '@/app/components/provider';
import Tile from '@/app/components/tile';

export default function Modal({ open, setOpen }: { open: any, setOpen: any; }) {
   const { starred, setStarred } = useBookmarkContext();

   return (
      <Transition.Root show={open} as={Fragment}>
         <Dialog as='div' className='relative z-40' onClose={setOpen}>
            <Transition.Child
               as={Fragment}
               enter='ease-out duration-300'
               enterFrom='opacity-0'
               enterTo='opacity-100'
               leave='ease-in duration-100'
               leaveFrom='opacity-100'
               leaveTo='opacity-0'>
               <div className='fixed inset-0 bg-slate-500/40 transition-opacity' />
            </Transition.Child>
            <div className='fixed inset-0 z-10 overflow-y-auto'>
               <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
                  <Transition.Child
                     as={Fragment}
                     enter='ease-out duration-300'
                     enterFrom='opacity-50 translate-y-4'
                     enterTo='opacity-100 translate-y-0'
                     leave='ease-in duration-100'
                     leaveFrom='opacity-100 translate-y-0'
                     leaveTo='opacity-50 translate-y-4'>
                     <Dialog.Panel className='pointer-events-auto w-screen max-w-fit'>
                        <div className='flex h-full flex-col px-4 py-6 bg-white shadow-xl rounded-2xl m-4'>
                           <div className='flex items-center justify-between'>
                              <div className='ml-3 flex h-7 items-center'>
                                 <button
                                    type='button'
                                    className='-m-2 p-2 text-slate-400 hover:text-slate-600 transition-colors'
                                    onClick={() => setOpen(false)}>
                                    <span className='sr-only'>Close panel</span>
                                    <XMarkIcon className='h-6 w-6' aria-hidden='true' />
                                 </button>
                              </div>
                              <Dialog.Title className='hidden sm:flex px-4 items-center space-x-2'>
                                 <StarIcon className='h-5 w-5 text-slate-300 mb-1' />
                                 <span className='text-md text-slate-400'>
                                    {`You have ${starred.size} ${starred.size == 1 ? 'favorite article' : 'favorite articles'}`}
                                 </span>
                              </Dialog.Title>
                              {starred.size != 0 &&
                                 <button
                                    type='button'
                                    onClick={() => setStarred(new Set())}
                                    className='text-sm text-slate-400 md:hover:text-slate-600 transition-colors rounded-full p-2'>
                                    Clear
                                 </button>}
                           </div>
                           {starred.size == 0 ?
                              <div className='mt-4 px-4'>
                                 All cleared
                              </div> :
                              <ul role='list' className='grid gap-x-4 grid-cols-1 md:grid-cols-2 max-w-5xl divide-y md:divide-y-0'>
                                 {Array.from(starred).map((elem, index) => (
                                    <li key={index}>
                                       <Tile article={elem} />
                                    </li>
                                 ))}
                              </ul>}
                        </div>
                     </Dialog.Panel>
                  </Transition.Child>
               </div>
            </div>
         </Dialog>
      </Transition.Root>
   );
}
