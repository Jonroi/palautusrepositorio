const BlogForm = ({ createBlog }) => {

    const [newBlog, setNewBlog] = useState('')

    const addBlog = (event) => {
        event.preventDefault()
        createBlog({
            title: newBlog.title,
            author: newBlog.author,
            url: newBlog.url
        })
        setNewBlog('')
    }

    return (
        <div>
            <h2>Create New Blog</h2>
            <form onSubmit={addBlog}>
                <input value={newBlog} onChange={event => setNewBlog(event.target.value)} />
                <button type="submit">save</button>
            </form>
        </div>
    )
}

export default BlogForm