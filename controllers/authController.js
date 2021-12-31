const router = require('express').Router()
const { isGuest } = require('../middlewares/guards.js')

router.get('/register', isGuest(), (req, res) => {
    res.render('user/register')
})

router.post('/register',isGuest(),async (req, res) => {
        
        try {
            if(req.body.password != req.body.repeatPassword){
                throw new Error('Passwords do not match.')
            }
            if(req.body.password < 3){
                throw new Error('Passwords must be at least 3 symbols.')
            }

            await req.auth.register(req.body.username, req.body.password)
            res.redirect('/catalog')
        } catch (err) {
            console.log(err)
            let errors
            if (err.errors) {
                errors = Object.values(err.errors).map(e => e.properties.message)
            } else {
                errors = [err.message]
            }
            const ctx = {
                errors,
                userData: {
                    username: req.body.username,
                }
            }
            res.render('user/register', ctx)
        }

    }
)

router.get('/login', isGuest(), (req, res) => {
    res.render('user/login')
})

router.post('/login', isGuest(), async (req, res) => {
    try {
        await req.auth.login(req.body.username, req.body.password)
        res.redirect('/catalog')
    } catch (err) {
        console.log(err)
        const ctx = {
            errors: [err.message],
            userData: {
                username: req.body.username
            }
        }
        res.render('user/login', ctx)
    }
})
router.get('/logout', (req, res) => {
    req.auth.logout()
    res.redirect('/')
})


module.exports = router