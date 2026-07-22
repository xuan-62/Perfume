
const mongoCollections = require("../config/mongoCollections");
var perfume = mongoCollections.perfume;

async function create(name,companyName,introduction) {
    // all the parameter should be check in routing
    
    const perfumeCollection = await perfume();
    let newPerfume = {
        name: name,
        picture: [],
        companyName: companyName,
        size:[],
        introduction:introduction,
        link:[],
        rating:[],
        tags:[]
    };
    const insertInfo = await perfumeCollection.insertOne(newPerfume);
    if (insertInfo.insertedCount === 0) {
        throw "Could not add animals";
    }
    const newId = String(insertInfo.insertedId);
    const newPerfumeData = await this.get(newId);
    return newPerfumeData;
}

async function insertSize(perfumeID,newSize){
    const perfumeCollection = await perfume();
    const { ObjectId } = require('mongodb');

    const objId = ObjectId.createFromHexString(String(perfumeID))


    const updatedAnimal = {
        $addToSet: {
            size: {
                $each:[newSize]
            }
        }
    }

    await perfumeCollection.updateOne({ _id: objId }, updatedAnimal);


    return await this.get(objId);
}
async function insertLink(perfumeID,newLink){
    const perfumeCollection = await perfume();
    const { ObjectId } = require('mongodb');

    const objId = ObjectId.createFromHexString(String(perfumeID))


    const updatedPerfume = {
        $addToSet: {
            link: {
                $each:[newLink]
            }
        }
    }

    await perfumeCollection.updateOne({ _id: objId }, updatedPerfume);


    return await this.get(objId);
}



async function getAll(){
    const perfumeCollection = await perfume();
    return await perfumeCollection.find({}).toArray();
}


async function get(id){
    const perfumeCollection = await perfume();
    const { ObjectId } = require('mongodb');
    const objId = ObjectId.createFromHexString(String(id))
    const perfumeD = await perfumeCollection.findOne({ _id: objId });
   
    if (perfumeD === null) {
      throw "No perfume with that id"
    }
    return perfumeD;
}

async function getUserReview(id){

}
//add comment
//for each comment：number of reported/dislikes/likes
//search tag&name of perfume&#description#

//add tags
async function addTags(id,tagText){

    const perfumeCollection = await perfume();
    const { ObjectId } = require('mongodb');
    const objId = ObjectId.createFromHexString(String(id))
    const perfumeD = await perfumeCollection.findOne({ _id: objId });
   
    if (perfumeD === null) {
      throw "No perfume with that id"
    }
    
    const updatedTag = {
        $addToSet: {
            tags: {text:tagText,
                likes:0,
                dislikes:0
            }
        }
    }
    await perfumeCollection.updateOne({ _id:objId}, updatedTag);
    const newPerfume = await perfumeCollection.findOne({ _id: objId });
    return newPerfume;
}


async function likeTags(id,tagText){

    const perfumeCollection = await perfume();
    const { ObjectId } = require('mongodb');
    const objId = ObjectId.createFromHexString(String(id))
    const perfumeD = await perfumeCollection.findOne({ _id: objId, "tags.text":tagText});
   
    if (perfumeD === null) {
      throw "No perfume with that id"
    }

    for(var i = 0;i<perfumeD.tags.length;i++){
        if(perfumeD.tags[i].text==tagText){
            
            var likes = perfumeD.tags[i].likes
        }
    }
    
    likes = likes + 1;
    likes = parseInt(likes);
    const updatedTag = {
        $set: {
            "tags.$.likes":likes
        }
    }
    
    await perfumeCollection.updateOne({  _id:objId,"tags.text":tagText}, updatedTag);
    const newPerfume = await perfumeCollection.findOne({ _id: objId });
    return newPerfume;
}


async function dislikeTags(id,tagText){

    const perfumeCollection = await perfume();
    const { ObjectId } = require('mongodb');
    const objId = ObjectId.createFromHexString(String(id))
    const perfumeD = await perfumeCollection.findOne({ _id: objId, "tags.text":tagText});
   
    if (perfumeD === null) {
      throw "No perfume with that id"
    }

    for(var i = 0;i<perfumeD.tags.length;i++){
        if(perfumeD.tags[i].text==tagText){
            
            var likes = perfumeD.tags[i].dislikes
        }
    }
    
    likes = likes + 1;
    likes = parseInt(likes);
    const updatedTag = {
        $set: {
            "tags.$.dislikes":likes
        }
    }
    
    await perfumeCollection.updateOne({  _id:objId,"tags.text":tagText}, updatedTag);
    const newPerfume = await perfumeCollection.findOne({ _id: objId });
    return newPerfume;
}

async function searchTag(tagText){
    const perfumeCollection = await perfume();
    const perfumeD = await perfumeCollection.find({ "tags.text": tagText }).toArray();
    return perfumeD;   
}




module.exports.create = create
module.exports.getAll = getAll
module.exports.insertSize = insertSize
module.exports.insertLink = insertLink
module.exports.get = get
module.exports.getUserReview = getUserReview
module.exports.addTags = addTags
module.exports.likeTags = likeTags
module.exports.dislikeTags = dislikeTags
module.exports.searchTag = searchTag


