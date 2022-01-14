const express = require('express')
const bcrypt = require('bcrypt')

const app = express();
const PORT = 3000

app.use(express.json())

const users = []


app.get('/users', (req, res) => {
    res.json(users)
})


//TODO: user register
app.post('/register', async (req, res) => {
    try {
        // const salt = await bcrypt.genSalt()
        // const hashedPassword = await bcrypt.hash(req.body.password, salt)
        const hashedPassword = await bcrypt.hash(req.body.password, 10)

        console.log(hashedPassword)

        const user = {
            name: req.body.name,
            password: hashedPassword
        }
        users.push(user)
        res.status(200).send({message: "user added successfully"})

    } catch (error) {
        res.status(500).send({message: "failed to add a user"})
    } 
})

//TODO: user login
app.post('/login', async (req, res) => {
    const user = users.find(user => user.name === req.body.name);
    if(!user){
        return res.status(400).send({message: "Cannot find user"})}
    try {
       if(await bcrypt.compare(req.body.password, user.password)){
        //    res.redirect('/secretpage')
        res.status(200).send({message: "login success"})
       } else {
           res.status(300).send({message: "incorrect password"})
       }


    } catch (error) {
        res.status(500).send({message: "login failed"})
    }
})


app.listen(PORT, () => console.log(`server is running on port ${PORT}`))


