"use strict";

// some globalz :

var THREECAMERA;
let ISDETECTED = false;



let FACEMESH;

let ANGELMESH1 = false;
let ANGELMESH2 = false;
let ANGELMESH3 = false;
let MIXERANGEL1 = false;
let MIXERANGEL2 = false;
let MIXERANGEL3 = false;
let ACTIONANGEL1 = false;
let ACTIONANGEL2 = false;
let ACTIONANGEL3 = false;

let HARPMESH1 = false;
let HARPMESH2 = false;
let HARPMESH3 = false;
let MIXERHARP1 = false;
let MIXERHARP2 = false;
let MIXERHARP3 = false;
let ACTIONHARP1 = false;
let ACTIONHARP2 = false;
let ACTIONHARP3 = false;

let DEMONMESH1 = false;
let DEMONMESH2 = false;
let DEMONMESH3 = false;
let MIXERDEMON1 = false;
let MIXERDEMON2 = false;
let MIXERDEMON3 = false;
let ACTIONDEMON1 = false;
let ACTIONDEMON2 = false;
let ACTIONDEMON3 = false;

let FORKMESH1 = false;
let FORKMESH2 = false;
let FORKMESH3 = false;
let MIXERFORK1 = false;
let MIXERFORK2 = false;
let MIXERFORK3 = false;
let ACTIONFORK1 = false;
let ACTIONFORK2 = false;
let ACTIONFORK3 = false;

const GROUPOBJ3D = new THREE.Object3D();

const states = {
  intro: 0,
  idle: 1,
  fight: 2
}

let state = false;

