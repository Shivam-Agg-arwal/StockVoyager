import fs from 'fs';
import util from 'util'
import process from 'process'; // Import the process module

import fetchCurrentPrice from "./../../../../pyserver/MakeRequest/getStockCurrentPrice.js"
import { symbolMapping } from "./../../../data/Symbol.js"


const responseFilePath = 'responseFile.txt';

async function fetchPricesForSymbols() {
  try {
    let responses = [];
    let promises = [];
    const num_request = 11
    console.time("Total time for 10 batches");

    // Register a handler for the SIGINT event
    process.on('SIGINT', async () => {
      console.log('\nSIGINT received. Saving responses to file...');
      await saveResponsesToFile(responses);
      process.exit(); // Exit the process after saving responses
    });

    // Loop through symbolMapping and create promises for each request
    for (let i = 0; i < symbolMapping.length; i++) {
      const symbol = symbolMapping[i].SYMBOL;
      const name = symbolMapping[i].COMPANY_NAME;
      
      // Log symbol, name, and number
      console.log(`Fetching data for stock ${i + 1}: Symbol: ${symbol}, Name: ${name}`);

      // Make API request for current price and push the promise to the array
      promises.push(fetchCurrentPrice(symbol));

      // If 10 promises have been created or it's the last iteration, await them
      if ((i + 1) % num_request === 0 || i === symbolMapping.length - 1) {
        // Execute promises in parallel
        const settledPromises = await Promise.allSettled(promises);

        // Add responses of fulfilled promises to the responses array
        settledPromises.forEach(promise => {
          if (promise.status === 'fulfilled') {
            responses.push(promise.value);
          }
        });

        // Clear the promises array for the next batch
        promises = [];

        // If 10 batches have been processed, end the timer
        if (Math.ceil((i + 1) / num_request) === 10) {
          console.timeEnd("Total time for 10 batches");

          // Save responses to file
          await saveResponsesToFile(responses);
          break; // Exit the loop after saving responses
        }
      }
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

// Function to save responses to file
async function saveResponsesToFile(responses) {
  try {
    fs.writeFileSync(responseFilePath, JSON.stringify(responses, null, 2));
    console.log('Responses stored in responseFile.txt');
  } catch (error) {
    console.error('Error writing responses to file:', error);
  }
}

// Call the main function
fetchPricesForSymbols();
