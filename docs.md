## Frameworks and libraries

| Stack  | Description |
| ------------- |:-------------|
| Next.js      | Provide app with routing, rendering, fetching features, and optimizations     |
| React.js     |  Build user interfaces using components     |
| TypeScript      | For optional static typing, classes and interfaces     |
| Tailwind      | Design system with utility classes, responsive and performant     |
| HeadlessUI     | Unstyled UI components, eg. dialog and transition     |
| HeroIcons     | A set of solid and outline SVG icons     |

## Patterns and Structure
A hybrid approach that utilizes both the server and the client sides to render components.

- On the server:
   - Fetch data
   - Access sensitive API key information

- On the client: 
   - Handle interactivity and event listeners
   - Use context, state, and custom hooks for state management

- Project structure:
   ```
   ├── app
   │   ├── api
   │   │   ├── index.ts
   │   ├── components
   │   │   ├── bookmark.tsx
   │   │   ├── card.tsx
   │   │   ├── footer.tsx
   │   │   ├── gallery.tsx
   │   │   ├── header.tsx
   │   │   ├── modal.tsx
   │   │   ├── provider.tsx
   │   │   ├── search.tsx
   │   │   ├── tile.tsx
   │   ├── lib
   │   │   ├── interfaces.ts
   │   │   ├── *.svg
   │   ├── public
   │   │   ├── *.png
   │   ├── error.tsx
   │   ├── layout.tsx
   │   ├── page.tsx
   │   ├── styles.css
   ├── .env
   ├── node_modules
   ├── *.json
   ├── *.config.js 
   └── *.md
   ```

## Features and Snippets

- Data fetching and caching
   - Cache data fetched from News API (static data fetching) in development
   - Switch to dynamic data fetching and opt out of caching behavior in production
      - _app/api/index.ts_
      ```typescript
      const response = await fetch(endpoint, {
         method: 'GET',
         headers: {
         'Content-Type': 'application/json',
         'X-Api-Key': key!,
         },
         cache: `${environment == 'production' ? 'no-store' : 'force-cache'}`
      });
      ```

- Component rendering
   - Render the whole route at request time based on search params
      - _app/page.tsx_
      ```typescript
      export default async function HomePage({
         searchParams,
      }: {
         searchParams: { [key: string]: string | string[] | undefined; };
      }) {
         const { q } = searchParams;
         const query = Array.isArray(q) ? q[0] : q;
         const articles = await findNews(query);
         ...
      }
      ```
- State management
   - Initialize global state by reading from the local storage
      - _app/components/provider.tsx_
      ```typescript
      export default function BookmarkProvider({ children }: { children: ReactNode; }) {
         const [didMount, setDidMount] = useState(false);
         const [starred, setStarred] = useState<Set<Article>>(new Set());
         const [visited, setVisited] = useState<Set<string>>(new Set());

         useEffect(() => {
            setDidMount(true);
         }, []);

         useEffect(() => {
            if (didMount) {
               const starredStr = localStorage.getItem('starred');
               if (starredStr) {
                  const starredObjArr = JSON.parse(starredStr);
                  const starredSet = new Set([...starredObjArr]);
                  setStarred(starredSet);
               }

               const visitedStr = localStorage.getItem('visited');
               if (visitedStr) {
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
      ```
   - Rerender output after hydration to set articles' statuses
      - _app/components/card.tsx_
      ```typescript
      export default function Card({ article }: { article: Article; }) {
         const { starred, setStarred, visited, setVisited } = useBookmarkContext();
         const [isStarred, setIsStarred] = useState(false);
         const [isVisited, setIsVisited] = useState(false);

         useEffect(() => {
            setIsStarred(checkStarredStatus(article));
            setIsVisited(checkVisitedStatus(article));
         }, [starred, visited, article]);
         ...
      }
      ```
      > Note: configure _app/components/tile.tsx_ to check `visited` status after mounting

-  Styling and layout
   - Navigation
      - A global bar that holds key features of the app - home link, search bar and bookmark
   - Search
      - Display and search for content on the same page, with or without the search queries
      - Query data persists after page refreshing, and an empty query is treated as clearing the search
   - Gallery view
      - Responsive grid layout with a variety of column options depending on the width of the screen
      <details>
         <summary>Home page</summary>
         ![demo](/app/public/demo.png)
      </details>
   - Bookmark modal
      - A label that indicate bookmark counts with a hover effect to cue users for action
      - Display compact tiles for article information
      - Provide options to delete and clear all
      <details>
         <summary>Bookmark modal</summary>
         ![demo](/app/public/demo.png)
      </details> 
   - Card and tile views
      - Display article information, truncate tile or description as needed for format, and apply conditional styles when the image is not available
      - A star icon with solid and outline styles depicts an article's bookmark status and with a hover effect to call for action
      - A check mark on the card or tile indicates if an article has been read by detecting whether the user has clicked on it

