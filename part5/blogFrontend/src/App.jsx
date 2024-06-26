import { useState, useEffect, useRef } from 'react'
import Blog from './components/blog'
import LoginForm from './components/LoginForm'
import AddBlogForm from './components/addBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogService'
import loginService from './services/loginService'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [successMsg, setSuccessMsg] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null)

  const AddBlogFormRef = useRef()

  useEffect(() => {
    blogService
      .getAll()
      .then((blogs) => setBlogs(blogs))
      .catch((error) => {
        console.log(error)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setSuccessMsg(`Welcome, ${username}!`)
    } catch (error) {
      setErrorMsg(error.response.data.error)
    }
  }

  const addBlog = async (blogObject) => {
    try {
      AddBlogFormRef.current.toggleVisibility()

      const returnedBlog = await blogService.create(blogObject)
      const addedBlog = await blogService.get(returnedBlog.id)
      console.log('addedBlog:', addedBlog)
      setBlogs(blogs.concat(addedBlog))
      setSuccessMsg(
        `Blog ${returnedBlog.title} by ${returnedBlog.author} added!`
      )
    } catch (error) {
      if (error && error.response.data.error) {
        setErrorMsg(error.response.data.error)
      } else {
        console.log('error: ', error)
      }
    }
  }

  const handleLike = async (blogId) => {
    try {
      console.log('blogId:', blogId)
      const blogToLike = blogs.find((blog) => blog.id === blogId)
      console.log('blogToLike:', blogToLike)
      const updatedBlog = await blogService.update(blogId, {
        ...blogToLike,
        likes: blogToLike.likes + 1,
      })
      console.log('updatedBlog:', updatedBlog)
      setBlogs(
        blogs.map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog))
      )
    } catch (error) {
      console.log(error)
    }
  }

  const handleLogout = (username) => {
    window.localStorage.removeItem('loggedBloglistUser')
    setSuccessMsg(`See you soon, ${username}`)
    setUser(null)
  }

  const descendingLikes = (a, b) => b.likes - a.likes
  const sortedBlogs = [...blogs].sort(descendingLikes)

  return (
    <div>
      <Notification
        successMsg={successMsg}
        setSuccessMsg={setSuccessMsg}
        errorMsg={errorMsg}
        setErrorMsg={setErrorMsg}
      />
      {user === null ? (
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />
      ) : (
        <div>
          <h2>blogs</h2>
          <p id='user-info'>
            {user.name} logged in{' '}
            <button onClick={() => handleLogout(user.username)}>logout</button>
          </p>
          <Togglable buttonLabel="new blog" ref={AddBlogFormRef}>
            <AddBlogForm buttonLabel="create" addBlog={addBlog} />
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
              handleLike={handleLike}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default App