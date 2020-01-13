"use strict";

// SETTINGS of this demo :
const SETTINGS = {
  numberRockets: 9,
  radiusEnd: 100,
  animationDuration: 2000 //in ms
};

// some globalz :
var THREECAMERA;
let ROCKETS = [];
let PARTICLES = [];

let ROCKETSOBJ3D = false;
let PARTICLESOBJ3D = new THREE.Object3D();
let PARTCONTOBJ3D = new THREE.Object3D();
let FIREWORKOBJ3D;

// callback : launched if a face is detected or lost. TODO : add a cool particle effect WoW !
function detect_callback(isDetected) {
  if (isDetected) {
    console.log('INFO in detect_callback() : DETECTED');
  } else {
    console.log('INFO in detect_callback() : LOST');
  }
}

// build the 3D. called once when Jeeliz Face Filter is OK
function init_threeScene(spec) {
  const threeStuffs = THREE.JeelizHelper.init(spec, detect_callback);

  FIREWORKOBJ3D = new THREE.Object3D();

  // CREATE ROCKETS
  threeStuffs.faceObject.add(FIREWORKOBJ3D);

  let particleMaterial = new THREE.SpriteMaterial({
    map: new THREE.CanvasTexture(generateSprite()),
    blending: THREE.AdditiveBlending
  });

  if (!ROCKETSOBJ3D) {
    ROCKETSOBJ3D = new THREE.Object3D();
    ROCKETS = [];
    let rocket;
    for (let i = 0; i <= SETTINGS.numberRockets; i++) {
      rocket = new THREE.Sprite(particleMaterial);
      rocket.position.x = Math.random()*1.5 - 0.75;
      rocket.position.y = -2;
      rocket.renderOrder = 100000;
      rocket.scale.multiplyScalar(0.08);
      rocket.visible = false;
      ROCKETSOBJ3D.add(rocket);
      ROCKETS.push(rocket);
    }
  }

  ROCKETS.forEach((r, index) => {
    r.position.y = -4;
    r.visible = false;
    setTimeout(() => {
      const positive = Math.random()*2 - 1 > 0 ? 1 : -1;
      r.position.x = ((Math.random()*0.5) + 0.5) *  positive;

      animateRocket(r, index);
    }, 1200*index);
  });

  FIREWORKOBJ3D.add(ROCKETSOBJ3D);

  // CREATE PARTICLES

  let particle;
  PARTICLES = [];

  let PARTICLESINSTANCE;
  const colors = ['red', 'yellow', 'green', 'blue', 'pink', 'red', 'yellow', 'green', 'blue', 'yellow'];
  
  PARTCONTOBJ3D = new THREE.Object3D();

  colors.forEach((color) => {
    PARTICLESINSTANCE = [];
    PARTICLESOBJ3D = new THREE.Object3D();

    particleMaterial = new THREE.SpriteMaterial({
      map: new THREE.CanvasTexture(generateSprite(color)),
      blending: THREE.AdditiveBlending
    });

    for (let i = 0; i <= 100; i++) {
      particle = new THREE.Sprite(particleMaterial);

      particle.renderOrder = 100000;
      particle.scale.multiplyScalar(3);
      particle.visible = false;
      PARTICLESINSTANCE.push(particle);
      
      PARTICLESOBJ3D.add(particle);
    }
    PARTICLES.push(PARTICLESINSTANCE);
    PARTCONTOBJ3D.add(PARTICLESOBJ3D);
  })
  FIREWORKOBJ3D.add(PARTCONTOBJ3D);

  // CREATE THE VIDEO BACKGROUND
  function create_mat2d(threeTexture, isTransparent){ //MT216 : we put the creation of the video material in a func because we will also use it for the frame
    return new THREE.RawShaderMaterial({
      depthWrite: false,
      depthTest: false,
      transparent: isTransparent,
      vertexShader: "attribute vec2 position;\n\
        varying vec2 vUV;\n\
        void main(void){\n\
          gl_Position=vec4(position, 0., 1.);\n\
          vUV=0.5+0.5*position;\n\
        }",
      fragmentShader: "precision lowp float;\n\
        uniform sampler2D samplerVideo;\n\
        varying vec2 vUV;\n\
        void main(void){\n\
          gl_FragColor=texture2D(samplerVideo, vUV);\n\
        }",
       uniforms:{
        samplerVideo: { value: threeTexture }
       }
    });
  }

  //MT216 : create the frame. We reuse the geometry of the video
  const calqueMesh = new THREE.Mesh(threeStuffs.videoMesh.geometry, create_mat2d(new THREE.TextureLoader().load('./images/frame_fireworks.png'), true))
  calqueMesh.renderOrder = 999; // render last
  calqueMesh.frustumCulled = false;
  threeStuffs.scene.add(calqueMesh);

  // CREATE THE CAMERA
  THREECAMERA = THREE.JeelizHelper.create_camera();
} // end init_threeScene()

