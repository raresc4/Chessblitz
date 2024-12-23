import React from "react";
import { getLoggedUsername } from "../Actions/user.ts";


export default function ProfilePage() {

    const [username, setUsername] = React.useState<string | null>("");

    React.useEffect(() => {
        getLoggedUsername().then((data) => {
            if (typeof data === "string") {
                setUsername(data);
            } else {
                setUsername(null);
            }
        });
    }, []);

    return username ? (
        <>
            <h1>{username}</h1>
        </>
    ) : (
      <>
        <h1 className="text-4xl font-bold text-center text-black">Loading . . .</h1>
      </>  
    );
}