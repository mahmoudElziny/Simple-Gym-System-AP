import express from 'express'

import db_connection from './DB/models/connection.js'

import memberRouter from './src/modules/member/member.routes.js'
import trainerRouter from './src/modules/trainer/trainer.routes.js'
import statisticsRouter from './src/modules/statistics/statistics.routes.js'

const app = express();

//connnection to database
db_connection

//parsing data to json
app.use(express.json());

app.use('/member',memberRouter);
app.use('/trainer',trainerRouter);
app.use('/statistics',statisticsRouter);


app.listen(3000,()=>{
    console.log('Server is running on port 3000');
});
