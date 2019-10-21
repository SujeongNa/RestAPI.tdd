//routing script
const express = require('express');
const router =express.Router();// Router class

const ctrl = require('./user.ctrl'); 

//express enables routing
router.get('/', ctrl.index);
router.get('/:id',ctrl.find );
router.delete('/:id',ctrl.destroy);
router.post('/', ctrl.create);
router.put('/:id', ctrl.update);

//export script to module
module.exports=router;