// Generates a canvas which we'll use as particles
function generateSprite(color) {
  const canvas = document.createElement('canvas');

  canvas.width = 32;
  canvas.height = 32;

  const context = canvas.getContext('2d');
  const gradient = context.createRadialGradient(canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, canvas.width / 2);

  gradient.addColorStop(0.5, 'rgba(255,255,255,1)');
  gradient.addColorStop(0.2, 'rgba(0,255,255,1)');
  gradient.addColorStop(0.5, color ? color : 'blue');
  gradient.addColorStop(1, 'rgba(0,0,0,0.1)');

  context.fillStyle = gradient;
  context.fillRect(0, 0, canvas.width, canvas.height);

  return canvas;
}

// Animates our rockets
function animateRocket(rocket, index) {
  rocket.visible = true;
  new TWEEN.Tween(rocket.position)
    .to({ y: 1 }, 2000)
    .onComplete(() => {
      PARTICLES[index].forEach((part, ind) => {
        part.position.set(rocket.position.x, rocket.position.y, rocket.position.z);
        animateParticle(part, rocket, ind);
      });

      rocket.visible = false;
      setTimeout(() => {
        const positive = Math.random()*2 - 1 > 0 ? 1 : -1;
        rocket.position.x = ((Math.random()*0.5) + 0.5) *  positive;
        rocket.position.y = -4;
        animateRocket(rocket, index);
      }, 3000);
    })
    .start();
}


function animateParticle( particle, rocket, index ) {
  particle.visible = true;
  
  // var theta = Math.clz32(Math.random()*2*Math.PI); //angle in the plane XY
  var theta = Math.log10(Math.random()*2*Math.PI); //angle in the plane XY
  // var theta = Math.imul(Math.random()*2*Math.PI); //angle in the plane XY
  // var theta = Math.sign(Math.random()*2*Math.PI); //angle in the plane XY
  // var theta = Math.cbrt(Math.random()*2*Math.PI); //angle in the plane XY
  var phi = (Math.random()*2-1)*Math.PI/4 //angle between plane XY and the particle. 0-> in the plane XY

  particle.rotation._z = particle.rotation.z*Math.random();

  new TWEEN.Tween( particle.position )
    .to( {x: 0.04*SETTINGS.radiusEnd*Math.cos(theta)*Math.sin(phi),
        y: 0.04*SETTINGS.radiusEnd*Math.sin(theta)*Math.cos(phi),
        }, SETTINGS.animationDuration)
    .start();

  //tween scale :
  particle.scale.x = particle.scale.y = Math.random() * 0.1;
  new TWEEN.Tween( particle.scale )
    .to( {x: 0.0001, y: 0.0001}, SETTINGS.animationDuration)
    .start();
}

//launched by body.onload() :
function main(){
  JeelizResizer.size_canvas({
    canvasId: 'jeeFaceFilterCanvas',
    callback: function(isError, bestVideoSettings){
      init_faceFilter(bestVideoSettings);
    }
  })
} //end main()

function init_faceFilter(videoSettings){
  JEEFACEFILTERAPI.init({
    canvasId: 'jeeFaceFilterCanvas',
    NNCpath: '../../../dist/', // root of NNC.json file
    videoSettings: videoSettings,
    callbackReady: function (errCode, spec) {
      if (errCode) {
        console.log('AN ERROR HAPPENS. SORRY BRO :( . ERR =', errCode);
        return;
      }

      console.log('INFO : JEEFACEFILTERAPI IS READY');
      init_threeScene(spec);
    }, // end callbackReady()

    // called at each render iteration (drawing loop)
    callbackTrack: function (detectState) {
      TWEEN.update();
      THREE.JeelizHelper.render(detectState, THREECAMERA);
    } // end callbackTrack()
  }); // end JEEFACEFILTERAPI.init call
} // end main()

