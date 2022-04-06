import gql from "graphql-tag";

const LABELS_QUERY = gql`
  query Labels {
    labels {
      id
      name
    }
  }
`;

export default LABELS_QUERY;
