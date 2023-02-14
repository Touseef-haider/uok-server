const cloudinary = require('cloudinary')

exports.uploadFile = async (req,res,next)=>{
    try{

        const result = await cloudinary.v2.uploader.upload(req.file.path,{
            folder: 'images',
        })

        return res.status(200).json(result?.secure_url);
    }catch(err){
        return next(err)
    }
}