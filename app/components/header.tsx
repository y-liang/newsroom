import { NewspaperIcon } from '@heroicons/react/20/solid';
import Bookmark from '@/app/components/bookmark';
import Search from '@/app/components/search';

export default async function Header() {
   return (
      <header className='z-40 bg-white/75 backdrop-blur-lg sticky top-0'>
         <div className='max-w-7xl mx-auto my-4 px-8 md:px-4 py-4 md:px-8 flex items-center justify-between text-slate-600 text-sm '>
            <h2 className='sr-only'>Header</h2>
            <a aria-label='Logo' href='/' className='text-slate-700 font-semibold tracking-wider md:hover:text-slate-900 transition-colors flex items-center gap-2 text-base font-normal md:pl-8'>
               <NewspaperIcon className='h-6 w-6 opacity-75 mb-0.5' />
               <span className='hidden sm:flex'>News</span>
            </a>
            <Search />
            <Bookmark />
         </div>
      </header>
   );
}


