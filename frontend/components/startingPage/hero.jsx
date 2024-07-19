import React from 'react'

const HeroStartingPage = () => {
  return (
    <div className="mt-10">
      <div className="relative mx-auto flex max-w-2xl flex-col items-center">
        <div className="mb-8 flex">
          <a href="/about" className="inline-flex">
            <span className="relative inline-block overflow-hidden rounded-full p-[1px]">
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#a9a9a9_0%,#0c0c0c_50%,#a9a9a9_100%)] dark:bg-[conic-gradient(from_90deg_at_50%_50%,#171717_0%,#737373_50%,#171717_100%)]"></span>
              <div className="inline-flex h-full w-full cursor-pointer justify-center rounded-full bg-black px-3 py-1 text-xs font-medium leading-5 text-white backdrop-blur-xl dark:bg-black dark:text-slate-200">
                New features ⚡️
                <span className="inline-flex items-center pl-2 text-white dark:text-white">
                  Read more
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="pl-0.5 text-white ml-1"
                  >
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                </span>
              </div>
            </span>
          </a>
        </div>
        <h2 className="text-center text-3xl font-medium text-gray-500 sm:text-6xl">
          Best voting platform,{" "}
          <span
            className="animate-text-gradient inline-flex bg-gradient-to-r from-neutral-900 via-slate-500 to-neutral-500 bg-clip-text text-transparent leading-tight mt-6"
            style={{ fontSize: "3.1rem" }}
          >
            for Feedback & Engagement
          </span>
        </h2>
        <p className="mt-6 text-center text-lg leading-6 text-gray-600 dark:text-gray-200">
          Share your photos or videos, get instant feedback from friends, and
          engage in dynamic discussions with ease.{" "}
          <span className="cursor-wait opacity-70">Perfect </span>for personal
          reviews and team insights.
        </p>
        <div className="mt-10 flex gap-4">
          <a href="/about" className="inline-flex items-center">
            <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
              Get More Info
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="pl-0.5"
              >
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </button>
          </a>
          <a
            href="/dashboard"
            className="cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground hover:bg-secondary/80 h-10 px-4 py-2"
          >
            Get Started
          </a>
        </div>
      </div>
    </div>
  );
}

export default HeroStartingPage;
