import https from 'https';
import fetch from 'node-fetch';
import { TwitterApi } from 'twitter-api-v2';
import dotenv from 'dotenv';

dotenv.config();

const fetchQuote = async () => {
    const agent = new https.Agent({ rejectUnauthorized: false });
    const response = await fetch('https://api.quotable.io/random', { agent });
    const data = await response.json();
    return data.content;
};

const handleTweet = async () => {
    try {
        const quote = await fetchQuote();
        console.log('Fetched quote:', quote);

        const twitterClient = new TwitterApi({
            appKey: process.env.CONSUMER_KEY ?? '',
            appSecret: process.env.CONSUMER_SECRET ?? '',
            accessToken: process.env.ACCESS_TOKEN ?? '',
            accessSecret: process.env.ACCESS_TOKEN_SECRET ?? '',
        });

        const tweetClient = twitterClient.readWrite;
        await tweetClient.v2.tweet(quote);
        console.log('Tweet posted!');
    } catch (error) {
        console.error('Error posting tweet:', error);
    }
};

handleTweet();
