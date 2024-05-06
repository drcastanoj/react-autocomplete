# TV Show Search App

This project is a TV Show Search application built using React, Vite, and TypeScript. It features an autocomplete search functionality that provides real-time suggestions as you type, making it easier to find your favorite TV shows quickly.

## Features

- Autocomplete Search: As you type in the search box, suggestions for TV show titles are displayed.
- Responsive Design: Works seamlessly across different devices and screen sizes.
- Fast Performance: Leveraged by Vite for an optimized and fast development experience.

## Technologies Used

- React: A JavaScript library for building user interfaces.
- Vite: A modern, fast build tool that significantly improves the development experience.
- TypeScript: A superset of JavaScript that adds types to the language, enhancing code quality and readability.

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

Ensure you have Node.js installed on your machine. This will include npm, which is necessary to install dependencies.

```
  node --version
  npm --version

```

#### Install yarn

```
  npm -g install yarn
```

#### Install dependencies

```
  yarn
```

#### Run project

```
  yarn dev
```

Navigate to `http://localhost:5173/` in your web browser to view the app.

## Backend Service

Api to show tv information

[TV Maze](https://www.tvmaze.com/api)

## Structure Project

```
root
│   README.md
│   package.json
│   package.json

│
└───src
│   │   App.tsx
│   │   main.tsx
│   │   index.css
│   │
│   └───components
│       │   atoms/
│       │   molecules/
│       │   organism/
│   └───hook
│       │   useHttp.ts
│       │   useShow.ts
│       │   ...
│   └───model
        │   model.ts

```

## Unit Test

This project uses Vitest for unit testing. To run the tests, use the following command:

```
  yarn test
```

Vitest is configured to work seamlessly with the existing Vite and TypeScript setup, providing a fast and efficient testing experience.

#### Run unit test with coverage

```
  yarn test:coverage
```

### Usage

Simply start typing the name of a TV show in the search box. The autocomplete feature will suggest TV show titles based on your input. Select a title from the suggestions to see more information about the TV show.
