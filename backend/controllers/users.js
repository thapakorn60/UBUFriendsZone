const Users = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



exports.adduser = async(req, res, next) => {
    bcrypt.hash(req.body.password, 10).then(hash => {
        const data = req.body;
        const saltRounds = 10;
        const user = new Users({
            email: req.body.email,
            password: hash,
            name: req.body.name,
            tel: req.body.tel,
            age: req.body.age,
            sex: req.body.sex,
            lifestyle: req.body.lifestyle,
            educational: req.body.educational,
            faculty: req.body.faculty,
            year: req.body.year,
            facebook: req.body.facebook,
            instagram: req.body.instagram,
            other: req.body.other,
            img: req.body.img,
        });
        console.log(user);
        user.save(user).then(data => {
            res.send("Add User success")
        }).catch(err => {
            res.send(err)
        })
    });

};

exports.getuserDetail = (req, res, next) => {
    email = req.params.email
    Users.findOne({ 'email': email }).then((data) => {
        res.json(data)
    }).catch(err => {
        res.status(500).send(err)
    })
}

exports.getidUser = (req, res, next) => {
    const id = req.params.id;
    console.log(id)
    if (!req.body) {
        res.send("Not found data")
    }
    Users.findById(id).then(data => {
        console.log(data)
        res.status(201).send(data)
    }).catch(err => {
        res.status(500).send(err)
    })

};

exports.getuser = (req, res, next) => {
    Users.find({}).then((data) => {
        res.send(data)
    }).catch(err => {
        res.status(500).send(err)
    })
};



exports.edituser = (req, res, next) => {
    const id = req.params.id;
    if (!req.body) {
        res.send("Not found data")
    }
    Users.findByIdAndUpdate(id, req.body, { useFindAndModify: false }, (err, result) => {
        if (err) {
            throw err
        } else {
            res.status(200).send(result)
        }
    })
};

exports.deleteuser = (req, res, next) => {
    const id = req.params.id;
    Users.findByIdAndRemove(id).then(() => {
        res.status(200).send("remove success")
    }).catch(err => {
        res.status(500).send("Server Err")
    })
};

exports.login = async(req, res, next) => {
    const { email, password } = req.body
        // simple validation
    if (!email || !password) {
        return res.send({ message: 'Please try again' })
    }
    const user = await Users.findOne({
        email
    })
    if (user) {
        const isCorrect = bcrypt.compareSync(password, user.password)
        if (isCorrect) {
            return res.send({ user })
        } else {
            return res.send({ message: 'Username or Password incorrect' })
        }
    } else {
        return res.send({ message: 'Username does not exist.' })
    }
}

exports.authentication = async(req, res, next) => {
    let fetchedUser;
    await Users.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({
                    message: "ไม่พบผู้ใช้งาน"
                });
            }
            fetchedUser = user;
            return bcrypt.compareSync(req.body.password, user.password);
        })
        .then(result => {
            if (!result) {
                return res.status(401).json({
                    message: "รหัสผ่านหรือชื่อผู้ใช้งานไม่ถุกต้อง"
                });
            }
            const token = jwt.sign({ email: fetchedUser.email, userId: fetchedUser._id },
                "secret_this_should_be_longer", { expiresIn: "2h" } // Old 1h
            );
            res.status(200).json({
                token: token,
                expiresIn: 7200, // 3600
                userId: fetchedUser._id
            });
        })
        .catch(err => {
            return res.status(401).json({
                message: "Invalid authentication credentials!"
            });
        });
}