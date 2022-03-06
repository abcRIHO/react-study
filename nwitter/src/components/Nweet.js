import { dbService } from "fbase";
import React, { useState } from "react";
import { deleteDoc, updateDoc, doc } from 'firebase/firestore';

const Nweet = ({ nweetObj, isOwner }) => {
    const [editing, setEditing] = useState(false); // 수정 모드인지 아닌지
    const [newNweet, setNewNweet] = useState(nweetObj.text); // input에 입력된 텍스트 업데이트
    const NweetTextRef = doc(dbService, `nweets/${nweetObj.id}`)
    const onDeleteClick = () => {
        const ok = window.confirm("Are you sure you want to delete this nweet?");
        console.log(ok)

        if(ok) {
            // delete nweet
            // dbService.doc(`nweets/${nweetObj.id}`).delete();
            deleteDoc(NweetTextRef);
        }
    };

    const toggleEditing = () => setEditing(prev => !prev);
    const onSubmit = async (event) => {
        event.preventDefault();
        await updateDoc(doc(dbService, "nweets", nweetObj.id), {
            text: newNweet
        })
        setEditing(false);
    }
    const onChange = (event) => {
        const {
            target: { value },
        } = event;
        setNewNweet(value);
    }

    return (
        <div>
            {
                editing ? (
                    <>
                        <form onSubmit={onSubmit}>
                            <input onChange={onChange} type="text" placeholder="Edit your nweet" 
                                value={newNweet}  required />
                                <input type="submit" value="Update Nweet"></input>
                        </form>
                        <button onClick={toggleEditing}>Cancel</button>
                    </>
                )
                :
                <>
                    <h4>{nweetObj.text}</h4>
                    {nweetObj.attachmentUrl && <img src={nweetObj.attachmentUrl} width="50px" height="50px" />}
                    {isOwner && 
                    <>
                        <button onClick={onDeleteClick}>Delete Nweet</button>
                        <button onClick={toggleEditing}>Edit Nweet</button>
                    </> } 
                    {/* 내가 isOwner일 때만 이 버튼을 볼 수 있음. */}
                </>
            }
        </div>
    )
}

export default Nweet;