import { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import handleLogin from './controllers/handleLogin';
import handleLogout from './controllers/handleLogout';
import blogService from './services/blogService';
import Notification from './components/Notification';
import LoginForm from './components/loginForm';
import Togglable from './components/Togglable';
import BlogForm from './components/BlogForm';


const App = () => {
  const [loginVisible, setLoginVisible] = useState(false)
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const blogFormRef = useRef();


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

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
      })
    console.log('created blog', blogObject)
  }

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>Login</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <h1>Blogs</h1>
      {successMsg && <Notification message={successMsg} type="success" />}
      {errorMsg && <Notification message={errorMsg} type="error" />}


      {user === null ? (
        <div>
          <p>Login to see your blogs</p>
          {loginForm()}
        </div>
      ) : (
        <div>
          <h2>BLOGS</h2>
          <p>{user.name} logged in{' '}
            <button onClick={() => handleLogout(user.username)}>logout</button></p>
          <div>
            <Togglable buttonLabel="new blog" ref={blogFormRef}>
              <BlogForm createNote={addBlog} />
            </Togglable>

            {sortedBlogs.map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                user={user}
                blogs={blogs}
                setBlogs={setBlogs}
                setSuccessMsg={setSuccessMsg}
                setErrorMsg={setErrorMsg}
              />
            ))}
          </div>
          <h2>bloglist</h2>
        </div>
      )
      }
    </div >
  );
};

export default App;
