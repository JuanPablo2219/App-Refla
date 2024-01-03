import { useFetch } from './useFetch';


function App() {

  const { data, loading, error, handleChangeRequest } = useFetch("http://jsonplaceholder.typicode.com/users")

  return (
    <div className="App">
      <h1>Fetching the dats Pro</h1>
      <button onClick={handleChangeRequest}>Cancel Request</button>
      <div className="Card">
        <ul>
          {error && <li>Error: {error}</li>}
          {loading && <li>loading....</li>}
          {data?.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default App
