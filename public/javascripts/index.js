var socket = io();
socket.emit("init", $("h1").text());

$("#message_form").submit(function () {
  socket.emit("chat message", {name: "", message: $("#message").val()});
  $("#message").val("");
  return false;
});

socket.on("room in", function(res){
  $("#messages").append($("<li class='center'>").text(res.name + "さんが入室しました"));
});

socket.on("room member", function(res){
  $("#port-box").text("オンライン: " + res.value + "人");
});

socket.on("chat message", function (msg) {
  $("#messages").append($("<li>").text(msg));
});
