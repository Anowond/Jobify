const Select = ({name, defaultValue, labelName, options, onChange}) => {
  return (
    <div className="form-row">
        <label htmlFor={name} className="form-label">{labelName || name}</label>
        <select name={name} id={name} className="form-select" defaultValue={defaultValue || null} onChange={onChange}>
        {options.map((itemValue,i) => (
            <option key={i} value={itemValue}>{itemValue}</option>
        ))}
        </select>
    </div>
  )
}
export default Select