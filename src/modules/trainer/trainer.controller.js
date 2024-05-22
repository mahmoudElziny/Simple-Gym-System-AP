import db_connection from '../../../DB/models/connection.js';

const addTrainer = (req,res,next)=>{
    const {name,duration} = req.body;
    
    if(!name || !duration){
        return res.json({message:'All fields are required'});
    }

    const insertQuery = `
    INSERT INTO trainers(name, durationFrom, durationTo) VALUES ('${name}','${duration.from}','${duration.to}')
    `;

    db_connection.execute(insertQuery,(err,result)=>{
        if(err){
            return res.json({message:'Query Error',Error: err.message});
          }
          if(!result.affectedRows){
             res.json({message: 'Trainer not added'});
          }
          return res.json({message:`Trainer Added successfully your id is ${result.insertId}`});
    });
    


};

const updateTrainer = (req,res,next)=>{
    let {id,name,duration} = req.body;
    
    if(!name || !duration || !duration.from || !duration.to){
      return res.json({message:'All fields are required'});
    }

    const insertQuery = `
    UPDATE trainers SET name='${name}', durationFrom='${duration.from}',durationTo='${duration.to}' WHERE id=${id}
    `;

    db_connection.execute(insertQuery,(err,result)=>{
      if(err){
        return res.json({message:'Query Error',Error: err.message});
      }
      if(!result.affectedRows){
         res.json({message: 'Trainer not updated'});
      }
      return res.json({message:`Trainer Updated successfully`});
    });
};


const deleteTrainer = (req,res,next)=>{
    let {id} = req.body;
  
  const insertQuery = `
  DELETE FROM trainers WHERE id=${id}
  `;

  db_connection.execute(insertQuery,(err,result)=>{
    if(err){
      return res.json({message:'Query Error',Error: err.message});
    }
    if(!result.affectedRows){
       res.json({message: 'Trainer not Deleted'});
    }
    return res.json({message:`Trainer Deleted successfully`});
  });
 
}

const getAllTrainersAndTrainersMembers = (req,res,next)=>{
    const insertQuery = `
    SELECT trainers.id as trainerID ,trainers.name as Trainer_Name, trainers.durationFrom, trainers.durationTo,members.id as memberID ,members.name as member_Name
    ,members.nationalID,members.phoneNumber,members.membershipFrom,members.membershipTo,members.membershipCost,members.status,members.trainerID FROM trainers INNER JOIN members ON trainers.id = members.trainerID
    `;
  
    db_connection.execute(insertQuery,(err,result)=>{
        console.log(result);

      if(err){
        return res.json({message:'Query Error',Error: err.message});
      }
    
      return res.json({data:result});
    });
}

const getSpecificTrainerAndTrainersMembers =(req,res,next)=>{
    let {id} = req.body;

    const insertQuery = `
    SELECT trainers.id as trainerID ,trainers.name as Trainer_Name, trainers.durationFrom, trainers.durationTo,members.id as memberID ,members.name as member_Name
    ,members.nationalID,members.phoneNumber,members.membershipFrom,members.membershipTo,members.membershipCost,members.status,members.trainerID FROM trainers INNER JOIN members ON trainers.id = members.trainerID WHERE trainers.id = ${id}
    `;

    db_connection.execute(insertQuery,(err,result)=>{
        console.log(result);

      if(err){
        return res.json({message:'Query Error',Error: err.message});
      }
    
      return res.json({data:result});
    });

    
  
}

export default {
    addTrainer,
    updateTrainer,
    deleteTrainer,
    getAllTrainersAndTrainersMembers,
    getSpecificTrainerAndTrainersMembers
};