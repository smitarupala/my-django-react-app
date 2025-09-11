const Loading = () => {
  return (
    <div className="d-flex justify-content-center spinner">
      <div className="spinner-border text-red-400" role="status">
        <span className="visually-hidden ">Loading...</span>
      </div>
    </div>
  );
};
export default Loading;
