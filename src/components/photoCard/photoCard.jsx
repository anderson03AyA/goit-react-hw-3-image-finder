import React, { useState } from "react";
import "./photoCard.css"
import Viewer from "react-viewer";

const PhotoCard = ({ img}) => {
  const [visible, setVisible] = useState(false);

  return (
    <div className="photo-card">
      <img
        onClick={() => {
          setVisible(true);
        }}
        className="img"
        src={img}
        alt=""
        loading="lazy"
        width="100px"
        height="100px"
      />
      <Viewer
        visible={visible}
        onClose={() => {
          setVisible(false);
        }}
        images={[{ src: img, alt: "" }]}
      />
    </div>
  );
};

export default PhotoCard;
