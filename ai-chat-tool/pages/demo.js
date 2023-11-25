// pages/demo.js
import { useEffect, useState } from 'react';
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

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
    <main
    className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}>
    <div> <h1>add animation</h1> </div>

     <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-2 lg:text-left">

        <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors lg:col-span-1">
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Live chat logs 
          </h2>
          <p className={`m-0 max-w-[200ch] text-sm opacity-50`}>
            Here you can see the live chat logs between AI and your clients
          </p>
        </div>

        <div className="lg:col-span-2 lg:flex-2/3 bg-gradient-to-b from-zinc-200 dark:from-zinc-800/30 border-b border-gray-300 dark:border-neutral-800">
          <div className="fixed left-0 top-0 w-full flex justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
            <h1>Project Logs</h1>
            <pre>{logs}</pre> 
          </div>
       </div>
    
     </div>
    </main>
  );
}
