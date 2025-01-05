## 46.Sending request to the server
In react we can send request to the server using fetch api.

Example:
```jsx
import React, { useState } from 'react';
const App = () => {
    const [data, setData] = useState([]);
    const fetchData = async () => {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = await response.json();
    setData(data);
    }
    return (
        <div>
            <button onClick={fetchData}>Fetch Data</button>
            <ul>
                {data.map((item) => (
                    <li key={item.id}>{item.title}</li>
                ))}
            </ul>
        </div>
    )
}
```