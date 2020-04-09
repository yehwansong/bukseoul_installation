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
    // document.getElementsByTagName('canvas')[0].id='jeeFaceFilterCanvas'
// main()
    // create runner
    var runner = Runner.create();
    Runner.run(runner, engine);
var circlearray = [

]
var elem1x = 100    ,elem1y = 150 ,      elem1r = 50,
    elem2x = 200    ,elem2y = 150 ,      elem2r = 50,
    elem3x = 150    ,elem3y = 300 ,     elem3r = 75,
    elem4x = 350    ,elem4y = 210 ,     elem4r = 80,
    elem5x = 150    ,elem5y = 450 ,     elem5r = 75,
    elem6x = 700    ,elem6y = 450 ,
    elem7x = 800    ,elem7y = 450 ,
    // elem7x = 275    ,elem7y = 45  ,     elem7r = 50,
    // elem8x = 330    ,elem8y = 45  ,     elem8r = 50,
    // elem9x = 350    ,elem9y = 100 ,     elem9r = 50,
    // elem10x = 410   ,elem10y = 100,     elem10r = 50,

    elem11x = 600,   elem11y = 250,    elem11w = 100, elem11h = 200,
    elem12x = 450,   elem12y = 350,   elem12w = 350, elem12h = 80
    // elem13x = 700,  elem13y = 150,  elem11w = 225, elem11h = 225

    elem14x = 800, elem14y = 0,
    elem15x = 800, elem15y = 100,
    elem16x = 800, elem16y = 200,
    elem17x = 800, elem17y = 300
    // add bodies
    var ground = Bodies.rectangle(w/2, h+25, w, 50, { isStatic: true })
    var wall1 = Bodies.rectangle(-25, h/2, 50, h, { isStatic: true })
    var wall2 = Bodies.rectangle(w+25, h/2, 50, h, { isStatic: true })

    var face1 = Bodies.circle(100, -100, 75,{ isStatic: true ,render: {fillStyle: '#e60012'}});

    var tri = Vertices.fromPath('49.1,0 0,85 98.1,85')
    var drop = Vertices.fromPath('88.8,81 47.8,0 6.8,81 0,105.5 7.8,131.7 19.8,144.3 47.8,153.3 74.9,144.9 87.5,132.2 95.6,105.5')

    var elem1  = Bodies.circle(elem1x,  elem1y-h,  elem1r,    {friction: 1, frictionAir: 0.05, restitution : 0.3, 
        render: {fillStyle: '#005bac'}});
    var elem2  = Bodies.circle(elem2x,  elem2y-h,  elem2r,    {friction: 1, frictionAir: 0.005, restitution : 0.1, 
        render: {fillStyle: '#fbc600'}});
    var elem3  = Bodies.circle(elem3x,  elem3y-h,  elem3r,    {friction: 1, frictionAir: 0.05, restitution : 0.1, 
        render: {fillStyle: '#005bac'}});
    var elem4  = Bodies.circle(elem4x,  elem4y-h,  elem4r,    {friction: 1, frictionAir: 0.000000001, restitution : 0.3, 
        render: {sprite: {texture: 'teeth-01.png',
                xScale: 0.8,
                yScale: 0.8}}});
    var elem5  = Bodies.circle(elem5x,  elem5y-h,  elem5r,    {friction: 1, frictionAir: 0.005, restitution : 0.4, 
        render: {fillStyle: '#00873c'}});

    var elem6  = Bodies.fromVertices(elem6x,  elem6y-h ,drop, {friction: 1, frictionAir: 0.000000001, restitution : 0, 
        render: {sprite: {texture: 'drop-01.png',
                xScale: 1.5,
                yScale: 1.5}}});
    var elem7  = Bodies.fromVertices(elem7x,  elem7y-h ,drop, {friction: 1, frictionAir: 0.000000001, restitution : 0, 
        render: {sprite: {texture: 'drop-01.png',
                xScale: 1.5,
                yScale: 1.5}}});
    var elem11 = Bodies.rectangle(elem11x, elem11y-h, elem11w, elem11h, {friction: 1, frictionAir: 0.05, restitution : 0.4, 
        render: {fillStyle: '#005bac'}});
    var elem12 = Bodies.rectangle(elem12x, elem12y-h, elem12w, elem12h, {friction: 1, frictionAir: 0.000001, restitution : 0.4, 
        render: {fillStyle: '#e60012'}});
    
    var elem14 = Bodies.fromVertices(elem14x, elem14y-h, tri, {friction: 1, frictionAir: 0.05, restitution : 0, 
        render: {fillStyle: '#005bac'}});
    var elem15 = Bodies.fromVertices(elem15x, elem15y-h, tri, {friction: 1, frictionAir: 0.05, restitution : 0, 
        render: {fillStyle: '#005bac'}});
    var elem16 = Bodies.fromVertices(elem16x, elem16y-h, tri, {friction: 1, frictionAir: 0.0000001, restitution : 0, 
        render: {fillStyle: '#fbc600'}});
    var elem17 = Bodies.fromVertices(elem17x, elem17y-h, tri, {friction: 1, frictionAir: 0.0000001, restitution : 0, 
        render: {fillStyle: '#fbc600'}});

    var elems1  = [[face1, elem1 ]]
    var elems2  = [[face1, elem2 ]]
    var elems3  = [[face1, elem3 ]]
    var elems4  = [[face1, elem4 ]]
    var elems5  = [[face1, elem5 ]]

    var elems6  = [[face1, elem6 ]]
    var elems7  = [[face1, elem7 ]]

    var elems11 = [[face1, elem11]]
    var elems12 = [[face1, elem12]]

    var elems14 = [[face1, elem14]]
    var elems15 = [[face1, elem15]]
    var elems16 = [[face1, elem16]]
    var elems17 = [[face1, elem17]]


    var ball1 = Bodies.circle(70,  50-h, 24.5, { restitution : 0, render: {fillStyle: '#e60012'}} );
    var ball2 = Bodies.circle(120, 50-h, 24.5, { restitution : 0, render: {fillStyle: '#e60012'}} );
    var ball3 = Bodies.circle(170, 50-h, 24.5, { restitution : 0, render: {fillStyle: '#e60012'}, density: 1000000000000} );
    var ball4 = Bodies.circle(220, 50-h, 24.5, { restitution : 0, render: {fillStyle: '#e60012'}} );
    var ball5 = Bodies.circle(270, 50-h, 24.5, { restitution : 0, render: {fillStyle: '#e60012'}} );
    var ball6 = Bodies.circle(320, 50-h, 24.5, { restitution : 0, render: {fillStyle: '#e60012'}} );
    var ball7 = Bodies.circle(370, 50-h, 24.5, { restitution : 0, render: {fillStyle: '#e60012'}} );
    var ball8 = Bodies.circle(420, 50-h, 24.5, { restitution : 0, render: {fillStyle: '#e60012'}} );
    var ball9 = Bodies.circle(470, 50-h, 24.5, { restitution : 0, render: {fillStyle: '#e60012'}} );

    var constraint1 = Constraint.create({
        bodyA: ball1,
        bodyB: ball2,
        render: {
            strokeStyle: 'transparent'
        }
    });
    var constraint2 = Constraint.create({
        bodyA: ball2,
        bodyB: ball3,
        render: {
            strokeStyle: 'transparent'
        }
    });
    var constraint3 = Constraint.create({
        bodyA: ball3,
        bodyB: ball4,
        render: {
            strokeStyle: 'transparent'
        }
    });
    var constraint4 = Constraint.create({
        bodyA: ball4,
        bodyB: ball5,
        render: {
            strokeStyle: 'transparent'
        }
    });
    var constraint5 = Constraint.create({
        bodyA: ball5,
        bodyB: ball6,
        render: {
            strokeStyle: 'transparent'
        }
    });
    var constraint6 = Constraint.create({
        bodyA: ball6,
        bodyB: ball7,
        render: {
            strokeStyle: 'transparent'
        }
    });
    var constraint7 = Constraint.create({
        bodyA: ball7,
        bodyB: ball8,
        render: {
            strokeStyle: 'transparent'
        }
    });
    var constraint8 = Constraint.create({
        bodyA: ball8,
        bodyB: ball9,
        render: {
            strokeStyle: 'transparent'
        }
    });

    World.add(world, [ball1, ball2, ball3, ball4, ball5, ball6, ball7, ball8, ball9,
        constraint1, constraint2, constraint3, constraint4, constraint5, constraint6, constraint7, constraint8
        ]);


