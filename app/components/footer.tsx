export default function Footer() {
   return (
      <footer className='bg-slate-50'>
         <div className='max-w-7xl mx-auto py-12 px-8 text-sm text-slate-400/50 text-center text-medium leading-6'>
            <h2 className='sr-only'>Footer</h2>
            Built with&nbsp;
            <a href='https://newsapi.org/' target='_blank' className='md:hover:text-slate-400 transition-colors'>News API</a>
         </div>
      </footer>
   );
}