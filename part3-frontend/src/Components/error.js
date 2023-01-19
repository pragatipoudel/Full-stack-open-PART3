const Error = ({error}) => {
    const errorStyle = {
        color: 'red',
        background: 'lightgray',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10

    }
    if (error === '') {
        return null
    }

    return (
        <div style={errorStyle}>
            {error}
        </div>
    )
}

export default Error