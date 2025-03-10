import {db} from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";

export const getLikes = (req, res)=>{
    
     const q = "SELECT userId from likes WHERE postId = ?";
    
    
        db.query(q, [req.query.postId], (err, data) => {
            if (err) {
                console.error("Erro no banco de dados:", err); // <-- Log no servidor
                return res.status(200).json({ error: "Likes!" });
            }
            return res.status(200).json(data.map(like=>like.userId));
        })
};

export const addLike = (req, res) => {

    const token = req.cookies.accessToken;
    if(!token) return res.status(401).json("Not Logged.")

    jwt.verify(token, "secretKey", (err, userInfo)=>{
        if(err) return res.status(403).json("Token is not valid.")

    const q = "INSERT INTO likes (`userId`, `postId`) VALUES (?)";

    const values = [
        userInfo.id,
        req.body.postId
    ]

    db.query(q, [values], (err, data) => {
        if (err) {
            console.error("Erro no banco de dados:", err); // <-- Log no servidor
            return res.status(200).json({ error: "Post has been liked!" });
        }
        return res.status(200).json(data);
    })

    
    });
};

export const deleteLike = (req, res) => {

    const token = req.cookies.accessToken;
    if(!token) return res.status(401).json("Not Logged.")

    jwt.verify(token, "secretKey", (err, userInfo)=>{
        if(err) return res.status(403).json("Token is not valid.")

    const q = "DELETE FROM likes WHERE `userId` = ? AND `postId` = ?";

    db.query(q, [userInfo.id, req.query.postId], (err, data) => {
        if (err) {
            console.error("Erro no banco de dados:", err); // <-- Log no servidor
            return res.status(200).json({ error: "Post has been disliked!" });
        }
        return res.status(200).json(data);
    })

    
    });
};
