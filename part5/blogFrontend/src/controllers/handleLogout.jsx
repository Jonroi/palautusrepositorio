
const handleLogout = (username) => {
    window.localStorage.removeItem('loggedBloglistUser')
    setSuccesMsg(`Goodbye, ${username}!`)
    setUser(null)
}

export default handleLogout