let isLoaded = false;

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

  $('#openMouthInstructions').hide();

  const loadingManager = new THREE.LoadingManager();

  /*
    LOAD ALL THE ANGEL MESHS
  */
  const loaderAngelIntro = new THREE.JSONLoader(loadingManager);

  loaderAngelIntro.load(
    './models/angel/angel_intro.json',
    function (geometry) {
      const mat = new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load("./models/angel/diffuse_angel.png"),
        morphTargets: true
      });

      ANGELMESH1 = new THREE.Mesh(geometry, mat);

      ANGELMESH1.frustumCulled = false;
      ANGELMESH1.side = THREE.DoubleSide;

      MIXERANGEL1 = new THREE.AnimationMixer(ANGELMESH1);
      const clipsAngel = ANGELMESH1.geometry.animations;

      const clipAngel = clipsAngel[0];

      ACTIONANGEL1 = MIXERANGEL1.clipAction(clipAngel);
    }
  )

  const loaderAngelIdle = new THREE.JSONLoader(loadingManager);

  loaderAngelIdle.load(
    './models/angel/angel_idle.json',
    function (geometry) {
      const mat = new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load("./models/angel/diffuse_angel.png"),
        morphTargets: true
      });

      ANGELMESH2 = new THREE.Mesh(geometry, mat);

      ANGELMESH2.frustumCulled = false;
      ANGELMESH2.side = THREE.DoubleSide;
      ANGELMESH2.visible = false;

      MIXERANGEL2 = new THREE.AnimationMixer(ANGELMESH2);
      const clipsAngel = ANGELMESH2.geometry.animations;

      const clipAngel = clipsAngel[0];

      ACTIONANGEL2 = MIXERANGEL2.clipAction(clipAngel);
    }
  )

  const loaderAngelFight = new THREE.JSONLoader(loadingManager);

  loaderAngelFight.load(
    './models/angel/angel_fight.json',
    function (geometry) {
      const mat = new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load("./models/angel/diffuse_angel.png"),
        morphTargets: true
      });

      ANGELMESH3 = new THREE.Mesh(geometry, mat);

      ANGELMESH3.frustumCulled = false;
      ANGELMESH3.side = THREE.DoubleSide;
      ANGELMESH3.visible = false;

      MIXERANGEL3 = new THREE.AnimationMixer(ANGELMESH3);
      const clipsAngel = ANGELMESH3.geometry.animations;

      const clipAngel = clipsAngel[0];

      ACTIONANGEL3 = MIXERANGEL3.clipAction(clipAngel);
    }
  )

  /*
    LOAD ALL HARP MESHS
  */
  const loaderHarpIntro = new THREE.JSONLoader(loadingManager);

  loaderHarpIntro.load(
    './models/angel/harp_intro.json',
    function (geometry) {
      const mat = new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load("./models/angel/harpe.jpg"),
        morphTargets: true
      });

      HARPMESH1 = new THREE.Mesh(geometry, mat);

      HARPMESH1.frustumCulled = false;
      HARPMESH1.side = THREE.DoubleSide;

      MIXERHARP1 = new THREE.AnimationMixer(HARPMESH1);
      const clipsHarp = HARPMESH1.geometry.animations;


      const clipHarp = clipsHarp[0];

      ACTIONHARP1 = MIXERHARP1.clipAction(clipHarp);  
    }
  )

  const loaderHarpIdle = new THREE.JSONLoader(loadingManager);

  loaderHarpIdle.load(
    './models/angel/harp_idle.json',
    function (geometry) {
      const mat = new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load("./models/angel/harpe.jpg"),
        morphTargets: true
      });

      HARPMESH2 = new THREE.Mesh(geometry, mat);

      HARPMESH2.frustumCulled = false;
      HARPMESH2.side = THREE.DoubleSide;
      HARPMESH2.visible = false;

      MIXERHARP2 = new THREE.AnimationMixer(HARPMESH2);
      const clipsHarp = HARPMESH2.geometry.animations;


      const clipHarp = clipsHarp[0];

      ACTIONHARP2 = MIXERHARP2.clipAction(clipHarp);   
    }
  )

  const loaderHarpFight = new THREE.JSONLoader(loadingManager);

  loaderHarpFight.load(
    './models/angel/harp_fight.json',
    function (geometry) {
      const mat = new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load("./models/angel/harpe.jpg"),
        morphTargets: true
      });

      HARPMESH3 = new THREE.Mesh(geometry, mat);

      HARPMESH3.frustumCulled = false;
      HARPMESH3.side = THREE.DoubleSide;
      HARPMESH3.visible = false;

      MIXERHARP3 = new THREE.AnimationMixer(HARPMESH3);
      const clipsHarp = HARPMESH3.geometry.animations;


      const clipHarp = clipsHarp[0];

      ACTIONHARP3 = MIXERHARP3.clipAction(clipHarp);      
    }
  )

  /*
    LOAD ALL DEMON MESHS
  */
  const loaderDemonIntro = new THREE.JSONLoader(loadingManager);

  loaderDemonIntro.load(
    './models/demon/demon_intro.json',
    function (geometry) {
      const mat = new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load("./models/demon/diffuse_demon.png"),
        morphTargets: true
      });

      DEMONMESH1 = new THREE.Mesh(geometry, mat);

      DEMONMESH1.frustumCulled = false;
      DEMONMESH1.side = THREE.DoubleSide;

      MIXERDEMON1 = new THREE.AnimationMixer(DEMONMESH1);
      const clipsDemon = DEMONMESH1.geometry.animations;


      const clipDemon = clipsDemon[0];

      ACTIONDEMON1 = MIXERDEMON1.clipAction(clipDemon);
    }
  )

  const loaderDemonIdle = new THREE.JSONLoader(loadingManager);

  loaderDemonIdle.load(
    './models/demon/demon_idle.json',
    function (geometry) {
      const mat = new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load("./models/demon/diffuse_demon.png"),
        morphTargets: true
      });

      DEMONMESH2 = new THREE.Mesh(geometry, mat);

      DEMONMESH2.frustumCulled = false;
      DEMONMESH2.side = THREE.DoubleSide;
      DEMONMESH2.visible = false;

      MIXERDEMON2 = new THREE.AnimationMixer(DEMONMESH2);
      const clipsDemon = DEMONMESH2.geometry.animations;


      const clipDemon = clipsDemon[0];

      ACTIONDEMON2 = MIXERDEMON2.clipAction(clipDemon);
    }
  )

  const loaderDemonFight = new THREE.JSONLoader(loadingManager);

  loaderDemonFight.load(
    './models/demon/demon_fight.json',
    function (geometry) {
      const mat = new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load("./models/demon/diffuse_demon.png"),
        morphTargets: true
      });

      DEMONMESH3 = new THREE.Mesh(geometry, mat);

      DEMONMESH3.frustumCulled = false;
      DEMONMESH3.side = THREE.DoubleSide;
      DEMONMESH3.visible = false;

      MIXERDEMON3 = new THREE.AnimationMixer(DEMONMESH3);
      const clipsDemon = DEMONMESH3.geometry.animations;


      const clipDemon = clipsDemon[0];

      ACTIONDEMON3 = MIXERDEMON3.clipAction(clipDemon);
    }
  )

  /*
    LOAD ALL FORK MESHS
  */
  const loaderForkIntro = new THREE.JSONLoader(loadingManager);

  loaderForkIntro.load(
    './models/demon/fourche_intro.json',
    function (geometry) {
      const mat = new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load("./models/demon/fourche.jpg"),
        morphTargets: true
      });

      FORKMESH1 = new THREE.Mesh(geometry, mat);

      FORKMESH1.frustumCulled = false;
      FORKMESH1.side = THREE.DoubleSide;

      MIXERFORK1 = new THREE.AnimationMixer(FORKMESH1);
      const clipsFork = FORKMESH1.geometry.animations;


      const clipFork = clipsFork[0];

      ACTIONFORK1 = MIXERFORK1.clipAction(clipFork);
    }
  )

  const loaderForkIdle = new THREE.JSONLoader(loadingManager);

  loaderForkIdle.load(
    './models/demon/fourche_idle.json',
    function (geometry) {
      const mat = new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load("./models/demon/fourche.jpg"),
        morphTargets: true
      });

      FORKMESH2 = new THREE.Mesh(geometry, mat);

      FORKMESH2.frustumCulled = false;
      FORKMESH2.side = THREE.DoubleSide;
      FORKMESH2.visible = false;

      MIXERFORK2 = new THREE.AnimationMixer(FORKMESH2);
      const clipsFork = FORKMESH2.geometry.animations;


      const clipFork = clipsFork[0];

      ACTIONFORK2 = MIXERFORK2.clipAction(clipFork);  
    }
  )

  const loaderForkFight = new THREE.JSONLoader(loadingManager);

  loaderForkFight.load(
    './models/demon/fourche_fight.json',
    function (geometry) {
      const mat = new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load("./models/demon/fourche.jpg"),
        morphTargets: true
      });

      FORKMESH3 = new THREE.Mesh(geometry, mat);

      FORKMESH3.frustumCulled = false;
      FORKMESH3.side = THREE.DoubleSide;
      FORKMESH3.visible = false;

      MIXERFORK3 = new THREE.AnimationMixer(FORKMESH3);
      const clipsFork = FORKMESH3.geometry.animations;


      const clipFork = clipsFork[0];

      ACTIONFORK3 = MIXERFORK3.clipAction(clipFork);
    }
  )


  // CREATE THE MASK
  FACEMESH = THREE.JeelizHelper.create_threejsOccluder('./models/face/face.json');
  FACEMESH.frustumCulled = false;
  FACEMESH.scale.multiplyScalar(1.1);
  FACEMESH.position.set(0, 0.7, -0.75);
  FACEMESH.renderOrder = 100000;

  loadingManager.onLoad = () => {
    isLoaded = true;
    GROUPOBJ3D.add(
      ANGELMESH1,
      ANGELMESH2,
      ANGELMESH3,
      HARPMESH1,
      HARPMESH2,
      HARPMESH3,
      DEMONMESH1,
      DEMONMESH2,
      DEMONMESH3,
      FORKMESH1,
      FORKMESH2,
      FORKMESH3,
      FACEMESH);

    GROUPOBJ3D.scale.multiplyScalar(1.4);
    GROUPOBJ3D.position.y -= 0.5;
    GROUPOBJ3D.position.z -= 0.5;


    addDragEventListener(GROUPOBJ3D);
    threeStuffs.faceObject.add(GROUPOBJ3D);

    animateIntro();
  } 

  // CREATE THE CAMERA
  THREECAMERA = THREE.JeelizHelper.create_camera();
} // end init_threeScene()

