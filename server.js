require("dotenv").config();
const socket = require("socket.io");
const express = require("express");
const cors = require("cors");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
});
const port = process.env.PORT;

server.listen(port, function () {
  console.log("psc-websocket is running");
});
io.on("connection", function (socket) {
  socket.on("incident_notification", function (data) {
    io.sockets.emit("incident_notification", {
      lokasi: data.lokasi,
      deskripsi: data.deskripsi,
      nohp: data.no_hp,
      namapelapor: data.nama_pelapor,
      latkejadian: data.lat_kejadian,
      lngkejadian: data.lng_kejadian,
    });
  });
  socket.on("update_status", function (data) {
    io.sockets.emit("update_status", {
      data: data,
    });
  });
});
