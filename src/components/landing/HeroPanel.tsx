import React from 'react';

const HeroPanel = () => (
  <div
    className="rounded-2xl p-4 shadow-lg mx-auto bg-no-repeat bg-center bg-cover"
    style={{
      backgroundImage: `url('https://source.unsplash.com/jin4W1HqgL4/1200x1200')`
    }}
  >
    <div className="px-3 py-1 text-white text-4xl font-semibold">
      Community Owned Allotments
    </div>
    <div className="px-3 py-1 text-white max-w-4xl">
      {`The average waiting time for an allotment in the UK is 3 years.
      Meanwhile as food prices rise, jobs become increasingly
      stressful & climate change continues to worsen, more of us are
      turning to growing our own food as a green-fingered solution to
      one or many of the above problems`}
    </div>
    <span className="space-x-4">
      <button
        type="button"
        className="bg-white text-black rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:text-white hover:bg-black focus:outline-none focus:shadow-outline"
      >
        Search all Gardens
      </button>
      <button
        type="button"
        className="bg-white text-black rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:text-white hover:bg-black focus:outline-none focus:shadow-outline"
      >
        List Your Garden
      </button>
    </span>
  </div>
);

export default React.memo(HeroPanel);
