const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const { secretOrKey } = require('../../config/keys')
const validateRegisterInput = require('../validation/register')
const validateLoginInput = require('../validation/login')

const register = async data => {
  try {
    // run registration validations
    const { message, isValid } = validateRegisterInput(data)
    if (!isValid) {
      throw new Error(message)
    }

    // look for user, if already exists, throw error, else hash submitted password
    const { phone_number, password } = data
    const existingUser = await User.findOne({ phone_number })

    if (existingUser) {
      throw new Error('This phone number already exists. Please login.')
    }
    const hashedPassword = await bcrypt.hash(password, 10)

    // create a new user with all arguments and save to database
    const user = new User(
      {
        password: hashedPassword,
        phone_number // : hashedPhoneNumber
      },
      err => {
        if (err) throw err
      }
    )
    user.save()

    // create web token signed with secretOrKey
    const token = jwt.sign({ id: user._id }, secretOrKey)

    // return created token, set loggedIn to be true, send
    // remaining user data, but with null password and phone number,
    return {
      token,
      loggedIn: true,
      ...user._doc,
      id: user.id,
      status: 'registered',
      password: null,
      phone_number: null
    }
  } catch (err) {
    throw err
  }
}

const logout = async data => {
  // find user by id
  const { id } = data
  const leavingUser = await User.findById(id)

  // create empty token and return object with null password and phone number
  const token = ''
  return {
    token,
    loggedIn: false,
    ...leavingUser._doc,
    password: null,
    phone_number: null
  }
}

const login = async data => {
  try {
    // run login validations
    const { message, isValid } = validateLoginInput(data)
    if (!isValid) {
      throw new Error(message)
    }

    // find user by phone number, else throw error
    const { phone_number, password } = data
    const user = await User.findOne({ phone_number })
    if (!user) {
      throw new Error('Phone number does not exist')
    }

    // verify password, if match, create web token and return
    // user object with null password and phone number
    const passwordMatch = await bcrypt.compareSync(password, user.password)
    if (!passwordMatch) {
      throw new Error('Password does not match')
    }
    const token = jwt.sign({ id: user._id }, secretOrKey)
    return {
      token,
      loggedIn: true,
      ...user._doc,
      id: user.id,
      status: 'registered',
      password: null,
      phone_number: null
    }
  } catch (err) {
    throw err
  }
}

const verifyUser = async data => {
  try {
    // destructure token from mutation, decode with secretOrKey, and obtain id
    const { token } = data
    const decoded = jwt.verify(token, secretOrKey)
    const { id } = decoded

    // attempt to find a user in the databse with obtained id and return result
    const loggedIn = await User.findById(id).then(user => {
      return !!user
    })
    return { loggedIn, id }
  } catch (err) {
    return { loggedIn: false }
  }
};

const userLoggedIn = async context => {
  const validUser = await verifyUser({token: context.token})
  console.log(validUser)
  return !validUser.loggedIn
}

module.exports = { register, logout, login, verifyUser, userLoggedIn };
