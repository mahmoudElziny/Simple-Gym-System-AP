import db_connection from '../../../DB/models/connection.js';

const today = new Date();

const addMember = (req,res,next)=>{
    const {name,nationalID,phoneNumber,membership,status,trainerID} = req.body;

    if(!name || !nationalID || !phoneNumber || !membership || !status || !trainerID){
      return res.json({message:'All fields are required'});
    }

    const insertQuery = `
    INSERT INTO members (name, nationalID, phoneNumber, membershipFrom, membershipTo, membershipCost, status,trainerID) VALUES ('${name}','${nationalID}','${phoneNumber}','${membership.from}','${membership.to}','${membership.cost}','${status}','${trainerID}')
    `;
    
    db_connection.execute(insertQuery,(err,result)=>{
      if(err){
        return res.json({message:'Query Error',Error: err.message});
      }
      if(!result.affectedRows){
         res.json({message: 'Member not added'});
      }
      return res.json({message:`Member Added successfully your id is ${result.insertId}`});
    });
};

const updateMember = (req,res,next)=>{
    let {id,name,membership,trainerID} = req.body;
    
    if(!name || !membership || !membership.from || !membership.to || !membership.cost || !trainerID){
      return res.json({message:'All fields are required'});
    }

    const insertQuery = `
    UPDATE members SET name='${name}', membershipFrom='${membership.from}',membershipTo='${membership.to}',membershipCost='${membership.cost}',trainerID='${trainerID}' WHERE id=${id}
    `;

    db_connection.execute(insertQuery,(err,result)=>{
      if(err){
        return res.json({message:'Query Error',Error: err.message});
      }
      if(!result.affectedRows){
         res.json({message: 'Member not updated'});
      }
      return res.json({message:`Member Updated successfully`});
    });
        
};
const deleteMember = (req,res,next)=>{
  let {id} = req.body;
  
  const insertQuery = `
  DELETE FROM members WHERE id=${id}
  `;

  db_connection.execute(insertQuery,(err,result)=>{
    if(err){
      return res.json({message:'Query Error',Error: err.message});
    }
    if(!result.affectedRows){
       res.json({message: 'Member not Deleted'});
    }
    return res.json({message:`Member Deleted successfully`});
  });
}

const getAllMembersAndMembersTrainer = (req,res,next)=>{
    
  const insertQuery = `
  SELECT * FROM members INNER JOIN trainers ON members.trainerID = trainers.id 
  `;


  db_connection.execute(insertQuery,(err,result)=>{
    if(err){
      return res.json({message:'Query Error',Error: err.message});
    }
  
    return res.json({data:result});
  });

}

const getSpecificMember = (req,res,next)=>{
  let {id} = req.body;
 
  const insertQuery = `
  SELECT * FROM members WHERE id = ${id}
  `;

  
  db_connection.execute(insertQuery,(err,result)=>{
    if(err){
      return res.json({message:'Query Error',Error: err.message});
    }
    if(!result[0]){
     res.json({message: 'Not found'});
    }
    
    let date = result[0].membershipTo.split('/');
    let day = date[0];
    let month = date[1];
    let year = date[2];

      if(Number(year) >= Number(String(today.getFullYear()))){
       if(Number(year) > Number(String(today.getFullYear()))){
        return res.json(result);
       }else{
        if(Number(month) >= Number(String(today.getMonth()+1))){
          if(Number(month) > Number(String(today.getMonth()+1))){
            res.json(result);
          }else{
            if(Number(day) >= Number(String(today.getDate))){
               res.json(result);
            }else{
                return res.json('this member is not allowed to enter the Gym');
            }
          }
        }else {
         return res.json('this member is not allowed to enter the Gym');
        }
       }
      
   }else{
     res.json('this member is not allowed to enter the Gym');
   }

  });
}

export default {
    addMember,
    updateMember,
    deleteMember,
    getAllMembersAndMembersTrainer,
    getSpecificMember
};