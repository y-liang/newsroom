'use client';
import { Article } from '@/app/lib/interfaces';
import Card from '@/app/components/card';

export default function Gallery({ articles }: { articles: Article[]; }) {
   return (
      <main className='bg-slate-50'>
         <section className='mx-auto py-12 px-6 md:px-8 space-y-6 max-w-7xl'>
            {articles.length ? <>
               <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 items-start'>
                  {articles.slice(0, 2).map((elem, index) => <Card article={elem} key={index} />)}
               </div>
               <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start'>
                  {articles.slice(2, 8).map((elem, index) => <Card article={elem} key={index} />)}
               </div>
               <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 items-start'>
                  {articles.slice(8).map((elem, index) => <Card article={elem} key={index} />)}
               </div>
            </> : <div className='text-center'>No articles found</div>}
         </section>
      </main>
   );
}


