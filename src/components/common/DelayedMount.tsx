import { ReactElement, useEffect, useState } from 'react';

interface Props {
  children: ReactElement;
  delayMs?: number;
  className?: string;
}

const DelayedMount = ({
  children,
  delayMs = 500,
  ...rest
}: Props) => {
  const [isMounted, setMounted] = useState(false);

  useEffect(() => {
    const delay = setTimeout(() => {
      setMounted(true);
    }, delayMs);
    return () => clearTimeout(delay);
  }, [delayMs]);

  return isMounted ? <div {...rest}>{children}</div> : null;
};

export default DelayedMount;
