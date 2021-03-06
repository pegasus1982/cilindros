var canvas = document.getElementById('renderCanvas');
const ANIM_DURATION = 15;

// load the 3D engine
var engine = new BABYLON.Engine(canvas, true, { stencil: true });

var scene,
    camera,
    cameraTarget,
    light1,
    light2,
    light3,
    sphere,
    ground;

var advancedTexture;
var label_01,
    label_02,
    label_03,
    label_04,
    text_01,
    text_02,
    text_03,
    text_04;

var loadedModel = [];
var cilindroList_01 = [],
    cilindroList_02 = [],
    cilindroList_03 = [],
    cilindroList_04 = [];
let lines = [];
let n_HighlightTimeCount = 0;

var highlight;

let quantities = [
    [7,10,11,13,14,23,30],
    [36,31],
    [1,3,4,5,15,26,28],
    [29,32,34]
]

let initialStatus = [];
let pointerPressingInfo;

var createScene = function(){
    scene = new BABYLON.Scene(engine);
    
    camera = new BABYLON.ArcRotateCamera("Camera", 4, 1, 1200, new BABYLON.Vector3(0,0,0), scene);
    cameraTarget = BABYLON.Mesh.CreateBox("cameraTarget", 0.5, scene);
    cameraTarget.position = new BABYLON.Vector3(0,30,0);
    camera.attachControl(canvas, false);
    camera.setTarget(cameraTarget);
    
    camera.upperBetaLimit = 1.57;
    camera.lowerBetaLimit = 0.4;
    
    camera.upperRadiusLimit = 2000;
    camera.lowerRadiusLimit = 400;
    
    light1 = new BABYLON.PointLight("Omni", new BABYLON.Vector3(400, 600, 500), scene);
    light2 = new BABYLON.PointLight("Omni", new BABYLON.Vector3(-800, 700, -300), scene);

    //load babylon model
    var assetsManager = new BABYLON.AssetsManager(scene);

    //load cilindro 1
    for(var index = 0 ; index < quantities[0].length ; index++){
        let itemIndex = index;
        let num = quantities[0][itemIndex];
        BABYLON.SceneLoader.ImportMesh("","assets/models/babylon/","cilindro-01.babylon",scene, function(newMeshes){
            // cilindroList_01.push(newMeshes);
            for(var i in newMeshes){
                newMeshes[i].position.x += itemIndex * 300 - 300;
                newMeshes[i].position.z += 400;
                if(newMeshes[i].name == "cilindro-num-label"){
                    var textureGround = new BABYLON.DynamicTexture("dynamic texture", {width:640, height:570}, scene);
                    
                    var materialGround = new BABYLON.StandardMaterial("Mat", scene);    				
                    materialGround.diffuseTexture = textureGround;

                    newMeshes[i].material = materialGround;
                    newMeshes[i].material.diffuseTexture.uScale = 0.01;
                    newMeshes[i].material.diffuseTexture.vScale = 0.01;
                    newMeshes[i].material.diffuseTexture.uOffset = num<10?0.11:0.21;
                    newMeshes[i].material.diffuseTexture.vOffset = 0.6;
                    
                    //Add text to dynamic texture
                    var font = "bold 250px monospace";
                    textureGround.drawText(num.toString(), 10, 300, font, "black", "white", true, true);
                }
            }
            cilindroList_01[quantities[0].indexOf(num)] = newMeshes;
        });
    }

    //load cilindro 2
    for(var index = 0 ; index < quantities[1].length ; index++){
        let itemIndex = index;
        let num = quantities[1][itemIndex];
        BABYLON.SceneLoader.ImportMesh("","assets/models/babylon/","cilindro-02.babylon",scene, function(newMeshes){
            // cilindroList_02.push(newMeshes);
            for(var i in newMeshes){
                newMeshes[i].position.x += itemIndex * 300 - 300;
                newMeshes[i].position.z -= 400;
                if(newMeshes[i].name == "cilindro-num-label"){
                    var textureGround = new BABYLON.DynamicTexture("dynamic texture", {width:640, height:570}, scene);
                    
                    var materialGround = new BABYLON.StandardMaterial("Mat", scene);    				
                    materialGround.diffuseTexture = textureGround;

                    newMeshes[i].material = materialGround;
                    newMeshes[i].material.diffuseTexture.uScale = 0.01;
                    newMeshes[i].material.diffuseTexture.vScale = 0.01;
                    newMeshes[i].material.diffuseTexture.uOffset = num<10?0.11:0.21;
                    newMeshes[i].material.diffuseTexture.vOffset = 0.6;
                    
                    //Add text to dynamic texture
                    var font = "bold 250px monospace";
                    textureGround.drawText(num.toString(), 10, 300, font, "black", "white", true, true);
                }
            }
            cilindroList_02[quantities[1].indexOf(num)] = newMeshes;
        });
    }

    //load cilindro 3
    for(var index = 0 ; index < quantities[2].length ; index++){
        let itemIndex = index;
        let num = quantities[2][itemIndex];
        BABYLON.SceneLoader.ImportMesh("","assets/models/babylon/","cilindro-03.babylon",scene, function(newMeshes){
            // cilindroList_03.push(newMeshes);
            for(var i in newMeshes){
                newMeshes[i].position.x += itemIndex * 300 - 300;
                newMeshes[i].position.z -= 133;
                if(newMeshes[i].name == "cilindro-num-label"){
                    var textureGround = new BABYLON.DynamicTexture("dynamic texture", {width:640, height:570}, scene);
                    
                    var materialGround = new BABYLON.StandardMaterial("Mat", scene);    				
                    materialGround.diffuseTexture = textureGround;

                    newMeshes[i].material = materialGround;
                    newMeshes[i].material.diffuseTexture.uScale = 0.01;
                    newMeshes[i].material.diffuseTexture.vScale = 0.01;
                    newMeshes[i].material.diffuseTexture.uOffset = num<10?0.11:0.21;
                    newMeshes[i].material.diffuseTexture.vOffset = 0.6;
                    
                    //Add text to dynamic texture
                    var font = "bold 250px monospace";
                    textureGround.drawText(num.toString(), 10, 300, font, "black", "white", true, true);
                }
            }
            cilindroList_03[quantities[2].indexOf(num)] = newMeshes;
        });
    }

    //load cilindro 4
    for(var index = 0 ; index < quantities[3].length ; index++){
        let itemIndex = index;
        let num = quantities[3][itemIndex];
        BABYLON.SceneLoader.ImportMesh("","assets/models/babylon/","cilindro-04.babylon",scene, function(newMeshes){
            // cilindroList_04.push(newMeshes);
            for(var i in newMeshes){
                newMeshes[i].position.x += itemIndex * 350 - 300;
                newMeshes[i].position.z += 133;
                if(newMeshes[i].name == "cilindro-num-label"){
                    var textureGround = new BABYLON.DynamicTexture("dynamic texture", {width:640, height:570}, scene);
                    
                    var materialGround = new BABYLON.StandardMaterial("Mat", scene);    				
                    materialGround.diffuseTexture = textureGround;

                    newMeshes[i].material = materialGround;
                    newMeshes[i].material.diffuseTexture.uScale = 0.01;
                    newMeshes[i].material.diffuseTexture.vScale = 0.01;
                    newMeshes[i].material.diffuseTexture.uOffset = num<10?0.11:0.21;
                    newMeshes[i].material.diffuseTexture.vOffset = 0.6;
                    
                    //Add text to dynamic texture
                    var font = "bold 250px monospace";
                    textureGround.drawText(num.toString(), 10, 300, font, "black", "white", true, true);
                }
            }
            cilindroList_04[quantities[3].indexOf(num)] = newMeshes;
        });
    }

    advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("ui1");

    label_01 = new BABYLON.GUI.Rectangle("label_01");
    label_01.background = "black"
    label_01.alpha = 0.8;
    label_01.width = "200px";
    label_01.height = "100px";
    label_01.cornerRadius = 10;
    label_01.thickness = 1;
    label_01.linkOffsetY = 90;
    label_01.top = "15%";
    label_01.left = "35%"
    label_01.zIndex = 5;
    label_01.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;    
    advancedTexture.addControl(label_01); 
    label_01.isVisible = false;

    text_01 = new BABYLON.GUI.TextBlock();
    text_01.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    text_01.paddingLeft = 20;
    text_01.color = "white";
    label_01.addControl(text_01);

    label_02 = new BABYLON.GUI.Rectangle("label_02");
    label_02.background = "black"
    label_02.alpha = 0.8;
    label_02.width = "200px";
    label_02.height = "100px";
    label_02.cornerRadius = 10;
    label_02.thickness = 1;
    label_02.linkOffsetY = 90;
    label_02.top = "30%";
    label_02.left = "35%"
    label_02.zIndex = 5;
    label_02.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;    
    advancedTexture.addControl(label_02);
    label_02.isVisible = false;

    text_02 = new BABYLON.GUI.TextBlock();
    text_02.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    text_02.paddingLeft = 20;
    text_02.color = "white";
    label_02.addControl(text_02);

    label_03 = new BABYLON.GUI.Rectangle("label_03");
    label_03.background = "black"
    label_03.alpha = 0.8;
    label_03.width = "200px";
    label_03.height = "100px";
    label_03.cornerRadius = 10;
    label_03.thickness = 1;
    label_03.linkOffsetY = 90;
    label_03.top = "45%";
    label_03.left = "35%"
    label_03.zIndex = 5;
    label_03.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;    
    advancedTexture.addControl(label_03);
    label_03.isVisible = false;

    text_03 = new BABYLON.GUI.TextBlock();
    text_03.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    text_03.paddingLeft = 20;
    text_03.color = "white";
    label_03.addControl(text_03);

    label_04 = new BABYLON.GUI.Rectangle("label_04");
    label_04.background = "black"
    label_04.alpha = 0.8;
    label_04.width = "200px";
    label_04.height = "100px";
    label_04.cornerRadius = 10;
    label_04.thickness = 1;
    label_04.linkOffsetY = 90;
    label_04.top = "60%";
    label_04.left = "35%"
    label_04.zIndex = 5;
    label_04.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;    
    advancedTexture.addControl(label_04);
    label_04.isVisible = false;

    text_04 = new BABYLON.GUI.TextBlock();
    text_04.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    text_04.paddingLeft = 20;
    text_04.color = "white";
    label_04.addControl(text_04);

    assetsManager.load();

    highlight = new BABYLON.HighlightLayer("highlight", scene);
    highlight.blurHorizontalSize   = 2;
    highlight.blurVerticalSize     = 2;

    return scene;
}

