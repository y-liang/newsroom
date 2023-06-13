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
   - Cache data fetched from News API (static data fetching) in development  
   - Switch to dynamic data fetching and opt out of caching behavior in production

- Component rendering
   - Render the whole route at request time based on search params
   - Apply predefined classes from Tailwind for styling

- State management
   - Initialize global state by reading from the local storage
   - Rerender output after hydration to set articles' statuses

## Future improvements
- Current plan
   - Implement a loading state to display while fetching data, ideally only for the affected segment of the page rather than the entire page
   - Display a placeholder component while reading data from local storage and before triggering a re-render
   - Introduce a reducer to work with context for more declarative state logic

- Additional features
   - Implement a category menu to allow users to browse collections of articles by topic, such as business, sciences, technology, and more
   - Add pagination or infinite scrolling to dynamically load more content as the user browses
   - Improve accessibility by adding ARIA roles and properties to page elements
   - Consider replacing the modal-based bookmark view with a sidebar

## Demo
- https://newsroom.dev.yliang.net

![demo](/app/public/demo.png)


## Running Locally
The application will be running on [localhost:4200](http://localhost:4200/). The port can be specified by modifying the `"dev": "next dev -p 4200"` in the _package.json_ file.

* Clone the repository: `git clone https://github.com/y-liang/newsroom.git`
* Install dependencies: `npm install`
* Set environment variables defined in _.env.local.example_ in a _.env.local_ file
* Start the development server: `npm run dev`
