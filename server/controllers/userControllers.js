const users=require("../models/usersSchema");

const moment=require("moment");    //we need to enter date also


//create user

exports.userpost = async(req,res)=>{

    // console.log(req.body);

    const {firstname, email, mobile, gender, status} = req.body;


    //if user didnot enter any field show error
    if(!firstname||!email||!mobile||!gender||!status)
    {
        res.status(404).json({error:"All field are necessary to fill"});

    }

    //creating try and cache block to check if the user is already exist or not

    try {

        const preuser = await users.findOne({email:email});

        //if preuser exist we throw error

        if(preuser)
        {
            res.status(404).json({error:"This email is already exist"});

        }else
        {
            //if user doesnot exist create registration date
            
            const dateCreate=moment(new Date()).format("YYYY-MM-DD  hh:mm:ss");

            const userData =new users(
                {
                    firstname, email, mobile, gender, status,datecreated:dateCreate

                    //why we create key pairing for date only? because for other keys like email mobile
                    //input given by user has same name as schema but date has different

                }
            );

            await userData.save();

            res.status(200).json(userData);
                      


        }

        
    } catch (error) {

        res.status(404).json(error);
        console.log("catch block error");
        
    }

}



//get all users
exports.getUsers=async(req,res)=>{


    //using params queries for searching

    const search = req.query.search||"";  //if user is using search elemenet then it is used otherwise it will be empty
    //search contain all the data which user type after /getAllUsers?search=abcd


    //checking status active or inactive

    const status = req.query.status||""; 


    //same thing for searching by gender

    const gender=req.query.gender||"";



    //for sorting

    const sort = req.query.sort || "";


    //for pagination


    const page = req.query.page || 1;



    //we want to apply search on our firstname

    const query={

        firstname:{$regex:search,$options:"i"} //regex will search for the name and option i checks for case sensitivity
    }

    if(status !=="All")   //we choose all as bydefault otherwise it will change as user want to search
    {
        query.status=status;

    }

    if(gender !=="All")   //we choose all as bydefault otherwise it will change as user want to search
    {
        query.gender=gender;

    }

    const Item_Per_Page=req.query.items||4;  //by default it will take 4 items in one page but if user specify then it will change acc to user

    try {

        //skip to the page user wants to go

        const skip=(page-1)*Item_Per_Page

        const usersData=await users.find(query)   //mongodb query for all users

        .sort({datecreated:sort== "new" ? -1:1})  //mongodbquery for sort

        .limit(Item_Per_Page)  //setting the limit which tell how many data we wanty on a page

        .skip(skip);   //skip the no of data present in the skip var

        //if query is empty then it will search for all elements

        res.status(200).json(usersData);
        
    } catch (error) {

        res.status(404).json(error);
        console.log("catch block error");
        
    }
}


//get oone user by id

exports.getSingleuser=async(req,res)=>{

    const {id}=req.params;

    try 
    {

        const singleUsersData=await users.findOne({_id:id});   //mongodb query for 1 user _id ->database id 

        res.status(200).json(singleUsersData);
        

        
        
    } catch (error) {

        res.status(404).json(error);
        console.log("catch block error");
        
    }
}




// delete user
exports.deleteuser = async(req,res) =>{

    const {id}=req.params;

    try 
    {

        const deletwUsersData=await users.findByIdAndDelete({_id:id});   //mongodb query for delte ( _id ->database id )

        res.status(200).json(deletwUsersData);
        

        
        
    } catch (error) {

        res.status(404).json(error);
        console.log("catch block error");
        
    }


}


//update user

exports.updateUser = async(req,res) =>{

    //we need id as well as body id for search the user and body to update

    const {id}=req.params;

    const {firstname, email, mobile, gender, status} = req.body;

    try 
    {

        const dateUpdate=moment(new Date()).format("YYYY-MM-DD  hh:mm:ss");
        
        const updateUserData = await users.findByIdAndUpdate({_id:id},{


            firstname, email, mobile, gender, status,dateupdated:dateUpdate


        },{new:true}); //new true is written because if we didnot write new true the it will show us the old value


        await updateUserData.save();

        res.status(200).json(updateUserData);
        
    } catch (error) {

        res.status(404).json(error);
        console.log("catch block error");
        
    }

    
}