const Loader = ({ loaded }) => {
  return (
    <div id="loader" style={{ opacity: loaded ? '0' : '1' }}>
      <h1
        className="logo-typo"
        style={{ color: '#fafafa !important', fontSize: '3rem' }}
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
