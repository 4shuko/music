import httpInstance from '../utils/http';

// 获取统计数据
export async function fetchStatistics() {
    try {
        const response = await httpInstance.get("/admin/statistics"); // 使用 httpInstance
        return response.data;
    } catch (error) {
        console.error("Error fetching statistics:", error);
        return null;
    }
}