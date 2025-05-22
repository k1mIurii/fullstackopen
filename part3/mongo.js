const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as an argument')
  return
}

const password = process.argv[2]
const url = `mongodb+srv://kyy101000:${password}@cluster0.bwvkat3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length > 2 && process.argv.length == 5) {
  const name = process.argv[3]
  const number = process.argv[4]

  const person = new Person({
    name: name,
    number: number,
    date: Date.now().toString()
  })

  person.save()
  .then(result => {
    console.log(`added ${person.name} number ${person.number} to phonebook.`)
    mongoose.connection.close()
  })
  .catch(error => {
    console.log(error)
  })
} else {
  Person.find()
  .then(result => {
    console.log('phonebook:')
    result.forEach(p => {
      console.log(`${p.name} ${p.number}`)
    })
    mongoose.connection.close()
  })
  .catch(error => {
    console.log(error)
  })
}