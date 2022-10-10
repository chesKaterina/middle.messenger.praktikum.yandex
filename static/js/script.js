function onChangeAvatar(){
  var imageName = document.getElementById("imageName")
  var inputFile = document.getElementById("avatar")
  imageName.innerText = inputFile.files[0].name
}