function animateIntro () {
  state = states.intro;

  ACTIONANGEL1.clampWhenFinished = true;
  ACTIONHARP1.clampWhenFinished = true;
  ACTIONDEMON1.clampWhenFinished = true;
  ACTIONFORK1.clampWhenFinished = true;


  MIXERANGEL1.addEventListener('loop', () => {
    animateIdle();
  });

  ACTIONANGEL1.play();
  ACTIONHARP1.play();
  ACTIONDEMON1.play();
  ACTIONFORK1.play();
}

function animateIdle() {
  $('#openMouthInstructions').show();

  state = states.idle;

  // Stop animation + hide meshes
  ACTIONANGEL1.stop();
  ACTIONHARP1.stop();
  ACTIONDEMON1.stop();
  ACTIONFORK1.stop();
  ANGELMESH1.visible = false;
  HARPMESH1.visible = false;
  DEMONMESH1.visible = false;
  FORKMESH1.visible = false;

  // Stop animation + hide meshes
  ACTIONANGEL3.stop();
  ACTIONHARP3.stop();
  ACTIONDEMON3.stop();
  ACTIONFORK3.stop();
  ANGELMESH3.visible = false;
  HARPMESH3.visible = false;
  DEMONMESH3.visible = false;
  FORKMESH3.visible = false;

  // Show meshes + start animation
  ANGELMESH2.visible = true;
  HARPMESH2.visible = true;
  DEMONMESH2.visible = true;
  FORKMESH2.visible = true;
  ACTIONANGEL2.play();
  ACTIONHARP2.play();
  ACTIONDEMON2.play();
  ACTIONFORK2.play();
}

