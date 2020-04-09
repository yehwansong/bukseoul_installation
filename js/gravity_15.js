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
    var fuck_2 = Vertices.fromPath('239.6,83.5 119.8,83.5 119.8,196.4 0,196.4 0,252.8 0,252.8 0,254.4 359.4,254.4 359.4,196.4 239.6,196.4')
    var skewed_red = Vertices.fromPath('270.7,0 91,0 179.7,83.5 359.4,83.5')
    var skew_cir = Vertices.fromPath('26.2,0 15.1,0 5.5,13 0,35.4 0,61.3 5.5,83.7 15.1,96.6 26.2,96.6 35.8,83.7 41.4,61.3 41.4,35.4 35.8,13')
    var blue_fric = 0.1
    var red_fric = 0.05
    var yellow_fric = 0.01
    var offset = 1.5*h
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
        {friction: 1, frictionAir: blue_fric, restitution : 0, 
                            render: {sprite: {  
                                texture: 'circles-01.png',
                                                xScale: 0.193,
                                                yScale: 0.193}},
            chamfer: { radius: 15 }
        },
        // 7 red
        {friction: 1, frictionAir: blue_fric, restitution : 0, 
                            render: {sprite: {  
                                texture: 'circles-01.png',
                                                xScale: 0.193,
                                                yScale: 0.193}},
            chamfer: { radius: 15 }
        },
        {friction: 1, frictionAir: blue_fric, restitution : 0, 
                            render: {sprite: {  
                                texture: 'circles-02.png',
                                                xScale: 0.193,
                                                yScale: 0.193}},
            chamfer: { radius: 15 }
        },
        {friction: 1, frictionAir: blue_fric, restitution : 0, 
                            render: {sprite: {  
                                texture: 'circles-03.png',
                                                xScale: 0.193,
                                                yScale: 0.193}},
            chamfer: { radius: 15 }
        },
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
        // 14 blue
        {friction: 1, frictionAir: blue_fric, restitution : 0, 
                            render: {sprite: {  
                                texture: 'skewed_circle.png',
                                                xScale: 0.24,
                                                yScale: 0.24}}},
    ]
    // 0:blue
    // 1:red
    // 2:yellow


    // 0:yellow
    // 3:red
    // 5:blue
    var yellow_sec = 1;
    var blue_sec = 5
    var obj = [
    // red
        ['rec', 1,   1, 4.1,    3,  1, 3],
        ['rec', 6,   1,   6,  2.1,  1, 3],
        // ['rec', 1,   9, 6.2,    3,  1, 3],
        // ['rec',10,   9, 2.2,    2,  1, 3],
        // ['rec', 7,  14, 5.8,  2.5,  1, 3],
        // ['rec',17,   8,   3,    2,  1, 3],
        // ['rec',19,   4,   1,    3,  1, 3],


        ['cir', 15.5,   1, 0.5 , 1, 3],
        ['cir', 15.2, 1.8, 0.8 , 1, 3],
        ['cir',   15, 2.8,   1 , 1, 3],
        ['cir', 14.8, 4.2, 1.2 , 1, 3],
        ['cir', 14.8, 5.7, 1.2 , 1, 3],
        ['cir', 14.2, 7.2, 1.8 , 1, 3],
        ['cir', 13.6, 9.2, 2.4 , 1, 3],

        ['cir',    1,  13, 2.6 , 1, 3],

        ['svg',3,  6, tri1 ,   1, 3],
        ['svg',9,  5, tri2 ,   1, 3],
        ['svg',13.8,14, skewed_red ,1, 3],
        ['svg',15,  16, fuck ,   1, 3],



        // yellow

        ['rec', 1,   4, 6.4,    1,          2, yellow_sec],
        ['rec', 1,  10,   4,    5.5,        2, yellow_sec],
        ['rec', 10.5, 8.2,      1.8, 1.5,   2, yellow_sec],
        ['rec', 14,      7,     1.2, 2.5,   2, yellow_sec],
        // ['rec', 15.8,   7.5,    1.4, 2,     2, 5],
        // ['rec', 12,     10.2,   2, 2.5,     2, 5],
        // ['rec', 14,     10.2,   2, 2.5,     2, 5],
        // ['rec', 10,     13.8,   1.5, 2.2,   2, 5],
        // ['rec', 12.2,   13.2,   1.8, 2.6,   2, 5],
        // ['rec', 14.5,   15.2,   2.2, 2.2,   2, 5],


        ['cir', 13.8,   1,   1,   2, yellow_sec],
        ['cir', 15,     1,   1,   2, yellow_sec],
        ['cir', 12,     2.2,   1.8,   2, yellow_sec],
        ['cir', 14,     2.2,   1.8,   2, yellow_sec],

        // blue
        ['rec', 9,   4, 3,    3,                0, blue_sec],
        ['rec', 16.5,2.5, 3.5,    3.5,          0, blue_sec],
        // ['rec', 12,   8, 2,    2,               0, 0],
        // ['rec', 15,   7, 3.2,    5.2,           0, 0],
        // ['rec', 12, 15,     2,    3,            0, 0],
        // ['rec', 15, 16.5, 3.6,   0.5,           0, 0],
        // ['rec', 0, 15.5, 6.2,   2.5,            0, 0],

        ['cir', 1,     1,   3,      0, blue_sec],
        ['cir', 1,     7,   1.2,    0, blue_sec],
        ['cir', 2.4,     7,   1.2,   0, blue_sec],
        ['cir', 3.8,     7,   1.2,   0, blue_sec],
        ['cir', 5.2,     7,   1.2,   0, blue_sec],

        ['cir', 2,     10,   2,   0, blue_sec],
        ['svg',5,  10, skew_cir ,   14, blue_sec],
        ['svg',7,  10, skew_cir ,   14, blue_sec , 'rot'],
    ]

    function adding_obj(elem, sec, spec){
        obs.push(elem)
        setTimeout(function(){World.add(world, elem);}, sec*4000);
        if(spec){
            console.log(spec)
            Matter.Body.setAngle(elem, -0.75);
        }
    }
