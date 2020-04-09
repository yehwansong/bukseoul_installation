"use strict";

// some globalz :
var THREECAMERA; // should be prop of window (so no let)

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

  // CREATE OUR HELMET MESH AND ADD IT TO OUR SCENE
  const HELMETOBJ3D = new THREE.Object3D();
  let helmetMesh;
  let visiereMesh;
  let faceMesh;

  const loadingManager = new THREE.LoadingManager();

  const helmetLoader = new THREE.BufferGeometryLoader(loadingManager);

  helmetLoader.load(
    './models/helmet/helmet.json',
    (helmetGeometry) => {
      const helmetMaterial = new THREE.MeshPhongMaterial({
        map: new THREE.TextureLoader().load('./models/helmet/diffuse_helmet.jpg'),
        reflectionRatio: 1,
        shininess: 50
      });

      helmetMesh = new THREE.Mesh(helmetGeometry, helmetMaterial);
      helmetMesh.scale.multiplyScalar(0.037);
      helmetMesh.position.y -= 0.3;
      helmetMesh.position.z -= 0.5;
      helmetMesh.rotation.x += 0.5;
    }
  );

  const visiereLoader = new THREE.BufferGeometryLoader(loadingManager);
  visiereLoader.load(
    './models/helmet/visiere.json',
    (visiereGeometry) => {
      const visiereMaterial = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.5,
        side: THREE.FrontSide
      });

      visiereMesh = new THREE.Mesh(visiereGeometry, visiereMaterial);
      visiereMesh.scale.multiplyScalar(0.037);
      visiereMesh.position.y -= 0.3;
      visiereMesh.position.z -= 0.5;
      visiereMesh.rotation.x += 0.5;
      visiereMesh.frustumCulled = false;
    }
  );

  // CREATE THE MASK
  const maskLoader = new THREE.BufferGeometryLoader(loadingManager);
  /*
  faceLowPolyEyesEarsFill.json has been exported from dev/faceLowPolyEyesEarsFill.blend using THREE.JS blender exporter with Blender v2.76
  */
  maskLoader.load('./models/face/faceLowPolyEyesEarsFill2.json', function (maskBufferGeometry) {
    const vertexShaderSource = 'varying vec2 vUVvideo;\n\
    varying float vY, vNormalDotZ;\n\
    const float THETAHEAD=0.25;\n\
    void main() {\n\
      vec4 mvPosition = modelViewMatrix * vec4( position, 1.0);\n\
      vec4 projectedPosition=projectionMatrix * mvPosition;\n\
      gl_Position=projectedPosition;\n\
      \n\
      //compute UV coordinates on the video texture :\n\
      vec4 mvPosition0 = modelViewMatrix * vec4( position, 1.0 );\n\
      vec4 projectedPosition0=projectionMatrix * mvPosition0;\n\
      vUVvideo=vec2(0.5,0.5)+0.5*projectedPosition0.xy/projectedPosition0.w;\n\
      vY=position.y*cos(THETAHEAD)-position.z*sin(THETAHEAD);\n\
      vec3 normalView=vec3(modelViewMatrix * vec4(normal,0.));\n\
      vNormalDotZ=pow(abs(normalView.z), 1.5);\n\
    }';

     const fragmentShaderSource = "precision lowp float;\n\
    uniform sampler2D samplerVideo;\n\
    varying vec2 vUVvideo;\n\
    varying float vY, vNormalDotZ;\n\
    void main() {\n\
      vec3 videoColor=texture2D(samplerVideo, vUVvideo).rgb;\n\
      float darkenCoeff=smoothstep(-0.15, 0.05, vY);\n\
      float borderCoeff=smoothstep(0.0, 0.55, vNormalDotZ);\n\
      gl_FragColor=vec4(videoColor*(1.-darkenCoeff), borderCoeff );\n\
      // gl_FragColor=vec4(borderCoeff, 0., 0., 1.);\n\
      // gl_FragColor=vec4(darkenCoeff, 0., 0., 1.);\n\
    }";

    const mat = new THREE.ShaderMaterial({
      vertexShader: vertexShaderSource,
      fragmentShader: fragmentShaderSource,
      transparent: true,
      flatShading: false,
      uniforms: {
        samplerVideo:{ value: THREE.JeelizHelper.get_threeVideoTexture() }
      }
       ,transparent: true
    });
    maskBufferGeometry.computeVertexNormals();
    faceMesh = new THREE.Mesh(maskBufferGeometry, mat);
    faceMesh.renderOrder = -10000;
    faceMesh.frustumCulled = false;
    faceMesh.scale.multiplyScalar(1.12);
    faceMesh.position.set(0, 0.3, -0.25);
  })

  loadingManager.onLoad = () => {
    HELMETOBJ3D.add(helmetMesh);
    HELMETOBJ3D.add(visiereMesh);
    HELMETOBJ3D.add(faceMesh);

    addDragEventListener(HELMETOBJ3D);
    
    threeStuffs.faceObject.add(HELMETOBJ3D);
  }

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
  const calqueMesh = new THREE.Mesh(threeStuffs.videoMesh.geometry,  create_mat2d(new THREE.TextureLoader().load('./images/frame_rupy.png'), true));
  calqueMesh.renderOrder = 999; // render last
  calqueMesh.frustumCulled = false;
  threeStuffs.scene.add(calqueMesh);

  // CREATE THE CAMERA:
  THREECAMERA = THREE.JeelizHelper.create_camera();

  // CREATE THE LIGHTS:
  const ambientLight = new THREE.AmbientLight( 0x404040 ); // soft white light
  threeStuffs.scene.add(ambientLight);

  const dirLight = new THREE.DirectionalLight( 0xffffff );
  dirLight.position.set( 100, 1000, 100 );

  threeStuffs.scene.add(dirLight);
} // end init_threeScene()

//launched by body.onload():
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
      THREE.JeelizHelper.render(detectState, THREECAMERA);
    }
  }); // end JEEFACEFILTERAPI.init call
} // end main()

