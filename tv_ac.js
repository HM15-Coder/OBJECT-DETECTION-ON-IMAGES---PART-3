img ="";
status= "";
objects = [];
function preload()
{
  img = loadImage("tv_with_ac_image.jpg");
}
function setup()
{
  canvas = createCanvas(700,450);
  canvas.position(380,450);
  canvas.center();
  objectDetector=ml5.objectDetector('cocossd',modelLoaded);
  document.getElementById("status").innerHTML= "Status : Detecting Objects";
}
function draw()
{
   image(img,0,0,700,450);

    if(status != ""){

      r = random(255);
      g = random(255);
      b = random(255);

      objectDetector.detect(img,gotResult);
      

      for(i = 0; i < objects.length; i++)
      {
        document.getElementById("status").innerHTML = "Status: Object Detected";
        percent = floor(objects[i].confidence * 100);
        fill(r,g,b);
        text(objects[i].label + "" + percent + "%" , objects[i].x+15, objects[i].y+15);
        noFill();
        stroke(r,g,b);
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
      }
    }
}
function modelLoaded()
{
  console.log("Model Loaded!");
  status = true;
  objectDetector.detect(img,gotResult);
}
function gotResult(error,results)
{
  if(error){
    console.error(error);
  }
  else{
    console.log(results);
    objects = results;
  }
}