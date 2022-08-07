import React, { useEffect, useState } from "react";
import {useQuery, useMutation} from '@apollo/client';
import { getAllUsers, getUser } from "./query/user";
import { createUser } from "./mutation/user";

function App() {
  const [users, setUsers] = useState([]);

  const [username, setUsername] = useState('');
  const [age, setAge] = useState(0);

  const {data, loading, error, refetch} = useQuery(getAllUsers);
  const {data:userData, loading:userLoad} = useQuery(getUser, {
    variables: {
      id: 1
    }
  });
  console.log(userData)

  const [newUser] = useMutation(createUser);

  useEffect(() => {
    if(!loading){
      setUsers(data.getAllUsers)
    }
  }, [data])

  if(loading){
    return <h1>Loading...</h1>
  }

  const addUser = (e) => {
    e.preventDefault();

    newUser({
      variables:{
        input:{
          username, age
        }
      }
    }).then(({data}) => {
      console.log(data)
      setUsername('')
      setAge(0)
    })
  }

  const getAll = e => {
    e.preventDefault();
    refetch()
  }

  return (
    <div>
      <form>
        <label>Username:</label>
        <input type="text" value={username} onChange={e => setUsername(e.target.value)}/>
        <label>Age:</label>
        <input type="number" value={age} onChange={e => setAge(e.target.value)}/>
        <div>
          <button onClick={(e) => addUser(e)}>Create user</button>
          <button onClick={e => getAll(e)}>Fetch users</button>
        </div>
      </form>
      <ul>
        {users.map(user => 
          <li key={user.id}>{user.username}. {user.age} y. o.</li>
        )}
      </ul>
    </div>
  );
}

export default App;
