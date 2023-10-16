import { checkToken } from "../config/jwt.js";
import sequelize from "../models/connect.js"
import initModels from "../models/init-models.js"
import { Sequelize } from "sequelize";

let model = initModels(sequelize)

let Op = Sequelize.Op

export const getImagesList = async (req,res) => {
    try {
            const imagesList = await model.hinh_anh.findAll()
            res.send(imagesList) 
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export const getImagesListByName = async (req,res) => {
    try {
            let {nameImage} = req.query
            let data = await model.hinh_anh.findAll({
                where:{
                    ten_hinh : {
                        [Op.like] : `%${nameImage}%`
                    }
                }
            })
            res.send(data)    
            return
    } catch (error) {
        res.status(500).send(error.message);
    }
}

