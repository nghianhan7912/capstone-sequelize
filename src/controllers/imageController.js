import { checkToken, decodeToken } from "../config/jwt.js";
import sequelize from "../models/connect.js";
import initModels from "../models/init-models.js";

const model = initModels(sequelize)

export const getUserInfo = (req, res) => {
    try {
        const token = req.headers["abc"]
        const userInfo = decodeToken(token)
        const { nguoi_dung_id, email, ho_ten, tuoi, anh_dai_dien } = userInfo.data.checkEmail
        const User = {
            nguoi_dung_id, email, ho_ten, tuoi, anh_dai_dien
        }
        res.send(User)
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export const getSavedImage = async (req, res) => {
    try {
        const { userId } = req.params
        const nguoi_dung_id = Number(userId)
        const Images = await model.luu_anh.findAll({
            where: {
                nguoi_dung_id
            }
        })
        if (Images) {
            res.send(Images)
        } else {
            res.send("Chưa có hình ảnh đã lưu")
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export const getCreatedImage = async (req, res) => {
    try {
        const { userId } = req.params
        const nguoi_dung_id = Number(userId)
        const Images = await model.hinh_anh.findAll({
            where: {
                nguoi_dung_id
            }
        })
        if (Images) {
            res.send(Images)
        } else {
            res.send("Chưa có hình ảnh đã tạo")
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export const deleteImage = async (req, res) => {
    try {
        const { imageId } = req.params;
        const hinh_id = Number(imageId);
        const checkImage = await model.hinh_anh.findOne({
            where: {
                hinh_id
            }
        })
        if (checkImage) {
            await model.binh_luan.destroy({
                where: {
                    hinh_id
                }
            });

            await model.luu_anh.destroy({
                where: {
                    hinh_id
                }
            });

            await model.hinh_anh.destroy({
                where: {
                    hinh_id
                }
            });


            res.send("Xóa thành công")
        } else {
            res.send("Hình ảnh không tồn tại")
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export const postImage = async (req, res) => {
    try {
        const token = req.headers["abc"]
        const { ten_hinh, duong_dan, mo_ta } = req.body
        const userInfo = decodeToken(token)
        const { nguoi_dung_id } = userInfo.data.checkEmail
        const newImage = {
            ten_hinh,
            duong_dan,
            mo_ta,
            nguoi_dung_id
        }

        await model.hinh_anh.create(newImage)
        res.send("Đã thêm thành công")
    } catch (error) {
        res.status(500).send(error.message);
    }
}