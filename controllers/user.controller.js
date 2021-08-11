const User = require('../models/user.model')
const errorHandler = require('../helpers/dbErrorHandler')
const messageSchema = require('../models/message.model')
const  mongoose  = require('mongoose')

const Message =  mongoose.model('Message', messageSchema)



const createUsr = async (req, res)=>{
    const user = new User(req.body);
    try{
        await user.save()
        .then((user)=>{
            req.session.user = user;
            return res.status(200).redirect("/admin")
        })
    } catch(err){
        return res.status(401).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

const registerComponnet = (req, res)=>{
    try{
        res.status(200).render('routes/register', {
            path: 'register', 
            csrfToken: req.csrfToken()
        })
    }catch(err){
        return res.status(401).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}
const contactUsComponnet = (req, res)=>{
   return  res.render("routes/contact", {
        path: "/contact%20us",
        csrfToken: req.csrfToken()
    });
}

const enterMessage = (req, res)=>{
    const email = req.body.email;
    const msg = req.body.message;
    const messages = new Message({
      email: email,
      message: msg
    })
    messages.save()
      .then(data => res.render("routes/thank", {path: "/thank"}))
      .catch(err => res.send(err))   
}

module.exports = {registerComponnet, createUsr, contactUsComponnet, enterMessage}