// call the createScene function
var scene = createScene();

// run the render loop
engine.runRenderLoop(function(){
    scene.render();
});

// the canvas/window resize event handler
window.addEventListener('resize', function(){
    engine.resize();
});

function addSectionAnimation(model,offset){
    var animBox = new BABYLON.Animation("anim-"+model.name,"position.y",30,BABYLON.Animation.ANIMATIONTYPE_FLOAT);
    var keys = [];
    keys.push({
        frame : 0,
        value : model.position.y,
    });
    keys.push({
        frame : ANIM_DURATION,
        value : model.position.y + offset,
    })
    animBox.setKeys(keys);
    model.animations.push(animBox);
    scene.beginAnimation(model, 0, ANIM_DURATION, false);
}

function highlightTimer(){
    n_HighlightTimeCount++;
    n_HighlightTimeCount %= 100;
    setTimeout(() => {
        highlightTimer();
    }, 500);
}

highlightTimer();

function winkingTimerCallback(){
    highlight.blurHorizontalSize   = n_HighlightTimeCount % 2;
    highlight.blurVerticalSize     = n_HighlightTimeCount % 2;
    setTimeout(() => {
        winkingTimerCallback();
    }, 500);
}

winkingTimerCallback();

function addIlluminateAnimation(model, index,a,b,c,d){
    highlight.addMesh(model, BABYLON.Color3.Red());

    //move camera target
    var animCTarget = new BABYLON.Animation("anim-camera-target","position",ANIM_DURATION,BABYLON.Animation.ANIMATIONTYPE_VECTOR3);
    var keys = [];
    keys.push({
        frame : 0,
        value : cameraTarget.position.clone(),
    });
    keys.push({
        frame : ANIM_DURATION,
        value : model.position.clone(),
    })

    animCTarget.setKeys(keys);
    cameraTarget.animations = [];
    cameraTarget.animations.push(animCTarget);
    scene.beginAnimation(cameraTarget, 0, ANIM_DURATION, false);
    setTimeout(() => {
        camera.radius = 300;
    }, 1000);

    if(index == 0)
    {
        if(model.name.includes('tube-') && !model.name.includes('tube-sticker')){
            label_01.isVisible = true;
            var line = new BABYLON.GUI.Line();
            line.alpha = 0.8;
            line.lineWidth = 1;
            line.dash = [5, 10];
            advancedTexture.addControl(line); 
            line.linkWithMesh(model);
            line.connectedControl = label_01;
            lines.push(line);

            text_01.text =  "Cilindro      : "+a+"\n"+
                            "Sección      : " + b + "\n"+
                            "Cuadrante : "+c+"\n"+
                            "Canister    : "+d+"   ";
        }
    }
    else if(index == 1){
        label_02.isVisible = true;
        var line = new BABYLON.GUI.Line();
        line.alpha = 0.8;
        line.lineWidth = 1;
        line.dash = [5, 10];
        advancedTexture.addControl(line); 
        line.linkWithMesh(model);
        line.connectedControl = label_02;
        lines.push(line);

        text_02.text =  "Cilindro      : "+a+"\n"+
                        "Sección      : " + b + "\n"+
                        "Cuadrante : "+c+"\n"+
                        "Canister    : "+d+"   ";
    }
    else if(index == 2){
        label_03.isVisible = true;
        var line = new BABYLON.GUI.Line();
        line.alpha = 0.8;
        line.lineWidth = 1;
        line.dash = [5, 10];
        advancedTexture.addControl(line); 
        line.linkWithMesh(model);
        line.connectedControl = label_03;
        lines.push(line);

        text_03.text =  "Cilindro      : "+a+"\n"+
                        "Sección      : " + b + "\n"+
                        "Cuadrante : "+c+"\n"+
                        "Canister    : "+d+"   ";
    }
    else if(index == 3){
        label_04.isVisible = true;
        var line = new BABYLON.GUI.Line();
        line.alpha = 0.8;
        line.lineWidth = 1;
        line.dash = [5, 10];
        advancedTexture.addControl(line); 
        line.linkWithMesh(model);
        line.connectedControl = label_04;
        lines.push(line);

        text_04.text =  "Cilindro      : "+a+"\n"+
                        "Sección      : " + b + "\n"+
                        "Cuadrante : "+c+"\n"+
                        "Canister    : "+d+"   ";
    }
}

