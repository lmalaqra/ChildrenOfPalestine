const Image = (props) => {
  return (
    <div style={{ width: `${props.width}`, height: `${props.height}` }}>
      <img src={props.src} alt={props.alt} />
    </div>
  );
};

export default Image;
