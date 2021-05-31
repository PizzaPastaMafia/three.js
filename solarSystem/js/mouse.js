const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    function onMouseMove( event ) {
        mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    }

function zoommare(event){
    raycaster.setFromCamera( mouse, camera );
    const intersects = raycaster.intersectObjects( scene.children );

    if ( intersects.length > 0 ) {
        if(camera.position.z==150){
            if(intersects.length==1){
                camera.position.set( marte.position.x , marte.position.y , 30 );
            }else if(intersects.length==2){
                camera.position.set( 0 , 0 , 30 );
            }
        }else{
            camera.position.set( xPrecedente , yPrecedente , 150 );
        }
    }

    renderer.render( scene, camera );
}

var xPrecedente=camera.position.x;
var yPrecedente=camera.position.y;
window.addEventListener("mousemove", onMouseMove);
window.addEventListener("dblclick",zoommare);