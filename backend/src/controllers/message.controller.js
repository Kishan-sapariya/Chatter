import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudinary from "../lib/cloudinary.js"
import { getReceiverSocketId, io } from "../lib/socket.js";

export const getUserForSideBar=async(req,res)=>{
    try {
        const loggedInUser=req.user._id;
        const filteredUser=await User.find({_id:{$ne:loggedInUser}}).select("-password");

        res.status(200).json(filteredUser);
    } catch (error) {
        console.log("Error in getUserForSidebar at message.controller.js",error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const getMessages=async(req,res)=>{
    try {
        const {id:userToChatId}=req.params;
        const myId=req.user._id;
        const messages=await Message.find({
            $or:[
                {senderId:myId,receiverId:userToChatId},
                {senderId:userToChatId,receiverId:myId}
            ]
        })
        res.status(200).json(messages);
    } catch (error) {
        console.log("Error in getMessages at message.controller.js",error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const sendMessages=async(req,res)=>{
    try {
        const {id:receiverId}=req.params;
        const {text,image}=req.body;
        const senderId=req.user._id;

        let imageUrl;
        if(image){
            const uploadedResposne=await cloudinary.uploader.upload(image);
            imageUrl=uploadedResposne.secure_url;
        }
        const newMessage=await Message({
            senderId:senderId,
            receiverId:receiverId,
            text:text,
            image:imageUrl
        })
        await newMessage.save();

        const receiverSocketId=getReceiverSocketId(receiverId);
        //here using to because we want to send msg only to mentioned receiverSocketId and not everyone
        io.to(receiverSocketId).emit("newMessage",newMessage);

        res.status(201).json(newMessage);
    } catch (error) {
        console.log("Error in sendMessgaes at message.controller.js",error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

