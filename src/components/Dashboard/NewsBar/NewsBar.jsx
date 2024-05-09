import React from 'react';
import jsonData from './../../../data/example-news.json';

function NewsBar() {
    const extractedData = jsonData.data.map(item => {
        return {
            uuid: item.uuid,
            title: item.title,
            image_url: item.image_url,
            url: item.url
        };
    });

    // Render the first news item with a highlighted image
    const firstNews = extractedData[0];
    const highlightedNews = (
        <div className="relative hidden lg:block">
            <img src={firstNews.image_url} alt={firstNews.title} className="w-full h-auto rounded-lg" />
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black opacity-75 text-white p-2 px-3 rounded-lg">
                <h3 className="text-md font-semibold">{firstNews.title}</h3>
            </div>
        </div>
    );

    // Render the rest of the news items in a list format
    const restNews = extractedData.slice(1).map(news => (
        <div key={news.uuid} className="flex items-center my-2 rounded-md">
            <img src={news.image_url} alt={news.title} className=" border-4 w-12 h-12 rounded-full mr-2" />
            <a href={news.url} className="text-blue-500 hover:underline">
                <h3 className="text-base font-medium">{news.title}</h3>
            </a>
        </div>
    ));

    return (
        <div className="border w-full md:w-1/4 lg:w-1/5 mt-10 h-full p-5 rounded-lg hidden md:block">
            <h1 className='text-2xl underline text-center mb-5'>Daily Stock News</h1>
            {highlightedNews}
            <div className="mt-4">
                {restNews}
            </div>
        </div>
    );
}

export default NewsBar;
