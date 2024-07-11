const router = require('express').Router();
const multer = require('multer')
const path = require('path');
const { signUp, getUser, updateUser } = require('../Controller/authController');
const { createEmployee, getAllEmployees, getEmployeeById, deleteEmployee, updateEmployee } = require('../Controller/employeeController');

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

router.route('/create').post(upload.single('avatar'),createEmployee);
router.route('/getall').get(upload.single('avatar'),getAllEmployees);
router.route('/getall/:id').get(upload.single('avatar'),getEmployeeById);
router.route('/delete/:id').delete(deleteEmployee);
router.route('/employee/:id').put(upload.single('avatar'),updateEmployee);







module.exports=router;

