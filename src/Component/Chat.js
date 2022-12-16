import { Avatar, IconButton } from '@material-ui/core'
import React, { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import MicIcon from '@mui/icons-material/Mic';
import "./CSS/Chat.css";
import { useParams } from 'react-router-dom';
import db from './firebase';
import firebase from "firebase/compat/app";
import 'firebase/compat/firestore';
import { useStateValue } from './StateProvider';

function Chat() {
    const params = useParams();
    const roomId = params.roomId;

    const [roomName, setRoomName] = useState("");

    const [message, setMessages] = useState([]);
    const [{user}, dispatch] = useStateValue();
    const [input, setInput] = useState("");
    useEffect(() => {
        if (roomId) {
            db.collection("rooms").doc(roomId).onSnapshot(snapshot => {
                setRoomName(snapshot.data().name);
            });
            db.collection("rooms").doc(roomId).collection("message").orderBy("timestamp", "asc").onSnapshot(snapshot => {
                setMessages(snapshot.docs.map(doc => doc.data()));
            })
        }
    }, [roomId])
    //   console.log(roomId);

    const sendMessage=(e)=>{
        e.preventDefault();
        if(input==="")
        {
            return alert("Please enter your message")
        }
        
        db.collection("rooms").doc(roomId).collection("message").add({
            name:user.displayName,
            message:input,
            timestamp:firebase.firestore.FieldValue.serverTimestamp()
        });
        setInput("");
     }
    return (
        <div className='chat'>
            <div className="chat__header">
                <Avatar />
                <div className="chat__headerInfo">
                    <h3>{roomName}</h3>
                    <p>
                        
                        {
                         new Date(message[message.length-1]?.timestamp?.seconds*1000).toLocaleTimeString()
                     }
                    
                    </p>
                </div>
                <div className="header__right">
                    <IconButton>
                        <SearchIcon />
                    </IconButton>
                    <IconButton>
                        <AttachFileIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>
            <div className="chat__body">
                {
                    message.map(message => (
                        <p className={`chat__message ${user.displayName==message.name && "chat__reciever"}`}>
                        <span className="chat__name">{message.name}</span>
                        {message.message}
                        <span className="chat__time">
                            {
                                new Date(message.timestamp?.seconds*1000).toLocaleTimeString()
                            }
                        </span>
                    </p>
                    ))
                }

            </div>
            <div className="chat__footer">
                <EmojiEmotionsIcon />
                <AttachFileIcon />
                <form onSubmit={sendMessage}>
                    <input type="text" value={input} placeholder='Type your message' onChange={e => {
                        setInput(e.target.value)
                    }} />
                    <input type="submit" />
                </form>
                <MicIcon />
            </div>
        </div>

    )
}
export default Chat
























// function Chat() {

// const {roomId} = useParams();
// const [roomName,setRoomName] =useState("");
// const [input,setInput] = useState("");
// const [messages,setMessages] = useState([]);
// useEffect(()=>{
// if(roomId){
//     db.collections("rooms").doc(roomId).onSnapshot(snapshot => {
//         setRoomName(snapshot.data().name);
//     });
//     db.collection("rooms").doc(roomId).collection("message").orderBy("timestamp","asc").onSnapshot(snapshot=>{
//          setMessages(snapshot.docs.map(doc => doc.data()))
//     })
// }
// },[roomId])
// const sendMassage=(e)=>{
//     e.preventDefault();
//     if(input === ""){
//         return alert("please enter your message")
//     }
//     db.collection("rooms").doc(roomId).collection("message").add({
//         name:"harsh Singh",
//         message:input,
//         timestamp:firebase.firestore.FieldValue.serverTimestamp()
//     });
//     setInput("");
// }
//     return (
//         <div className='chat'>
//             <div className="chat__header">
//                 <Avatar />
//                 <div className="chat__headerInfo">
//                     <h3>{roomName}</h3>
//                     <p>Last Seen...</p>
//                 </div>
//                 <div className="header__right">
//                     <IconButton>
//                         <SearchIcon />
//                     </IconButton>
//                     <IconButton>
//                         <AttachFileIcon />
//                     </IconButton>
//                     <IconButton>
//                         <MoreVertIcon />
//                     </IconButton>
//                 </div>
//             </div>
//             <div className="chat__body">

//                 {
//                   messages.map(message => (
//                     <p className='chat__message chat__reciever'>
//                     <span className="chat__name">{message.name}</span>
//                     {message.message}
//                     <span className="chat__time">
//                         {
//                             new Date(message.timestamp?.seconds*1000).toLocaleTimeString()
//                         }
//                     </span>
//                 </p>
//                   ))
//                 }
//             </div>


// <div className="chat__footer">
//     <EmojiEmotionsIcon/>
//     <AttachFileIcon/>
//     <form onSubmit={sendMassage}>
//         <input type="text" value={input} placeholder='Type your message' onChange={
//             e=>setInput(e.target.value)
//         }/>
//         <input type="submit" />
//     </form>
//     <MicIcon/>
// </div>
//         </div>
//     )
// }