// pages/demo.js
import { useEffect, useState } from 'react';

export default function Demo() {
  const [logs, setLogs] = useState('');

  useEffect(() => {
    async function fetchLogs() {
      const response = await fetch('/api/logs');
      const data = await response.json();
      setLogs(data.logs);
    }

    fetchLogs();
  }, []);

  return (
    <div>
      <h1>Project Logs</h1>
      <pre>{logs}</pre>
    </div>
  );
}