function checkCilindro_01(numCylinder, numQuadrant, numSection, numTube, bChecked_Cylinder, bChecked_Quadrant){
    bChecked_Cylinder = true;
    numCylinder = parseInt(numCylinder);
    numSection = parseInt(numSection);
    if(numSection < 0 || numSection > 2) return;
    numTube     = parseInt(numTube);
    console.log(numCylinder, numSection, numTube);

    // if(num <= 0 || num > 20) return;
    if((numTube<=0 || numTube>10) || isNaN(numTube)==true) return;
    console.log('start search');

    for(var i in cilindroList_01){
        if(bChecked_Cylinder == true){
            if(quantities[0].indexOf(numCylinder)!=i) continue;
        }
        console.log('array index',i);
        let model = cilindroList_01[i];
        for(var j in model){
            //check num sticker
            if(model[j].name.includes('num-')){
                var stickerNum = parseInt(model[j].name.substring(4,6));
                if(stickerNum == ((numTube>10)?(numTube-10):numTube))
                    addSectionAnimation(model[j],30)
            }
            if(numSection == 2){
                //check section
                //move upper section
                if(model[j].name == 'section-01') addSectionAnimation(model[j],60);
                if(model[j].name == 'section-02') addSectionAnimation(model[j],32);

                if(model[j].name.includes('tube-') && !model[j].name.includes('tube-sticker')){
                    var sectionNum = parseInt(model[j].name.substring(5,7));
                    if(sectionNum == 1) addSectionAnimation(model[j],60);
                    else addSectionAnimation(model[j],32);
                }
    
                if(model[j].name.includes('tube-sticker-')){
                    var stickerNum = parseInt(model[j].name.substring(14,16));
                    if(stickerNum == 1) addSectionAnimation(model[j],60);
                    else addSectionAnimation(model[j],32);
                }

                //check tube
                if(model[j].name.includes('tube-') && !model[j].name.includes('tube-sticker')){
                    var tubeNum = parseInt(model[j].name.substring(8,10));
                    var sectionNum = parseInt(model[j].name.substring(5,7));
                    console.log(sectionNum, tubeNum)
                    if(tubeNum == numTube && sectionNum == numSection){
                        let tmpModel = model[j];
                        setTimeout(() => {
                            addIlluminateAnimation(tmpModel,0,numCylinder,numSection, "XXX",numTube);
                        }, 1000);
                    }
                }
                // if(model[j].name.includes('tube-sticker-')){
                //     var stickerNum = parseInt(model[j].name.substring(14,16));
                //     if(stickerNum == (numTube + 1))
                //     {
                //         let tmpModel = model[j];
                //         setTimeout(() => {
                //             addIlluminateAnimation(tmpModel,0,numCylinder, "XXX",numTube);
                //         }, 1000);
                //     }
                // }
            }
            else{
                //check tube
                if(model[j].name.includes('tube-') && !model[j].name.includes('tube-sticker')){
                    var tubeNum = parseInt(model[j].name.substring(8,10));
                    var sectionNum = parseInt(model[j].name.substring(5,7));
                    if(tubeNum == numTube && sectionNum == numSection) addIlluminateAnimation(model[j],0,numCylinder,numSection, "XXX",numTube);
                }
            }
        }
    }
}

