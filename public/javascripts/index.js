var socket = io();
socket.emit("init", $(".room-title").text());

$("#move_form").submit(function () {
  var room = $("#move_room").val();
  if(!room){
    return false;
  }
  location.href = "/" + room;
  return false;
});

$("#message_form").submit(function () {
  var sendMessage = $("#message").val();
  var sendName = $("#name").val();
  if(!sendMessage){
    return false;
  }
  socket.emit("chat message", {name: sendName, message: sendMessage});
  $("#message").val("");
  return false;
});

socket.on("room in", function(res){
  $("#messages").append($("<li class='center'>").text(res.name + "さんが入室しました"));
});

socket.on("room member", function(res){
  $("#port-box").text("オンライン: " + res.value + "人");
});

socket.on("chat message", function (res) {
  $("#messages").append($("<li>").text(res.stamp + " / " + res.user_id + " / " + res.user_name + " / " + res.msg));
});
