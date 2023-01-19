const Notification = ({message}) => {
    const messageStyle = {
        color: 'green',
        background: 'lightgray',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10

    }
 

    if (message === '') {
        return null
    } else {
        return (
            <div style={messageStyle}>
                {message}
            </div>
        )}

   
}

export default Notification