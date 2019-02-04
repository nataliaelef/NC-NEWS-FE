import React from 'react';

export const Dropdown = props => {
  const renderOptions = () => {
    return props.options.map(opt => (
      <option key={opt.value} value={opt.value}>
        {opt.label}
      </option>
    ));
  };

  const handleOnChange = e => {
    e.preventDefault();
    props.onValueChange(e.target.value);
  };

  const lbl = props.label ? <div className="label">{props.label}</div> : null;

  return (
    <div className="dropdown">
      {lbl}
      <select onChange={handleOnChange}>{renderOptions()}</select>
    </div>
  );
};
