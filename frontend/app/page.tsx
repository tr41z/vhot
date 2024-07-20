import MobileSidebar from '@/components/navbar/sidebar';
import React from 'react'

const LandingPage = () => {
  return (
    <div className="flex justify-center h-80 items-center">
      <div>
        <div className="flex flex-col items-center max-w-2xl mt-40">
          <h2 className="bg-gradient-to-r from-gray-200 via-gray-400 to-gray-600 bg-clip-text text-transparent text-3xl md:text-5xl leading-tight uppercase tracking-wide">
            Best Voting Platform,
            <span className="flex justify-center text-base md:text-3xl uppercase mt-3">
              For Feedback & Engagement
            </span>
          </h2>
          <p className="text-xs md:text-base text-slate-400 leading-6 text-center mt-2 mx-3">
            {" "}
            Share your content, get instant feedback from friends, and engage in
            dynamic discussions with ease.{" "}
            <span className="opacity-70">Perfect </span>for personal reviews and
            team insights.
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
              className="cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-slate-300 text-secondary-foreground hover:bg-secondary/80 h-10 px-4 py-2 duration-300"
            >
              Get Started
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
