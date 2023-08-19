/* project to practice retrieving data and displaying it from a api call using axios*/
import bodyParser from "body-parser";
import express from "express";
import axios from "axios";
import {dirname} from "path";
import { fileURLToPath } from "url";
const _dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", async (req, res) => {
    try{
        const response = await axios.get("https://random.dog/woof.json")
        let url = response.data.url;
        while (!url.endsWith(".mp4")) {
            const newResponse = await axios.get("https://random.dog/woof.json");
            url = newResponse.data.url;
        }
        console.log(url);
        res.render("index.ejs", {activity: url});
    } catch (error) {
        console.error("failed to make request:", error.message);
        res.status(500).send("Failed to fetch activity, please try again");
    }
});

app.listen(port, () =>{
    console.log(`app is running, on the port ${port}`);
})