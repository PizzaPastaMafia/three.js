var scene = new THREE.Scene();
var material = new THREE.LineBasicMaterial({color:0x000000, opacity:1});
var ellipse = new THREE.EllipseCurve(0, 0, 1, 5, 0, 2.0 * Math.PI, false);
var ellipsePath = new THREE.CurvePath();
ellipsePath.add(ellipse);
var ellipseGeometry = ellipsePath.createPointsGeometry(100);
ellipseGeometry.computeTangents();
var line = new THREE.Line(ellipseGeometry, material);
scene.add( line );
