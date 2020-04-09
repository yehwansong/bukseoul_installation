
    var Engine = Matter.Engine,
        Render = Matter.Render,
        Runner = Matter.Runner,
        Composites = Matter.Composites,
        Common = Matter.Common,
        Constraint = Matter.Constraint,
        MouseConstraint = Matter.MouseConstraint,
        Mouse = Matter.Mouse,
        World = Matter.World,
        Bodies = Matter.Bodies;

    // create engine
    var engine = Engine.create(),
        world = engine.world;

    // create renderer
    var render = Render.create({
        element: document.body,
        engine: engine,
        options: {
            width: 800,
            height: 600,
            showAngleIndicator: true
        }
    });

    Render.run(render);

    // create runner
    var runner = Runner.create();
    Runner.run(runner, engine);

    // add revolute multi-body constraint
    var ball1 = Bodies.circle(500, 0, 24.5, { collisionFilter: { group: -1 } });
    var ball2 = Bodies.circle(550, 0, 24.5, { collisionFilter: { group: -1 } });
    var ball3 = Bodies.circle(600, 0, 24.5, { collisionFilter: { group: -1 } });
    var ball4 = Bodies.circle(650, 0, 24.5, { collisionFilter: { group: -1 } });
    var ball5 = Bodies.circle(700, 0, 24.5, { collisionFilter: { group: -1 } });
    var ball6 = Bodies.circle(750, 0, 24.5, { collisionFilter: { group: -1 } });
    var ball7 = Bodies.circle(800, 0, 24.5, { collisionFilter: { group: -1 } });

    var constraint1 = Constraint.create({
        bodyA: ball1,
        bodyB: ball2
    });
    var constraint2 = Constraint.create({
        bodyA: ball2,
        bodyB: ball3
    });
    var constraint3 = Constraint.create({
        bodyA: ball3,
        bodyB: ball4
    });
    var constraint4 = Constraint.create({
        bodyA: ball4,
        bodyB: ball5
    });
    var constraint5 = Constraint.create({
        bodyA: ball5,
        bodyB: ball6
    });
    var constraint6 = Constraint.create({
        bodyA: ball6,
        bodyB: ball7
    });

    World.add(world, [ball1, ball2, ball3, ball4, ball5, ball6, ball7,
        constraint1, constraint2, constraint3, constraint4, constraint5, constraint6
        ]);
    // World.add(world, [ball2]);


    World.add(world, [
        // walls
        Bodies.rectangle(400, 0, 800, 50, { isStatic: true }),
        Bodies.rectangle(400, 600, 800, 50, { isStatic: true }),
        Bodies.rectangle(800, 300, 50, 600, { isStatic: true }),
        Bodies.rectangle(0, 300, 50, 600, { isStatic: true })
    ]);

    // add mouse control
    var mouse = Mouse.create(render.canvas),
        mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                // allow bodies on mouse to rotate
                angularStiffness: 0,
                render: {
                    visible: false
                }
            }
        });

    World.add(world, mouseConstraint);

    // keep the mouse in sync with rendering
    render.mouse = mouse;

    // fit the render viewport to the scene
    Render.lookAt(render, {
        min: { x: 0, y: 0 },
        max: { x: 800, y: 600 }
    });
