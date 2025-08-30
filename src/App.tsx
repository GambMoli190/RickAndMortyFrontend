import { Routes, Route } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client/react';
import { client } from './core';
import { Layout } from './core';
import { FavoritesProvider } from './core/context/FavoritesContext';
import { SelectionProvider } from './core/context/SelectionContex';

export default function App() {
  return (
    <ApolloProvider client={client}>
      <FavoritesProvider>
        <SelectionProvider>
          <Routes>
            <Route path="/characters-general" element={<Layout />} />
            <Route path="/characters-detail/:id" element={<Layout />} />
          </Routes>
        </SelectionProvider>
      </FavoritesProvider>
    </ApolloProvider>
  );
}