function checkCilindro_02(numCylinder, numQuadrant, numSection, numTube, bChecked_Cylinder, bChecked_Quadrant){
    bChecked_Cylinder = true;
    numCylinder = parseInt(numCylinder);
    numSection = parseInt(numSection);
    if(numSection < 0 || numSection > 2) return;
    console.log(numCylinder,numTube,numTube.length);
    if(isNaN(numTube)==false) return;
    console.log('cilindro 2 start search');

    for(var i in cilindroList_02){
        if(bChecked_Cylinder == true){
            if(quantities[1].indexOf(numCylinder)!=i) continue;
        }
        console.log('array index',i);
        var model = cilindroList_02[i];
        for(var j in model){
            if(numSection == 2){
                if(model[j].name.includes('section-001')){
                    let tmpModel = model[j];
                    addSectionAnimation(tmpModel, 60)
                }
                else if(model[j].name.includes('section-002')){
                    let tmpModel = model[j];
                    addSectionAnimation(tmpModel, 30)
                }
                if(model[j].name.includes('sticker-')){
                    var sectionNum = parseInt(model[j].name.substring(8,10));
                    if(sectionNum == 1){
                        let tmpModel = model[j];
                        addSectionAnimation(tmpModel,60);
                    }
                    else if(sectionNum == 2){
                        let tmpModel = model[j];
                        addSectionAnimation(tmpModel,30);
                    }
                }
                if(model[j].name.includes('sticker-') && model[j].name.includes(numTube)){
                    var sectionNum = parseInt(model[j].name.substring(8,10));
                    if(sectionNum == numSection){
                        let tmpModel = model[j];
                        setTimeout(() => {
                            addSectionAnimation(tmpModel,10);
                            addIlluminateAnimation(tmpModel,1,numCylinder, numSection, "XXX",numTube);
                        }, 1000);
                    }
                }
            }
            else if(numSection == 1){
                if(model[j].name.includes('sticker-') && model[j].name.includes(numTube)){
                    var sectionNum = parseInt(model[j].name.substring(8,10));
                    if(sectionNum == numSection){
                        let tmpModel = model[j];
                        setTimeout(() => {
                            addSectionAnimation(tmpModel,20);
                            addIlluminateAnimation(tmpModel,1,numCylinder, numSection, "XXX",numTube);
                        }, 1000);
                    }
                }
            }
        }
    }
}

