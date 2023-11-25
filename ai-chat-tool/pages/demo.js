import { useEffect, useState } from 'react';

export default function Demo() {
    const [logs, setLogs] = useState('');

    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const response = await fetch('/api/logs');
                const data = await response.json();
                setLogs(data.logs);
            } catch (error) {
                console.error('Error fetching logs:', error);
            }
        };

        // Fetch logs immediately on component mount
        fetchLogs();

        // Set up an interval to fetch logs every 500 milliseconds (0.5 seconds)
        const intervalId = setInterval(fetchLogs, 500);

        // Clean up the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, []);


    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-2 lg:text-left">
                <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors lg:col-span-1">
                    <h2 className="mb-3 text-2xl font-semibold">
                        Live Chat Logs
                    </h2>
                    <p className="m-0 max-w-[250ch] text-sm opacity-50">
                        Here you can see the live chat logs between AI and your clients.
                    </p>
                </div>

                <div className="lg:col-span-2 lg:flex lg:justify-center">
                    <div className="w-full h-[350px] overflow-auto bg-gradient-to-b from-zinc-200 dark:from-zinc-800/30 border-b border-gray-300 dark:border-neutral-800">
                        <div className="h-[350px] flex flex-col items-start w-full border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
                            <h1>Project Logs</h1>
                            <pre>{logs}</pre>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
