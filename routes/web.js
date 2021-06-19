const { Router } = require('express')
const express = require('express')
const route = express.Router()
const {redirect, back} = require('../app/middleware/redirect')
const UserProfileDatabase = require('../app/models/passport')

route.get('/', back,(req,res)=>{
    res.render('index',{
        layout:'layouts/layouts',
        title: 'home'
    })
})

route.get('/home',redirect, async (req,res)=>{
    let user = await UserProfileDatabase.findOne({_id:req.session.passport.user.id})
    if(user){
        res.render('home',{
            layout:'layouts/dashboard',
            title: 'users',
            'user':user
        })
    }

})

route.get('/home/logout',redirect , (req,res)=>{
    req.logout()
    res.redirect('/')
})

module.exports = route;