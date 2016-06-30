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

$("#image_form").submit(function () {
  var input = $("#input_image").get(0);
  var file = input.files[0];
  if (!input || !file) {
    return false;
  }

  var fileName = file.name;

  var reader = new FileReader();
  reader.onloadend = function (e) {
    var fileData = e.target.result;
    if (!fileData) {
      return false;
    }
    socket.emit('upload', {user_name: $("#name").val() ,fileName: fileName, fileData: fileData});
  };

  reader.readAsDataURL(file);
  $("#input_image").replaceWith($("#input_image").clone());
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
  $(".port-box").text("オンライン: " + res.value + "人");
});

socket.on("chat message", function (res) {
  var base = $("<li>");
  base.append($("<p>").text(res.id + " / " + res.stamp + " / " + res.user_id + " / " + res.user_name + " / " + (res.message || "")));
  if(res.image_path){
    base.append($("<img src='/upload/"+res.image_path+"'>"));
  }
  $("#messages").prepend(base);
});
