const express=require('express')
const Router=express.Router();
//const student = require('../models/student');

Router.get('/',(err,res)=>{
    res.render('register',{'title':'fill form',password:"",email:""})
})

Router.post('/register',async(req,res)=>{
try {
    const{
        name,
        number,
        email,
        password,
        cpassword
    }=req.body;
   if(password===cpassword){
    // const userData=new student({
    //             name,
    //             number,
    //             email,
    //             password
    //         })
    //         userData.save(err=>{
    //      if(err){
    //          console.log('error')
    //      }else{
    //          res.render('register',{'title':'done',password:"",email:""})
    //      }
    //          })
    res.render('register',{'title':'user registered successfuly',password:"",email:""})
   }else{
    res.render('register',{'title':'',password:"password invalid",email:""})
   }
   
  

    
   
 } catch (error) {
    res.render('register',{'title':'error',password:"",email:""})
 }

})
module.exports = Router;