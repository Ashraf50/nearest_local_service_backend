const { createClient } = require("@supabase/supabase-js");
const supabase = createClient(process.env.SUBA_URL, process.env.SUBA_KEY);

async function fetchData(req, res) {
    const  type  = req.query.type;
    console.log("Type passed:", type);
    const { data, error } = await supabase
      .from("banks")
      .select("*")
      .eq("type", type);
    if (error) {
      return res
        .status(500)
        .json({ error: "Error fetching data", details: error });
    }
  
    res.json(data);
  }
module.exports = {
  fetchData,
};
