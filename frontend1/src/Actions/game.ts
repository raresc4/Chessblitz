import * as signalR from "@microsoft/signalr";

export const sendMessage = async (username : string, message : string) : Promise<boolean> => {
    try {
        const connection = new signalR.HubConnectionBuilder()
            .withUrl("http://localhost:5276/chesshub")
            .configureLogging(signalR.LogLevel.Information)
            .build();
        connection.start().then(() => {
            connection.invoke("SendMessage", username, JSON.stringify({ message: message })).then(() => {
                console.log("Message sent");
            }).catch((err) => {
                console.log(err);
            });

            connection.on("ReceiveMessage", (user, message) => {
                console.log(user + " : " + message);
            });
        }).catch((err) => {
            console.log(err);
        });
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
};