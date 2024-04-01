/* eslint-disable react/prop-types */
const Finder = ({ keyword, handleOnChange }) => {
    return (
        <>
            <input value={keyword} onChange={handleOnChange} />
        </>
    )
}

export default Finder