const bcrypt = require('bcrypt')
const saltRounds = 10

const users = []

module.exports = {
  login: (req, res) => {
    console.log('Logging In User')
    const { username, password } = req.body

    console.log(users.find(elem => elem.username === username))

    let currUser = users.find(elem => elem.username === username)

    if (currUser === undefined) {
      res.status(400).send('User not found/Incorrect password')
    } else {
      bcrypt.compare(password, currUser.password, (err, result) => {
        if (result) {
          console.log(result)
          res.status(200).send(currUser)
        } else {
          res.status(400).send('User not found/Incorrect password')
        }
      })
    }
  },
  register: (req, res) => {
    console.log('Registering User')

    bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
      req.body.password = hash
      console.log(req.body.password)
      console.log(req.body)
      users.push(req.body)
      res.status(200).send(req.body)
    })
  }
}