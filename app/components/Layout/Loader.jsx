import { useEffect } from 'react';
import { useState } from 'react';

const Loader = ({ loaded }) => {
  const [displayLoader, setDisplayLoader] = useState(!loaded);
  useEffect(() => {
    if (!loaded) return;

    setTimeout(() => {
      setDisplayLoader(false);
    }, 1000);
  }, [loaded]);
  return (
    <div
      id="loader"
      style={{
        opacity: displayLoader ? '1' : '0',
        zIndex: displayLoader ? '5' : '-1',
        transition: 'opacity 0.3s ease 0s, z-index 0s linear 0.3s',
      }}
    >
      <h1
        className="logo-typo"
        style={{ color: '#E07A5F !important', fontSize: '3rem' }}
      >
        LEARN
      </h1>
      <div className="loadingContainer">
        <div className="ball1"></div>
        <div className="ball2"></div>
        <div className="ball3"></div>
      </div>
    </div>
  );
};

export default Loader;
