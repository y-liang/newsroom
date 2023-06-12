# News Browser
A web application that leverages the [News API](https://newsapi.org/) to provide users with the latest news articles, built with Next.js and styled with Tailwind.

## Patterns
A hybrid approach that utilizes both the server and the client sides to render components.

- On the server:
   - Fetch data
   - Access sensitive API key information

- On the client: 
   - Handle interactivity and event listeners
   - Use context, state, and custom hooks for state management

## Features
- Data fetching and caching
   - Cache data fetched from News API in development  
   - Switch to dynamic data fetch and opt out of caching behavior in production
- Component rendering
   - Dynamically render the whole route at request time based on search params
   - Apply predefined classes from Tailwind for styling
- State management
   - Initialize global state by reading from the local storage
   - Rerender output after hydration to set articles' statuses

## Future improvements
- Current plan
   - Show a loading state while streaming in the fetched data on the page, ideally for only the segment of the page, not the entire page
   - Display a fallback component before reading local storage data and triggering a re-render
   - Introduce a reducer to combine with context for a more declarative state logic

- Additional features
   - Add a category menu for collections of articles, such as business, sciences, technology, and etc
   - Add pagination or bottomless scrolling for more content
   - It doesn't appear that NewsAPI supports webhooks. It would be a nice-to-have feature to listen for events (such as when articles are added) and inform the user via a toast notification

## Demo
- https://newsroom.dev.yliang.net
![demo](/public/demo.png)


## Running Locally
The application will be running on [localhost:4200](http://localhost:4200/)
* Clone the repository: `git clone https://github.com/y-liang/starter-app-nextjs-contentful.git`
* Install dependencies: `npm install`
* Set environment variables [defined in `.env.local.example`](.env.local.example) in a _.env.local_ file
* Start the development server: `npm run dev`