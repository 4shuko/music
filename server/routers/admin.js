const express = require("express");
const adminRouter = express.Router();
const { db } = require('../db/DbUtils');  // 替换为你的数据库连接文件路径

// 获取统计数据
adminRouter.get("/statistics", async (req, res) => {
    try {
        const userCount = await getUserCount();
        const songCount = await getSongCount();
        const singerCount = await getSingerCount();
        const songListCount = await getSongListCount();
        const userGenderRatio = await getUserGenderRatio();
        const songTypeDistribution = await getSongTypeDistribution();
        const singerGenderRatio = await getSingerGenderRatio();
        const singerNationalityDistribution = await getSingerNationalityDistribution();

        res.json({
            userCount,
            songCount,
            singerCount,
            playlistCount: songListCount, // 歌单数量
            userGenderRatio, // 用户性别比例
            songTypeDistribution, // 歌曲类型分布
            singerGenderRatio, // 歌手性别比例
            singerNationalityDistribution, // 歌手国籍分布
        });
    } catch (error) {
        console.error("Error fetching statistics:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// 统计函数
async function getUserCount() {
    const sql = "SELECT COUNT(*) AS userCount FROM consumer";
    const { err, rows } = await db.async.all(sql);
    if (err) {
        console.error("Error fetching user count:", err);
        return 0;
    }
    return rows[0].userCount;
}

async function getSongCount() {
    const sql = "SELECT COUNT(*) AS songCount FROM song";
    const { err, rows } = await db.async.all(sql);
    if (err) {
        console.error("Error fetching song count:", err);
        return 0;
    }
    return rows[0].songCount;
}

async function getSingerCount() {
    const sql = "SELECT COUNT(*) AS singerCount FROM singer";
    const { err, rows } = await db.async.all(sql);
    if (err) {
        console.error("Error fetching singer count:", err);
        return 0;
    }
    return rows[0].singerCount;
}

async function getSongListCount() {
    const sql = "SELECT COUNT(*) AS songListCount FROM song_list";
    const { err, rows } = await db.async.all(sql);
    if (err) {
        console.error("Error fetching song list count:", err);
        return 0;
    }
    return rows[0].songListCount;
}

// 用户性别比例
async function getUserGenderRatio() {
    const sql = "SELECT sex, COUNT(*) AS count FROM consumer WHERE sex IN (0, 1) GROUP BY sex";
    const { err, rows } = await db.async.all(sql);
    if (err) {
        console.error("Error fetching user gender ratio:", err);
        return [];
    }
    return rows;
}

// 歌曲类型分布
async function getSongTypeDistribution() {
    const sql = "SELECT style, COUNT(*) AS count FROM song_list GROUP BY style";
    const { err, rows } = await db.async.all(sql);
    if (err) {
        console.error("Error fetching song type distribution:", err);
        return [];
    }
    return rows;
}

// 歌手性别比例
async function getSingerGenderRatio() {
    const sql = "SELECT sex, COUNT(*) AS count FROM singer WHERE sex IN (0, 1) GROUP BY sex";
    const { err, rows } = await db.async.all(sql);
    if (err) {
        console.error("Error fetching singer gender ratio:", err);
        return [];
    }
    return rows;
}

// 歌手国籍分布
async function getSingerNationalityDistribution() {
    const sql = "SELECT location, COUNT(*) AS count FROM singer GROUP BY location";
    const { err, rows } = await db.async.all(sql);
    if (err) {
        console.error("Error fetching singer nationality distribution:", err);
        return [];
    }
    return rows;
}

module.exports = adminRouter;