const Header = ({course}) => {
  return (
    <h1>{course.name}</h1>
  )
}

const Part = ({item}) => {
  return (
    <p>
      {item.name} {item.exercises}
    </p>
  )
}

const Content = ({ course }) => {
  return (
    <div>
      {course.parts.map((item,index) => (
        <Part key={index} item={item}/>
      ))}
    </div>
  )
}

const Total = ({course}) => {
  const count = course.parts.map(e => e.exercises).reduce((count, exercises) => count + exercises, 0);
  return (
    <p>
      Number of exercises {count}
    </p>
  )
}


const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  return (
    <div>
      <Header course={course}/>
      <Content course={course}/>
      <Total course={course}/>
    </div>
  )
}

export default App