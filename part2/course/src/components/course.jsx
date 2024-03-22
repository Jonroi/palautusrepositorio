/* eslint-disable react/prop-types */
const Course = ({ course }) => {
    return (
        <div>
            <Header name={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}
const Header = ({ name }) => {
    return (
        <div>
            <h2>{name}</h2>
        </div>
    )
}
const Content = ({ parts }) => {
    return (
        <div>
            {parts.map(part => (
                <Part key={part.id} part={part} />
            ))}
        </div>
    )
}

const Part = ({ part }) => {
    return (
        <div>
            <p>
                {part.name} : {part.exercises}
            </p>
        </div>
    )
}

const Total = ({ parts }) => {
    return (
        <div>
            <p>Number of exercises : {parts ? parts.reduce((total, part) => total + part.exercises, 0) : 0}</p>
        </div>
    )
}

export default Course