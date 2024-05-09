import React, { useState } from 'react';
import jsonData from './../../../data/example-news.json';
import { IoClose } from "react-icons/io5";

function NewsBar() {
    const [isVisible, setIsVisible] = useState(false);

    const extractedData = jsonData.data.map(item => ({
        uuid: item.uuid,
        title: item.title,
        image_url: item.image_url,
        url: item.url
    }));

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    const closeNewsBar = () => {
        setIsVisible(false);
    };

    const allNews = extractedData.map((news, index) => (
        <div key={index} className="mb-8 lg:flex lg:items-center lg:mb-6">
          <img
            src={news.image_url}
            alt={news.title}
            className="w-full lg:w-48 rounded-lg mb-4 lg:mb-0 lg:mr-4 lg:flex-shrink-0"
          />
          <div className="flex-grow">
            <h3 className="text-lg font-semibold mb-2">{news.title}</h3>
            {/* Add additional information if available, e.g., news description */}
            {/* <p className="text-sm text-gray-600">{news.description}</p> */}
          </div>
        </div>
      ));

    return (
        <div>
            {/* Button for toggling visibility, shown only on larger screens */}
            <button onClick={toggleVisibility} className={` fixed right-4 bottom-4 bg-theme text-white px-4 py-2 rounded-md ${isVisible ? 'hidden' : 'block'}`}>
                {isVisible ? 'Hide News' : 'Show News'}
            </button>
            <div className={`z-20 border md:w-1/3 lg:w-1/4 mt-10 p-5 rounded-lg fixed right-0 top-0 bottom-0 bg-white overflow-y-auto transition-transform duration-500 transform ${isVisible ? 'translate-x-0' : 'translate-x-full'} `}>
                <button onClick={closeNewsBar} className="absolute top-2 right-2 bg-red text-white px-2 py-1 rounded-md">
                    <IoClose />
                </button>
                <h1 className="text-2xl underline text-center mb-6">Daily Stock News</h1>
                <div className="mt-4">{allNews}</div>
            </div>
        </div>
    );
}

export default NewsBar;
