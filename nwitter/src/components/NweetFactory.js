import { dbService, storageService } from "fbase";
import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import React, { useState } from "react";
import { v4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

const NweetFactory = ({ userObj }) => {
    // Nweet 생성을 담당하는 컴포넌트!!!

    const [nweet, setNweet] = useState("");
    const [attachment, setAttachment] = useState("");

    const onSubmit = async (event) => {
        if (nweet === "") {
            return;
          }
        event.preventDefault();
        let attachmentUrl = "";
        if(attachment !== "") {
            const attachmentRef = ref(storageService, `${userObj.uid}/${v4()}`);
            const response = await uploadString(attachmentRef, attachment, "data_url");
            attachmentUrl = await getDownloadURL(response.ref);
        }
        // const fileRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
        // const response = await fileRef.putString(attachment, "data_url");

        const nweetObj = {
            text: nweet,
            createdAt: Date.now(),
            creatorId: userObj.uid,
            attachmentUrl
        };

        await addDoc(collection(dbService, "nweets"), (nweetObj));
        setNweet("");
        setAttachment("");
    };
    const onChange = (event) => {
        const {target: {value}} = event;
        // event 내부에 있는 target 안의 value를 달라고 요청
        setNweet(value);
    };
    const onFileChange = (event) => {
        const { 
            target: { files },
        } = event;
        const theFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
            const { currentTarget: {result} } = finishedEvent;
            setAttachment(result);
            // onloaded에 finishedEvent의 result를 setAttachment로 설정
        }
        reader.readAsDataURL(theFile);
        // 파일을 갖고 reader를 만든 다음 reasAsDataURL로 파일 읽음
    }
    const onClearAttachment = () => {
        setAttachment("");
    }

    return (
        <>
                <form onSubmit={onSubmit} className="factoryForm">
                <div className="factoryInput__container">
                    <input
                    className="factoryInput__input"
                    value={nweet}
                    onChange={onChange}
                    type="text"
                    placeholder="What's on your mind?"
                    maxLength={120}
                    />
                    <input type="submit" value="&rarr;" className="factoryInput__arrow" />
                </div>
                <label for="attach-file" className="factoryInput__label">
                <span>Add photos</span>
                    <FontAwesomeIcon icon={faPlus} />
                </label>
                <input id="attach-file"
                    type="file"
                    accept="image/*"
                    onChange={onFileChange}
                    style={{
                    opacity: 0,
                    }}/>
                {attachment && 
                    <div className="factoryForm__attachment">
                    <img
                    src={attachment}
                    style={{
                        backgroundImage: attachment,
                    }}
                    />
                    <div className="factoryForm__clear" onClick={onClearAttachment}>
                    <span>Remove</span>
                    <FontAwesomeIcon icon={faTimes} />
                    </div>
                    </div>}
            </form>        
        </>
    )
}

export default NweetFactory;