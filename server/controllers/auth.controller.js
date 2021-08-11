const User = require("../models/user.model")
// const config = require("../../config/config")
// const jwt = require('jsonwebtoken');
// const expressJwt = require('express-jwt')

const getAuth = (req, res)=>{
    return res.render('admin/auth',{
        path: '',
        csrfToken: req.csrfToken()
    })
}

const signIn = async (req, res)=>{

    try{
        const user = await User.findOne({'email': req.body.email})
        if(!user){
            return res.status(400).json({
                error: "User not found"
            })
        }
        if(!user.authenticate(req.body.password)){
            return res.status(400).json({
                error: "Email and Password don't match"
            })
        }
     //   const token = jwt.sign({_id: user._id}, config.jwtSecret)
       // res.cookie("t", token, {expire: new Date() + 9999});
       req.session.user = user
       return res.status(200).redirect('/admin')
            // .json({
            // token, 
            // user:{
            //     _id : user._id,
            //     email: user.email,
            //     name: user.name
            // }
       // })
    }catch(err){
        console.log(err);
        return res.status(401).json({
            
            error: "Couldn't sign in"
        })
    }
}
const signOut = (req, res, next)=>{
    req.session.destroy();
    res.status(200).json({
        messeage: "Signed Out"
    })
}
// const requireSignIn = expressJwt({
//     secret: config.jwtSecret,
//     algorithms: ['HS256'],
//     userProperty: 'auth'
// })


const requireSignIn = (req, res, next)=>{
    if(req.session && req.session.user ){
        return next();
    }
    else {
        res.redirect("/auth")
    }
}
const hasAuthorization = (req, res, next)=>{
    const authorized = req.profile && req.auth && req.profile._id == req.auth._id
    if (!(authorized)) {
        return res.status('403').json({
        error: "User is not authorized"
        })
    }
    next();
}

module.exports = {getAuth, signIn, signOut, requireSignIn, hasAuthorization}