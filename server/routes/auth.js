const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model("User")

router.get('/fetch', (req, res) => {
    // res.send('hello')
    User.find(function (err, User) {
        res.json(User)
    })
})

router.post('/store', (req, res) => {
    const { name, email, status } = req.body
    if (!name || !email || !status) {
        res.json({ error: "Please add the fields" })

    }
    User.findOne({ name: name })
        .then((savedUser) => {
            if (savedUser) {
                res.json({ error: "Already is exits" })
            }
            else {
                const user = new User({
                    name,
                    email,
                    status
                })
                user.save()
                    .then(user => {
                        res.json({ message: "saved sucessfully" })
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
        })
        .catch(err => {
            console.log(err)
        })
})

router.delete('/store/:id', (req, res) => {
    User.deleteOne({ _id: req.params.id }, function (err, result) {
        if (err) {
            res.send("invalid")
        }
        else {
            res.json(result)
        }
    })
})

router.put('/updateemployee/:id', (req, res) => {
    User.findById(req.params.id, (err, employee) => {
        if (!employee) {
            res.send('Unable To Find Employee With This Id');
        }
        else {
            const {name} = req.body
            User.findOne({ name: name,_id:{$ne:req.params.id}}).then((savedUser) => {
                if(savedUser) {
                    res.json({ error: "Already is exits" , savedUser})
                }
                else {
                    employee.name = req.body.name;
                    employee.email = req.body.email;
                    employee.status = req.body.status;
                    employee.save().then(emp => {
                        res.json({ message: "Updated Successfully" });
                    })
                }
            })
                .catch(err => {
                    res.json(err)
                })
        }
    })
})



module.exports = router;