export default async function fetchIndices() {
    try {
        const response = await fetch('http://127.0.0.1:3000/get_indices', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({})
        });

        if (!response.ok) {
            throw new Error('Network response was not ok.'); 
        }

        const data = await response.json();
        return data; // Return the fetched data
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        throw error; // Re-throw the error to handle it in the calling component
    }
}
