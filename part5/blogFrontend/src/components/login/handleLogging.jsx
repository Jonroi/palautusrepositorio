export const handleLogin = async (event, username, password, setUser, setSuccessMsg, setErrorMsg) => {
    event.preventDefault();
    try {
        const user = await loginService.login({ username, password });

        window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user));
        blogService.setToken(user.token);

        setUser(user);
        setSuccessMsg(`Welcome, ${username}!`);
    } catch (error) {
        setErrorMsg(error.response.data.error);
    }
};

export const handleLogout = (username) => {
    window.localStorage.removeItem('loggedBloglistUser')
    setSuccessMsg(`See you soon, ${username}`)
    setUser(null)
}


export default { handleLogin, handleLogout }