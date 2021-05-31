/*==============================================*\
|        *         Solar System       *       *  |
|   *                *            *              |
|        *    *         by         *       *     |
|  *              *      *      *           *    |
|         *      Lorenzo Del Forno    *          |
|    *           Emanuele Driussi           *    |
|            *     Andrea Mauro                  |
|     *           Denis Scavello       *         |
|          *     Matteo Tramontina        *      |
|      *        *     ------         *           |
|  *       3^IA Bearzi (UD), Stage 2021       *  |
\*==============================================*/


let spritey, mercury_mov, t, scene, camera, renderer, space, moon, moonellipse, sun_lay1, sun_lay2, sun_lay3, earth, earth_clouds, earth_ring, saturn, saturn_ring, jupiter, venus, venus_atmosphere, mercury, uranus, neptune, mercury_mass, venus_mass, sun_mass;
t=0;
function init(){

    // THREE.Cache.enabled = true;

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
    const spaceTexture = new THREE.TextureLoader().load('../images/space/space.png');
    const spaceMaterial = new THREE.MeshBasicMaterial( {map: spaceTexture, side: THREE.DoubleSide} );
    space = new THREE.Mesh(spaceGeometry, spaceMaterial);
    scene.add(space);

    
    // SUN

    const sunTexture1 = new THREE.TextureLoader().load( '../images/sun/sun.jpg');
    
    const sun_lay1Geometry = new THREE.SphereGeometry(58,32,32,0,6.3,0,3.3);
    
    const sun_lay1Material = new THREE.MeshBasicMaterial( { map: sunTexture1} );
    sun_lay1 = new THREE.Mesh( sun_lay1Geometry, sun_lay1Material );
    scene.add(sun_lay1);

    const sunTexture2 = new THREE.TextureLoader().load( '../images/sun/sun.jpg');

    const sun_lay2Geometry = new THREE.SphereGeometry(59,32,32,0,6.3,0,3.3);
    
    const sun_lay2Material = new THREE.MeshBasicMaterial( { map: sunTexture2, transparent: true, opacity: 0.4} );
    sun_lay2 = new THREE.Mesh( sun_lay2Geometry, sun_lay2Material );
    scene.add(sun_lay2);

    sun_lay2.rotation.y = 5;

    const sunTexture3 = new THREE.TextureLoader().load( '../images/sun/sun.jpg');
    
    const sun_lay3Geometry = new THREE.SphereGeometry(60,32,32,0,6.3,0,3.3);
    
    const sun_lay3Material = new THREE.MeshBasicMaterial( { map: sunTexture3, transparent: true, opacity: 0.6} );
    sun_lay3 = new THREE.Mesh( sun_lay3Geometry, sun_lay3Material );
    scene.add(sun_lay3);

    sunText = makeTextSprite( " Sun ", 
		{ fontsize: 20, borderColor: {r:255, g:0, b:0, a:0}, backgroundColor: {r:255, g:100, b:100, a:0} } );
    sunText.position.set(sun_lay1.position.x , sun_lay1.position.y, sun_lay1.position.z + 5);
	scene.add( sunText );

    sun_mass = 20

    


    //MERCURY

    const mercuryGeometry = new THREE.SphereGeometry(3,32,32);
    const mercuryTexture = new THREE.TextureLoader().load('../images/mercury/mercury.jpg');
    const mercuryMaterial = new THREE.MeshBasicMaterial({map: mercuryTexture});
    mercury = new THREE.Mesh(mercuryGeometry, mercuryMaterial);
    scene.add(mercury);

    mercury.position.x = 330;

    // ...
    var mercuryarrayEll = [];
    
    THREE.EllipseCurve.prototype.realPoint = function ( t ) {
        var mercuryradians = /*2 * Math.PI * t*/0;
        return new THREE.Vector3( this.xRadius * Math.cos( mercuryradians ), 0, this.yRadius * Math.sin( mercuryradians ) );
    };
    
    mercuryorbit = new THREE.EllipseCurve(-20, 0, 330, 300, 0, Math.PI * 2, false, 0);
    var mercurypoints = mercuryorbit.getPoints(50);
    var mercuryEgeometry = new THREE.BufferGeometry().setFromPoints(mercurypoints);
    var mercuryEmaterial = new THREE.LineBasicMaterial({color: 0x999999, linewidth: 0.3});
    var mercuryellipse = new THREE.Line(mercuryEgeometry, mercuryEmaterial);
    mercuryellipse.rotation.x -= 190.067;
    scene.add(mercuryellipse);
    mercuryarrayEll.push(mercuryellipse);

    mercurymov = 0;
    mercury_mass = 1;

    mercuryText = makeTextSprite( " Mercury ", 
		{ fontsize: 20, borderColor: {r:255, g:0, b:0, a:0}, backgroundColor: {r:255, g:100, b:100, a:0} } );
    mercuryText.position.set(mercury.position.x , mercury.position.y, mercury.position.z + 5);
	scene.add( mercuryText );


    // ...



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

    venus.position.x=390;
    venus_atmosphere.position.x=390;

    venusText = makeTextSprite( " Venus ", 
		{ fontsize: 20, borderColor: {r:255, g:0, b:0, a:0}, backgroundColor: {r:255, g:100, b:100, a:0} } );
    venusText.position.set(venus.position.x , venus.position.y, venus.position.z + 5);
	scene.add( venusText );

    //
    var venusarrayEll = [];
    
    THREE.EllipseCurve.prototype.realPoint = function ( t ) {
        var venusradians = /*2 * Math.PI * t*/0;
        return new THREE.Vector3( this.xRadius * Math.cos( venusradians ), 0, this.yRadius * Math.sin( venusradians ) );
    };
    
    venusorbit = new THREE.EllipseCurve(-1-20, 0, 390, 384, 0, Math.PI * 2, false, 0);
    var venuspoints = venusorbit.getPoints(50);
    var venusEgeometry = new THREE.BufferGeometry().setFromPoints(venuspoints);
    var venusEmaterial = new THREE.LineBasicMaterial({color: 0xff8400, linewidth: 0.3});
    var venusellipse = new THREE.Line(venusEgeometry, venusEmaterial);
    venusellipse.rotation.x -= 190.067;
    scene.add(venusellipse);
    venusarrayEll.push(venusellipse);

    venusmov = 0;
    //

    
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
    
    
    earth.position.x = 450;
    earth.rotation.x = 0.4;
    earth_clouds.rotation.x = 0.4;
    earth_clouds.position.x = 150;

    earthText = makeTextSprite( " Earth ", 
		{ fontsize: 20, borderColor: {r:255, g:0, b:0, a:0}, backgroundColor: {r:255, g:100, b:100, a:0} } );
    earthText.position.set(earth.position.x , earth.position.y, earth.position.z + 5);
	scene.add( earthText );

    //
    var eartharrayEll = [];
    
    THREE.EllipseCurve.prototype.realPoint = function ( t ) {
        var earthradians = /*2 * Math.PI * t*/0;
        return new THREE.Vector3( this.xRadius * Math.cos( earthradians ), 0, this.yRadius * Math.sin( earthradians ) );
    };
    
    earthorbit = new THREE.EllipseCurve(-5-20-1, 0, 450, 435, 0, Math.PI * 2, false, 0);
    var earthpoints = earthorbit.getPoints(50);
    var earthEgeometry = new THREE.BufferGeometry().setFromPoints(earthpoints);
    var earthEmaterial = new THREE.LineBasicMaterial({color: 0x6666ff, linewidth: 0.3});
    var earthellipse = new THREE.Line(earthEgeometry, earthEmaterial);
    earthellipse.rotation.x -= 190.067;
    scene.add(earthellipse);
    eartharrayEll.push(earthellipse);

    earthmov = 0;
    //

    // MOON

    const moonGeometry = new THREE.SphereGeometry(0.5,32,32);
    const moonTexture = new THREE.TextureLoader().load('../images/moon/moon.png');
    const moonMaterial = new THREE.MeshBasicMaterial({map: moonTexture});

    moon = new THREE.Mesh(moonGeometry, moonMaterial);

    scene.add(moon);

    moon.position.x= 158;

    //
    const moonEgeometry = new THREE.RingGeometry(7.5,7.55,60,1,0,6.3);
    const moonEmaterial = new THREE.MeshBasicMaterial( { color: 0xeeeeee, side: THREE.DoubleSide } );
    moonellipse = new THREE.Mesh( moonEgeometry, moonEmaterial );
    scene.add( moonellipse);

    moonellipse.rotation.x = -190.06;

    MoonText = makeTextSprite( " Moon ", 
		{ fontsize: 20, borderColor: {r:255, g:0, b:0, a:0}, backgroundColor: {r:255, g:100, b:100, a:0} } );
    MoonText.position.set(moon.position.x , moon.position.y, moon.position.z + 5);
	scene.add( MoonText );
    //

    
    
    // MARS
    
    const marsGeometry = new THREE.SphereGeometry(4.5,32,32);
    const marsTexture = new THREE.TextureLoader().load('../images/mars/mars.jpg');
    const marsMaterial = new THREE.MeshBasicMaterial( {map: marsTexture} );
    mars = new THREE.Mesh(marsGeometry, marsMaterial);
    scene.add(mars);
    
    mars.position.x = 510;
    mars.rotation.x = -0.3;
    mars.position.y = 0;
    mars.position.z = 0;


    marsText = makeTextSprite( " Mars ", 
		{ fontsize: 20, borderColor: {r:255, g:0, b:0, a:0}, backgroundColor: {r:255, g:100, b:100, a:0} } );
    marsText.position.set(mars.position.x , mars.position.y, mars.position.z + 5);
	scene.add( marsText );


    marsmov = 0;
    
    var marsarrayEll = [];
    
    THREE.EllipseCurve.prototype.realPoint = function ( t ) {
        var marsradians = /*2 * Math.PI * t*/0;
        return new THREE.Vector3( this.xRadius * Math.cos( marsradians ), 0, this.yRadius * Math.sin( marsradians ) );
    };
    
    marsorbit = new THREE.EllipseCurve(0, 0, 510, 500, 0, Math.PI * 2, false, 0);
    var marspoints = marsorbit.getPoints(50);
    var marsEgeometry = new THREE.BufferGeometry().setFromPoints(marspoints);
    var marsEmaterial = new THREE.LineBasicMaterial({color: 0x999999, linewidth: 0.3});
    var marsellipse = new THREE.Line(marsEgeometry, marsEmaterial);
    marsellipse.rotation.x -= 190.067;
    scene.add(marsellipse);
    marsarrayEll.push(marsellipse);
    //


    // JUPITER
    
    const jupiterGeometry = new THREE.SphereGeometry(20,32,32);
    const jupiterTexture = new THREE.TextureLoader().load('../images/jupiter/jupiter.jpg');
    const jupiterMaterial = new THREE.MeshBasicMaterial( {map: jupiterTexture} );
    jupiter = new THREE.Mesh(jupiterGeometry, jupiterMaterial);
    scene.add(jupiter);
    
    jupiter.position.x = 750;
    jupiter.rotation.x = -0.3;

    jupText = makeTextSprite( " Jupiter ", 
		{ fontsize: 20, borderColor: {r:255, g:0, b:0, a:0}, backgroundColor: {r:255, g:100, b:100, a:0} } );
    jupText.position.set(jupiter.position.x , jupiter.position.y, jupiter.position.z + 5);
	scene.add( jupText );
    
    
    //
    jupitermov = 0;
    
    var jupiterarrayEll = [];
    
    THREE.EllipseCurve.prototype.realPoint = function ( t ) {
        var jupiterradians = /*2 * Math.PI * t*/0;
        return new THREE.Vector3( this.xRadius * Math.cos( jupiterradians ), 0, this.yRadius * Math.sin( jupiterradians ) );
    };
    
    jupiterorbit = new THREE.EllipseCurve(0, 0, 750, 700, 0, Math.PI * 2, false, 0);
    var jupiterpoints = jupiterorbit.getPoints(50);
    var jupiterEgeometry = new THREE.BufferGeometry().setFromPoints(jupiterpoints);
    var jupiterEmaterial = new THREE.LineBasicMaterial({color: 0x999999, linewidth: 0.3});
    var jupiterellipse = new THREE.Line(jupiterEgeometry, jupiterEmaterial);
    jupiterellipse.rotation.x -= 190.067;
    scene.add(jupiterellipse);
    jupiterarrayEll.push(jupiterellipse);
    

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

    saturn.position.x = 1110;
    saturn_ring.position.x = 1110;
    saturn.rotation.x = -0.3;

    saturn_ring.rotation.z = Math.PI / 8;
    saturn_ring.rotation.x = 4.86;
    saturn_ring.rotation.y = 0.45;

    saturn.rotation.z = -0.15;

    saturnText = makeTextSprite( " Saturn ", 
		{ fontsize: 20, borderColor: {r:255, g:0, b:0, a:0}, backgroundColor: {r:255, g:100, b:100, a:0} } );
    saturnText.position.set(saturn.position.x , saturn.position.y, saturn.position.z + 5);
	scene.add( saturnText );

    //
    saturnmov = 0;
    
    var saturnarrayEll = [];
    
    THREE.EllipseCurve.prototype.realPoint = function ( t ) {
        var saturnradians = /*2 * Math.PI * t*/0;
        return new THREE.Vector3( this.xRadius * Math.cos( saturnradians ), 0, this.yRadius * Math.sin( saturnradians ) );
    };
    
    saturnorbit = new THREE.EllipseCurve(0, 0, 1110, 1000, 0, Math.PI * 2, false, 0);
    var saturnpoints = saturnorbit.getPoints(50);
    var saturnEgeometry = new THREE.BufferGeometry().setFromPoints(saturnpoints);
    var saturnEmaterial = new THREE.LineBasicMaterial({color: 0x999999, linewidth: 0.3});
    var saturnellipse = new THREE.Line(saturnEgeometry, saturnEmaterial);
    saturnellipse.rotation.x -= 190.067;
    scene.add(saturnellipse);
    saturnarrayEll.push(saturnellipse);
    //

    // URANUS

    const uranusGeometry = new THREE.SphereGeometry(10,32,32);
    const uranusTexture = new THREE.TextureLoader().load('../images/uranus/uranus.jpg');
    const uranusMaterial = new THREE.MeshBasicMaterial({map: uranusTexture});
    uranus = new THREE.Mesh(uranusGeometry, uranusMaterial);
    scene.add(uranus);

    uranus.position.x = 1830;

    uranusText = makeTextSprite( " Uranus ", 
		{ fontsize: 20, borderColor: {r:255, g:0, b:0, a:0}, backgroundColor: {r:255, g:100, b:100, a:0} } );
    uranusText.position.set(uranus.position.x , uranus.position.y, uranus.position.z + 5);
	scene.add( uranusText );

    //
    uranusmov = 0;
    
    var uranusarrayEll = [];
    
    THREE.EllipseCurve.prototype.realPoint = function ( t ) {
        var uranusradians = /*2 * Math.PI * t*/0;
        return new THREE.Vector3( this.xRadius * Math.cos( uranusradians ), 0, this.yRadius * Math.sin( uranusradians ) );
    };
    
    uranusorbit = new THREE.EllipseCurve(0, 0, 1830, 1730, 0, Math.PI * 2, false, 0);
    var uranuspoints = uranusorbit.getPoints(50);
    var uranusEgeometry = new THREE.BufferGeometry().setFromPoints(uranuspoints);
    var uranusEmaterial = new THREE.LineBasicMaterial({color: 0x999999, linewidth: 0.3});
    var uranusellipse = new THREE.Line(uranusEgeometry, uranusEmaterial);
    uranusellipse.rotation.x -= 190.067;
    scene.add(uranusellipse);
    uranusarrayEll.push(uranusellipse);
    //

    // NEPTUNE

    const neptuneGeometry = new THREE.SphereGeometry(12,32,32);
    const neptuneTexture = new THREE.TextureLoader().load('../images/neptune/neptune.jpg');
    const neptuneMaterial = new THREE.MeshBasicMaterial({map: neptuneTexture});
    neptune = new THREE.Mesh(neptuneGeometry, neptuneMaterial);
    scene.add(neptune);

    neptune.position.x = 3270;

    neptuneText = makeTextSprite( " Neptune ", 
		{ fontsize: 20, borderColor: {r:255, g:0, b:0, a:0}, backgroundColor: {r:255, g:100, b:100, a:0} } );
    neptuneText.position.set(neptune.position.x , neptune.position.y, neptune.position.z + 5);
	scene.add( neptuneText );

    //
    neptunemov = 0;
    
    var neptunearrayEll = [];
    
    THREE.EllipseCurve.prototype.realPoint = function ( t ) {
        var neptuneradians = /*2 * Math.PI * t*/0;
        return new THREE.Vector3( this.xRadius * Math.cos( neptuneradians ), 0, this.yRadius * Math.sin( neptuneradians ) );
    };
    
    neptuneorbit = new THREE.EllipseCurve(0, 0, 3270, 2870, 0, Math.PI * 2, false, 0);
    var neptunepoints = neptuneorbit.getPoints(50);
    var neptuneEgeometry = new THREE.BufferGeometry().setFromPoints(neptunepoints);
    var neptuneEmaterial = new THREE.LineBasicMaterial({color: 0x999999, linewidth: 0.3});
    var neptuneellipse = new THREE.Line(neptuneEgeometry, neptuneEmaterial);
    neptuneellipse.rotation.x -= 190.067;
    scene.add(neptuneellipse);
    neptunearrayEll.push(neptuneellipse);
    //




    // TESLA

    // var tesla = new THREE.GLTFLoader();
    // tesla.load( '../models/TeslaSpace.gltf', function ( gltf ) {
    //     var object = gltf.scene;
    //     gltf.scene.scale.set( 0.5, 0.5, 0.5 );			   
    //     gltf.scene.position.x = 0;				    //Position (x = right+ left-) 
    //     gltf.scene.position.y = 0;				    //Position (y = up+, down-)
    //     gltf.scene.position.z = 0;

    //     scene.add( gltf.scene );
    // });

    sun_lay3.rotation.y = 3;

    // ORBIT CONTROLS
    
    camera.position.z = 300;
    //camera.position.y = 300;
    //camera.position.y= -180;
    //camera.rotation.x = 200;
    
    controls = new THREE.OrbitControls(camera, renderer.domElement);

    // controls.target.set(60,60,60);

    window.requestAnimationFrame(animate);
}

