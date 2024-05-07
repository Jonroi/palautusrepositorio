import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './blog'
import AddBlogForm from './AddBlogForm'

describe('<Blog /> rendering', () => {
  const blog = {
    title: 'Test Title',
    author: 'Joni Jonssoni',
    url: 'http://superblog.com',
    likes: 6
  }

  test('blog title is rendered correctly', () => {
    const { container } = render(<Blog blog={blog} />)

    const div = container.querySelector('.blog-title-and-author')
    expect(div).toHaveTextContent(
      'Test Title'
    )
  })

  test('blog url, likes and username are shown when view button is clicked', async () => {
    const { container } = render(<Blog blog={blog} />)

    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const urlDiv = container.querySelector('.url')
    expect(urlDiv).toHaveTextContent('http://superblog.com')
    const likesDiv = container.querySelector('.likes')
    expect(likesDiv).toHaveTextContent('6')
    const usernameDiv = container.querySelector('.username')
    expect(usernameDiv).toHaveTextContent('Added by anonymous')
  })

  test('calls handleLike function when likeButton is clicked', async () => {
    const mockHandler = vi.fn()

    render(<Blog blog={blog} handleLike={mockHandler} />)

    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const likeButton = await screen.findByText('like')

    await user.click(likeButton)
    await user.click(likeButton)

    screen.debug()

    expect(mockHandler.mock.calls).toHaveLength(2)
  })

  test('new blog is created correctly', async () => {
    const createBlog = vi.fn()
    const user = userEvent.setup()

    render(<AddBlogForm addBlog={createBlog} buttonLabel='create' />)

    const title = screen.getByPlaceholderText('title of the blog')
    const author = screen.getByPlaceholderText('author of the blog')
    const url = screen.getByPlaceholderText('url to the blog post')
    const createButton = screen.getByText('create')

    await user.type(title, 'Test Title')
    await user.type(author, 'Joni Jonssoni')
    await user.type(url, 'http://ultrablogs.com/jonijonssoni')
    await user.click(createButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('Test Title')
    expect(createBlog.mock.calls[0][0].author).toBe('Joni Jonssoni')
    expect(createBlog.mock.calls[0][0].url).toBe('http://ultrablogs.com/jonijonssoni')
  })
})