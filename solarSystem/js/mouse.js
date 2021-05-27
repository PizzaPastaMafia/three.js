const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2(); 

function onMouseMove( event ) {
        mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
        var i, prev; 

        if(camera.position.z>50){
                if(mouse.x == earth.position.x && mouse.y == earth.position.y) {

                        camera.position.set( mouse.x , mouse.y , 50 );
                }
        }else{
            camera.position.set( mouse.x , mouse.y , 75 );
        } 
} 

function render() {
        raycaster.setFromCamera( mouse, camera );
        const intersects = raycaster.intersectObjects( scene.children );
        renderer.render( scene, camera ); 
} 

window.addEventListener( "click", onMouseMove);