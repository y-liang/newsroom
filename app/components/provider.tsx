'use client';
import { Article, BookmarkContext } from '@/app/lib/interfaces';
import { ReactNode, createContext, useContext, useEffect, useState } from 'react';

const BookmarkContext = createContext<BookmarkContext>({
   starred: new Set(),
   setStarred: () => {},
   visited: new Set(),
   setVisited: () => {},
});

export function useBookmarkContext(): BookmarkContext {
   return useContext(BookmarkContext);
}

export default function BookmarkProvider({ children }: { children: ReactNode; }) {
   const [didMount, setDidMount] = useState(false);
   const [starred, setStarred] = useState<Set<Article>>(new Set());
   const [visited, setVisited] = useState<Set<string>>(new Set());

   useEffect(() => {
      setDidMount(true);
   }, []);

   useEffect(() => {
      if(didMount) {
         const starredStr = localStorage.getItem('starred');
         if(starredStr) {
            const starredObjArr = JSON.parse(starredStr);
            const starredSet = new Set([...starredObjArr]);
            setStarred(starredSet);
         }

         const visitedStr = localStorage.getItem('visited');
         if(visitedStr) {
            const visitedSet = new Set<string>([...JSON.parse(visitedStr)]);
            setVisited(visitedSet);
         }
      }
   }, [didMount]);
   return (
      <BookmarkContext.Provider value={{ starred, setStarred, visited, setVisited }} >
         {children}
      </BookmarkContext.Provider>
   );
};


