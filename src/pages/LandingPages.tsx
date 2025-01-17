//import React from 'react'
import { SignedOut, SignedIn } from "@clerk/clerk-react";
import Navbar from "./Navbar";
import Hero from "./Hero";
import HomePage from "./HomePage";

const LandingPages = () => {
  return (
    <>
      <SignedOut>
        <div className="flex flex-col h-screen">
          <Navbar />
          <Hero />
        </div>
      </SignedOut>
      <SignedIn>
        <HomePage />
      </SignedIn>
    </>
  );
};

export default LandingPages;
