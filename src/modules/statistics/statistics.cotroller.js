import db_connection from '../../../DB/models/connection.js';


const getAllRevenuesOfAllMembers = (req,res)=>{
    let revenues = 0;

    const insertQuery =`
    SELECT membershipCost FROM members
    `;

    db_connection.execute(insertQuery,(err,result)=>{
        if(err){
          return res.json({message:'Query Error',Error: err.message});
        }

        for(let i=0;i<result.length;i++){
            revenues += result[i].membershipCost;
        }
       
        return res.send("Totall Revenues : " +String(revenues)+ " EGP");
      });

}

const getRevenuesOfSpecificTrainer = (req,res)=>{
    let {id} = req.body;

    let revenues = 0;

    const insertQuery =`
    SELECT membershipCost FROM members WHERE trainerID=${id}
    `;

    db_connection.execute(insertQuery,(err,result)=>{
     if(err){
       return res.json({message:'Query Error',Error: err.message});
     }

     for(let i=0;i<result.length;i++){
        revenues += result[i].membershipCost;
     }
   
     return res.send("Totall Revenues for this Trainer : " +String(revenues)+ " EGP");
   });

}

export default {
    getAllRevenuesOfAllMembers,
    getRevenuesOfSpecificTrainer
};