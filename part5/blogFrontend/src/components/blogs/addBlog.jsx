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
export default addBlog