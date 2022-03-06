import { dbService, storageService } from 'fbase';
import React, { useState, useEffect }  from 'react';
import { addDoc, getDocs, collection, onSnapshot } from 'firebase/firestore';
import { ref, uploadString, getDownloadURL } from "@firebase/storage";
import Nweet from 'components/Nweet';
import { v4 as uuidv4 } from 'uuid';
import { v4 } from 'uuid';

const Home = ({ userObj }) => {
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);
    const [attachment, setAttachment] = useState("");

    // const getNweets = async () => {
    //     const dbNweets = await getDocs(collection(dbService, "nweets"));
    //     // dbNweets.forEach(document => console.log(document.data()));
    //     dbNweets.forEach((document) => {
    //         const nweetObject ={
    //             ...document.data(),
    //             id: document.id,
    //         }
    //         setNweets(prev => [nweetObject, ...prev]);
    //         // 모든 이전 nweets에 대한 배열을 리턴 (새로 작성한 트윗과 그 이전의 것)
    //     });
    // };
    useEffect(() => {
        // getNweets();
            onSnapshot(collection(dbService, "nweets"), (snapshot => {
            const nweetArray = snapshot.docs.map(doc => ({
                id: doc.id, 
                ...doc.data(),
            }));
            setNweets(nweetArray);
        }))
    }, [])

    const onSubmit = async (event) => {
        event.preventDefault();
        let attachmentUrl = "";
        if(attachment != "") {
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
        <div>
            <form onSubmit={onSubmit}>
                <input type="text" value={nweet} onChange={onChange} placeholder="What's on your mind?" maxLength={120}/>
                <input type="file" accept="image/*" onChange={onFileChange}/>
                <input type="submit" value="Nweet"/>
                {attachment && 
                    <div>
                        <img src={attachment} width="50px" height="50px" />
                        <button onClick={onClearAttachment}>Clear</button>
                    </div>}
            </form>
            <div>
                {nweets.map((nweet) => 
                (
                    <Nweet key={nweet.id} nweetObj={nweet} 
                        isOwner={nweet.creatorId === userObj.uid} />
                ))}
            </div>
        </div>
    )
};

export default Home;