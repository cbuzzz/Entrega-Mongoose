const mongoose = require('mongoose');
const User = require("./User")
const Post = require("./Post")


const createUser = async (userData) => {
  try {
      
      const user = new User(userData)
      
      await user.save()

      console.log("User created successfully:", user)
  } catch (error) {
      console.error("Error creating user:", error)
  }
}

const createPost = async (postData) => {
    try {
        const user = await User.findById(postData.author);
        if (!user) {
            console.log("User not found");
            return;
        }

        const post = new Post(postData);

        await post.save();

        console.log("Post created successfully:", post);
    } catch (error) {
        console.error("Error creating post:", error);
    }
}

const listUsers = async () => {
  try {
      const users = await User.find()
      console.log("Users list:", users)
  } catch (error) {
      console.error("Error listing users:", error)
  }
}

const getUserById = async (userId) => {
  try {
      const user = await User.findById(userId)
      if (user) {
          console.log("User found:", user)
      } else {
          console.log("User not found")
      }
  } catch (error) {
      console.error("Error finding user:", error)
  }
}

const deleteUser = async (userId) => {
  try {
      const user = await User.findByIdAndDelete(userId)
      if (user) {
          console.log("User deleted:", user)
      } else {
          console.log("User not found")
      }
  } catch (error) {
      console.error("Error deleting user:", error)
  }
}

async function connectDB() {
  try {
    await mongoose.connect('mongodb://localhost:27017/test'); // No need for options now
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Failed to connect:', err);
  }
}

connectDB();

run()
async function run() {
    try{
        // const user = await User.find()
        // console.log(user)

        // const post = await Post.find()
        // console.log(post)

        // createPost({
        //     title: "My New Post",
        //     body: "This is the body of the new post.",
        //     author: "66f96d7f599359c317fc4f91",  
        //     tags: ["coding", "mongoose", "nodejs"]  
        // });

        // createUser({
        //   name: "Toni",
        //   age: 30,                       
        //   email: "TONIROC@EMAIL.COM",      
        //   hobbies: ["reading", "coding"],  
        //   address: {
        //       street: "123 Main St",
        //       city: "Somewhere"
        //   }
        // })

        // getUserById("66f971ded738ac1793dccb77")


        // listUsers()
        

        // const user = await User.find({age: {$gt: 25}})
        // console.log(user)

        // const user = await User.find({$and : [{age: 22}, {name: "Sebas"}]})
        // console.log(user)


        // const user = await User.find()
        // console.log(user)
        // const user = await User.updateMany({age: {$gt: 25}} , {$push: {hobbies: "Golf"}})
        // console.log(user)
        
        // const user = await User.updateOne({name: "Kyle"}, { $set: { age: 12}})
        // console.log(user)

        // deleteUser("66fb096514a26fc1dcbdb3d6")



        

    } catch(e){
        console.log(e.message)
    }
}