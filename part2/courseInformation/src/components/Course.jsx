const Course = (props) => {
    const Header = (props) => <h2>{props.course.name}</h2>

    const Content = (props) => (
    <div>
        <ul>
            {props.course.parts.map(part =>
                <li key={part.id}>
                    {part.name} {part.exercises}
                </li>
            )}
        </ul>
    </div>
    )

    const sum = props.course.parts.reduce((partialSum, a) => partialSum + a.exercises, 0)
    const Total = () => <p>Total number of exercises: {sum}</p>

    return(
        <div>
        <Header course={props.course} />
        <Content course={props.course} />
        <Total />
        </div>
    )
}


export default Course
