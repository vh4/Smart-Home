const PassportGoogleStrategy = require('passport-google-oauth20').Strategy
const PassportFacebookStategy = require('passport-facebook').Strategy
const passport = require('passport')
const UserProfile = require('../models/passport')

require('dotenv').config()

module.exports = (passport)=>{
    passport.use(
        new PassportGoogleStrategy(
            {
                clientID: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_SECRET_KEY,
                callbackURL: '/auth/google/callback'
            },
            async (accessToken, refreshToken, profile,done) =>{
                const google = {
                    id_user:profile.id,
                    nama:profile.displayName,
                    username:profile.username,
                    image:profile.photos[0].value
                }
                try{
                    let user = await UserProfile.findOne({id_user:profile.id})
                    if(user){
                        done(null,user)
                    }else{
                        user = await UserProfile.create(google)
                        done(null,user)
                    }
                }catch(error){
                    console.log(error)
                }
            }
        )
    )

    passport.use(
        new PassportFacebookStategy(
            {
                clientID: process.env.FACEBOOK_CLIENT_ID,
                clientSecret:process.env.FACEBOOK_SECRET_KEY,
                callbackURL:'/auth/facebook/callback',
                profileFields: ['id', 'displayName', 'name', 'gender', 'picture.type(large)']      
            },
            async (accessToken, refreshToken, profile, done)=>{
                const facebook = {
                    user_id:profile.id,
                    nama:profile.displayName,
                    username:profile.username,
                    image:profile.photos[0].value
                }

                try{
                    let user = await UserProfile.findOne({user_id:profile.id})
                    if(user){
                        done(null, user)
                    }else{
                        let user = await UserProfile.create(facebook)
                        done(null,user)
                    }

                }catch(error){
                    console.log(error)
                }
            }

        )
    )

}

//setralization and desentralization
passport.serializeUser((user,done)=>{
    const isAdmin = user.isSuperAdmin === 0;
    return done(null, {id:user.id, isAdmin:isAdmin})
})

passport.deserializeUser((user,done)=>{
    const users = user.isAdmin ? UserProfile:UserProfile;
    users.find({id:user.id}, (err,user)=>{
        done(err,user)
    })
})
