import Image from 'next/image'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <a className="flex items-center gap-2" href="/demo">
        <p className="w-full max-w-md mx-auto text-center py-3 rounded-lg text-white bg-gradient-to-br from-blue-700 to-blue-400 hover:from-blue-700 hover:to-blue-400 shadow-lg px-4">
          Get started with DEMO
        </p>
        </a>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://vasilkoff.com"
            target="_blank"
            rel="noopener noreferrer">
            Powered By Vasilkoff Team {' '}

          </a>
        </div>
      </div>

      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700/10 after:dark:from-sky-900 after:dark:via-[#0141ff]/40 before:lg:h-[360px]">
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src="/aichattool.svg"
          alt="AI Bridge Logo"
          width={180}
          height={37}
          priority
        />

      </div>

      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        <a
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >

          <h2 className={`mb-3 text-2xl font-semibold`}>
            AI Chat of Your Choice
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Select your preferred AI companion or bring your custom AI to life.
          </p>
        </a>

        <a
          
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Seamless Social Media Integration
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Connect effortlessly to various social media platforms like Facebook, Instagram, WhatsApp, or Telegram.
          </p>
        </a>

        <a
          href="#"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            AIBridge Connectivity
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Link your chosen AI seamlessly to your preferred chat application using AIBridge technology.
          </p>
        </a>

        <a
          href="#"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"  >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Time to Celebrate!
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            With the work done, it's a perfect moment to celebrate your accomplishments!
          </p>
        </a>
      </div>
    </main>
  )
}
