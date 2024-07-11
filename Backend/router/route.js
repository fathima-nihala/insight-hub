const router = require('express').Router();
const multer = require('multer')
const path = require('path');
const { signUp, getUser, updateUser } = require('../Controller/authController');

const upload = multer({storage:multer.diskStorage({
    destination: function(req, file, cb){
        cb(null,path.join(__dirname,'..','upload'))
    },
    filename:function(req, file, cb){
        cb(null, file.originalname)
    }
})})




router.route('/register').post(upload.single('avatar'),signUp);
router.route('/getuser/:id').get(upload.single('avatar'),getUser);
router.route('/edit/:id').put(upload.single('avatar'),updateUser);


module.exports=router;