function checkCilindro_03(numCylinder, numQuadrant, numSection, numTube, bChecked_Cylinder, bChecked_Quadrant, bChecked_Tube){
    bChecked_Cylinder = true;
    bChecked_Quadrant = true;
    bChecked_Tube = true;
    numCylinder = parseInt(numCylinder);
    numQuadrant = parseInt(numQuadrant);
    numSection = parseInt(numSection);
    if(numSection < 0 || numSection > 5) return;

    if(bChecked_Quadrant == false && bChecked_Tube == false) return;
    console.log('cilindro 3 search started');
    let tube_char;
    let tube_num;

    console.log(numTube);
    numTube = numTube.toLowerCase();
    console.log(numTube);
    if((numTube[0] >= 'a' && numTube[0] <= 'z') && (numTube[1] >= '0' && numTube[1] <= '9')){
        tube_char = numTube[0];
        tube_num = numTube[1];
    }
    else if((numTube[0] >= '0' && numTube[0] <= '9') && (numTube[1] >= 'a' && numTube[1] <= 'z')){
        tube_char = numTube[1];
        tube_num = numTube[0];
    }
    else return;
    for(var i in cilindroList_03){
        if(bChecked_Cylinder == true){
            if(quantities[2].indexOf(numCylinder)!=i) continue;
        }
        console.log('array index',i);
        var model = cilindroList_03[i];
        for(var j in model){
            if(numSection == 1){
                if(model[j].name.includes('Tube-')){
                    //get section
                    let length = model[j].name.length;
                    let sectionNum = parseInt(model[j].name.substring(length - 3, length));
                    //check tubes
                    let num_quadrant = parseInt(model[j].name.substring(5,8));
                    let _num = model[j].name.substring(9,10);
                    let char = model[j].name.substring(11,12);
                    if(num_quadrant == numQuadrant && tube_num == _num && tube_char == char && numSection == sectionNum){
                        let tmpModel = model[j];
                        addSectionAnimation(model[j],20);
                        addIlluminateAnimation(tmpModel,2,numCylinder, numSection, numQuadrant, numTube);
                    }
                }
            }
            else if(numSection == 2){
                if(model[j].name == "section-001") addSectionAnimation(model[j], 70);
                if(model[j].name == "section-002") addSectionAnimation(model[j], 35);

                if(model[j].name.includes('Tube-')){
                    //get section
                    let length = model[j].name.length;
                    let sectionNum = parseInt(model[j].name.substring(length - 3, length));
                    //check tubes
                    if(sectionNum == 1){
                        addSectionAnimation(model[j],70);
                    }
                    else if(sectionNum == numSection){
                        addSectionAnimation(model[j], 35)
                        let num_quadrant = parseInt(model[j].name.substring(5,8));
                        let _num = model[j].name.substring(9,10);
                        let char = model[j].name.substring(11,12);
                        if(num_quadrant == numQuadrant && tube_num == _num && tube_char == char){
                            let tmpModel = model[j];
                            setTimeout(() => {
                                addSectionAnimation(tmpModel,20);
                                addIlluminateAnimation(tmpModel,2,numCylinder, numSection, numQuadrant, numTube);
                            }, 1000);
                        }
                    }
                }
            }
            else if(numSection == 3){
                if(model[j].name == "section-001" || model[j].name == "section-002") addSectionAnimation(model[j], 105);
                else if(model[j].name == "section-003") addSectionAnimation(model[j], 70);
                
                if(model[j].name.includes('Tube-')){
                    //get section
                    let length = model[j].name.length;
                    let sectionNum = parseInt(model[j].name.substring(length - 3, length));
                    //check tubes
                    if(sectionNum == 1 || sectionNum == 2){
                        addSectionAnimation(model[j],105);
                    }
                    else if(sectionNum == numSection){
                        addSectionAnimation(model[j], 70)
                        let num_quadrant = parseInt(model[j].name.substring(5,8));
                        let _num = model[j].name.substring(9,10);
                        let char = model[j].name.substring(11,12);
                        if(num_quadrant == numQuadrant && tube_num == _num && tube_char == char){
                            let tmpModel = model[j];
                            setTimeout(() => {
                                addSectionAnimation(tmpModel,20);
                                addIlluminateAnimation(tmpModel,2,numCylinder, numSection, numQuadrant, numTube);
                            }, 1000);
                        }
                    }
                }
            }
            else if(numSection == 4){
                if(model[j].name == "section-001" || model[j].name == "section-002" || model[j].name == "section-003") addSectionAnimation(model[j], 140);
                else if(model[j].name == "section-004") addSectionAnimation(model[j], 105);
                
                if(model[j].name.includes('Tube-')){
                    //get section
                    let length = model[j].name.length;
                    let sectionNum = parseInt(model[j].name.substring(length - 3, length));
                    //check tubes
                    if(sectionNum == 1 || sectionNum == 2 || sectionNum == 3){
                        addSectionAnimation(model[j],140);
                    }
                    else if(sectionNum == numSection){
                        addSectionAnimation(model[j], 105)
                        let num_quadrant = parseInt(model[j].name.substring(5,8));
                        let _num = model[j].name.substring(9,10);
                        let char = model[j].name.substring(11,12);
                        if(num_quadrant == numQuadrant && tube_num == _num && tube_char == char){
                            let tmpModel = model[j];
                            setTimeout(() => {
                                addSectionAnimation(tmpModel,20);
                                addIlluminateAnimation(tmpModel,2,numCylinder, numSection, numQuadrant, numTube);
                            }, 1000);
                        }
                    }
                }
            }
            else if(numSection == 5){
                if(model[j].name == "section-001" || model[j].name == "section-002" || model[j].name == "section-003" || model[j].name == "section-004") addSectionAnimation(model[j], 175);
                else if(model[j].name == "section-005") addSectionAnimation(model[j], 140);
                
                if(model[j].name.includes('Tube-')){
                    //get section
                    let length = model[j].name.length;
                    let sectionNum = parseInt(model[j].name.substring(length - 3, length));
                    //check tubes
                    if(sectionNum == 1 || sectionNum == 2 || sectionNum == 3 || sectionNum == 4){
                        addSectionAnimation(model[j],175);
                    }
                    else if(sectionNum == numSection){
                        addSectionAnimation(model[j], 140)
                        let num_quadrant = parseInt(model[j].name.substring(5,8));
                        let _num = model[j].name.substring(9,10);
                        let char = model[j].name.substring(11,12);
                        if(num_quadrant == numQuadrant && tube_num == _num && tube_char == char){
                            let tmpModel = model[j];
                            setTimeout(() => {
                                addSectionAnimation(tmpModel,20);
                                addIlluminateAnimation(tmpModel,2,numCylinder, numSection, numQuadrant, numTube);
                            }, 1000);
                        }
                    }
                }
            }
        }
    }
}

