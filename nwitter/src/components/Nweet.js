import { dbService, storageService } from "fbase";
import React, { useState } from "react";
import { deleteDoc, updateDoc, doc } from 'firebase/firestore';
import { deleteObject, ref } from "firebase/storage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const Nweet = ({ nweetObj, isOwner }) => {
    const [editing, setEditing] = useState(false); // 수정 모드인지 아닌지
    const [newNweet, setNewNweet] = useState(nweetObj.text); // input에 입력된 텍스트 업데이트
    const NweetTextRef = doc(dbService, `nweets/${nweetObj.id}`)
    const NweetImageRef = ref(storageService, nweetObj.attachmentUrl);
    const onDeleteClick = () => {
        const ok = window.confirm("Are you sure you want to delete this nweet?");
        console.log(ok)

        if(ok) {
            // delete nweet
            // dbService.doc(`nweets/${nweetObj.id}`).delete();
            deleteDoc(NweetTextRef);
            deleteObject(NweetImageRef);
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
        <div className="nweet">
            {
                editing ? (
                    <>
                         <form onSubmit={onSubmit} className="container nweetEdit">
                            <input onChange={onChange} type="text" placeholder="Edit your nweet" 
                                value={newNweet}  required autoFocus className="formInput"/>
                                <input type="submit" value="Update Nweet" className="formBtn" />
                        </form>
                        <span onClick={toggleEditing} className="formBtn cancelBtn">Cancel</span>
                    </>
                )
                :
                <>
                    <h4>{nweetObj.text}</h4>
                    {nweetObj.attachmentUrl && <img src={nweetObj.attachmentUrl} />}
                    {isOwner && 
                        <div className="nweet__actions">
                            <span onClick={onDeleteClick}>
                                <FontAwesomeIcon icon={faTrash} />
                            </span>
                        <span onClick={toggleEditing}>
                            <FontAwesomeIcon icon={faPencilAlt} />
                        </span>
                    </div>    
                    } 
                    {/* 내가 isOwner일 때만 이 버튼을 볼 수 있음. */}
                </>
            }
        </div>
    )
}

export default Nweet;