$('document').ready(function(){
    $('#face_wrap').css({'margin-left':'-75px'})
    $('#face_wrap').css({'margin-top':'-75px'})
    })
    var color_w =  Bodies.circle(10000, 500 - 0.25*h -h, 50, 
        {friction: 1, frictionAir: 0.05, restitution : 0,render: {fillStyle: '#ffffff'}});
    var color_b =  Bodies.circle(500, 500 - 0.25*h -h, 50, 
        {friction: 1, frictionAir: 0.05, restitution : 0,render: {fillStyle: '#000000'}});
adding()
function adding(){
    World.add(world, [color_b, color_w])
        obs.push(color_b)
        obs.push(color_w)
    for (var i = obj.length - 1; i >= 0; i--) {
        if(obj[i][0] === 'svg'){
                var elem = Bodies.fromVertices(obj[i][1]*50, obj[i][2]*50 - offset, obj[i][3], render_setting[obj[i][4]]);
                adding_obj(elem, obj[i][5], obj[i][6])
        }
        if(obj[i][0] === 'rec'){
            var elem = Bodies.rectangle((obj[i][1]+(obj[i][3]/2))*50, (obj[i][2]+(obj[i][4]/2))*50 - offset , obj[i][3]*50, obj[i][4]*50, render_setting[obj[i][5]] );
                adding_obj(elem, obj[i][6])
        }
        if(obj[i][0] === 'cir'){
            var elem = Bodies.circle((obj[i][1]+(obj[i][3]/2))*50, (obj[i][2]+(obj[i][3]/2))*50 - offset , obj[i][3]/2*50, render_setting[obj[i][4]] );
                adding_obj(elem, obj[i][5])
        }
    }


var chain_wrap = 
    [   
    [   ['cir', 1,     1.5,   1.15,   2, 0],
            ['cir', 2.2,     1.5,   1.15,   2, 0]   ],
        [   ['cir', 2,     1,   0.5,   2, 0],
            ['cir', 2.5,   1,   0.5,   2, 0]   ],
        [   ['cir', 4,   1.5,   0.5,   2, 0],
            ['cir', 4.5,   1.5,   0.5, 2, 0],
            ['cir', 5,   1.5,   0.5,   2, 0],  ],
        [   ['cir', 5.5,   1,   0.5,   2, 0],
            ['cir', 6,     1,   0.5,   2, 0],
            ['cir', 6.5,   1,   0.5,   2, 0],   ],
        [   ['cir', 7,   1.5,   0.5,   2, 0],
            ['cir', 7.5,   1.5,   0.5,   2, 0],
            ['cir', 8,   1.5,   0.5,   2, 0],   ],
        [   ['cir', 1,   6,   1.15,   2, 0],
            ['cir', 2.2, 6,   1.15,   2, 0],
            ['cir', 3.4,   6,   1.15,   2, 0], 
            ['cir', 4.6,   6,   1.15,   2, 0]   ]
    ]



    for (var k = chain_wrap.length - 1; k >= 0; k--) {     
        var chain_array = []
        var constraint_array = []
        for (var i = 0; i < chain_wrap[k].length ; i++) {
            chain_array.push(Bodies.circle((chain_wrap[k][i][1]+(chain_wrap[k][i][3]/2))*50, (chain_wrap[k][i][2]+(chain_wrap[k][i][3]/2))*50 - offset, (chain_wrap[k][i][3]/2*50), render_setting[chain_wrap[k][i][4]]))
            if(i>0){
                constraint_array.push(
                    Constraint.create({ 
                        bodyA: chain_array[i],
                        bodyB: chain_array[i-1],
                        pointA: { x: -1*chain_wrap[k][i][3]/2*50, y:0  },
                        pointB: { x: chain_wrap[k][i-1][3]/2*50, y:0  },
                        render: {strokeStyle: 'transparent'}
                    })
                )
            }
            if(i == chain_wrap[k].length-1){
                console.log(chain_array)
                for (var j = chain_array.length - 1; j >= 0; j--) {
                    adding_obj(chain_array[j],yellow_sec)
                }
                for (var j = constraint_array.length - 1; j >= 0; j--) {
                    adding_obj(constraint_array[j],yellow_sec)
                }
            }
        }

    }

    var chain_3=[
        ['rec',0,    11,3.15, 0.4],
        ['rec',3.2,  11,3.15,  0.4],
        ['rec',6.4,  11,4.75,  0.4],
        ['rec',11.2, 11,2.75,  0.4]
        ]
        var chain_array_3 = []
        var constraint_array_3 = []
        for (var i = 0; i < chain_3.length ; i++) {
            chain_array_3.push(Bodies.rectangle((chain_3[i][1]+(chain_3[i][3]/2))*50, (chain_3[i][2]+(chain_3[i][4]/2))*50- offset, chain_3[i][3]*50, chain_3[i][4]*50, render_setting[6+i]))
            if(i>0){
                constraint_array_3.push(
                    Constraint.create({ 
                        bodyA: chain_array_3[i],
                        bodyB: chain_array_3[i-1],
                        pointA: {  x: (-chain_3[i][3]/2 + chain_3[i][4]/2)*50, y: 0  },
                        pointB: { x: (chain_3[i-1][3]/2 - chain_3[i-1][4]/2)*50, y: 0 },
                        render: {strokeStyle: 'transparent'}
                    })
                )
            }
            if(i == chain_3.length-1){


                for (var j = chain_array_3.length - 1; j >= 0; j--) {
                    adding_obj(chain_array_3[j],blue_sec)
                }
                for (var j = constraint_array_3.length - 1; j >= 0; j--) {
                    adding_obj(constraint_array_3[j],blue_sec)
                }
            }
        }
}
//extra

    var ground = Bodies.rectangle(w/2, h+25, w, 50, { isStatic: true })
    var wall1 = Bodies.rectangle(-25, h/2, 50, h, { isStatic: true })
    var wall2 = Bodies.rectangle(w+25, h/2, 50, h, { isStatic: true })
    var face1 = Bodies.circle(100, -100, 75, { isStatic: true ,render: {fillStyle: '#00913a'}});
    var face2 = Bodies.circle(100, -100, 75, { isStatic: true ,render: {fillStyle: 'black'}});
    var face3 = Bodies.circle(100, -100, 75, { isStatic: true ,render: {fillStyle: 'black'}});
    var face4 = Bodies.circle(100, -100, 75, { isStatic: true ,render: {fillStyle: 'black'}});


    World.add(world, [ground, wall1, wall2])
    World.add(world, [face1,face2,face3,face4])