function checkCilindro_04(numCylinder, numQuadrant, numSection, numTube, bChecked_Cylinder, bChecked_Quadrant, bChecked_Tube){
    bChecked_Cylinder = true;
    numCylinder = parseInt(numCylinder);
    numSection = parseInt(numSection);
    if(numSection < 0 || numSection > 5) return;
    if(bChecked_Tube == false) return;
    console.log('search cilindro 4 started');

    let tube_char;
    let tube_num;

    console.log(numTube);
    numTube = numTube.toLowerCase();
    console.log(numTube);
    if((numTube[0] >= 'a' && numTube[0] <= 'z') && (numTube[1] >= '0' && numTube[1] <= '9')){
        tube_char = numTube[0];
        tube_num = numTube[1];
    }
    else if((numTube[0] >= '0' && numTube[0] <= '9') && (numTube[1] >= 'a' && numTube[1] <= 'z')){
        tube_char = numTube[1];
        tube_num = numTube[0];
    }
    else return;

    console.log(tube_char, tube_num);

    for(var i in cilindroList_04){
        if(bChecked_Cylinder == true){
            if(quantities[3].indexOf(numCylinder)!=i) continue;
        }
        console.log('array index',i);
        var model = cilindroList_04[i];
        for(var j in model){
            if(model[j].name.includes('Tube-')){
                if(numSection == 1){
                    var num = model[j].name.substring(8,10);
                    var char = model[j].name.substring(11,12);
                    var sectionNum = parseInt(model[j].name.substring(5,7));
                    if(parseInt(num) == tube_num && char == tube_char && sectionNum == numSection){
                        let tmpModel = model[j];
                        addSectionAnimation(model[j],20);
                        addIlluminateAnimation(tmpModel,3,numCylinder, numSection, "XXX",numTube);
                    }
                }
                else if(numSection == 2){
                    var sectionNum = parseInt(model[j].name.substring(5,7));
                    if(sectionNum == 1){
                        addSectionAnimation(model[j],100)
                    }
                    else if(sectionNum == numSection){
                        addSectionAnimation(model[j],30)
                        var num = model[j].name.substring(8,10);
                        var char = model[j].name.substring(11,12);
                        if(parseInt(num) == tube_num && char == tube_char){
                            let tmpModel = model[j];
                            setTimeout(() => {
                                addSectionAnimation(tmpModel,20);
                                addIlluminateAnimation(tmpModel,3,numCylinder, numSection, "XXX",numTube);
                            }, 1000);
                        }
                    }
                }
                else if(numSection == 3){
                    var sectionNum = parseInt(model[j].name.substring(5,7));
                    if(sectionNum == 1 || sectionNum == 2){
                        addSectionAnimation(model[j],130)
                    }
                    else if(sectionNum == numSection){
                        addSectionAnimation(model[j],60)
                        var num = model[j].name.substring(8,10);
                        var char = model[j].name.substring(11,12);
                        if(parseInt(num) == tube_num && char == tube_char){
                            let tmpModel = model[j];
                            setTimeout(() => {
                                addSectionAnimation(tmpModel,20);
                                addIlluminateAnimation(tmpModel,3,numCylinder, numSection, "XXX",numTube);
                            }, 1000);
                        }
                    }
                }
                else if(numSection == 4){
                    var sectionNum = parseInt(model[j].name.substring(5,7));
                    if(sectionNum == 1 || sectionNum == 2 || sectionNum == 3){
                        addSectionAnimation(model[j],160)
                    }
                    else if(sectionNum == numSection){
                        addSectionAnimation(model[j],90)
                        var num = model[j].name.substring(8,10);
                        var char = model[j].name.substring(11,12);
                        if(parseInt(num) == tube_num && char == tube_char){
                            let tmpModel = model[j];
                            setTimeout(() => {
                                addSectionAnimation(tmpModel,20);
                                addIlluminateAnimation(tmpModel,3,numCylinder, numSection, "XXX",numTube);
                            }, 1000);
                        }
                    }
                }
                else if(numSection == 5){
                    var sectionNum = parseInt(model[j].name.substring(5,7));
                    if(sectionNum == 1 || sectionNum == 2 || sectionNum == 3 || sectionNum == 4){
                        addSectionAnimation(model[j],190)
                    }
                    else if(sectionNum == numSection){
                        addSectionAnimation(model[j],120)
                        var num = model[j].name.substring(8,10);
                        var char = model[j].name.substring(11,12);
                        if(parseInt(num) == tube_num && char == tube_char){
                            let tmpModel = model[j];
                            setTimeout(() => {
                                addSectionAnimation(tmpModel,20);
                                addIlluminateAnimation(tmpModel,3,numCylinder, numSection, "XXX",numTube);
                            }, 1000);
                        }
                    }
                }
            }
        }
    }
}

