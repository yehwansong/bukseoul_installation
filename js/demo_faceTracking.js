
var w = 1000
var h = 1000


var movingamount = [0,0,0,0]
var hideface = [0,0,0,0]
$('document').ready(function(){
    var canv = document.createElement('canvas');
    canv.id = 'jeeFaceFilterCanvas';
    canv.width = w
    canv.height = h
    $('#face_wrap_wrap').css({'width':w})
    $('#face_wrap_wrap').css({'height':h})

    document.getElementsByTagName('body')[0].appendChild(canv)
    main()
})
function main(){
        var CVD; //return of Canvas2DDisplay

        var or_x = 0;
        var or_y = 0;
        var or_z = 0;
        var counter = 0
const SETTINGS={
  maxFaces: 4, //max number of detected faces
};
    JEEFACEFILTERAPI.init({
        canvasId: 'jeeFaceFilterCanvas',
        NNCpath: 'js/', //root of NNC.json file
        maxFacesDetected: SETTINGS.maxFaces,
        callbackReady: function(errCode, spec){
            if (errCode){
                console.log('AN ERROR HAPPENS. SORRY BRO :( . ERR =', errCode);
                return;
            }

            console.log('INFO : JEEFACEFILTERAPI IS READY');
            CVD = JEEFACEFILTERAPI.Canvas2DDisplay(spec);
            CVD.ctx.strokeStyle='#ffffffff';
            CVD.ctx.lineWidth=0;
        },
        callbackTrack: function(detectState){
            CVD.ctx.clearRect(0,0,CVD.canvas.width, CVD.canvas.height);
            // console.log(detectState)
            for (var i = detectState.length - 1; i >= 0; i--) {
                if (detectState[i].detected>0.5){
                        movingamount[i] = movingamount[i]+1
                        hideface[i] = 0
                        if(movingamount[i]>10){
                        $('.face_ani').removeClass('face_ani')
                        var faceCoo=CVD.getCoordinates(detectState[i]);
                            // console.log(map_range(detectState[i].x, 1, -1, 0, w))
                            if(i == 0){ 
                                Body.setPosition(face1, { x: map_range(detectState[i].x, 1, -1, 0, w) , y:map_range(detectState[i].y, 1, -1, 0, h)}); 
                                face_change(detectState[0], 0)
                                $('#face_wrap_1').css({top:map_range(detectState[i].y, 1, -1, 0, h)})
                                $('#face_wrap_1').css({left:map_range(detectState[i].x, 1, -1, 0, w)})
                                $('#face_wrap_1').css({'transform':'rotateX('+ map_range(detectState[i].rx, 1, -1, 90, -90)  +'deg) \
                                                rotateY('+ map_range(detectState[i].ry, 1, -1, 90, -90)  +'deg) \
                                                rotateZ('+ map_range(detectState[i].rz, 1, -1, 90, -90)  +'deg) translateZ(-75px)'})
                            }
                            if(i == 1){
                                Body.setPosition(face2, { x: map_range(detectState[i].x, 1, -1, 0, w) , y:map_range(detectState[i].y, 1, -1, 0, h)}); 
                                face_change(detectState[1], 1)
                                $('#face_wrap_2').css({top:map_range(detectState[i].y, 1, -1, 0, h)})
                                $('#face_wrap_2').css({left:map_range(detectState[i].x, 1, -1, 0, w)})
                                $('#face_wrap_2').css({'transform':'rotateX('+ map_range(detectState[i].rx, 1, -1, 90, -90)  +'deg) \
                                                rotateY('+ map_range(detectState[i].ry, 1, -1, 90, -90)  +'deg) \
                                                rotateZ('+ map_range(detectState[i].rz, 1, -1, 90, -90)  +'deg) translateZ(-75px)'}) 
                            }
                            if(i == 2){
                                Body.setPosition(face3, { x: map_range(detectState[i].x, 1, -1, 0, w) , y:map_range(detectState[i].y, 1, -1, 0, h)}); 
                                face_change(detectState[2], 2)
                                $('#face_wrap_3').css({top:map_range(detectState[i].y, 1, -1, 0, h)})
                                $('#face_wrap_3').css({left:map_range(detectState[i].x, 1, -1, 0, w)})
                                $('#face_wrap_3').css({'transform':'rotateX('+ map_range(detectState[i].rx, 1, -1, 90, -90)  +'deg) \
                                                rotateY('+ map_range(detectState[i].ry, 1, -1, 90, -90)  +'deg) \
                                                rotateZ('+ map_range(detectState[i].rz, 1, -1, 90, -90)  +'deg) translateZ(-75px)'}) 
                            }
                            if(i == 3){
                                Body.setPosition(face4, { x: map_range(detectState[i].x, 1, -1, 0, w) , y:map_range(detectState[i].y, 1, -1, 0, h)}); 
                                face_change(detectState[3], 3)
                                $('#face_wrap_4').css({top:map_range(detectState[i].y, 1, -1, 0, h)})
                                $('#face_wrap_4').css({left:map_range(detectState[i].x, 1, -1, 0, w)})
                                $('#face_wrap_4').css({'transform':'rotateX('+ map_range(detectState[i].rx, 1, -1, 90, -90)  +'deg) \
                                                rotateY('+ map_range(detectState[i].ry, 1, -1, 90, -90)  +'deg) \
                                                rotateZ('+ map_range(detectState[i].rz, 1, -1, 90, -90)  +'deg) translateZ(-75px)'}) 
                            }

                            CVD.ctx.strokeRect(faceCoo.x, faceCoo.y, faceCoo.w, faceCoo.h);
                        }


                }else{
                    hideface[i] = hideface[i] + 1
                    // if(hideface[i]>10){
                    //     movingamount = 0
                    // }
                    if(hideface[i]>100){
                        $('#face_2').addClass('face_ani')
                            if(i == 0){
                                Body.setPosition(face1, { x: -10000 , y: -10000}); 
                                $('#face_wrap_1').css({top:-100})
                                $('#face_wrap_1').css({left:-100})
                            }
                            if(i == 1){
                                Body.setPosition(face2, { x: -10000 , y: -10000});  
                                $('#face_wrap_2').css({top:-100})
                                $('#face_wrap_2').css({left:-100})
                            }
                            if(i == 2){
                                Body.setPosition(face3, { x: -10000 , y: -10000});  
                                $('#face_wrap_3').css({top:-100})
                                $('#face_wrap_3').css({left:-100}) 
                            }
                            if(i == 3){
                                Body.setPosition(face4, { x: -10000 , y: -10000});  
                                $('#face_wrap_4').css({top:-100})
                                $('#face_wrap_4').css({left:-100})
                            }
                    };
                }
            }
            CVD.update_canvasTexture();
            CVD.draw();
        } 
    }); 
} //end main()

function angle(cx, cy, ex, ey) {
  var dy = ey - cy;
  var dx = ex - cx;
  var theta = Math.atan2(dy, dx); // range (-PI, PI]
  theta *= 180 / Math.PI; // rads to degs, range (-180, 180]
  //if (theta < 0) theta = 360 + theta; // range [0, 360)
  return theta;
}



or_y = [0,0,0,0]
counter = [0,0,0,0]
function face_change(detectState, i){
                        if(Math.abs(detectState.ry - or_y[i]) > 0.1){
                            or_y[i] = detectState.ry
                            counter[i]++
                            $('#face_wrap_'+(i+1)+'>div').hide()
                            $('#face_wrap_'+(i+1)+'> #face_' + (counter[i]%4+1)).show()
                            $('#face_wrap_'+(i+1)+'> #face_' + (counter[i]%4+5)).show()
                        }

}
function map_range(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}