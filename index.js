const mongoose = require('mongoose');
const Dishes = require('./models/dishes');

const url = 'mongodb://127.0.0.1:27017/conFusion';

const connect = mongoose.connect(url);

connect.then((db)=>{
    console.log("Connnected correctly to the server");
    Dishes.create({
        name:"Milkshake",
        description:"High in fats"
    })
    .then((dish)=>{
        console.log(dish);
        return Dishes.findByIdAndUpdate(dish._id, {
            $set:{description:'Updated Test'}
        },{
             new: true 
        })
        .exec();
    })
    .then((dish)=>{
        console.log(dish);
        dish.comments.push({
            rating:5,
            comment: "I'm very sleepy",
            author: "andrew tate"
        });
        return dish.save();
    })
    .then((dish)=>{
        console.log("This is dish: "+dish);
        return Dishes.remove({});
    })
    .then(()=>{
        return mongoose.connection.close();
    })
    .catch((err)=>{
        console.log(err);
    });
});
