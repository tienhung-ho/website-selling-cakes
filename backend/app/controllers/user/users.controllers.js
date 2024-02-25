const userServices = require('../../services/user/user.services');
const bcrypt = require('bcrypt');
const User = require('../../models/user.model')
const jwt = require('jsonwebtoken');


module.exports.createUser = async (req, res, next) => {

  try {
    const record = req.body.params
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(record.password, salt)
    console.log(hashedPassword);

    const user = new User({
      username: record.username,
      password: hashedPassword,
      email: record.email,
      phone: record.phone,
      cart: record.cart

    })

    const result = await user.save()

    const { password, ...data } = await result.toJSON()

    res.send(await data)

  } catch (error) {
    res.status(500).json({ error: 'Error registering new user' });
  }
}


const keySecret = process.env.SECRET
module.exports.loginUser = async (req, res, next) => {
  try {
    const { username, password } = req.body.params;
    const user = await User.findOne({ username: username });

    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    if (!await bcrypt.compare(password, user.password)) {
      return res.status(400).send({ message: 'Invaild credentials' });
    }

    const token = jwt.sign({ _id: user._id, }, `${keySecret}`)


    // res.send(token)
    res.cookie('jwt', token, {
      httpOnly: true,
      maxAge: 60 * 60 * 1000
    })

    res.send({
      message: 'success'
    })

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error logging in' });
  }
}


module.exports.infomation = async (req, res, next) => {

  try {
    const cookie = req.cookies['jwt']

    if (!cookie) {
      return res.status(401).send('JWT not provided');
    }

    const claims = jwt.verify(cookie, `${keySecret}`)

    if (!claims) {
      return res.status(401).send({
        message: "unauthenticated"
      })
    }

    const user = await User.findOne({ _id: claims._id })

    const { password, ...data } = user.toJSON()

    res.send(data)

  }
  catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error information' });
  }

}


module.exports.logout = async (req, res, next) => {
  try {

    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).send('JWT not provided');
    }

    res.cookie('jwt', '', { maxAge: 0 })
    res.send({
      message: 'success'
    })
  }
  catch (err) {
    console.log(err);
  }

}


module.exports.find = async (req, res, next) => {
  try {
    const { user, ...cart } = req.body.params
    const _id = user
    const userService = new userServices()
    const newUser = await userService.findAndUpdate(cart.item, _id)


    res.send({
      // newUser

    })

  }
  catch (err) {
    console.log(err);
  }

}

module.exports.delete = async (req, res, next ) => {
  console.log(req.body.params);

  try {
    const { userId, id } = req.body.params
    const userService = new userServices()
    const newUser = await userService.delete(userId, id)
  }

  catch(err) {
    console.log(err);
  }

}