function animateFight() {
  state = states.fight;

  // Stop animation + hide meshes
  ACTIONANGEL2.stop();
  ACTIONHARP2.stop();
  ACTIONDEMON2.stop();
  ACTIONFORK2.stop();
  ANGELMESH2.visible = false;
  HARPMESH2.visible = false;
  DEMONMESH2.visible = false;
  FORKMESH2.visible = false;

  MIXERFORK3.addEventListener('loop', () => {
    animateIdle();
  });

  // Show meshes + start animation
  ANGELMESH3.visible = true;
  HARPMESH3.visible = true;
  DEMONMESH3.visible = true;
  FORKMESH3.visible = true;
  ACTIONANGEL3.play();
  ACTIONHARP3.play();
  ACTIONDEMON3.play();
  ACTIONFORK3.play();
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

function init_faceFilter(videoSettings) {
  JEEFACEFILTERAPI.init({
    canvasId: 'jeeFaceFilterCanvas',
    NNCpath: '../../../dist/', // root of NNC.json file
    videoSettings: videoSettings,
    callbackReady: function (errCode, spec) {
      if (errCode) {
        console.log('AN ERROR HAPPENED. SORRY BRO :( . ERR =', errCode);
        return;
      }

      console.log('INFO : JEEFACEFILTERAPI IS READY');
      init_threeScene(spec);
    }, // end callbackReady()

    // called at each render iteration (drawing loop)
    callbackTrack: function (detectState) {
      ISDETECTED = THREE.JeelizHelper.get_isDetected();
      
      if (detectState.expressions[0] >= 0.8 && isLoaded && state !== 0 && state !== 2) {
        animateFight();
      }


      switch (state) {
        case 0:
          MIXERANGEL1.update(0.08);
          MIXERHARP1.update(0.08);
          MIXERDEMON1.update(0.08);
          MIXERFORK1.update(0.08);
          break
        case 1:
          MIXERANGEL2.update(0.08);
          MIXERHARP2.update(0.08);
          MIXERDEMON2.update(0.08);
          MIXERFORK2.update(0.08);
          break
        case 2:
          MIXERANGEL3.update(0.08);
          MIXERHARP3.update(0.08);
          MIXERDEMON3.update(0.08);
          MIXERFORK3.update(0.08);
          break
        default:
      }

      // trigger the render of the THREE.JS SCENE
      THREE.JeelizHelper.render(detectState, THREECAMERA);
    } // end callbackTrack()
  }); // end JEEFACEFILTERAPI.init call
} // end main()

