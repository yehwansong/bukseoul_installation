var Engine = Matter.Engine,
        Render = Matter.Render,
        Runner = Matter.Runner,
        Composites = Matter.Composites,
        Common = Matter.Common,
        MouseConstraint = Matter.MouseConstraint,
        Mouse = Matter.Mouse,
        World = Matter.World,
        Body = Matter.Body,
        Constraint = Matter.Constraint,
        Vertices = Matter.Vertices,
        Bodies = Matter.Bodies;
var obs = []

    // create engine
    var engine = Engine.create(),
        world = engine.world;

    // create renderer
    var w = 1000
    var h = 1000
    var render = Render.create({
        element: document.body,
        engine: engine,
        options: {
            width: w,
            height: h,
            showAngleIndicator: false,
            background: 'transparent',
			wireframes: false,
			wireframeBackground: 'transparent'
        }
    });
    Render.run(render);

    var runner = Runner.create();
    Runner.run(runner, engine);

    var dol = Vertices.fromPath('61,0 131.5,1.4 157.4,33.6 191.9,152.4 180.4,206.2 94.9,231 60,234.9 15.6,202.1 0,138.8 14.9,70 ')
    var dol2 = Vertices.fromPath('30.5,0 65.7,0.7 78.7,16.8 95.9,76.2 90.2,103.1 47.5,115.5 30,117.5 7.8,101 0,69.4 7.4,35')
    var skewed_cirs = Vertices.fromPath('177.24 0 27.67 0 0 20.41 0 40.81 149.28 40.81 177.24 20.41 177.24 0')
    var half_cir = Vertices.fromPath('64.1,12.3 31.1,19.3 19.3,27.9 10.3,152.7 16.3,159.4 47.2,173.2 81,173.2 111.9,159.4 134.6,134.3 145,102.1 141.5,68.5 124.6,39.2 97.2,19.3')
    var tri = Vertices.fromPath('60.8 0 121.7 107.6 0 107.6 60.8 0')
    var inv_tri = Vertices.fromPath('0 0 145.6 0 72.4 43.6 0 0')
    var skew = Vertices.fromPath('102.04 0 0 0 50.37 47.44 152.41 47.44 102.04 0')
    var fuck = Vertices.fromPath('136.06 0 68.04 0 68.04 64.06 0.01 64.06 0.01 96.09 0 96.1 0 97.01 204.09 97.01 204.09 64.06 136.06 64.06 136.06 0')
    var tri1 = Vertices.fromPath('16.7,5 162.3,5 89.1,48.6 ')
    var tri2 = Vertices.fromPath('71.1,9.1 10.3,116.7 132,116.7')
    var blue_fric = 0.5
    var red_fric = 0.1
    var yellow_fric = 0.05
    var render_setting = [
        // blue
        {friction: 1, frictionAir: blue_fric, restitution : 0, render: {fillStyle: '#0d3388'}},
        // red
        {friction: 1, frictionAir: red_fric, restitution : 0.4, render: {fillStyle: '#e60013'}},
        // yellow
        {friction: 1, frictionAir: yellow_fric, restitution : 0, render: {fillStyle: '#fff100'}},
        
        // red
        {friction: 1, frictionAir: red_fric, restitution : 0, 
                            render: {sprite: {  texture: 'teeth-01.png',
                                                xScale: 0.8,
                                                yScale: 0.8}}},
        // 4 blue
        {friction: 1, frictionAir: blue_fric, restitution : 0, 
                            render: {sprite: {  texture: 'skew_cir-01.png',
                                                xScale: 0.4,
                                                yScale: 0.4}}},
        // 5 red
        {friction: 1, frictionAir: red_fric, restitution : 0, 
                            render: {sprite: {  
                                texture: 'dol.png',
                                                xScale: 0.7,
                                                yScale: 0.7}}},
        // 6 blue
        {friction: 1, frictionAir: yellow_fric, restitution : 0, 
                            render: {sprite: {  
                                // texture: 'circles-01.png',
                                                xScale: 0.235,
                                                yScale: 0.235}},
            chamfer: { radius: 15 }
        },
        // 7 red
        {friction: 1, frictionAir: red_fric, restitution : 0, render: {fillStyle: '#0d3388',  visible: true }},
        // 8 blue--softbody
        {friction: 1, frictionAir: blue_fric, restitution : 0, 
                            render: {sprite: {  texture: 'bluecircle-01.png',
                                                xScale: 0.7,
                                                yScale: 0.7}}},
        // 9 red
        {friction: 1, frictionAir: red_fric, restitution : 0, 
                            render: {sprite: {  texture: 'elp.png',
                                                xScale: 0.4,
                                                yScale: 0.4}}},
        // 10 red
        {friction: 1, frictionAir: red_fric, restitution : 0, 
                            render: {sprite: {  texture: 'tri-01.png',
                                                xScale: 0.4,
                                                yScale: 0.4}}},
        // 11 red
        {friction: 1, frictionAir: red_fric, restitution : 0, 
                            render: {sprite: {  texture: 'tri-02.png',
                                                xScale: 0.4,
                                                yScale: 0.4}}},
        // 12 yellow
        {friction: 1, frictionAir: yellow_fric, restitution : 0, 
                            render: {sprite: {  texture: 'halfcir-01.png',
                                                xScale: 0.39,
                                                yScale: 0.39}}},
        // 13 blue
        {friction: 1, frictionAir: blue_fric, restitution : 0, 
                            render: {sprite: {  
                                texture: 'dol2.png',
                                                xScale: 0.49,
                                                yScale: 0.49}}},
    ]
    // 0:blue
    // 1:red
    // 2:yellow


    // 0:yellow
    // 3:red
    // 5:blue
    var obj = [
        ['rec',1,   1,2.5,0.15 , 1, 3],
        ['rec',1, 1.3,2.5,0.15 , 1, 3],
        ['rec',1, 1.6,2.5,0.15 , 1, 3],
        ['rec',1, 1.9,2.5,0.15 , 1, 3],


        ['cir',  4,  3, 0.8 , 2, 0],
        ['cir',  5,  3, 0.8 , 2, 0],
        ['cir',  3,  4, 1.5 , 2, 0],
        ['cir',4.5,  4, 1.5 , 2, 0],


        ['rec',6  ,2.5, 1,1.5 ,    2, 0],
        ['rec',7.5,1.5, 1,1.5 ,    1, 3],
        ['rec',8  ,2.25, 2,0.75 ,  0, 5],

        ['svg',4.5,0,dol ,         5, 3],
        ['svg',4,2,  skewed_cirs , 4, 5],
        ['svg',6,6.8,half_cir ,    12, 0],
        ['svg',0.5,7,dol2 ,        13, 5],

        ['svg',7.5,9, skew ,       1, 3],
        ['svg',7.5,10,fuck ,       1, 3],

        ['svg',9,-0, tri1 ,       1, 3],
        ['svg',9,-1,tri2 ,       1, 3],


        ['cir',  1,  8, 1.5 ,      3, 3],

        ['rec',4,8.5,2.5,1.25 ,    1, 3],

        ['rec',4,-3.5,3.5,2  ,    0, 3],
    ]

    function adding_obj(elem, sec){
        obs.push(elem)
        console.log(sec)
         setTimeout(function(){World.add(world, elem);}, sec*2000);
    }
