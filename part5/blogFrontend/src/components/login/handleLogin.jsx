const handleLogin = async (event) => {
    event.preventDefault()
    try {
        const user = await loginService.login({
            username, password,
        })

        window.localStorage.setItem(
            'loggedNoteappUser', JSON.stringify(user)
        )
        noteService.setToken(user.token)
        setUser(user)
        setUsername('')
        setPassword('')
    } catch (exception) {
        console.log('wrong username or password')
    }
}

export default handleLogin