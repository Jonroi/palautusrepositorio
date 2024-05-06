import loginService from '../services/loginService';
const handleLogin = async (event, setUser, setUsername, setPassword, setSuccessMsg, setErrorMsg) => {
    event.preventDefault();

    try {
        const user = await loginService.login({ username, password });

        window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user));
        blogService.setToken(user.token);

        setUser(user);
        setUsername('');
        setPassword('');
        setSuccessMsg(`Welcome, ${user.username}!`);
    } catch (exception) {
        setErrorMsg('Wrong username or password');
    }
};

export default handleLogin;
