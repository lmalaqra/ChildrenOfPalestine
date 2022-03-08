const Spinner = (props) => {
  return (
    <div className="spinner-container">
      <span style={{ fontSize: "13px" }}>{props.state}</span>
      <div class="circle-spinner"></div>
    </div>
  );
};

export default Spinner;
