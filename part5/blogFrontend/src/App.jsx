import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import handleLogin from './controllers/handleLogin';
import handleLogout from './controllers/handleLogout';
import blogService from './services/blogService';
import Notification from './components/Notification';


const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs)).catch((error) => {
      console.log(error);
    });
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);


  const loginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);
    const [successMsg, setSuccessMsg] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    return (
      <div>
        <Notification successMsg={successMsg}
          setSuccessMsg={setSuccessMsg}
          errorMsg={errorMsg}
          setErrorMsg={setErrorMsg} />

        <form onSubmit={(e) => handleLogin(e, setUser, setUsername, setPassword, setSuccessMsg, setErrorMsg)}>
          <div>
            <label>Username</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div>
            <label>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    );
  };



  return (
    <div>
      <h1>Blogs</h1>
      {successMsg && <Notification message={successMsg} type="success" />}
      {errorMsg && <Notification message={errorMsg} type="error" />}


      {user === null ? (
        <div>
          <h2>Log in to application</h2>
          {loginForm()}
        </div>
      ) : (
        <div>
          <p>{user.name} logged in{' '}
            <button onClick={() => handleLogout(user.username)}>logout</button></p>
          <div>
            <h2>Blogs</h2>
            {blogs.map((blog) => (
              <Blog key={blog.id} blog={blog} />
            ))}
          </div>
          <h2>bloglist</h2>
        </div>
      )}
    </div>
  );
};

export default App;
