import React, {useEffect, useState} from 'react';
import {useMutation, useQuery} from "@apollo/client";
import {GET_ALL_USERS, GET_ONE_USER} from "./query/user";
import {CREATE_USER} from "./mutations/user";

interface IUser {
    id: string;
    username: string;
    age: number;
}
function App() {
    const [users, setUsers] = useState<IUser[]>([]);
    const [username, setUsername] = useState('');
    const [age, setAge] = useState(0);

    // const {data, loading, error, refetch} = useQuery(GET_ALL_USERS, {pollInterval: 500});
    const {data, loading, error, refetch} = useQuery(GET_ALL_USERS);
    const {data: oneUser, loading: oneUserLoading} = useQuery(GET_ONE_USER, {
        variables: {
            id: 1
        }
    });
    const [newUser] = useMutation(CREATE_USER);

    useEffect(() => {
        if (!loading) {
            setUsers(data.getAllUsers)
        }
    }, [data])

    const addUser = (e: any) => {
        e.preventDefault()
        newUser({
            variables: {
                input: {
                    username, age
                }
            }
        }).then(({data}) => {
            console.log(data);
            setUsername('');
            setAge(0);
        })
    }

    const getAllUsers = (e: any) => {
        e.preventDefault();
        refetch()
    }

  return (
    <>
        {oneUser && <p>User info: {oneUser.getUser.id}.{oneUser.getUser.username}</p>}
        <form>
            <input value={username} onChange={e => setUsername(e.currentTarget.value)} type="text"/>
            <input value={age} onChange={e => setAge(+e.currentTarget.value)} type="number"/>
            <div className="btns">
                <button onClick={(e) => addUser(e)}>Создать</button>
                <button onClick={(e) => getAllUsers(e)}>Получить</button>
            </div>
        </form>
        <div>
            {loading && <h2>Loading...</h2>}
            {users.map((user) => <p key={user.id}>{user.id}. {user.username} {user.age}</p>)}
        </div>
    </>
  );
}

export default App;