function makeTextSprite( message, parameters ){
	if ( parameters === undefined ) parameters = {};
	
	var fontface = parameters.hasOwnProperty("fontface") ? 
		parameters["fontface"] : "Arial";
	
	var fontsize = parameters.hasOwnProperty("fontsize") ? 
		parameters["fontsize"] : 18;
	
	var borderThickness = parameters.hasOwnProperty("borderThickness") ? 
		parameters["borderThickness"] : 4;
	
	var borderColor = parameters.hasOwnProperty("borderColor") ?
		parameters["borderColor"] : { r:0, g:0, b:0, a:0 };
	
	var backgroundColor = parameters.hasOwnProperty("backgroundColor") ?
		parameters["backgroundColor"] : { r:255, g:255, b:255, a:0 };
		
	var canvas = document.createElement('canvas');
	var context = canvas.getContext('2d');
	context.font = fontsize + "px " + fontface;
    
	// get size data (height depends only on font size)
	var metrics = context.measureText( message );
	var textWidth = metrics.width;
	
	// background color
	context.fillStyle   = "rgba(" + backgroundColor.r + "," + backgroundColor.g + ","
								  + backgroundColor.b + "," + backgroundColor.a + ")";
	// border color
	context.strokeStyle = "rgba(" + borderColor.r + "," + borderColor.g + ","
								  + borderColor.b + "," + borderColor.a + ")";

	context.lineWidth = borderThickness;
	roundRect(context, borderThickness/2, borderThickness/2, textWidth + borderThickness, fontsize * 1.4 + borderThickness, 6);
	// 1.4 is extra height factor for text below baseline: g,j,p,q.
	
	// text color
	context.fillStyle = "rgba(255, 255, 255, 0.7)";

	context.fillText( message, borderThickness, fontsize + borderThickness);
	
	// canvas contents will be used for a texture
	var texture = new THREE.Texture(canvas) 
	texture.needsUpdate = true;

	var spriteMaterial = new THREE.SpriteMaterial( 
		{ map: texture, useScreenCoordinates: false, /*alignment: spriteAlignment*/ } );
	var sprite = new THREE.Sprite( spriteMaterial );
	sprite.scale.set(100,50,1.0);
	return sprite;	
}

