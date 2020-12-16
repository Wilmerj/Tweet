import React, { useState, useRef, useCallback, useEffect } from 'react';

import { ServiceFactory } from "../../controllers/ServiceFactory";
import { getRequest, postRequest } from "../../controllers/ServiceInteractor";

import View from "./view";

export default function Index() {
    const [query, setQuery] = useState('');
    const [listTweets, setListTweets] = useState([]);
    const [listTweetsTemp, setListTweetsTemp] = useState([]);
    const [loading, setLoading] = useState(false);
    const [count, setCount] = useState(15);
    const { serverUrl, vAPi, routes } = ServiceFactory;

    const observer = useRef();
    const lastTweetRef = useCallback(node => {
        if(loading) return;
        if(observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if(entries[0].isIntersecting) {
                handleRenderTweets();
            }
        })
        if(node) observer.current.observe(node)
    }, [loading])
    

    function handleRenderTweets () {
        setCount(count + 15);
    }

    useEffect(() => {
        setListTweetsTemp(listTweets.slice(0, count));
    }, [count])
    

    function handleGetTweets() {
        setLoading(true);
        const url = `${serverUrl}${vAPi}${routes.search}/${query}/${150}`;

        getRequest(url)
        .then((data) => {
            data.statuses.forEach((tweet) => {
                return tweet.isOpen = false;
            })
            setListTweets(data.statuses);
            handleRenderTweets();
            setLoading(false);
        })
        .catch((err) => {
            setLoading(false);
            console.info(err);
        })
    }

    function handleToggleCollapse(index) {
        const list = [...listTweets];
        list[index].isOpen = !list[index].isOpen;
        setListTweets(list);
    }

    function handleReTweet(status) {
        const url = `${serverUrl}${vAPi}${routes.retweet}/${status}`;
        postRequest(url, {})
        .then(data => {
            alert('retweeteado');
        })
        .catch((err) => {
            alert('Error al retweetear');
        })
    }
 
    return (
        <View
            setQuery={setQuery}
            handleGetTweets={handleGetTweets}
            listTweets={listTweetsTemp}
            handleToggleCollapse={handleToggleCollapse}
            lastTweetRef={lastTweetRef}
            loading={loading}
            query={query}
            handleReTweet={handleReTweet}
        />
    )
}
