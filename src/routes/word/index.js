const express = require('express')
const TodoRouter = express.Router()

const Word = require("../../models/Word");

TodoRouter.route('/(:word)?').get( async (req, res) => {
    let words = []
    const { word } = req.params
    const queries = word.split(',')
    

    if(word !== "undefined" && word !== undefined){ // 사용자로부터 쿼리가 존재하는 경우
        // db.collection.find({ r_word: word })// 쿼리로 DB 검색
        console.log(queries)
        try{
            words = await Word.find({ r_des: {$in: queries}})
            // words = await Word.find({ r_word: word})
            //words = await Word.find({ r_word: { $regex: `^${word}`}}) //`^${}` 시작하는자리 검색
            //words = await Word.find({ r_word: { $regex: `${word}$`}}) //`${}$` 검색어 끝나는자리
            //words = await Word.find({ r_des: { $regex: `${word}`}})
            //r_word 필드에서 word로 시작하는 검색어 regex:
            // words = await Word.find({
            //     $or: [
            //         {r_word: {$regex: `${word}`}},
            //         {r_des: {$regex: `${word}`}}
            //     ]
            // }).sort({"_id": -1}) //-1이 최신순(내림차순)  1이 과거순(오름차순)
            // .limit(6) //6개 까지만 검색
        }catch(e){
            console.log(e)
        }
        
    }else{ // 쿼리가 없는 경우
        // words = await Word.find() // 전체 DB 조회
        console.log(word)
        console.log(`word database: ${Word}`)
        try{
            words = await Word.find()
        }catch(e){
            console.log(e)
        }
        
    }
    res.json({ status:200, words})
})

module.exports = TodoRouter