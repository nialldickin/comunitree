import { memo } from 'react';

const Footer = () => {
  return (
    <div className="flex w-full space-x-1 py-4 justify-center text-sm font-light text-gray-600">
      <span>Made with</span>
      <span>🍓</span>
      <span>by</span>
      <a
        className="text-blue-500 hover:text-blue-700"
        href="https://gitlab.com/ndickin"
      >
        Niall Dickin
      </a>
    </div>
  );
};

export default memo(Footer);
