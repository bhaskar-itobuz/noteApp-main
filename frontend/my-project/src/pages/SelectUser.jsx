import React, { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

function FindUsertoChat() {
    let [user, setUser] = useState("")

    useEffect(() => {
        const getallUser = async()=>{
            try{
                const res = await axios.get("http://localhost:3000/user/alluser");
                console.log(res);
                setUser("");
            }catch(e){
                console.log(e);
            }
        }
        getallUser();
    }, [user]);

    let handleFruitChange = (e) => {
        setFruit(e.target.value)
    }

    return (
        <div className="App">
            {user}
            <br />
            <select onChange={handleFruitChange}>
                <option value="Select a fruit "> -- Select a user -- </option>
                {getallUser.map((user) => <option value={user.value}>{user.label}</option>)}
            </select>
        </div>
    );
}

export default FindUsertoChat;