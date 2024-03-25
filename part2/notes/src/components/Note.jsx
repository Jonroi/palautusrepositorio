/* eslint-disable react/prop-types */

//defines a functional component called Note
const Note = ({ note }) => {
    return (
        <li>{note.content}</li>
    )
}

export default Note