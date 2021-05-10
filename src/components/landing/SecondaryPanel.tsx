import React from 'react';

const SecondaryPanel = () => (
  <>
    <div className="flex flex-row space-x-8">
      <div className="secondary-panel__1 secondary-panel">
        <div className="px-3 py-1 text-white">
          <div className="text-3xl font-semibold">Garden Owners</div>
          <div className="pt-1">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et dolore magna
            aliqua. Ut enim ad minim veniam, quis nostrud exercitation
            ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </div>
        </div>
      </div>

      <div className="secondary-panel__2 secondary-panel">
        <div className="px-3 py-1 text-white">
          <div className="text-3xl font-semibold">Garden Seekers</div>
          <div className="pt-1">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et dolore magna
            aliqua. Ut enim ad minim veniam, quis nostrud exercitation
            ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </div>
        </div>
      </div>
    </div>
  </>
);

export default React.memo(SecondaryPanel);
