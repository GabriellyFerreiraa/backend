import { Router } from "express";
export const router=Router()

router.post('/registro',  function(req, res, next) {
    passport.authenticate('registro', function(err, user, info, status) {
      if (err) { return next(err) }
      if (!user) { return res.redirect(`/registro?error=${info.message?info.message:info.toString()}`) }
      //res.redirect('/account');
      req.user=user
      return next()
    })(req, res, next);
}, (req,res)=>{

    res.status(200).redirect(`/login?mesaje=Usuario ${req.username} resgistrado correctamente. Username: ${req.user.email}`)
})

/*app.get('/protected', function(req, res, next) {
    passport.authenticate('local', function(err, user, info, status) {
      if (err) { return next(err) }
      if (!user) { return res.redirect('/signin') }
      res.redirect('/account');
    })(req, res, next);
});*/