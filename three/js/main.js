let scene, camera, renderer, cube1, cube2;

function init(){
    

    //SCENE

    scene = new THREE.Scene();

    scene.background = new THREE.Color( 0x6666);


    //CAMERA

    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );


    //RENDERER

    renderer = new THREE.WebGLRenderer({ antialias: true});

    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);


    //LIGHTS

    //CUBES

    const geometry1 = new THREE.BoxGeometry( 1, 1, 1 );
    const texture1 = new THREE.TextureLoader().load('images/floppa.jfif');
    const material1 = new THREE.MeshBasicMaterial( {map: texture1} );
    cube1 = new THREE.Mesh( geometry1, material1 );
    scene.add( cube1 );

    const geometry2 = new THREE.BoxGeometry( 1, 1, 1 );
    const texture2 = new THREE.TextureLoader().load('images/wal10go.jpg');
    const material2 = new THREE.MeshBasicMaterial( {map: texture2} );
    cube2 = new THREE.Mesh( geometry2, material2 );
    scene.add( cube2 );

    camera.position.z = 4;

    cube2.position.x += 1;
    cube1.position.x -= 1;

    cube1.rotation.x = 1;
    cube1.rotation.y = 1;

    cube2.rotation.x = 1;
    cube2.rotation.y = 1;

    //AUDIO

    // create an AudioListener and add it to the camera
    const listener = new THREE.AudioListener();
    camera.add( listener );

    // create a global audio source
    const sound = new THREE.Audio( listener );

    // load a sound and set it as the Audio object's buffer
    const audioLoader = new THREE.AudioLoader();
    audioLoader.load( 'sounds/sound6.ogg', function( buffer ) {
        sound.setBuffer( buffer );
        sound.setLoop( true );
        sound.setVolume( 0.5 );
        sound.play();
    });

    adjustLighting();
} 

function adjustLighting() {
    let pointLight = new THREE.PointLight(0xffffff)
    pointLight.position.set(50,100,100)
    scene.add(pointLight)

    let ambientLight = new THREE.AmbientLight(0x505050)
    scene.add(ambientLight)
}


function animate(){
    requestAnimationFrame(animate);
    
    cube1.rotation.x += 0.01; 
    cube1.rotation.y += 0.01;
    cube1.rotation.z += 0.01;

    cube2.rotation.x += 0.01;
    cube2.rotation.y += 0.01;
    cube2.rotation.z += 0.01;

    renderer.render(scene, camera);
}

function onWindowResize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize, false);

init();
animate();