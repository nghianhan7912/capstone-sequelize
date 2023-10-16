import { createToken, decodeToken } from "../config/jwt.js"
import sequelize from "../models/connect.js"
import initModels from "../models/init-models.js"
import bcryct, { hashSync } from "bcrypt"
let model = initModels(sequelize)

export const postRegister = async (req, res) => {
    try {
        const { email, mat_khau, ho_ten, tuoi } = req.body
        const checkUser = await model.nguoi_dung.findOne({
            where: {
                email,
            }
        })
        if (checkUser) {
            res.status(400).send("Email đã tồn tại")
        } else {
            let passCrypt = bcryct.hashSync(mat_khau, 10)
            const newData = {
                email,
                mat_khau : passCrypt, 
                ho_ten,
                tuoi,
                anh_dai_dien : ""
            }
            await model.nguoi_dung.create(newData)
            res.send("Bạn đã đăng kí thành công")
        }  
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export const postLogin = async (req,res) =>{
    try {
        const {email,mat_khau} = req.body
        let checkEmail = await model.nguoi_dung.findOne({
            where:{
                email,
            }
        })
        if(checkEmail){
            let checkPass = bcryct.compareSync(mat_khau,checkEmail.mat_khau)
            if(checkPass){
                let token = createToken({checkEmail})
                res.send(token) 
            } else {
                res.send("Mật khẩu không đúng")
            }
        } else {
            res.send("Email không đúng")
        }     
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export const updateUserInfo = async (req,res) => {
    try{
        const token = req.headers["abc"]
        const userInfo = decodeToken(token)
        const {nguoi_dung_id} = userInfo.data.checkEmail
        const { mat_khau , ho_ten,tuoi,anh_dai_dien} = req.body
        let user = await model.nguoi_dung.findOne({
            where:{
                nguoi_dung_id
            }
        })
        const passCrypt = hashSync(mat_khau,10)
        user = {...user,mat_khau : passCrypt ,ho_ten,anh_dai_dien,tuoi}
        await model.nguoi_dung.update(user,{
            where: {
                nguoi_dung_id
            }
        })
        res.send("Cập nhật thành công")
    } catch (err) {
        res.status(500).send(err.message)
    }
}