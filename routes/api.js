const express = require('express')
const Route = express.Router()
const passport = require('passport')

//facebook auth
Route.get('/auth/facebook', passport.authenticate('facebook'))
Route.get('/auth/facebook/callback', passport.authenticate('facebook', {failureRedirect: '/'}), (req,res)=>{
    res.redirect('/home')
});

//auth google
Route.get('/auth/google/', passport.authenticate('google', {scope:['profile']}) );
Route.get('/auth/google/callback/', passport.authenticate('google', {failureRedirect:'/'}), (req,res)=>{
    res.redirect('/home')
});


module.exports =Route