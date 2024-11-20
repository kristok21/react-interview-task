# JobSite Manager

## How to Run the App
Follow the steps below to run the app and set up the backend:

- Clone this repository to your local machine:
- git clone https://github.com/kristok25/react-interview-task.git
- cd react-interview-task
- cd jobsite-manager

Install the necessary dependencies for the project:
- npm install

This application uses db.json as a backend database powered by JSON Server.

Install JSON Server globally if you haven't already:
- npm install -g json-server

Start the JSON Server on port 5000:
- json-server --watch db.json --port 5000

Run the React application with the following command:
- npm start

The app will open in your default browser at http://localhost:3000.

## How to Make the App More Secure
- Use Secure Authentication: Implement multi-factor authentication (MFA).
- Token-Based Authentication: Use JSON Web Tokens (JWT) with short expiration times for session management.
- Role-Based Access Control (RBAC): Assign roles to users and restrict access to routes or resources based on their role.
- CORS Policies: Restrict which origins can access your API.
- Protect Local Storage: Avoid storing sensitive data like JWT tokens in localStorage; prefer HttpOnly cookies instead.

## How to Scale the App for Millions of Records
- WebSocket Streaming: For real-time data updates, use WebSockets or server-sent events to push only updated records to the client.
- Lazy Load Components: Split large components into smaller chunks and load them only when needed using React.lazy and Suspense.
- Tree Shaking: Use tools like Webpack or Rollup to remove unused code and reduce bundle size.
- Infinite Scrolling: Implement infinite scrolling to load records dynamically as the user scrolls instead of loading them all at once.
- Debounced Search: Implement debounced input for search functionality to minimize API requests while typing.
- Optimized Tables: Use libraries like AG Grid or TanStack Table (React Table) for handling large datasets efficiently with features like lazy loading and column virtualization.
