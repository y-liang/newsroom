'use client';
import { ArrowUpRightIcon, CheckIcon, StarIcon } from '@heroicons/react/20/solid';
import { PhotoIcon, StarIcon as StarOutlineIcon } from '@heroicons/react/24/outline';
import { Article } from '@/app/lib/interfaces';
import { useBookmarkContext } from '@/app/components/provider';
import { useEffect, useState } from 'react';

export default function Card({ article }: { article: Article; }) {
   const { starred, setStarred, visited, setVisited } = useBookmarkContext();
   const [isStarred, setIsStarred] = useState(false);
   const [isVisited, setIsVisited] = useState(false);

   useEffect(() => {
      setIsStarred(checkStarredStatus(article));
      setIsVisited(checkVisitedStatus(article));
   }, [starred, visited]);

   function toggleStarred(article: Article) {
      if(isStarred) {
         starred.forEach(elem => {
            if(JSON.stringify(elem) == JSON.stringify(article)) {
               starred.delete(elem);
            }
         })
      } else {
         starred.add(article);
      }

      setStarred(new Set(starred));
      localStorage.setItem('starred', JSON.stringify(Array.from(starred)));
   }

   function addToVisited(article: Article) {
      visited.add(article.url);
      setVisited(new Set(visited));
      localStorage.setItem('visited', JSON.stringify(Array.from(visited)));
   }

   function checkStarredStatus(article: Article) {
      let status = false;
      starred.forEach(elem => {
         if(JSON.stringify(elem) == JSON.stringify(article)) {
            status = true;
         }
      })
      return status;
   }

   function checkVisitedStatus(article: Article) {
      return visited.has(article.url);
   }

   return (
      <article className='flex flex-col md:w-full h-full py-4 md:p-8 bg-white md:shadow md:hover:bg-white/80 md:focus-within:ring-1 ring-slate-300 md:hover:ring-1 transition-all relative rounded-2xl'>
         {article.urlToImage ?
            <img src={article.urlToImage} className='max-w-full md:max-w-none h-64 object-cover md:-mx-6 md:-mt-6 mb-8 rounded-xl' alt='' /> :
            <div className='max-w-full md:max-w-none h-64 md:-mx-6 md:-mt-6 mb-8 text-slate-400 text-sm flex flex-col items-center justify-center'>
               <PhotoIcon className='h-6 w-6' />
               <span>Image not available</span>
            </div>}
         <button
            type='button'
            onClick={() => { toggleStarred(article); }}
            className={`${isStarred ? 'text-yellow-400 bg-yellow-400/20' : 'text-white bg-slate-400/30'} opacity-75 backdrop-blur-sm md:hover:opacity-100 rounded-full p-1 absolute right-4 top-8 md:top-4 z-20`}>
            {isStarred ?
               <StarIcon className='h-6 w-6' /> :
               <StarOutlineIcon className='h-6 w-6' />}
         </button>
         <span className='flex items-center justify-between w-full text-[0.625rem] uppercase tracking-wider text-slate-400'>
            <span className='truncate'>
               {article.source}
            </span>
            <div className='flex-1 bg-slate-100 flex-1 h-px mx-2'></div>
            <span>
               {article.publishedAt}
            </span>
         </span>
         <h1 className='font-heading text-md text-slate-800 leading-5 line-clamp-2 font-semibold my-4'>
            {article.title}
         </h1>
         <p className='text-sm text-slate-400 leading-4 font-light line-clamp-3 mb-5'>
            {article.description}
         </p>
         <a href={article.url}
            onClick={() => addToVisited(article)}
            className='opacity-0 absolute inset-0 peer z-10'
            target='_blank'>
            <span className='sr-only'>
               Read more about {article.title}
            </span>
         </a>
         <p aria-hidden='true' className='text-sm text-slate-500 mt-auto space-x-1 peer-hover:space-x-2'>
            <span>Read more</span>
            <ArrowUpRightIcon className='h-4 w-4 inline-flex text-slate-400' />
            {isVisited && <CheckIcon className='h-5 w-5 inline-flex text-slate-400 float-right' />}
         </p>
      </article>
   );
}