var rot = 0

var elems1  = [[face1, color_b]]
var elems2  = [[face1, color_w]]


setTimeout(function(){detectcollision()}, 5000);
function detectcollision(){
      if( Matter.Detector.collisions(elems1 , engine).length>0){
            $('#background').removeClass('op_1')
            $('.face_b').addClass('op_1')
            $('.face_w').removeClass('op_1')
            Body.setPosition(color_w, { x: color_b.position.x, y: color_b.position.y}); 
            Body.setPosition(color_b, { x: 10000, y: 10000});
        setTimeout(function(){detectcollision_in()}, 500);
      }else{
        setTimeout(function(){detectcollision()}, 50)
      }
}
function detectcollision_in(){
      if( Matter.Detector.collisions(elems2 , engine).length>0){
            $('#background').addClass('op_1')
            $('.face_w').addClass('op_1')
            $('.face_b').removeClass('op_1')
            Body.setPosition(color_b, { x: color_w.position.x, y: color_w.position.y}); 
            Body.setPosition(color_w, { x: 10000, y: 10000});
        setTimeout(function(){detectcollision()}, 500);
      }else{
        setTimeout(function(){detectcollision_in()}, 50)
      }
}


    setTimeout(function(){reset_field()}, 35000);
    function reset_field(){
        Body.setPosition(ground, { x: w/2, y: 2*h+25}); 
        setTimeout(function(){
            for (var i = obs.length - 1; i >= 0; i--) {
                Matter.Composite.remove(world, obs[i])
            }
            adding()
            Body.setPosition(ground, { x: w/2, y: h+25});  
            setTimeout(function(){reset_field()}, 35000);
        }, 10000)
    }
