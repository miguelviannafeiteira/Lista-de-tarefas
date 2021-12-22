import React from 'react';

const Input = ({
  label,
  type,
  name,
  value,
  onChange,
  error,
  onBlur,
  className,
}) => {
  return (
    <div>
      <label className="label" htmlFor={name}>
        {label}
      </label>

      {error ? (
        <input
          className="inputErro"
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={name}
        />
      ) : (
        <input
          className={className}
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={name}
        />
      )}
      {error && <p className="textoError">{error}</p>}
    </div>
  );
};

export default Input;
