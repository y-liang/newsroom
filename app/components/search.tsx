'use client';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { useRouter } from 'next/navigation';
import { FormEvent } from 'react';

export default function Search() {
   const router = useRouter();

   function handleSubmit(event: FormEvent<HTMLFormElement>) {
      event.preventDefault();

      const formData = new FormData(event.currentTarget);
      const { keyword } = Object.fromEntries(formData.entries());

      if (keyword == '') {
         router.push(`/`);
      } else {
         router.push(`/?q=${keyword}`);
      }
   }

   return (
      <form method='post' onSubmit={handleSubmit} aria-label='Search bar' className='relative w-full max-w-sm px-2 sm:px-8 md:mx-auto'>
         <input
            type='search'
            name='keyword'
            className='flex w-full items-center text-sm leading-6 text-slate-600 placeholder:text-slate-400 font-normal bg-white/75 rounded-full ring-1 ring-slate-200 focus:ring-slate-400 shadow py-1.5 pl-8 pr-3 md:hover:ring-slate-400 transition-all focus-visible:outline-0'
            placeholder='Find a story...'
            aria-label='Find a story'
            autoComplete='off' />
         <MagnifyingGlassIcon className='h-4 w-4 absolute top-2.5 left-4 sm:left-10 text-slate-300' />
      </form>
   );
}