$('document').ready(function(){
    $('#face_wrap').css({'margin-left':'-75px'})
    $('#face_wrap').css({'margin-top':'-75px'})
    })
    adding()
function adding(){
    for (var i = obj.length - 1; i >= 0; i--) {
        if(obj[i][0] === 'svg'){
                var elem = Bodies.fromVertices(obj[i][1]*100, obj[i][2]*100 - 0.25*h -h , obj[i][3], render_setting[obj[i][4]]);
                adding_obj(elem, obj[i][5])
        }
        if(obj[i][0] === 'rec'){
            var elem = Bodies.rectangle((obj[i][1]+(obj[i][3]/2))*100, (obj[i][2]+(obj[i][3]/2))*100 - 0.25*h -h, obj[i][3]*100, obj[i][4]*100, render_setting[obj[i][5]] );
                adding_obj(elem, obj[i][6])
        }
        if(obj[i][0] === 'cir'){
            var elem = Bodies.circle((obj[i][1]+(obj[i][3]/2))*100, (obj[i][2]+(obj[i][3]/2))*100 - 0.25*h -h, obj[i][3]/2*100, render_setting[obj[i][4]] );
                adding_obj(elem, obj[i][5])
        }
    }






//dummeys blue
var dummy = Composites.softBody(300, 500 - 0.25*h -h, 12, 9, 0, 0, true, 5, render_setting[8], {render: { visible: false }})
adding_obj(dummy,5)


// chains
    var chain_1=[
        ['cir',  8.5,  4, 0.35 ],
        ['cir',  8.5,  4.5, 0.5],
        ['cir',  8.5,  5.25,   0.6 ],
        ['cir',  8.5,  6, 0.75 ],
        ['cir',  8.5,  7, 0.75 ],
        ['cir',  8.5,  8, 1.1],
        ['cir',  8.5,  9.5, 1.5]
        ]
        var chain_array = []
        var constraint_array = []
        for (var i = 0; i < chain_1.length ; i++) {
            chain_array.push(Bodies.circle((chain_1[i][1]+(chain_1[i][3]/2))*100, (chain_1[i][2]+(chain_1[i][3]/2))*100 - 0.25*h -h, (chain_1[i][3]/2*100), render_setting[0]))
            if(i>0){
                constraint_array.push(
                    Constraint.create({ 
                        bodyA: chain_array[i],
                        bodyB: chain_array[i-1],
                        pointA: { x: 0, y: -1*chain_1[i][3]/2*100 },
                        pointB: { x: 0, y: chain_1[i-1][3]/2*100 },
                        render: {strokeStyle: 'transparent'}
                    })
                )
            }
            if(i == chain_1.length-1){
                console.log(chain_array)
                for (var j = chain_array.length - 1; j >= 0; j--) {
                    adding_obj(chain_array[j],5)
                }
                for (var j = constraint_array.length - 1; j >= 0; j--) {
                    adding_obj(constraint_array[j],5)
                }
            }
        }


    var chain_2=[
        ['cir',1,   0,0.2],
        ['cir',1.2, 0, 0.2],
        ['cir',1.4, 0 ,0.2],
        ['cir',1.6, 0, 0.2],
        ['cir',1.8, 0 ,0.2],
        ['cir',2,   0 ,0.2],
        ['cir',2.2, 0,0.2],
        ['cir',2.4, 0 ,0.2],
        ['cir',2.6, 0,0.2],
        ['cir',2.8, 0,0.2],
        ['cir',3,   0   ,0.2],
        ['cir',3.2, 0,0.2],
        ['cir',3.4, 0 ,0.2],
        ['cir',3.6, 0,0.2],
        ['cir',3.8, 0,0.2],
        ['cir',4,   0   ,0.2],
        ['cir',4.2, 0,0.2],
        ['cir',4.4, 0 ,0.2],
        ['cir',4.6, 0,0.2],
        ['cir',4.8, 0,0.2],
        ['cir',5,   0   ,0.2],
        ['cir',5.2, 0,0.2],
        ['cir',5.4, 0 ,0.2],
        ['cir',5.6, 0,0.2],
        ['cir',5.8, 0,0.2],
        ['cir',6,   0   ,0.2],
        ['cir',6.2, 0,0.2],
        ['cir',6.5, 0 ,0.2],
        ['cir',6.6, 0,0.2]
        ]
        var chain_array_2 = []
        var constraint_array_2 = []
        for (var i = 0; i < chain_2.length ; i++) {
            chain_array_2.push(Bodies.circle((chain_2[i][1]+(chain_2[i][3]/2))*100, (chain_2[i][2]+(chain_2[i][3]/2))*100 - 0.25*h -h, (chain_2[i][3]/2*100), render_setting[0]))
            if(i>0){
                constraint_array_2.push(
                    Constraint.create({ 
                        bodyA: chain_array_2[i],
                        bodyB: chain_array_2[i-1],
                        pointA: {  x: (-1*chain_2[i][3])/2*100, y: 0 },
                        pointB: { x: chain_2[i-1][3]/2*100, y: 0 },
                        render: {strokeStyle: 'transparent'}
                    })
                )
            }
            if(i == chain_2.length-1){
                for (var j = chain_array_2.length - 1; j >= 0; j--) {
                    adding_obj(chain_array_2[j],3)
                }
                for (var j = constraint_array_2.length - 1; j >= 0; j--) {
                    adding_obj(constraint_array_2[j],3)
                }
            }
        }

    var chain_3=[
        ['rec',2,  1,0.2,1],
        ['rec',2.2,  1,0.2,1],
        ['rec',2.4,  1,0.2,1],
        ['rec',2.6,  1,0.2,1],
        ['rec',2.8,  1,0.2,1],
        ['rec',3,  1,0.2,1],
        ['rec',3.2,  1,0.2,1],
        ['rec',3.4,  1,0.2,1],
        ['rec',3.6,  1,0.2,1],
        ['rec',3.8,  1,0.2,1],
        ['rec',4,  1,0.2,1],
        ['rec',4.2,  1,0.2,1]
        ]
        var chain_array_3 = []
        var constraint_array_3 = []
        for (var i = 0; i < chain_3.length ; i++) {
            chain_array_3.push(Bodies.rectangle((chain_3[i][1]+(chain_3[i][3]/2))*100, (chain_3[i][2]+(chain_3[i][3]/2))*100 - 0.25*h -h, chain_3[i][3]*100, chain_3[i][4]*100, render_setting[9]))
            if(i>0){
                constraint_array_3.push(
                    Constraint.create({ 
                        bodyA: chain_array_3[i],
                        bodyB: chain_array_3[i-1],
                        pointA: {  x: (-chain_3[i][3]/2 + chain_3[i][4]/2)*100, y: 0  },
                        pointB: { x: (chain_3[i][3]/2 - chain_3[i][4]/2)*100, y: 0 },
                        render: {strokeStyle: ''}
                    })
                )
            }
            if(i == chain_3.length-1){


                for (var j = chain_array_3.length - 1; j >= 0; j--) {
                    adding_obj(chain_array_3[j],3)
                }
                for (var j = constraint_array_3.length - 1; j >= 0; j--) {
                    adding_obj(constraint_array_3[j],3)
                }
            }
        }




    var chain_4=[
        ['rec',8,    1,0.2,1.8],
        ['rec',8.2,  1,0.2,1.8],
        ['rec',8.4,  1,0.2,1.8],
        ['rec',8.6,  1,0.2,1.8],
        ['rec',8.8,  1,0.2,1.8],
        ['rec',9  ,  1,0.2,1.8],
        ['rec',9.2,  1,0.2,1.8]
        ]
        var chain_array_4 = []
        var constraint_array_4 = []
        for (var i = 0; i < chain_4.length ; i++) {
            chain_array_4.push(Bodies.rectangle((chain_4[i][1]+(chain_4[i][3]/2))*100, (chain_4[i][2]+(chain_4[i][3]/2))*100 - 0.25*h -h, chain_4[i][3]*100, chain_4[i][4]*100, 
            {friction: 1, frictionAir: 0.05, restitution : 0, 
                            render: {sprite: {  texture: 'skew-0'+(i+1)+'.png',
                                                xScale: 0.8,
                                                yScale: 0.8}}
                                            }))
            if(i>0){
                constraint_array_4.push(
                    Constraint.create({ 
                        bodyA: chain_array_4[i],
                        bodyB: chain_array_4[i-1],
                        pointA: {  x: (-1*chain_4[i][3]/2)*100, y: 0  },
                        pointB: { x: ( chain_4[i][3]/2)*100, y: 0 },
                        render: {strokeStyle: 'transparent'}
                    })
                )
            }
            if(i == chain_4.length-1){


                for (var j = chain_array_4.length - 1; j >= 0; j--) {
                    adding_obj(chain_array_4[j],3)
                }
                for (var j = constraint_array_4.length - 1; j >= 0; j--) {
                    adding_obj(constraint_array_4[j],3)
                }
            }
        }

}
//extra

    var color =  Bodies.circle(500, 500 - 0.25*h -h, 50, 
        {friction: 1, frictionAir: 0.05, restitution : 0, 
                            render: {sprite: {  texture: 'color.png',
                                                xScale: 1.2,
                                                yScale: 1.2}}})
    var ground = Bodies.rectangle(w/2, h+25, w, 50, { isStatic: true })
    var wall1 = Bodies.rectangle(-25, h/2, 50, h, { isStatic: true })
    var wall2 = Bodies.rectangle(w+25, h/2, 50, h, { isStatic: true })
    var face1 = Bodies.circle(100, -100, 75, { isStatic: true ,render: {fillStyle: '#00913a'}});


    World.add(world, [color, ground, wall1, wall2])
    World.add(world, face1)




