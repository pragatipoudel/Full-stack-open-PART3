const Filter = ({name, handle}) => (
<div>
    filter shown with <input value={name} onChange={handle} />
</div>
)

export default Filter