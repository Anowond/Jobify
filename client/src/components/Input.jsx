const Input = (props) => {
  return (
    <div className="form-row">
          <label htmlFor={props.name} className="form-label">{props.labelName || props.name}</label>
          <input type={props.type || 'text'} id={props.name} name={props.name} className="form-input" defaultValue={props.defaultValue || null} required={props.required || false} onChange={props.onChange} />
    </div>
  )
}
export default Input