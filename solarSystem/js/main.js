/*==============================================*\
|                  Solar System                  |
|                                                |
|                       by                       |
|                                                |
|                Lorenzo Del Forno               |
|                Emanuele Driussi                |
|                  Andrea Mauro                  |
|                 Denis Scavello                 |
|                Matteo Tramontina               |
|                     ------                     |
|          3^IA Bearzi (UD), Stage 2021          |
\*==============================================*/


let t, scene, camera, renderer, space, moon, sun_lay1, sun_lay2, sun_lay3, earth, earth_clouds, earth_ring, saturn, saturn_ring, jupiter, venus, venus_atmosphere, mercury, uranus, neptune;
t=0;
function init(){

    /* SCENE */

    scene = new THREE.Scene();

    /* CAMERA */

    camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        0.1,
        1000000
    );

    /* RENDERER */

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true});

    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);



    /* MESH */


    // SPACE

    const spaceGeometry = new THREE.SphereGeometry(100000,32,32);
    const spaceTexture = new THREE.TextureLoader().load('../images/space/space.jpg');
    const spaceMaterial = new THREE.MeshBasicMaterial( {map: spaceTexture, side: THREE.DoubleSide} );
    space = new THREE.Mesh(spaceGeometry, spaceMaterial);
    scene.add(space);

    
    // SUN

    const sunTexture1 = new THREE.TextureLoader().load( '../images/sun/sun.jpg');
    
    const sun_lay1Geometry = new THREE.SphereGeometry(39.4,32,32,0,6.3,0,3.3);
    
    const sun_lay1Material = new THREE.MeshBasicMaterial( { map: sunTexture1} );
    sun_lay1 = new THREE.Mesh( sun_lay1Geometry, sun_lay1Material );
    scene.add(sun_lay1);

    const sunTexture2 = new THREE.TextureLoader().load( '../images/sun/sun.jpg');

    const sun_lay2Geometry = new THREE.SphereGeometry(39.7,32,32,0,6.3,0,3.3);
    
    const sun_lay2Material = new THREE.MeshBasicMaterial( { map: sunTexture2, transparent: true, opacity: 0.4} );
    sun_lay2 = new THREE.Mesh( sun_lay2Geometry, sun_lay2Material );
    scene.add(sun_lay2);

    sun_lay2.rotation.y = 5;

    const sunTexture3 = new THREE.TextureLoader().load( '../images/sun/sun.jpg');
    
    const sun_lay3Geometry = new THREE.SphereGeometry(40,32,32,0,6.3,0,3.3);
    
    const sun_lay3Material = new THREE.MeshBasicMaterial( { map: sunTexture3, transparent: true, opacity: 0.6} );
    sun_lay3 = new THREE.Mesh( sun_lay3Geometry, sun_lay3Material );
    scene.add(sun_lay3);


    //MERCURY

    const mercuryGeometry = new THREE.SphereGeometry(3,32,32);
    const mercuryTexture = new THREE.TextureLoader().load('../images/mercury/mercury.jpg');
    const mercuryMaterial = new THREE.MeshBasicMaterial({map: mercuryTexture});
    mercury = new THREE.Mesh(mercuryGeometry, mercuryMaterial);
    scene.add(mercury);

    mercury.position.x = 110;



    // VENUS
    
    const venusGeometry = new THREE.SphereGeometry(4,32,32);
    const venusTexture = new THREE.TextureLoader().load('../images/venus/venus.jpg');
    const venusMaterial = new THREE.MeshBasicMaterial({map: venusTexture});

    venus = new THREE.Mesh(venusGeometry, venusMaterial);
    scene.add(venus);

    const venus_atmosphereGeometry = new THREE.SphereGeometry(4.1,32,32);
    const venus_atmosphereTexture = new THREE.TextureLoader().load('../images/venus/atmosphere.jpg');
    const venus_atmosphereMaterial = new THREE.MeshBasicMaterial({map: venus_atmosphereTexture, transparent: true, opacity: 0.2});

    venus_atmosphere = new THREE.Mesh(venus_atmosphereGeometry, venus_atmosphereMaterial);
    scene.add(venus_atmosphere);

    venus.position.x=130;
    venus_atmosphere.position.x=130;

    
    // EARTH
    
    const earthGeometry = new THREE.SphereGeometry(5,32,32);
    const earthTexture = new THREE.TextureLoader().load('../images/earth/earth.jpg');
    const earthMaterial = new THREE.MeshBasicMaterial( {map: earthTexture} );
    earth = new THREE.Mesh(earthGeometry, earthMaterial);
    scene.add(earth);
    
    const earth_cloudsGeometry = new THREE.SphereGeometry(5.1,32,32);
    const earth_cloudsTexture = new THREE.TextureLoader().load('../images/earth/clouds.png');
    const earth_cloudsMaterial = new THREE.MeshBasicMaterial( {map: earth_cloudsTexture, transparent: true} );
    earth_clouds = new THREE.Mesh(earth_cloudsGeometry, earth_cloudsMaterial);
    scene.add(earth_clouds);

    const earth_ringGeometry = new THREE.RingGeometry(2.9,3,60,1,0,6.3);
    const earth_ringMaterial = new THREE.MeshBasicMaterial( { color: 0x0000ff, side: THREE.DoubleSide } );
    const earth_ring = new THREE.Mesh( earth_ringGeometry, earth_ringMaterial );
    scene.add( earth_ring );

    earth_ring.rotation.x =30;
    
    
    earth.position.x = 150;
    earth.rotation.x = 0.4;
    earth_clouds.rotation.x = 0.4;
    earth_clouds.position.x = 150;

    // MOON

    const moonGeometry = new THREE.SphereGeometry(0.5,32,32);
    const moonTexture = new THREE.TextureLoader().load('../images/moon/moon.png');
    const moonMaterial = new THREE.MeshBasicMaterial({map: moonTexture});

    moon = new THREE.Mesh(moonGeometry, moonMaterial);

    scene.add(moon);

    moon.position.x= 158;

    
    
    // MARS
    
    const marsGeometry = new THREE.SphereGeometry(4.5,32,32);
    const marsTexture = new THREE.TextureLoader().load('../images/mars/mars.jpg');
    const marsMaterial = new THREE.MeshBasicMaterial( {map: marsTexture} );
    mars = new THREE.Mesh(marsGeometry, marsMaterial);
    scene.add(mars);
    
    mars.position.x = 170;
    mars.rotation.x = -0.3;


    // JUPITER
    
    const jupiterGeometry = new THREE.SphereGeometry(20,32,32);
    const jupiterTexture = new THREE.TextureLoader().load('../images/jupiter/jupiter.jpg');
    const jupiterMaterial = new THREE.MeshBasicMaterial( {map: jupiterTexture} );
    jupiter = new THREE.Mesh(jupiterGeometry, jupiterMaterial);
    scene.add(jupiter);
    
    jupiter.position.x = 250;
    jupiter.rotation.x = -0.3;
    

    // SATURN

    const saturnTexture = new THREE.TextureLoader().load( "../images/saturn/saturn.jpg" );
	const saturn_ringTexture = new THREE.TextureLoader().load( "../images/saturn/ring2.png" );
    
    const saturnGeometry = new THREE.SphereGeometry(16,32,32,0,6.3,0,3.3);
	const saturnMaterial = new THREE.MeshBasicMaterial( { map: saturnTexture} );
	saturn = new THREE.Mesh( saturnGeometry, saturnMaterial );
	scene.add( saturn );
	
    const saturn_ringGeometry = new THREE.TorusGeometry(30,2,2,200,6.3);
    const saturn_ringMaterial = new THREE.MeshBasicMaterial( { map: saturn_ringTexture, transparent: true} );
	saturn_ring = new THREE.Mesh( saturn_ringGeometry, saturn_ringMaterial );
	scene.add(saturn_ring);

    saturn.position.x = 370;
    saturn_ring.position.x = 370;
    saturn.rotation.x = -0.3;

    saturn_ring.rotation.z = Math.PI / 8;
    saturn_ring.rotation.x = 4.86;
    saturn_ring.rotation.y = 0.45;

    saturn.rotation.z = -0.15;



    // URANUS

    const uranusGeometry = new THREE.SphereGeometry(10,32,32);
    const uranusTexture = new THREE.TextureLoader().load('../images/uranus/uranus.jpg');
    const uranusMaterial = new THREE.MeshBasicMaterial({map: uranusTexture});
    uranus = new THREE.Mesh(uranusGeometry, uranusMaterial);
    scene.add(uranus);

    uranus.position.x = 610;

    // NEPTUNE

    const neptuneGeometry = new THREE.SphereGeometry(12,32,32);
    const neptuneTexture = new THREE.TextureLoader().load('../images/neptune/neptune.jpg');
    const neptuneMaterial = new THREE.MeshBasicMaterial({map: neptuneTexture});
    neptune = new THREE.Mesh(neptuneGeometry, neptuneMaterial);
    scene.add(neptune);

    neptune.position.x = 1090;

    sun_lay3.rotation.y = 3;

    // ORBIT CONTROLS
    
    camera.position.z=80;
    
    controls = new THREE.OrbitControls(camera, renderer.domElement);

    // controls.target.set(60,60,60);

     window.requestAnimationFrame(animate);
}


function animate(){
    window.requestAnimationFrame(animate);
    mars.rotation.y += 0.00001;
    earth.rotation.y += 0.0001;
    earth_clouds.rotation.y += 0.0001;

    jupiter.rotation.y += 0.001;

    saturn.rotation.y += 0.002;
    saturn_ring.rotation.z -= 0.1;

    venus_atmosphere.rotation.y -= 0.01;
    venus.rotation.y -= 0.001;

    sun_lay1.rotation.x += 0.0002;
    sun_lay1.rotation.y += 0.0002;
    sun_lay2.rotation.x -= 0.00016;
    sun_lay2.rotation.y -= 0.00016;
    sun_lay3.rotation.y += 0.00012;

    // render();

    t -= 0.01;
    moon.rotation.y += 0.003;

    moon.position.x = earth.position.x + 7.5*Math.cos(t) + 0;
    moon.position.z = earth.position.z + 7.5*Math.sin(t) + 0;

    renderer.render(scene, camera);
}

function render() { 
    requestAnimationFrame(render); 
    

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

