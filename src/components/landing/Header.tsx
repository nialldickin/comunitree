import React from 'react';

interface Props {
  text: string;
}

const Header = ({ text }: Props) => (
  <div className="rounded-2xl text-center text-2xl font-semibold text-white bg-pastel-green p-2 shadow-lg mx-auto">
    {text}
  </div>
);

export default React.memo(Header);