setTimeout(function(){detectcollision()}, 5000);
var audio = new Audio('audio_1.mp4');
function detectcollision(){
      if( Matter.Detector.collisions(elems1 , engine).length>0
        ||Matter.Detector.collisions(elems2 , engine).length>0
        ||Matter.Detector.collisions(elems3 , engine).length>0
        ||Matter.Detector.collisions(elems4 , engine).length>0
        ||Matter.Detector.collisions(elems5 , engine).length>0
        ||Matter.Detector.collisions(elems6 , engine).length>0
        ||Matter.Detector.collisions(elems7 , engine).length>0

        ||Matter.Detector.collisions(elems11, engine).length>0
        ||Matter.Detector.collisions(elems12, engine).length>0

        ||Matter.Detector.collisions(elems14, engine).length>0
        ||Matter.Detector.collisions(elems15, engine).length>0
        ||Matter.Detector.collisions(elems16, engine).length>0
        ||Matter.Detector.collisions(elems17, engine).length>0){   
            console.log('hey')         
            audio.currentTime = 0;
            audio.play();
        setTimeout(function(){detectcollision()}, 500);
      }else{
        setTimeout(function(){detectcollision()}, 50)
      }
}
    World.add(world, [
        ground,
        wall1,
        wall2,
        face1,

        elem1,
        elem2,
        elem3, 
        elem4,
        elem5,
        elem6,
        elem7,

        elem11,
        elem12,

        elem14,
        elem15,
        elem16,
        elem17
    ]);
    setTimeout(function(){reset_field()}, 10000);
    function reset_field(){

        Body.setPosition(ground, { x: w/2, y: 2*h+25}); 
        setTimeout(function(){
        Body.setPosition(elem1, { x: elem1x, y: elem1y - h})
        Body.setPosition(elem2, { x: elem2x, y: elem2y - h})
        Body.setPosition(elem3, { x: elem3x, y: elem3y - h})
        Body.setPosition(elem4, { x: elem4x, y: elem4y - h})
        Body.setPosition(elem5, { x: elem5x, y: elem5y - h})
        Body.setPosition(elem6, { x: elem6x, y: elem6y - h})
        Body.setPosition(elem7, { x: elem7x, y: elem7y - h})
        Body.setPosition(elem11, { x: elem11x, y: elem11y - h})
        Body.setPosition(elem12, { x: elem12x, y: elem12y - h})
        Body.setPosition(elem14, { x: elem14x, y: elem14y - h})
        Body.setPosition(elem15, { x: elem15x, y: elem15y - h})
        Body.setPosition(elem16, { x: elem16x, y: elem16y - h})
        Body.setPosition(elem17, { x: elem17x, y: elem17y - h})

        Body.setPosition(ball1, {x: 70,  y: 50-h })
        Body.setPosition(ball2, {x: 120, y: 50-h })
        Body.setPosition(ball3, {x: 170, y: 50-h })
        Body.setPosition(ball4, {x: 220, y: 50-h })
        Body.setPosition(ball5, {x: 270, y: 50-h })
        Body.setPosition(ball6, {x: 320, y: 50-h })
        Body.setPosition(ball7, {x: 370, y: 50-h })
        Body.setPosition(ball8, {x: 420, y: 50-h })
        Body.setPosition(ball9, {x: 470, y: 50-h })

        Body.setPosition(ground, { x: w/2, y: h+25}); 
        }, 2000);
        setTimeout(function(){reset_field()}, 10000);
    }
    // keep the mouse in sync with rendering
    // fit the render viewport to the scene
