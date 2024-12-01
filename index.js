import { TwitterApi } from 'twitter-api-v2';
import dotenv from 'dotenv';
import fetch from 'node-fetch';
dotenv.config();

const handleTweet = async () => {
    try {
        const response = await fetch('https://api.quotable.io/quotes/random');
        if (!response.ok) {
            throw new Error(`Failed to fetch quote: ${response.statusText}`);
        }
        const [quoteData] = await response.json(); // The API returns an array with a single quote
        const tweetContent = `${quoteData.content} —${quoteData.author}`;

        const twitterClient = new TwitterApi({
            appKey: process.env.CONSUMER_KEY ?? '',
            appSecret: process.env.CONSUMER_SECRET ?? '',
            accessToken: process.env.ACCESS_TOKEN ?? '',
            accessSecret: process.env.ACCESS_TOKEN_SECRET ?? '',
        });

        const tweetClient = twitterClient.readWrite;
        await tweetClient.v2.tweet(tweetContent);
        console.log('Tweet posted successfully:', tweetContent);
    } catch (error) {
        console.error('Error posting tweet:', error);
    }
};

handleTweet();
