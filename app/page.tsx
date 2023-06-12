import findNews from '@/app/api';
import Gallery from '@/app/components/gallery';
import Header from '@/app/components/header';
import Footer from './components/footer';

export default async function HomePage({
   searchParams,
}: {
   searchParams: { [key: string]: string | string[] | undefined; };
}) {
   const { q } = searchParams;
   const query = Array.isArray(q) ? q[0] : q;
   const articles = await findNews(query);

   return (
      <div className='w-full h-full'>
         <Header />
         <Gallery articles={articles} />
         <Footer />
      </div>
   );
}


