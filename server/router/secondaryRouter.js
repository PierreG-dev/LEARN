const API = require("../API");

module.exports = (app, io) => {
  //============== LIVE CHAT =====================//

  // app.put('/api/chatConnect', API.putAuthChat);
  // app.put('/api/chatDisconnect', API.putDisconnectChat);
  app.post("/api/getChat", API.getMessages);
  app.post("/api/postChat", API.postMessageChat);

  //============== EXERCICE GENERATOR =====================//
  app.post("/api/getGeneratedExercices", API.getGeneratedExercices);

  //============== FOR MY STUDENTS ===============//
  app.get("/api/tutu", (req, res) => {
    res.status(200).send("cursed");
  });
  app.get("/api/toto", (req, res) => {
    res.status(200).send("Hello world!");
  });
  app.get("/api/cda062022", (req, res) => {
    res
      .status(200)
      .send([
        "Noémie",
        "Valentin",
        "Guillaume",
        "Quiterie",
        "Abdou",
        "Jason",
        "Stéphane",
      ]);
  });
  app.get("/api/myIP", async (req, res) => {
    let ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    let location;
    await fetch(`http://ip-API.com/json/${ip}`)
      .then((response) => response.json())
      .then((data) => {
        location = data;
      });
    res.status(200).send({
      ip: ip,
      location: location,
    });
  });

  app.post("/fileTest", (req, res) => {
    if (!req.files) res.status(500).send("No files were caught..");
    let imageFile = req.files.file;
    console.log(imageFile);
    imageFile.mv(
      `${__dirname}/public/uploads/${req.body.fileName}.jpg`,
      (err) => {
        if (err) {
          return res.status(500).send(err);
        }

        res.json({ file: `public/${req.body.filename}.jpg` });
        console.log(res.json);
      }
    );

    // res.status(200).send(req.files);
  });
};
