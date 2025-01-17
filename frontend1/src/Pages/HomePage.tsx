import React from "react";
import { useNavigate } from "react-router-dom";
import { getLoggedUsername } from "../Actions/user.ts";
import Header from "../Components/Header.tsx";
import { sendMessage } from "../Actions/game.ts";

export default function ProfilePage() {

    const [username, setUsername] = React.useState<string | null>("");

    const navigate = useNavigate();

    React.useEffect(() => {
        getLoggedUsername().then((data) => {
            if(data !== false) {
                setUsername(data['res']);
            } else {
                setUsername(null);
                navigate('/login');
            }
        });

     
    }, []);

    return username ? (
        <div>
            <Header username={username} />
            <div className="flex h-screen items-center justify-center" style={{ backgroundColor: "#50C878" }}>
            <button onClick={() => {
              sendMessage(username, "Test");               
            }}>Test 1</button>
            </div>
        </div>
    ) : (
      <>
        <h1 className="text-4xl font-bold text-center text-black">Loading . . .</h1>
      </>  
    );
}