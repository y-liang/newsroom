'use client';
import { useState } from 'react';
import { StarIcon } from '@heroicons/react/20/solid';
import { useBookmarkContext } from '@/app/components/provider';
import Modal from '@/app/components/modal';

export default function Bookmark() {
   const { starred } = useBookmarkContext();
   const [open, setOpen] = useState(false);

   return (
      <aside className='md:w-40'>
         <button
            type='button'
            disabled={starred.size == 0}
            onClick={() => setOpen(!open)}
            className='flex items-center gap-2 text-sm text-slate-600 md:enabled:hover:text-slate-800 transition-colors font-normal'>
            <StarIcon className='h-4 w-4 opacity-50 mb-0.5 sm:mr-2 md:mr-0' />
            <span>{starred.size}</span>
            <span className='hidden md:flex'>{`${starred.size == 1 ? 'Bookmark' : 'Bookmarks'}`}</span>
         </button>
         <Modal open={open} setOpen={setOpen} />
      </aside>
   );
}

