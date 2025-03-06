import mysql from "mysql2";

export const db = mysql.createConnection({
    host:"localhost",
    user: "root",
    password: "Pngf012488!",
    database: "social"
});