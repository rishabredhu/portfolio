// File: src/components/ServerData.tsx

import React, { useState, useEffect } from 'react';

interface ServerData {
  message: string;
  timestamp: string;
}

const ServerData: React.FC = () => {
  const [data, setData] = useState<ServerData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/data');
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <h1>Welcome to Your App</h1>
      <p>{data.message}</p>
      <p>This data was fetched at: {data.timestamp}</p>
    </div>
  );
};

export default ServerData;