function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x+r, y);
    ctx.lineTo(x+w-r, y);
    ctx.quadraticCurveTo(x+w, y, x+w, y+r);
    ctx.lineTo(x+w, y+h-r);
    ctx.quadraticCurveTo(x+w, y+h, x+w-r, y+h);
    ctx.lineTo(x+r, y+h);
    ctx.quadraticCurveTo(x, y+h, x, y+h-r);
    ctx.lineTo(x, y+r);
    ctx.quadraticCurveTo(x, y, x+r, y);
    ctx.closePath();
    ctx.fill();
	ctx.stroke();   
}

function animate(){

    sunText.position.set(sun_lay1.position.x + 35, sun_lay1.position.y - 10, sun_lay1.position.z + 6);
    mercuryText.position.set(mercury.position.x + 35, mercury.position.y - 10, mercury.position.z + 6);
    venusText.position.set(venus.position.x + 35, venus.position.y - 10, venus.position.z + 6);
    earthText.position.set(earth.position.x + 35, earth.position.y - 10, earth.position.z + 6);
    MoonText.position.set(moon.position.x + 35, moon.position.y - 10, moon.position.z + 6);
    marsText.position.set(mars.position.x + 35, mars.position.y - 10, mars.position.z + 6);
    jupText.position.set(jupiter.position.x + 35, jupiter.position.y - 10, jupiter.position.z + 6);
    uranusText.position.set(uranus.position.x + 35, uranus.position.y - 10, uranus.position.z + 6);
    neptuneText.position.set(neptune.position.x + 35, neptune.position.y - 10, neptune.position.z + 6);

    window.requestAnimationFrame(animate);
    mars.rotation.y += 0.00001;
    earth.rotation.y -= 0.0001;
    earth_clouds.rotation.y -= 0.0001;

    jupiter.rotation.y += 0.001;
    jupiter.visibile = false;

    saturn.rotation.y += 0.002;
    saturn_ring.rotation.z -= 0.1;

    venus_atmosphere.rotation.y -= 0.01;
    venus.rotation.y -= 0.001;

    sun_lay1.rotation.x += 0.0002;
    sun_lay1.rotation.y += 0.0002;
    sun_lay2.rotation.x -= 0.00016;
    sun_lay2.rotation.y -= 0.00016;
    sun_lay3.rotation.y += 0.00012;

    //MERCURY
    
    
    if(mercury != undefined){
        
        mercurymov += 6 * mercury_mass / Math.sqrt((Math.pow(mercury.position.x, 2)+ Math.pow(mercury.position.y, 2))) / 100;
        //mercurymov += (6 *(sun_mass*mercury_mass/(Math.pow(mercury.position.x, 2)+ Math.pow(mercury.position.y, 2)))) / 10;
        mercury.position.set(330*Math.cos(mercurymov) -20,0, 300*Math.sin(mercurymov));
        mercury.rotation.y -= 0.005;
    }

    //VENUS
    if(venus != undefined){
        venusmov += 0.00015;
        venus.position.set(390*Math.cos(venusmov) -1 -20,0, 384*Math.sin(venusmov));
        venus.rotation.y -= 0.0015;
        venus_atmosphere.position.x = venus.position.x;
        venus_atmosphere.position.y = venus.position.y;
        venus_atmosphere.position.z = venus.position.z;
    }

    //EARTH
    if(earth != undefined){
        earthmov += 0.00015;
        earth.position.set(450*Math.cos(earthmov)-5-20-1,0, 435*Math.sin(earthmov));
        earth.rotation.y -= 0.005;
        earth_clouds.position.x = earth.position.x;
        earth_clouds.position.y = earth.position.y;
        earth_clouds.position.z = earth.position.z;
    }

    //MOON
    moonellipse.position.x = earth.position.x;
    moonellipse.position.y = earth.position.y;
    moonellipse.position.z = earth.position.z;

    //MARS
    if(mars != undefined){
        
        // marsmov += 6 * mars_mass / Math.sqrt((Math.pow(mars.position.x, 2)+ Math.pow(mars.position.y, 2))) / 100;
        // //marsmov += (6 *(sun_mass*mars_mass/(Math.pow(mars.position.x, 2)+ Math.pow(mars.position.y, 2)))) / 10;
        marsmov += 0.00015;
        //mars.position.x = 510*Math.cos(marsmov);
        mars.position.set(510*Math.cos(marsmov),0, 500*Math.sin(marsmov));
        mars.rotation.y -= 0.005;
    }

    //JUPITER

    if(jupiter != undefined){
        
        // marsmov += 6 * mars_mass / Math.sqrt((Math.pow(mars.position.x, 2)+ Math.pow(mars.position.y, 2))) / 100;
        // //marsmov += (6 *(sun_mass*mars_mass/(Math.pow(mars.position.x, 2)+ Math.pow(mars.position.y, 2)))) / 10;
        jupitermov += 0.00015;
        //mars.position.x = 510*Math.cos(marsmov);
        jupiter.position.set(750*Math.cos(jupitermov),0, 700*Math.sin(jupitermov));
        jupiter.rotation.y -= 0.005;
    }

    //SATURN

    if(saturn != undefined){
        
        // marsmov += 6 * mars_mass / Math.sqrt((Math.pow(mars.position.x, 2)+ Math.pow(mars.position.y, 2))) / 100;
        // //marsmov += (6 *(sun_mass*mars_mass/(Math.pow(mars.position.x, 2)+ Math.pow(mars.position.y, 2)))) / 10;
        saturnmov += 0.00015;
        //mars.position.x = 510*Math.cos(marsmov);
        saturn.position.set(1110*Math.cos(saturnmov),0, 1000*Math.sin(saturnmov));
        saturn.rotation.y -= 0.005;

        saturn_ring.position.set(saturn.position.x, saturn.position.y, saturn.position.z);
    }

    //URANUS

    if(uranus != undefined){
        
        // marsmov += 6 * mars_mass / Math.sqrt((Math.pow(mars.position.x, 2)+ Math.pow(mars.position.y, 2))) / 100;
        // //marsmov += (6 *(sun_mass*mars_mass/(Math.pow(mars.position.x, 2)+ Math.pow(mars.position.y, 2)))) / 10;
        uranusmov += 0.00015;
        //mars.position.x = 510*Math.cos(marsmov);
        uranus.position.set(1830*Math.cos(uranusmov),0, 1730*Math.sin(uranusmov));
        uranus.rotation.y -= 0.005;
    }

    //NEPTUNE

    if(neptune != undefined){
        
        // marsmov += 6 * mars_mass / Math.sqrt((Math.pow(mars.position.x, 2)+ Math.pow(mars.position.y, 2))) / 100;
        // //marsmov += (6 *(sun_mass*mars_mass/(Math.pow(mars.position.x, 2)+ Math.pow(mars.position.y, 2)))) / 10;
        neptunemov += 0.00015;
        //mars.position.x = 510*Math.cos(marsmov);
        neptune.position.set(3270*Math.cos(neptunemov),0, 2870*Math.sin(neptunemov));
        neptune.rotation.y -= 0.005;
    }






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