- Performance
   - Overall good for desktop
      <details>
         <summary>Page speed</summary>
         ![speed](/app/public/speed.png)
      </details>
   - Opportunities
      - Size images properly with the `next/image` component
      - Improve color contrasts and semantics for accessibility 


- An extra step
   The idea to allow the application to store user interactions, such as bookmarked and read articles, in the browser’s memory using `localStorage`. This enables users to return to the app after closing it and still have access to their previous interactions, a nice-to-have feature for the user experience. This functionality could be achieved through the implementation of user account management as the app evolves.

   Here are snippets demonstrating the changes made with the implementation of this feature.

   <details>
      <summary>_app/components/card.tsx_ before</summary>

         ```typescript
         export default function Card({ article }: { article: Article; }) {
            const { starred, setStarred, visited, setVisited } = useBookmarkContext();

            function toggleStarred(article: Article) {
               starred.has(article) ? starred.delete(article) : starred.add(article);
               setStarred(new Set(starred));
            }

            function addToVisited(article: Article) {
               visited.add(article.url);
               setVisited(new Set(visited));
            }

            function isStarred(article: Article) {
               return starred.has(article);
            }

            function isVisited(article: Article) {
               return visited.has(article.url);
            }

            ...
         }
      ```
   </details>

   <details>
      <summary>_app/components/card.tsx_ after</summary>

      ```typescript
      export default function Card({ article }: { article: Article; }) {
         const { starred, setStarred, visited, setVisited } = useBookmarkContext();
         const [isStarred, setIsStarred] = useState(false);
         const [isVisited, setIsVisited] = useState(false);

         useEffect(() => {
            setIsStarred(checkStarredStatus(article));
            setIsVisited(checkVisitedStatus(article));
         }, [starred, visited, article]);

         function toggleStarred(article: Article) {
            if (isStarred) {
               starred.forEach(elem => {
                  if (JSON.stringify(elem) == JSON.stringify(article)) {
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
               if (JSON.stringify(elem) == JSON.stringify(article)) {
                  status = true;
               }
            })
            return status;
         }

         function checkVisitedStatus(article: Article) {
            return visited.has(article.url);
         }

         ...
      }
      ```
   </details>

   <details>
      <summary>_app/components/provider.tsx_ before</summary>

      ```typescript
      export default function BookmarkProvider({ children }: { children: ReactNode; }) {
         const [starred, setStarred] = useState<Set<Article>>(new Set());
         const [visited, setVisited] = useState<Set<string>>(new Set());

         return (
            <BookmarkContext.Provider value={{ starred, setStarred, visited, setVisited }} >
               {children}
            </BookmarkContext.Provider>
         );
      };

      ```
   </details>

   <details>
      <summary>_app/components/provider.tsx_ after</summary>

      ```typescript
      export default function BookmarkProvider({ children }: { children: ReactNode; }) {
         const [didMount, setDidMount] = useState(false);
         const [starred, setStarred] = useState<Set<Article>>(new Set());
         const [visited, setVisited] = useState<Set<string>>(new Set());

         useEffect(() => {
            setDidMount(true);
         }, []);

         useEffect(() => {
            if (didMount) {
               const starredStr = localStorage.getItem('starred');
               if (starredStr) {
                  const starredObjArr = JSON.parse(starredStr);
                  const starredSet = new Set([...starredObjArr]);
                  setStarred(starredSet);
               }

               const visitedStr = localStorage.getItem('visited');
               if (visitedStr) {
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
      ```
   </details>

## What's next
- Current plan
   - Implement a loading state to display while fetching data, ideally only for the affected segment of the page rather than the entire page
   - Display a placeholder component while reading data from local storage and before triggering a re-render
   - Introduce a reducer to work with context for more declarative state logic

- Additional features
   - Implement a category menu to allow users to browse collections of articles by topic
   - Add pagination or infinite scrolling to dynamically load more content as the user browses
   - Improve accessibility by adding ARIA roles and properties to page elements
   - Consider replacing the modal-based bookmark view with a sidebar
   - Consider a multi-column design, a list-detail layout to quickly browser through content






