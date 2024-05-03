const addBlog = async (event) => {
    event.preventDefault();
    try {
        const newBlog = {
            title,
            author,
            url,
        };
        const returnedBlog = await blogService.create(newBlog); // Luo uusi blogi palvelun avulla
        setBlogs(blogs.concat(returnedBlog)); // Lisää uusi blogi olemassa oleviin
        setTitle(''); // Tyhjennä kentät
        setAuthor('');
        setUrl('');
    } catch (error) {
        console.error("Failed to add blog:", error);
    }
};

export default addBlog