import React from 'react'
import Select from 'react-select'

const AutoCompleteSelect = (props) => {
    const handleChange = (value) => {
        const { onChange, name } = props;

        onChange(name, value);
    };

    const handleBlur = () => {
        const { onBlur, name } = props;

        onBlur(name, true);
    };
    
    const {
        id,
        name,
        label,
        placeholder,
        options,
        value,
        isMulti,
        isDisabled,
        touched,
        error,
        isClearable,
        backspaceRemovesValue
      } = props;
    return (
        <div className="form-control">
        {label && (
          <label htmlFor={name} error={error}>
            {label}
          </label>
        )}

        <Select
          id={id}
          placeholder={placeholder}
          options={options}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          touched={touched}
          error={error}
          isMulti={isMulti}
          isDisabled={isDisabled}
          isClearable={isClearable}
          backspaceRemovesValue={backspaceRemovesValue}
          components={{ ClearIndicator: null }}
          
        />

        {touched && error ? <p className="error">{error}</p> : null}
      </div>
    )
}

export default AutoCompleteSelect
