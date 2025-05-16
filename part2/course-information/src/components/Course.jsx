import Header from "./Header"
import Content from "./Content"
import Total from "./Total"

const Course = ({ course }) => {

  const countExercises = (parts) => {
    return parts.map(part => part.exercises).reduce((sum, current) => sum + current)
  }

  return (
    <div>
      <Header name={course.name}/>
      <Content parts={course.parts}/>
      <Total count={countExercises(course.parts)}/>
    </div>
  )
}

export default Course