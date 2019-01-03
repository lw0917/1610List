var express = require('express');
var router = express.Router();
var mongo=require("../mongo");
var mongodb=require('mongodb');

/* 查询 */
router.get('/api/list', function(req, res, next) {
    mongo(function(err,cols,con){
      if(err){
         res.json({code:1,msg:err})
      }else{
        cols.find().toArray(function(error,result){
          if(error){
            return res.json({code:1,msg:error})
          }
          res.json({code:0,msg:result});
            con.close();
        })
      }
    })  
});

router.post('/api/add',function(req,res,next){
     var type=req.body.type,
          age=req.body.age,
          name=req.body.name,
          title=req.body.title;
    mongo(function(err,cols,con){
      if(err){
        res.json({code:1,msg:err})
      }else{
        cols.find({name:name}).toArray(function(error,result){
          if(error){
            return res.json({code:1,msg:error})
          }
          console.log(result)
         if(result.length>0){
             return res.json({code:1,msg:'用户已存在'})
         }else{
          cols.insertOne({age:age,name:name,tyep:type,title:title},function(error,result){
           
            if(error){
              return res.json({code:1,msg:error})
            }
            res.json({code:0,msg:'添加成功'})
             con.close();
          })
         }
        })
      }
    })
})

router.get('/api/del',function(req,res,next){
  var id=req.query.id;
 mongo(function(err,cols,con){
   if(err){
     res.json({code:1,msg:err})
   }else{
     cols.deleteOne({_id:mongodb.ObjectId(id)},function(error,result){
      con.close();
      if(error){
         return res.json({code:1,msg:error})
       }
       res.json({code:0,msg:'删除成功'})
     })
   }
 })
})

router.get('/api/findOne',function(req,res,next){
  var id=req.query.id;
 mongo(function(err,cols,con){
   if(err){
     res.json({code:1,msg:err})
   }else{
     cols.findOne({_id:mongodb.ObjectId(id)},function(error,result){
      con.close();
      if(error){
         return res.json({code:1,msg:error})
       }
       res.json({code:0,msg:result})
     })
   }
 })
})

router.get('/api/update',function(req,res,next){
  var id=req.query.id,
      name=req.query.name;
 mongo(function(err,cols,con){
   if(err){
     res.json({code:1,msg:err})
   }else{
     cols.updateOne({"_id":mongodb.ObjectId(id)},{$set:{"name":name}},function(error,result){
      con.close(); 
      if(error){
         return res.json({code:1,msg:error})
       }
       res.json({code:0,msg:'修改成功'})
     })
   }
 })
})










module.exports = router;
