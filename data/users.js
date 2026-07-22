
const mongoCollections = require("../config/mongoCollections");
const users = mongoCollections.users;


const bcrypt = require("bcryptjs")
// create user
async function create(userName, Email,Gender,Age,hashedPassword) {
    //all the parameter should be check in routing
    const usersCollection = await users();
    let newUsers = {
        userName: userName,
        Email: Email,
        Gender: Gender,
        Age: Age,
        hashedPassword:hashedPassword,
        comments:[]
    };
    const insertInfo = await usersCollection.insertOne(newUsers);
    if (insertInfo.insertedCount === 0) {
        throw "Could not add user";
    }
    const newId = String(insertInfo.insertedId);
    const user = await this.get(newId);
    return user;
}

async function getAll(){
    const usersCollection = await users();
    return await usersCollection.find({}).toArray();
}

//储存在database里的密码已经hash过了，查找的时候需要bcrypt进行比较
async function ifAuthenticated(userName,userPassword){
    const usersCollection = await users();
    
    const user = await usersCollection.findOne({ userName: userName });
    
    const dbPassword = user.hashedPassword;
    
    bcrypt.compare(userPassword,dbPassword, function(err, bcryptres) {
        if(bcryptres===false){
            //console.log(1);
            return false;
        }
        //console.log(2);
        return user;
     });
}


//its for testing
async function get(id){
    const usersCollection = await users();
    const { ObjectId } = require('mongodb');
    const objId = ObjectId.createFromHexString(String(id))
    const user = await usersCollection.findOne({ _id: objId });
   
    if (user === null) {
      throw "No user with that id"
    }
    return user;
}

// update needed

async function passwordUpdate(userName,pw){

    const usersCollection = await users();
    const updatedUsers = {
        $set: {
            hashedPassword: pw
        }
    }
    const updateInfo = await usersCollection.updateOne({ userName: userName }, updatedUsers);
    const user = await usersCollection.findOne({ userName: userName });
   
    if (user === null) {
      throw "No user with that id"
    }
    return user;
}

async function EmailUpdate(userName,email){
    const usersCollection = await users();
    const updatedUsers = {
        $set: {
            Email: email
        }
    }
    const updateInfo = await usersCollection.updateOne({ userName: userName }, updatedUsers);
    const user = await usersCollection.findOne({ userName: userName });
   
    if (user === null) {
      throw "No user with that id"
    }
    return user;
}

async function GenderUpdate(userName,Gender){
    const usersCollection = await users();
    const updatedUsers = {
        $set: {
            Gender: Gender
        }
    }
    const updateInfo = await usersCollection.updateOne({ userName: userName }, updatedUsers);
    const user = await usersCollection.findOne({ userName: userName });
   
    if (user === null) {
      throw "No user with that id"
    }
    return user;
}
async function AgeUpdate(userName,Age){
    const usersCollection = await users();
    const updatedUsers = {
        $set: {
            Age: Age
        }
    }
    const updateInfo = await usersCollection.updateOne({ userName: userName }, updatedUsers);
    const user = await usersCollection.findOne({ userName: userName });
   
    if (user === null) {
      throw "No user with that id"
    }
    return user;
}

async function AdminUpdate(userName,ifAdmin){
    const usersCollection = await users();
    const updatedUsers = {
        $set: {
            ifAdmin: ifAdmin
        }
    }
    const updateInfo = await usersCollection.updateOne({ userName: userName }, updatedUsers);
    const user = await usersCollection.findOne({ userName: userName });
   
    if (user === null) {
      throw "No user with that id"
    }
    return user;
}


module.exports.create = create
module.exports.getAll = getAll
module.exports.get = get
module.exports.ifAuthenticated = ifAuthenticated
module.exports.passwordUpdate = passwordUpdate
module.exports.EmailUpdate = EmailUpdate
module.exports.GenderUpdate = GenderUpdate
module.exports.AgeUpdate = AgeUpdate
module.exports.AdminUpdate = AdminUpdate



