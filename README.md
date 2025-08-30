# Rick and Morty Frontend

A React frontend application built with TypeScript, Vite, TailwindCSS, and Apollo Client that consumes the Rick and Morty GraphQL API to display character information in an interactive interface.

## Prerequisites

- Node.js v18 or higher
- npm or yarn package manager

## Installation and Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd rick-and-morty-frontend
```

2. Install dependencies:
```bash
npm install
```



## Running the Application

### Development Mode
```bash
npm run dev
```
Application runs on `http://localhost:5173`

## Features

- Character listing with search and filtering capabilities
- Character detail views with complete information
- Responsive design with TailwindCSS
- GraphQL integration with Apollo Client
- TypeScript for type safety
- Modern React with hooks and functional components
- React Router for navigation
- Lucide React icons

## GraphQL Queries Used

The frontend consumes the following GraphQL queries from the backend API:

### Get All Characters
```graphql
query GetCharacters($filters: CharacterFilters) {
  characters(filters: $filters) {
    id
    name
    status
    species
    gender
    origin {
      name
    }
    location {
      name
    }
    image
  }
}
```

### Get Single Character
```graphql
query GetCharacter($id: Int!) {
  character(id: $id) {
    id
    name
    status
    species
    type
    gender
    origin {
      name
      url
    }
    location {
      name
      url
    }
    image
    episode
    created
  }
}
```

### Get Character Count
```graphql
query GetCharacterCount($filters: CharacterFilters) {
  characterCount(filters: $filters)
}
```

## Technology Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **TailwindCSS** - Utility-first CSS framework
- **Apollo Client** - GraphQL client with caching
- **React Router DOM** - Client-side routing
- **Lucide React** - Icon library
- **ESLint** - Code linting