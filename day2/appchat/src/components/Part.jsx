import React from "react";

const Part = ({ mess, onChangeText }) => {
  return (
    <div>
      Message:
      <input
        value={mess.description}
        onChange={(e) => onChangeText(e.target.value)}
      />
    </div>
  );
};

export default Part;
