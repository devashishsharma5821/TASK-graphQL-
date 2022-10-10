import { useQuery, gql } from "@apollo/client";

const FETCH_REPOS = gql`
  query ($number_of_repos: Int!) {
    viewer {
      name
      repositories(last: $number_of_repos) {
        nodes {
          name
          forkCount
          stargazers {
            totalCount
          }
        }
      }
    }
  }
`;
function DisplayLocations() {
  const { loading, error, data } = useQuery(FETCH_REPOS, {
    variables: { number_of_repos: 3 },
  });
  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error :(</p>;

  return (
    <table>
      <thead>
            <tr>
              <th>S.No</th>
              <th>Name</th>
              <th>Stars</th>
              <th>Forks</th>
            </tr>
            </thead>
            <tbody>

      {data.viewer.repositories.nodes.map(
        ({ name, stargazers, forkCount }, index) => {
          return (
          <tr key={index}>
            <td>{index}</td>
            <td>{name}</td>
            <td>🌟{stargazers.totalCount}</td>
            <td>🍴{forkCount}</td>
          </tr>
          )
        }
      )}
            </tbody>
    </table>
  );
}

const App = () => {
  return (
    <div>
      <h2>My first Apollo app 🚀</h2>
      <DisplayLocations />
    </div>
  );
};

export default App;
