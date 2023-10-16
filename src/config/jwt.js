import jwt from "jsonwebtoken"

export const createToken = (data)=>{
    let token = jwt.sign({data},"NHANAN", {expiresIn : "1y"})
    return token
}
export const checkToken = (token) => {
    return jwt.verify(token, "NHANAN")
}
export const decodeToken = (token)=>{
    return jwt.decode(token)
}

export const lockApi = (req,res,next) => {
    try {
        let {token} =  req.body
        checkToken(token)
        next()
    } catch (err) {
        res.status(401).send("Ông là ai mà vào đây")
    }
}