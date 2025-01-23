const { createClient } = require("@supabase/supabase-js");
const distance=require("./calculate_distance");
const supabase = createClient(process.env.SUBA_URL, process.env.SUBA_KEY);
async function fetchDataNearToFar(req, res) {
    const type = req.query.type;
    const userLat = parseFloat(req.query.lat);
    const userLon = parseFloat(req.query.lon);
    try {
        const { data, error } = await supabase
            .from("services")
            .select("*")
            .eq("type", type);
        if (error) throw error;
        const dataWithDistances = data.map((item) => {
            const distanceKm = distance.calculateDistance(
                userLat,
                userLon,
                item.latitude,
                item.longitude
            );
            return {
                ...item,
                distanceKm: Number(distanceKm.toFixed(2)),
                distanceMeters: Number((distanceKm * 1000).toFixed(0)),
            };
        });
        const sortedData = dataWithDistances.sort(
            (a, b) => a.distanceKm - b.distanceKm
        );
        res.json({
            length: sortedData.length,
            data: sortedData,
        });
    } catch (error) {
        return res.status(500).json({
            error: "Error fetching data",
            details: error.message,
        });
    }
}


module.exports = {
    fetchDataNearToFar,
};
