import { TwitterApi } from 'twitter-api-v2';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

const handleTweet = async () => {
    try {
        const response = await fetch('https://api.quotable.io/random');  // Change the API endpoint
        const data = await response.json();
        const quote = data.content;

        console.log('Fetched quote:', quote);  // Log the fetched quote

        const twitterClient = new TwitterApi({
            appKey: process.env.CONSUMER_KEY ?? '',
            appSecret: process.env.CONSUMER_SECRET ?? '',
            accessToken: process.env.ACCESS_TOKEN ?? '',
            accessSecret: process.env.ACCESS_TOKEN_SECRET ?? '',
        });

        const tweetClient = twitterClient.readWrite;
        const tweetResponse = await tweetClient.v2.tweet(quote);
        console.log('Tweet response:', tweetResponse);  // Log the response from Twitter API
    } catch (error) {
        console.error('Error posting tweet:', error);  // Log any errors during the process
    }
};

handleTweet();
