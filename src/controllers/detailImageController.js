import { checkToken, decodeToken } from "../config/jwt.js";
import sequelize from "../models/connect.js";
import initModels from "../models/init-models.js";

let model = initModels(sequelize)

export const getDetailImage = async (req, res) => {
    try {
        const token = req.headers["abc"]
        const Token = checkToken(token)
        if(Token){
            const { hinhId } = req.params
            const hinh_id = Number(hinhId)
            const data = await model.hinh_anh.findOne({
                where: {
                    hinh_id
                },
                include: {
                    model: model.nguoi_dung,
                    as: "nguoi_dung"
                }
            })
            if(data){
                res.send(data)
                return
            }
            res.send("Không có hình với id đang tìm kiếm")
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export const getCommentByIdImage = async (req, res) => {
    try {
        const token = req.headers["abc"]
        const Token = checkToken(token)
        if(Token) {
            const { hinhId } = req.params
            const hinh_id = Number(hinhId)
            const data = await model.binh_luan.findAll({
                where: {
                    hinh_id
                }
            })
            res.send(data)
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export const getCheckImage = async (req, res) => {
    try {
        const token = req.headers["abc"]
        const Token = checkToken(token)
        if(Token){
            const { hinhId } = req.params
            const hinh_id = Number(hinhId)
            let daLuu = true
            const checkImage = await model.luu_anh.findOne({
                where: {
                    hinh_id
                }
            })
            if (checkImage) {
                res.send(daLuu)
                return
            }
            res.send(daLuu = false)
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export const saveImage = async (req,res) => {
    try{
        const token = req.headers["abc"]
        const Token = checkToken(token)
        if(Token){
            const {idImage} = req.params
            const hinh_id = Number(idImage)
            const check = await model.hinh_anh.findOne({
                where:{
                    hinh_id
                }
            })
            if(check){
                const user = decodeToken(token)
                const {nguoi_dung_id} = user.data.checkEmail
                const checkImage = await model.luu_anh.findOne({
                    where:{
                        nguoi_dung_id,
                        hinh_id
                    }
                })
                if(!checkImage){
                    const data = {
                        nguoi_dung_id,
                        hinh_id,
                        ngay_luu : new Date()
                    }
                    await model.luu_anh.create(data)
                    res.send("Lưu ảnh thành công")
                    return  
                }
                res.send("Hình ảnh đã tồn tại")    
                return
            }
            res.send("Hình ảnh không tồn tại hoặc đã bị xoá")
        }
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export const postCommentImage = async (req, res) => {
    try {
        const token = req.headers["abc"]
        const Token = checkToken(token)
        if(Token){
            const { hinhId } = req.params
            const hinh_id = Number(hinhId)
            const { noi_dung } = req.body
            const userInfo = decodeToken(token)
            const { nguoi_dung_id } = userInfo.data.checkEmail
            const newData = {
                hinh_id,
                nguoi_dung_id,
                noi_dung,
                ngay_binh_luan: new Date()
            }
    
            await model.binh_luan.create(newData)
            res.send("bình luận thành công")
            return      
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
}