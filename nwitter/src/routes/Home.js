import React from 'react';

const Home = () => {
    return (
        <div>
            <form>
                <input type="text" placeholder="What's on your mind?" maxLength={120}/>
                <input type="submit" value="Ntweet"/>
            </form>
        </div>
    );
};

export default Home;