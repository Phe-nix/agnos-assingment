## Getting Started
Welcome to the Agnos Assignment project! This repository contains a web application built with Next.js and a websocket server for real-time features. The project demonstrates modern web development practices, including client-server communication, live updates, and easy deployment options. Follow the instructions below to set up and run the application locally or deploy it online.
## Instructions

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/agnos-assingment.git
    cd agnos-assingment
    ```

2. Install dependencies and start the main web application:
    ```bash
    npm install
    npm run dev
    ```

3. In a separate terminal, start the websocket server:
    ```bash
    cd server
    npm install
    node index.js
    ```

4. Access the application at [http://localhost:3000](http://localhost:3000) or use the deployed link provided above.

5. Make sure the websocket server is running before using features that require real-time communication.
## Project Structure

```
agnos-assingment/
├── README.md
├── package.json
├── next.config.js
├── src/
│   └── ... (Next.js application pages)
├── public/
│   └── ... (Static assets)
├── server/
│   ├── index.js   # WebSocket server entry point
│   └── package.json
└── ... (other configuration and source files)
```

- The `src/` directory contains the main web application built with Next.js.
- The `server/` directory contains the websocket server for real-time features.
- Configuration files and dependencies are managed at the root and within the `server/` directory.


