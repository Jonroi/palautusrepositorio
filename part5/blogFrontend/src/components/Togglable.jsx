import { useState, userImperativeHandle, forwardRef } from 'react'

const Togglable = forwardRef((props, ref) => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    userImperativeHandle(ref, () => {
        return {
            toggleVisibility
        }
    })

    return (
        <div>
            <div style={hideWhenVisible}>
                <button onClick={toggleVisibility}>{toggle.buttonLabel}</button>
            </div>
            <div style={showWhenVisible}>

                {toggle.children}
                <button onClick={toggleVisibility}>cancel</button>
            </div>
        </div>
    )
})

export default Togglable