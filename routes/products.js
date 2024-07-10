const express=require('express')
const router= express.Router();
const{runJsT1,runJsT2,runPyT1,runPyT2,runCT2,runCT1,javaT2,javaT1,cppT1,cppT2,compileCpp,displayQues,compileAndRunJava,compileAndRunC,compileAndRunPython, compileAndRunJavascript}=require('../controllers/products')




router.post('/cpp',compileCpp)
router.post('/cppT1',cppT1)
router.post('/cppT2',cppT2)

router.post('/runJava',compileAndRunJava)
router.post('/runJavaT1',javaT1)
router.post('/runJavaT2',javaT2)

router.post('/runC',compileAndRunC)
router.post('/runCT1',runCT1)
router.post('/runCT2',runCT2)


router.post('/runPy',compileAndRunPython)
router.post('/runPyT1',runPyT1)
router.post('/runPyT2',runPyT2)


router.post('/runJS',compileAndRunJavascript)
router.post('/runJST1',runJsT1)
router.post('/runJST2',runJsT2)

router.get('/allQues',displayQues)




module.exports=router;