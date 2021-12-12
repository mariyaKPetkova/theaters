const User = require('../models/User.js')
async function createUser(username, hashedPassword) {
    const user = new User({
        username,
        hashedPassword
    })
    await user.save()
    return user
}
async function getUserByUsername(username) {
    const pattern = new RegExp(`^${username}$`, 'i')
    const user = await User.findOne({ username: { $regex: pattern } })
    return user
}

async function getUserById(id) {
    const user = await User.findById(id).lean()
    return user
}

module.exports = {
    createUser,
    getUserByUsername,
    getUserById

}

