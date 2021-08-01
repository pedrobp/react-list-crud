import { gql } from 'apollo-boost';

export const DELETE_USERS = gql`
  mutation deleteUsers($emails: [ID!]!) {
    deleteUsers(emails: $emails)
  }
`;

export const RESET_USERS = gql`
  mutation resetUsers {
    resetUsers
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser($email: ID!, $newAttributes: UserAttributesInput!) {
    updateUser(email: $email, newAttributes: $newAttributes) {
      email
      name
      role
    }
  }
`;
