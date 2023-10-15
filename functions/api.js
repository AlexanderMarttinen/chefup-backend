const bodyParser = require("body-parser");
const express = require("express");
const serverless = require("serverless-http");
const app = express();
const router = express.Router();
const cors = require("cors");
const openAI = require("../src/modules/openai/index");
//const Context = require("@netlify/edge-functions");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

router.get("/", (req, res) => {
  res.json({
    path: "Home",
    firstName: "Brian",
    lastName: "Harris",
  });
});

router.post("/ai", async (req, res) => {
  const data = req.body;

  // const test = getStreamingCompletion.getUsers();
  //res.json(data.userPrompt)

  const stream = new ReadableStream({
    async start(controller) {
      const response = await openAI.doSomethingSlow(data.userPrompt);
      controller.enqueue(new TextEncoder().encode(response));
      controller.close();
    },
  });
  return new Response(stream, {
    headers: {
      "Content-Type": "text/json",
    },
  });

  // const stream = await openAI.getStreamingCompletion(data.userPrompt);
  // for await (const part of stream) {
  //     // Uncomment below if you want to check chunk time generation
  //     const chunkTime = (Date.now() - starttime) / 1000;
  //     process.stdout.write(part.choices[0]?.delta || "");
  //     console.log("chunk time:", chunkTime);
  //     try{
  //         res.write(part.choices[0]?.delta.content || "");
  //     } catch(err){
  //         console.log(err);
  //     }

  //   }
  //   res.end();
});

router.get("/json", (req, res) => {
  res.json({
    path: "json",
    author: "Brian Harris",
  });
});
app.use("/", router);

module.exports.handler = serverless(app);