function backupInitialStatus(){
    var pos_cylinder_01 = [];
    for(var i in cilindroList_01){
        for(var j in cilindroList_01[i]){
            pos_cylinder_01.push(new BABYLON.Vector3(
                cilindroList_01[i][j].position.x,
                cilindroList_01[i][j].position.y,
                cilindroList_01[i][j].position.z
            ));
        }
    }
    initialStatus.push(pos_cylinder_01);

    var pos_cylinder_02 = [];
    for(var i in cilindroList_02){
        for(var j in cilindroList_02[i]){
            pos_cylinder_02.push(new BABYLON.Vector3(
                cilindroList_02[i][j].position.x,
                cilindroList_02[i][j].position.y,
                cilindroList_02[i][j].position.z
            ));
        }
    }
    initialStatus.push(pos_cylinder_02);

    var pos_cylinder_03 = [];
    for(var i in cilindroList_03){
        for(var j in cilindroList_03[i]){
            pos_cylinder_03.push(new BABYLON.Vector3(
                cilindroList_03[i][j].position.x,
                cilindroList_03[i][j].position.y,
                cilindroList_03[i][j].position.z
            ));
        }
    }
    initialStatus.push(pos_cylinder_03);

    var pos_cylinder_04 = [];
    for(var i in cilindroList_04){
        for(var j in cilindroList_04[i]){
            pos_cylinder_04.push(new BABYLON.Vector3(
                cilindroList_04[i][j].position.x,
                cilindroList_04[i][j].position.y,
                cilindroList_04[i][j].position.z
            ));
        }
    }
    initialStatus.push(pos_cylinder_04);
}

