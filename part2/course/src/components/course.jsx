/* eslint-disable react/prop-types */
// Renders course details: header, content, and total exercises.
const Course = ({ course }) => {
    return (
        <div>
            <Header name={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}
//renders the header
const Header = ({ name }) => {
    return (
        <div>
            <h2>{name}</h2>
        </div>
    )
}
//renders multiple parts
const Content = ({ parts }) => {
    return (
        <div>
            {parts.map(part => (
                <Part key={part.id} part={part} />
            ))}
        </div>
    )
}
//renders a single part
const Part = ({ part }) => {
    return (
        <div>
            <p>
                {part.name} : {part.exercises}
            </p>
        </div>
    )
}
//calculates the total number of exercises using the reduce method
const Total = ({ parts }) => {
    return (
        <div>
            <p><b>total of exercises : {parts ? parts.reduce((total, part) => total + part.exercises, 0) : 0}</b></p>
        </div>
    )
}

export default Course