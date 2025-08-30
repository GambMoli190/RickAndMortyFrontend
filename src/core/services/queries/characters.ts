import { gql } from "@apollo/client";

export const GET_CHARACTER_BY_ID = gql`
  query GetCharacterById($id: ID!) {
    character(id: $id) {
      id
      name
      status
      species
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
    }
  }
`;

export const GET_CHARACTERS_WITH_FILTERS = gql`
  query GetCharactersWithFilters($filters: CharacterFilters) {
    characters(filters: $filters) {
      id
      name
      status
      species
      gender
      image
    }
  }
`;

export const GET_FIRST_15_CHARACTERS = gql`
  query GetFirst15Characters {
    first15Characters {
      id
      name
      image
      status
      species
      gender
      origin {
        name
        url
      }
      location {
        name
        url
      }
    }
  }
`;
