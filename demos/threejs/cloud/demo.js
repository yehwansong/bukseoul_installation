"use strict";

// some globalz :
let THREECAMERA;
let ISDETECTED = false;
let PARTICLES;
let PARTICLES2;
let PARTICLES3;
let CLOUDMESH2;
let CLOUDMESH3;
let CLOUDOBJ3D;


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

  let CLOUDMESH;
  let LIGHTNINGMESH;
  PARTICLES = [];
  PARTICLES2 = [];
  PARTICLES3 = [];

  // CREATE OUR CLOUD
  const loaderCloud = new THREE.BufferGeometryLoader()

  loaderCloud.load(
    './models/cloud/cloud.json',
    (geometry) => {
      const mat = new THREE.MeshPhongMaterial({
        map: new THREE.TextureLoader().load('./models/cloud/cloud.png'),
        shininess: 2,
        specular: 0xffffff,
        opacity: 0.7,
        transparent: true
      });

      // We create our first Cloud, scale and position it
      CLOUDMESH = new THREE.Mesh(geometry, mat);
      CLOUDMESH.scale.multiplyScalar(0.4);
      CLOUDMESH.scale.y = CLOUDMESH.scale.y * 0.5;
      CLOUDMESH.position.setY(0.85);
      CLOUDMESH.frustumCulled = false;
      CLOUDMESH.renderOrder = 10000;

      // ...same here for the second cloud
      CLOUDMESH2 = CLOUDMESH.clone();
      CLOUDMESH2.scale.multiplyScalar(0.4);
      CLOUDMESH2.position.set(0.7, 0.99, 0);
      CLOUDMESH2.scale.y  = CLOUDMESH2.scale.y * 0.9;
      CLOUDMESH2.scale.x  = CLOUDMESH2.scale.x * 0.7;
      CLOUDMESH2.quaternion._y = CLOUDMESH2.quaternion._y * 10;

      // ...and for the third
      CLOUDMESH3 = CLOUDMESH.clone();
      CLOUDMESH3.scale.multiplyScalar(0.4);
      CLOUDMESH3.position.set(-0.25, 0.69, 0.1);
      CLOUDMESH3.scale.y  = CLOUDMESH3.scale.y * 1.3;
      CLOUDMESH3.scale.x  = CLOUDMESH3.scale.x * 1.2;
      CLOUDMESH3.quaternion._y = CLOUDMESH3.quaternion._y * 10;

      // Here we create a pointlight that we'll add to our main cloud 
      // to mimic a storm
      var pointLight = new THREE.PointLight(0xffffff, 0, 100);
      pointLight.position.set(0, 0.15, -1);
      animatePointLight(pointLight);


      // CREATE OUR PARTICLE MATERIAL

      let PARTICLESOBJ3D = new THREE.Object3D();
      

      CLOUDOBJ3D = new THREE.Object3D();
      CLOUDOBJ3D.add(CLOUDMESH);
      CLOUDOBJ3D.add(CLOUDMESH2);
      CLOUDOBJ3D.add(CLOUDMESH3);
      CLOUDOBJ3D.add(pointLight);
      CLOUDOBJ3D.add(PARTICLESOBJ3D);

      // Here we begin creating the rain, which will be built of rectangle shaped particles
      const particleGeometry = new THREE.PlaneGeometry(0.09, 0.7)

      const particleMaterial = new THREE.MeshBasicMaterial({
        color: 0xFFFFFF,
        transparent: true,
        opacity: 0.5
      });
      let particle;
      let particle2;
      let particle3;
      for ( let i = 0; i <= 500; i++ ) {
        particle = new THREE.Mesh(particleGeometry, particleMaterial)
        particle.position.x = Math.random()*1.4 - 0.7
        particle.position.y = 1.5
        particle.renderOrder = 100000
        particle.scale.multiplyScalar(0.1)
        particle.visible = false;

        particle2 = new THREE.Mesh(particleGeometry, particleMaterial)
        particle2.position.x = Math.random()*0.3 - 0.15 + 0.7;
        particle2.position.y = 1.19;
        particle2.renderOrder = 100000;
        particle2.scale.multiplyScalar(0.1);
        particle2.visible = false;

        particle3 = new THREE.Mesh(particleGeometry, particleMaterial)
        particle3.position.x = Math.random()*0.4 - 0.2 - 0.3;
        particle3.position.y = 1.1;
        particle3.position.z = 0.02;
        particle3.renderOrder = 100000;
        particle3.scale.multiplyScalar(0.1);
        particle3.visible = false;

        PARTICLES.push(particle);
        PARTICLES2.push(particle2);
        PARTICLES3.push(particle3);


        PARTICLESOBJ3D.add(particle);
        PARTICLESOBJ3D.add(particle2);
        PARTICLESOBJ3D.add(particle3);
      }

      let tag
      PARTICLES.forEach((part, index) => {
        animateParticleCloud(part, index, tag);
      });
      PARTICLES2.forEach((part, index) => {
        animateParticleCloud(part, index, tag);
      });

      PARTICLES3.forEach((part, index) => {
        animateParticleCloud(part, index, tag);
      });

      threeStuffs.faceObject.add(CLOUDOBJ3D)
    }
  );

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
  const calqueMesh = new THREE.Mesh(threeStuffs.videoMesh.geometry,  create_mat2d(new THREE.TextureLoader().load('./images/frame_cloud.png'), true))
  calqueMesh.renderOrder = 100000; // render last
  calqueMesh.frustumCulled = false;
  threeStuffs.scene.add(calqueMesh);

  // CREATE THE CAMERA
  THREECAMERA = THREE.JeelizHelper.create_camera();

  // CREATE A LIGHT
  const ambient = new THREE.AmbientLight(0xffffff, 0.8);
  threeStuffs.scene.add(ambient);

  // CREATE A SPOTLIGHT
  var dirLight = new THREE.DirectionalLight(0xffffff);
  dirLight.position.set(100, 1000, 100);

  threeStuffs.scene.add(dirLight);
} // end init_threeScene()

function animateParticleCloud(particle, index) {
  particle.visible = true;
  new TWEEN.Tween(particle.position)
    .to( { y: - 20 }, 3000)
    .delay(index*15)
    .repeat(Infinity)
    .onComplete(() => {
      // particle.visible = false;

      animateParticleCloud(particle, index);
    })
    .start();
}

function animatePointLight (light) {
  let delay = 3000;
  let x;
  let y;
  const opacityUp1 = new TWEEN.Tween(light)
  .to({ intensity: 3 }, 100)

  const opacityUp2 = new TWEEN.Tween(light)
  .to({ intensity: 3 }, 80)

  const opacityDown1 = new TWEEN.Tween(light)
  .to({ intensity: 0 }, 50)

  const opacityDown2 = new TWEEN.Tween(light)
  .to({ intensity: 0 }, 50)

  opacityUp1.chain(opacityDown1);
  opacityDown1.chain(opacityUp2);
  opacityUp2.chain(opacityDown2);

  opacityDown2.onComplete(() => {
    setTimeout(() => {
      x = Math.random() * 2 - 1;

      light.position.set(x, 0, light.position.z);
      opacityUp1.start();
      delay = 3000;     
    }, 3000)

  })

  opacityUp1.start();
}

//launched by body.onload() :
function main() {
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