function restoreInitialStatus(){
    //remove lines
    for(var i in lines){
        lines[i].dispose();
    }
    lines = [];
    //hide labels
    label_01.isVisible = false;
    label_02.isVisible = false;
    label_03.isVisible = false;
    label_04.isVisible = false;
    //set initial positions
    var index = 0;
    let pos_cylinder_01 = initialStatus[0];
    let pos_cylinder_02 = initialStatus[1];
    let pos_cylinder_03 = initialStatus[2];
    let pos_cylinder_04 = initialStatus[3];

    for(var i in cilindroList_01){
        for(var j in cilindroList_01[i]){
            cilindroList_01[i][j].position.x = pos_cylinder_01[index].x;
            cilindroList_01[i][j].position.y = pos_cylinder_01[index].y;
            cilindroList_01[i][j].position.z = pos_cylinder_01[index].z;
            index++;
        }
    }

    index = 0;

    for(var i in cilindroList_02){
        for(var j in cilindroList_02[i]){
            cilindroList_02[i][j].position.x = pos_cylinder_02[index].x;
            cilindroList_02[i][j].position.y = pos_cylinder_02[index].y;
            cilindroList_02[i][j].position.z = pos_cylinder_02[index].z;
            index++;
        }
    }

    index = 0;

    for(var i in cilindroList_03){
        for(var j in cilindroList_03[i]){
            cilindroList_03[i][j].position.x = pos_cylinder_03[index].x;
            cilindroList_03[i][j].position.y = pos_cylinder_03[index].y;
            cilindroList_03[i][j].position.z = pos_cylinder_03[index].z;
            index++;
        }
    }

    index = 0;

    for(var i in cilindroList_04){
        for(var j in cilindroList_04[i]){
            cilindroList_04[i][j].position.x = pos_cylinder_04[index].x;
            cilindroList_04[i][j].position.y = pos_cylinder_04[index].y;
            cilindroList_04[i][j].position.z = pos_cylinder_04[index].z;
            index++;
        }
    }

    for(var i in highlight._meshes){
        highlight.removeMesh(highlight._meshes[i].mesh)
    }

    //reset camera info
    cameraTarget.position.x = 0;
    cameraTarget.position.y = 30;
    cameraTarget.position.z = 0;
    camera.radius = 1200;
}

document.getElementById('btn-find').addEventListener('click',function(){

    document.getElementById('input-panel').style.display = 'none';
    document.getElementById('reset').style.display = 'block';
    backupInitialStatus();
    // var bChecked_Cylinder = document.getElementById('check-cylinder').checked;
    var bChecked_Cylinder = true;
    var numCylinder = document.getElementById('input-cylinder').value;

    // var bChecked_Quadrant = document.getElementById('check-quadrant').checked;
    var bChecked_Quadrant = true;
    var numQuadrant = document.getElementById('input-quadrant').value;

    var numSection = document.getElementById('input-section').value;

    // var bChecked_Tube = document.getElementById('check-tube').checked;
    var bChecked_Tube = true;
    var numTube     = document.getElementById('input-tube').value;

    // scene.registerBeforeRender(function() {
    //     camera.alpha += 0.005;
    // });

    let colorlist = [
        'red',
        'orange',
        'blue',
        'green',
        'yellow',
        'white'
    ]
    //tube is number
    if(!isNaN(numTube)){
        checkCilindro_01(numCylinder, numQuadrant, numSection, numTube);
    }
    else if(colorlist.includes(numTube)){
        checkCilindro_02(numCylinder, numQuadrant,numSection, numTube, bChecked_Cylinder,bChecked_Quadrant);
    }
    else{
        checkCilindro_03(numCylinder, numQuadrant, numSection, numTube, bChecked_Cylinder,bChecked_Quadrant,bChecked_Tube);
        checkCilindro_04(numCylinder, numQuadrant, numSection, numTube, bChecked_Cylinder,bChecked_Quadrant,bChecked_Tube);
    }
})

document.getElementById('btn-reset').addEventListener('click',function(){
    document.getElementById('input-panel').style.display = 'block';
    document.getElementById('reset').style.display = 'none';
    restoreInitialStatus();
})

//select cylinder event dispatcher
function onPointerDown(evt){
    if(evt.clientX !== pointerPressingInfo[0] || evt.clientY !== pointerPressingInfo[1]) return;
    var pickInfo = scene.pick(scene.pointerX, scene.pointerY,function(mesh){
        return (mesh.visibility && mesh.name.includes("container"));
    })
    if(pickInfo.hit){
        camera.setTarget(cameraTarget);
        var currentMesh = pickInfo.pickedMesh;
        if(currentMesh.position.equals(cameraTarget.position)) return;
        var animCTarget = new BABYLON.Animation("anim-camera-target","position",ANIM_DURATION,BABYLON.Animation.ANIMATIONTYPE_VECTOR3);
        var keys = [];
        keys.push({
            frame : 0,
            value : cameraTarget.position.clone(),
        });
        keys.push({
            frame : ANIM_DURATION,
            value : currentMesh.position.clone(),
        })

        animCTarget.setKeys(keys);
        cameraTarget.animations = [];
        cameraTarget.animations.push(animCTarget);
        scene.beginAnimation(cameraTarget, 0, ANIM_DURATION, false);
    }
}

canvas.addEventListener('pointerdown',function(evt){
    pointerPressingInfo = [evt.clientX, evt.clientY];
})
canvas.addEventListener('pointerup',onPointerDown)