var rot = 0
function updateRotation() {
    rot = rot+0.1
    Matter.Body.setAngle(color, rot);
    requestAnimationFrame(updateRotation);
}
window.requestAnimationFrame(updateRotation);

var elems1  = [[face1, color]]


setTimeout(function(){detectcollision()}, 5000);
function detectcollision(){
      if( Matter.Detector.collisions(elems1 , engine).length>0){
        console.log('lkj')
        if($('#background').hasClass('op_1')){
            $('#background').removeClass('op_1')
        }else{
            $('#background').addClass('op_1')
        }
        setTimeout(function(){detectcollision()}, 500);
      }else{
        setTimeout(function(){detectcollision()}, 50)
      }
}



    setTimeout(function(){reset_field()}, 40000);
    function reset_field(){
        Body.setPosition(ground, { x: w/2, y: 2*h+25}); 
        setTimeout(function(){
            for (var i = obs.length - 1; i >= 0; i--) {
                Matter.Composite.remove(world, obs[i])
            }
        }, 10000)
        setTimeout(function(){
            adding()
            Body.setPosition(ground, { x: w/2, y: h+25});  
        }, 10000);
        // Matter.Composite.remove(world, Body)
    }
    // keep the mouse in sync with rendering
    // fit the render viewport to the scene
