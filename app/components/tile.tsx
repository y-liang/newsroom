'use client';
import { PhotoIcon } from '@heroicons/react/24/outline';
import { CheckIcon, XMarkIcon } from '@heroicons/react/20/solid';
import { Article } from '@/app/lib/interfaces';
import { useBookmarkContext } from '@/app/components/provider';

export default function Tile({ article }: { article: Article; }) {
   const { starred, setStarred, visited, setVisited } = useBookmarkContext();

   function removeFromStarred(article: Article) {
      starred.delete(article);
      setStarred(new Set(starred));
   }

   function addToVisited(article: Article) {
      visited.add(article.url);
      setVisited(new Set(visited));
   }

   function isVisited(article: Article) {
      return visited.has(article.url);
   }

   return (
      <article className='flex flex-col items-center md:flex-row pt-4 pb-2 md:py-6'>
         <a href={article.url}
            onClick={() => addToVisited(article)}
            target='_blank'
            className='h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-slate-200 relative'>
            {article.urlToImage ?
               <img
                  src={article.urlToImage}
                  alt={article.title}
                  className='h-full w-full object-cover object-center'
               /> :
               <div className='h-full w-full text-slate-400 text-sm flex flex-col items-center justify-center'>
                  <PhotoIcon className='h-6 w-6' />
                  <span>Image not available</span>
               </div>}
            {isVisited(article) && <CheckIcon className='h-5 w-5 text-white absolute top-0 right-0 p-1 m-1 bg-slate-400/50 rounded-full' />}
         </a>
         <div className='mx-4 mt-3 md:mt-0 flex flex-1 flex-col max-w-4xl'>
            <span className='flex items-center justify-between w-full text-[0.625rem] uppercase tracking-wider text-slate-400'>
               <span className='truncate'>
                  {article.source}
               </span>
               <div className='flex-1 bg-slate-100 flex-1 h-px mx-2'></div>
               <span>
                  {article.publishedAt}
               </span>
            </span>
            <h3 className='text-sm text-slate-600 text-left line-clamp-2 leading-4 mt-1 hover:underline'>
               <a href={article.url} onClick={() => addToVisited(article)} target='_blank'>
                  {article.title}
               </a>
            </h3>
            <p className='text-slate-400 text-left text-xs line-clamp-3 leading-4 mt-3 font-light'>{article.description}</p>
         </div>
         <button
            type='button'
            onClick={() => { removeFromStarred(article); }}
            className='font-medium text-slate-400 m-1 p-1 md:hover:text-slate-800 transition-colors md:hover:bg-slate-50 rounded-full'
         >
            <XMarkIcon className='h-4 w-4' aria-hidden='true' />
         </button>
      </article>
   );
}