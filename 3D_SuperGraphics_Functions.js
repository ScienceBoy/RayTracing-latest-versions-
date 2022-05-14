// Latest Major Changes:
// v1.00 26.03.2021 Complete program after completion of all chapters for Udemy Online Course
// v1.01 07.05.2021 Added elapsed time calculation
// v1.02 08.05.2021 Added 4 views
// v1.03 08.05.2021 Changed load and safe to take areas instead of points
// v2.00 18.05.2021 Changed to 4 views, added many functions and changed shadow to have part of object color and part of color of object which gives shadow
// v2.01 20.05.2021 Added load function for 3D-objects saved in STL-format
// v2.02 20.05.2021 Added the use of up to 10 light sources
// v2.03 11.06.2021 Added saving as STL file
// v2.11 01.05.2022 Added possibility to run non-WebWorker calculation via RayTracingWithoutWebWorkers() triggered by boolean variable 'UseWebWorker'
// v2.12 01.05.2022 Changed number of segments for new Spheres from 50 to 25
// v2.11 01.05.2022 In function SetupAreaConstants(index): Changed color of new predefined objects to white (could also be gold [#d4af37] or any other color). Also adjusted some other settings of new objects there
// v2.12 03.05.2022 Removed possibility to run non-WebWorker calculation via 'UseWebWorker'
// v2.12b 03.05.2022 In function SetupAreaConstants(index): Changed color of new predefined objects to gold [#d4af37]
// v2.13 14.05.2022 Added SurroundingBox calculation to only run RayTracing where objects are

function drawLine(x1, y1, x2, y2, thickness, DrawingContext, color) {
    DrawingContext.beginPath();
    DrawingContext.strokeStyle = color;
    DrawingContext.lineWidth = thickness;
    DrawingContext.moveTo(x1, y1);
    DrawingContext.lineTo(x2, y2);
    DrawingContext.stroke();
}
//drawLine(20,50,40,80,1,DrawingContext,"#00FF00");

function drawBox(x1, y1, x2, y2, thickness, DrawingContext, color, fill) {
    if (x2 > x1) {
        var temp = x2;
        x2 = x1;
        x1 = temp;
    } // make sure x2 is > x1
    if (y2 > y1) {
        var temp = y2;
        y2 = y1;
        y1 = temp;
    } // make sure y2 is > y1
    DrawingContext.beginPath();
    DrawingContext.fillStyle = color;
    DrawingContext.strokeStyle = color;
    DrawingContext.lineWidth = thickness;
    if (fill == true) {
        DrawingContext.fillRect(x1, y1, x2 - x1, y2 - y1);
    }
    if (fill == false) {
        DrawingContext.strokeRect(x1, y1, x2 - x1, y2 - y1);
    }
    DrawingContext.stroke();
}
//drawBox(130,160,140,150,1,DrawingContext,"#FF0000",false);

function drawCircle(
    x,
    y,
    r,
    startAngle,
    endAngle,
    thickness,
    DrawingContext,
    color,
    fill
) {
    var pi = 3.1415;
    DrawingContext.beginPath();
    DrawingContext.fillStyle = color;
    DrawingContext.strokeStyle = color;
    DrawingContext.lineWidth = thickness;
    DrawingContext.arc(
        x,
        y,
        r,
        (startAngle / 360) * 2 * pi,
        (endAngle / 360) * 2 * pi
    );
    DrawingContext.stroke();
    if (fill == true) {
        DrawingContext.fill();
    }
}
//drawCircle(230,260,30,0,360,1,DrawingContext,"#FF0000",true);

function drawText(x, y, text, DrawingContext, color, textAlign) {
    DrawingContext.fillStyle = color;
    DrawingContext.lineWidth = 1;
    DrawingContext.font = "12px Arial";
    DrawingContext.textAlign = textAlign;
    DrawingContext.fillText(text, x, y);
}

function drawTextSmallWindow(x, y, text, DrawingContext, color, textAlign) {
    DrawingContext.fillStyle = color;
    DrawingContext.lineWidth = 1;
    DrawingContext.font = "32px Arial";
    DrawingContext.textAlign = textAlign;
    DrawingContext.fillText(text, x, y);
}

//drawText(30,260,"Howdi",DrawingContext,"#FF00FF","center");

//// Artificial path:
// DrawingContext.fillStyle = "#00FF00";
// DrawingContext.strokeStyle = "#0000FF";
// DrawingContext.beginPath();
// DrawingContext.moveTo(130,50);
// DrawingContext.lineTo(50,230);
// DrawingContext.lineTo(220,50);
// DrawingContext.lineTo(40,170);
// DrawingContext.lineTo(125,40);
// DrawingContext.closePath();
// DrawingContext.stroke();
// DrawingContext.fill();

function drawBoxFromPressedButton(x) {
    DrawingContext.fillRect(70, 20, 60, 20);
}

function drawBoxFromPushedButton(x) {
    DrawingContext.fillRect(30, 60, 60, 20);
}

function clearScreen() {
    DrawingContext.clearRect(0, 0, Canvas.width, Canvas.height);
    DrawingContextTop.clearRect(0, 0, CanvasTop.width, CanvasTop.height);
    DrawingContextSide.clearRect(0, 0, CanvasSide.width, CanvasSide.height);
    DrawingContextFront.clearRect(0, 0, CanvasFront.width, CanvasFront.height);
    DrawingContextObjectAll.clearRect(
        0,
        0,
        CanvasObjectAll.width,
        CanvasObjectAll.height
    );
    DrawingContextObject0.clearRect(
        0,
        0,
        CanvasObject0.width,
        CanvasObject0.height
    );
    DrawingContextObject1.clearRect(
        0,
        0,
        CanvasObject1.width,
        CanvasObject1.height
    );
    DrawingContextObject2.clearRect(
        0,
        0,
        CanvasObject2.width,
        CanvasObject2.height
    );
    DrawingContextObject3.clearRect(
        0,
        0,
        CanvasObject3.width,
        CanvasObject3.height
    );
    DrawingContextObject4.clearRect(
        0,
        0,
        CanvasObject4.width,
        CanvasObject4.height
    );
    DrawingContextObject5.clearRect(
        0,
        0,
        CanvasObject0.width,
        CanvasObject5.height
    );
    DrawingContextObject6.clearRect(
        0,
        0,
        CanvasObject1.width,
        CanvasObject6.height
    );
    DrawingContextObject7.clearRect(
        0,
        0,
        CanvasObject2.width,
        CanvasObject7.height
    );
    DrawingContextObject8.clearRect(
        0,
        0,
        CanvasObject3.width,
        CanvasObject8.height
    );
}

function clearScreenMainWindows() {
    DrawingContext.clearRect(0, 0, Canvas.width, Canvas.height);
    DrawingContextTop.clearRect(0, 0, CanvasTop.width, CanvasTop.height);
    DrawingContextSide.clearRect(0, 0, CanvasSide.width, CanvasSide.height);
    DrawingContextFront.clearRect(0, 0, CanvasFront.width, CanvasFront.height);
}

function clearScreenSmallWindows() {
    DrawingContextObjectAll.clearRect(
        0,
        0,
        CanvasObjectAll.width,
        CanvasObjectAll.height
    );
    DrawingContextObject0.clearRect(
        0,
        0,
        CanvasObject0.width,
        CanvasObject0.height
    );
    DrawingContextObject1.clearRect(
        0,
        0,
        CanvasObject1.width,
        CanvasObject1.height
    );
    DrawingContextObject2.clearRect(
        0,
        0,
        CanvasObject2.width,
        CanvasObject2.height
    );
    DrawingContextObject3.clearRect(
        0,
        0,
        CanvasObject3.width,
        CanvasObject3.height
    );
    DrawingContextObject4.clearRect(
        0,
        0,
        CanvasObject4.width,
        CanvasObject4.height
    );
    DrawingContextObject5.clearRect(
        0,
        0,
        CanvasObject0.width,
        CanvasObject5.height
    );
    DrawingContextObject6.clearRect(
        0,
        0,
        CanvasObject1.width,
        CanvasObject6.height
    );
    DrawingContextObject7.clearRect(
        0,
        0,
        CanvasObject2.width,
        CanvasObject7.height
    );
    DrawingContextObject8.clearRect(
        0,
        0,
        CanvasObject3.width,
        CanvasObject8.height
    );
}
// window.addEventListener('mousemove',
// function (event)
// {
// var mousePos = getMousePos(Canvas, event);
// DrawingContext.fillRect(mousePos.x, mousePos.y, 10, 10);
// }
// , false);

function getMousePos(Canvas, event) {
    var rect = CanvasFront.getBoundingClientRect();
    return {
        x:
            ((event.clientX - rect.left) / (rect.right - rect.left)) *
            Canvas.width,
        y:
            ((event.clientY - rect.top) / (rect.bottom - rect.top)) *
            Canvas.height,
    };
}

function Array1D(x) {
    this.items = new Array(x);
}

function Array2D(x, y) {
    this.items = new Array(x);
    for (var i = 0; i < x; i++) this.items[i] = new Array(y);
}
// var a = new Array2D(3,3);
// a.items[1][1] = 'hello';
// alert(a.items[1][1]);

function Array3D(x, y, z) {
    this.items = new Array(x);
    for (var i = 0; i < x; i++) this.items[i] = new Array(y);
    for (var i = 0; i < x; i++)
        for (var j = 0; j < y; j++) this.items[i][j] = new Array(z);
}

function EnterNewPoints() {
    ShiftPressed = false;
    EnterObjectPoints = true;
    window.addEventListener("mousemove", mousemoveevent);
    window.addEventListener("mousedown", mousedownevent);
    window.addEventListener("keydown", keydownevent);
    Canvas.addEventListener("focus", ChangeFocusToCanvas);
    CanvasTop.addEventListener("focus", ChangeFocusToCanvasTop);
    CanvasSide.addEventListener("focus", ChangeFocusToCanvasSide);
    CanvasFront.addEventListener("focus", ChangeFocusToCanvasFront);
    Canvas.addEventListener("mouseenter", ChangeFocusToCanvas);
    CanvasTop.addEventListener("mouseenter", ChangeFocusToCanvasTop);
    CanvasSide.addEventListener("mouseenter", ChangeFocusToCanvasSide);
    CanvasFront.addEventListener("mouseenter", ChangeFocusToCanvasFront);
    window.addEventListener("contextmenu", RightMouseClickEvent);
    //drawText(10,20,"Click to enter a new point. Press space to finish entering points. Or press <<L>> key if you have saved a scene before.",DrawingContext,"#0000FF","left");
    ShowAxesAndEnteredPoints();
}

var rangezoom = document.querySelector("#zoom");
var rangeperspective = document.querySelector("#perspective");
var rangex1 = document.querySelector("#rangex1");
var rangez1 = document.querySelector("#rangez1");
var rangez2 = document.querySelector("#rangez2");
var rangey2 = document.querySelector("#rangey2");
var rangex3 = document.querySelector("#rangex3");
var rangey3 = document.querySelector("#rangey3");
var rangezoomnumber = document.querySelector("#zoomnumber");
var rangeperspectivenumber = document.querySelector("#perspectivenumber");
var rangex1number = document.querySelector("#rangex1number");
var rangez1number = document.querySelector("#rangez1number");
var rangez2number = document.querySelector("#rangez2number");
var rangey2number = document.querySelector("#rangey2number");
var rangex3number = document.querySelector("#rangex3number");
var rangey3number = document.querySelector("#rangey3number");
var NextObjects = document.querySelector("#NextObjects");
var FormerObjects = document.querySelector("#FormerObjects");

rangezoom.addEventListener("input", function () {
    rangezoomnumber.value = this.value;
    zoomen(this.value);
    rangezoom.value = 1;
    rangezoomnumber.value = 1;
    ShowAreaOf3DObject();
});
rangeperspective.addEventListener("input", function () {
    DistortionDistance = -this.value;
    rangeperspectivenumber.value = this.value;
    ShowAreaOf3DObject();
});
rangez1.addEventListener("input", function () {
    if (RotateSelected) {
        AngleX = this.value;
        RotateAll();
        ShowAreaOf3DObject();
    } else if (MoveSelected) {
        MoveZ = this.value / 5;
        MoveAll();
        ShowAreaOf3DObject();
    } else if (ChangeSizeInOneDirectionSelected) {
        MoveZ = this.value / 5;
        ReduceSizeInOneDirection();
        ShowAreaOf3DObject();
    }
});
rangex1.addEventListener("input", function () {
    if (RotateSelected) {
        AngleY = this.value;
        RotateAll();
        ShowAreaOf3DObject();
    } else if (MoveSelected) {
        MoveX = -this.value / 5;
        MoveAll();
        ShowAreaOf3DObject();
    } else if (ChangeSizeInOneDirectionSelected) {
        MoveX = this.value / 5;
        ReduceSizeInOneDirection();
        ShowAreaOf3DObject();
    }
});
rangez2.addEventListener("input", function () {
    if (RotateSelected) {
        AngleX = -this.value;
        RotateAll();
        ShowAreaOf3DObject();
    } else if (MoveSelected) {
        MoveZ = -this.value / 5;
        MoveAll();
        ShowAreaOf3DObject();
    } else if (ChangeSizeInOneDirectionSelected) {
        MoveZ = this.value / 5;
        ReduceSizeInOneDirection();
        ShowAreaOf3DObject();
    }
});
rangey2.addEventListener("input", function () {
    if (RotateSelected) {
        AngleZ = -this.value;
        RotateAll();
        ShowAreaOf3DObject();
    } else if (MoveSelected) {
        MoveY = this.value / 5;
        MoveAll();
        ShowAreaOf3DObject();
    } else if (ChangeSizeInOneDirectionSelected) {
        MoveY = this.value / 5;
        ReduceSizeInOneDirection();
        ShowAreaOf3DObject();
    }
});
rangex3.addEventListener("input", function () {
    if (RotateSelected) {
        AngleZ = -this.value / 3;
        RotateAll();
        ShowAreaOf3DObject();
    } else if (MoveSelected) {
        MoveX = -this.value / 5;
        MoveAll();
        ShowAreaOf3DObject();
    } else if (ChangeSizeInOneDirectionSelected) {
        MoveX = this.value / 5;
        ReduceSizeInOneDirection();
        ShowAreaOf3DObject();
    }
});
rangey3.addEventListener("input", function () {
    if (RotateSelected) {
        AngleX = this.value / 3;
        RotateAll();
        ShowAreaOf3DObject();
    } else if (MoveSelected) {
        MoveY = this.value / 5;
        MoveAll();
        ShowAreaOf3DObject();
    } else if (ChangeSizeInOneDirectionSelected) {
        MoveY = this.value / 5;
        ReduceSizeInOneDirection();
        ShowAreaOf3DObject();
    }
});
NextObjects.addEventListener("click", function () {
    SelectedEightObjects = SelectedEightObjects + 9;
    if (SelectedEightObjects > NumberOfCompleteObjects) {
        SelectedEightObjects = NumberOfCompleteObjects;
    }
    CheckIfSelectedWindow();
    ShowAreaOf3DObject();
    ShowAreaOf3DObjectSmallWindows();
});
FormerObjects.addEventListener("click", function () {
    SelectedEightObjects = SelectedEightObjects - 9;
    if (SelectedEightObjects < 0) {
        SelectedEightObjects = 0;
    }
    CheckIfSelectedWindow();
    ShowAreaOf3DObject();
    ShowAreaOf3DObjectSmallWindows();
});

rangezoomnumber.addEventListener("change", function () {
    rangezoom.value = this.value;
    zoomen(this.value);
    rangezoom.value = 1;
    rangezoomnumber.value = 1;
    ShowAreaOf3DObject();
});
rangeperspectivenumber.addEventListener("change", function () {
    DistortionDistance = -this.value;
    rangeperspective.value = this.value;
    ShowAreaOf3DObject();
});
rangez1number.addEventListener("change", function () {
    if (RotateSelected) {
        AngleX = this.value;
        RotateAll();
        ShowAreaOf3DObject();
    } else if (MoveSelected) {
        MoveZ = this.value / 5;
        MoveAll();
        ShowAreaOf3DObject();
    } else if (ChangeSizeInOneDirectionSelected) {
        MoveZ = this.value / 5;
        ReduceSizeInOneDirection();
        ShowAreaOf3DObject();
    }
});
rangex1number.addEventListener("change", function () {
    if (RotateSelected) {
        AngleY = this.value;
        RotateAll();
        ShowAreaOf3DObject();
    } else if (MoveSelected) {
        MoveX = -this.value / 5;
        MoveAll();
        ShowAreaOf3DObject();
    } else if (ChangeSizeInOneDirectionSelected) {
        MoveX = this.value / 5;
        ReduceSizeInOneDirection();
        ShowAreaOf3DObject();
    }
});
rangez2number.addEventListener("change", function () {
    if (RotateSelected) {
        AngleX = -this.value;
        RotateAll();
        ShowAreaOf3DObject();
    } else if (MoveSelected) {
        MoveZ = -this.value / 5;
        MoveAll();
        ShowAreaOf3DObject();
    } else if (ChangeSizeInOneDirectionSelected) {
        MoveZ = this.value / 5;
        ReduceSizeInOneDirection();
        ShowAreaOf3DObject();
    }
});
rangey2number.addEventListener("change", function () {
    if (RotateSelected) {
        AngleZ = -this.value;
        RotateAll();
        ShowAreaOf3DObject();
    } else if (MoveSelected) {
        MoveY = this.value / 5;
        MoveAll();
        ShowAreaOf3DObject();
    } else if (ChangeSizeInOneDirectionSelected) {
        MoveY = this.value / 5;
        ReduceSizeInOneDirection();
        ShowAreaOf3DObject();
    }
});
rangex3number.addEventListener("change", function () {
    if (RotateSelected) {
        AngleZ = -this.value / 3;
        RotateAll();
        ShowAreaOf3DObject();
    } else if (MoveSelected) {
        MoveX = -this.value / 5;
        MoveAll();
        ShowAreaOf3DObject();
    } else if (ChangeSizeInOneDirectionSelected) {
        MoveX = this.value / 5;
        ReduceSizeInOneDirection();
        ShowAreaOf3DObject();
    }
});
rangey3number.addEventListener("change", function () {
    if (RotateSelected) {
        AngleX = this.value / 3;
        RotateAll();
        ShowAreaOf3DObject();
    } else if (MoveSelected) {
        MoveY = this.value / 5;
        MoveAll();
        ShowAreaOf3DObject();
    } else if (ChangeSizeInOneDirectionSelected) {
        MoveY = this.value / 5;
        ReduceSizeInOneDirection();
        ShowAreaOf3DObject();
    }
});

// rangezoom.addEventListener("mouseup", function() {this.value=1;})
// rangeperspective.addEventListener("mouseup", function() {this.value=1000;})
rangez1.addEventListener("mouseup", function () {
    this.value = 0;
});
rangex1.addEventListener("mouseup", function () {
    this.value = 0;
});
rangez2.addEventListener("mouseup", function () {
    this.value = 0;
});
rangey2.addEventListener("mouseup", function () {
    this.value = 0;
});
rangex3.addEventListener("mouseup", function () {
    this.value = 0;
});
rangey3.addEventListener("mouseup", function () {
    this.value = 0;
});

rangez1number.addEventListener("change", function () {
    this.value = 0;
});
rangex1number.addEventListener("change", function () {
    this.value = 0;
});
rangez2number.addEventListener("change", function () {
    this.value = 0;
});
rangey2number.addEventListener("change", function () {
    this.value = 0;
});
rangex3number.addEventListener("change", function () {
    this.value = 0;
});
rangey3number.addEventListener("change", function () {
    this.value = 0;
});

var rangeRed = document.querySelector("#ColorRed");
var rangeGreen = document.querySelector("#ColorGreen");
var rangeBlue = document.querySelector("#ColorBlue");
var rangeColors = document.getElementById("Colors");

// rangeRed.addEventListener("input", function() {SetColor(this.value, "red"); ShowAreaOf3DObject();})
// rangeGreen.addEventListener("input", function() {SetColor(this.value, "green"); ShowAreaOf3DObject();})
// rangeBlue.addEventListener("input", function() {SetColor(this.value, "blue"); ShowAreaOf3DObject();})
// rangeColors.addEventListener("input", function() {SetColor(this.value, "colors"); ShowAreaOf3DObject();}, false);
rangeColors.addEventListener(
    "change",
    function () {
        SetColor(this.value, "colors");
        ShowAreaOf3DObject();
    },
    false
);
rangeColors.select();
// rangeRed.addEventListener("mouseup", function() {this.value=0;})
// rangeGreen.addEventListener("mouseup", function() {this.value=0;})
// rangeBlue.addEventListener("mouseup", function() {this.value=0;})

var rangeRefractiveIndexOfMaterial = document.querySelector(
    "#RefractiveIndexOfMaterial"
);
var rangeRefractiveIndexOfMaterialNumber = document.querySelector(
    "#RefractiveIndexOfMaterialnumber"
);
var rangeSurfaceStructur = document.querySelector("#SurfaceStructur");
var rangeSurfaceStructurNumber = document.querySelector(
    "#SurfaceStructurnumber"
);
var rangePartOfDirectLight = document.querySelector("#PartOfDirectLight");
var rangePartOfDirectLightNumber = document.querySelector(
    "#PartOfDirectLightnumber"
);
var rangePartOfReflectlight = document.querySelector("#PartOfReflectlight");
var rangePartOfReflectlightNumber = document.querySelector(
    "#PartOfReflectlightnumber"
);
var rangePartOfRefractionlight = document.querySelector(
    "#PartOfRefractionlight"
);
var rangePartOfRefractionlightNumber = document.querySelector(
    "#PartOfRefractionlightnumber"
);
var rangePartSurrounding = document.querySelector("#PartSurrounding");
var rangePartSurroundingNumber = document.querySelector(
    "#PartSurroundingnumber"
);

rangeRefractiveIndexOfMaterial.addEventListener("mouseup", function () {
    SetPropertiesOfMaterial(this.value, "RefractiveIndexOfMaterial");
    rangeRefractiveIndexOfMaterialNumber.value = this.value;
    ShowAreaOf3DObject();
});
rangeRefractiveIndexOfMaterialNumber.addEventListener("change", function () {
    SetPropertiesOfMaterial(this.value, "RefractiveIndexOfMaterial");
    rangeRefractiveIndexOfMaterial.value = this.value;
    ShowAreaOf3DObject();
});
rangeSurfaceStructur.addEventListener("mouseup", function () {
    SetPropertiesOfMaterial(this.value, "SurfaceStructur");
    rangeSurfaceStructurNumber.value = this.value;
    ShowAreaOf3DObject();
});
rangeSurfaceStructurNumber.addEventListener("mouseup", function () {
    SetPropertiesOfMaterial(this.value, "SurfaceStructur");
    rangeSurfaceStructur.value = this.value;
    ShowAreaOf3DObject();
});
rangePartOfDirectLight.addEventListener("mouseup", function () {
    SetPropertiesOfMaterial(this.value, "PartOfDirectLight");
    rangePartOfDirectLightNumber.value = this.value;
    ShowAreaOf3DObject();
});
rangePartOfDirectLightNumber.addEventListener("mouseup", function () {
    SetPropertiesOfMaterial(this.value, "PartOfDirectLight");
    rangePartOfDirectLight.value = this.value;
    ShowAreaOf3DObject();
});
rangePartOfReflectlight.addEventListener("mouseup", function () {
    SetPropertiesOfMaterial(this.value, "PartOfReflectlight");
    rangePartOfReflectlightNumber.value = this.value;
    ShowAreaOf3DObject();
});
rangePartOfReflectlightNumber.addEventListener("mouseup", function () {
    SetPropertiesOfMaterial(this.value, "PartOfReflectlight");
    rangePartOfReflectlight.value = this.value;
    ShowAreaOf3DObject();
});
rangePartOfRefractionlight.addEventListener("mouseup", function () {
    SetPropertiesOfMaterial(this.value, "PartOfRefractionlight");
    rangePartOfRefractionlightNumber.value = this.value;
    ShowAreaOf3DObject();
});
rangePartOfRefractionlightNumber.addEventListener("mouseup", function () {
    SetPropertiesOfMaterial(this.value, "PartOfRefractionlight");
    rangePartOfRefractionlight.value = this.value;
    ShowAreaOf3DObject();
});
rangePartSurrounding.addEventListener("mouseup", function () {
    SetPropertiesOfMaterial(this.value, "PartSurrounding");
    rangePartSurroundingNumber.value = this.value;
    ShowAreaOf3DObject();
});
rangePartSurroundingNumber.addEventListener("mouseup", function () {
    SetPropertiesOfMaterial(this.value, "PartSurrounding");
    rangePartSurrounding.value = this.value;
    ShowAreaOf3DObject();
});
// rangeRefractiveIndexOfMaterial.addEventListener("mouseup", function() {this.value=0;})
// rangeSurfaceStructur.addEventListener("mouseup", function() {this.value=0;})
// rangePartOfDirectLight.addEventListener("mouseup", function() {this.value=0;})
// rangePartOfReflectlight.addEventListener("mouseup", function() {this.value=0;})
// rangePartOfRefractionlight.addEventListener("mouseup", function() {this.value=0;})
// rangePartSurrounding.addEventListener("mouseup", function() {this.value=0;})

CanvasObjectAll.addEventListener("click", ChangeFocusToCanvasAll);
CanvasObject0.addEventListener("click", ChangeFocusToCanvas0);
CanvasObject1.addEventListener("click", ChangeFocusToCanvas1);
CanvasObject2.addEventListener("click", ChangeFocusToCanvas2);
CanvasObject3.addEventListener("click", ChangeFocusToCanvas3);
CanvasObject4.addEventListener("click", ChangeFocusToCanvas4);
CanvasObject5.addEventListener("click", ChangeFocusToCanvas5);
CanvasObject6.addEventListener("click", ChangeFocusToCanvas6);
CanvasObject7.addEventListener("click", ChangeFocusToCanvas7);
CanvasObject8.addEventListener("click", ChangeFocusToCanvas8);

function ChangeFocusToCanvas(event) {
    CanvasFocus = true;
    CanvasTopFocus = false;
    CanvasSideFocus = false;
    CanvasFrontFocus = false;
}
function ChangeFocusToCanvasTop(event) {
    CanvasFocus = false;
    CanvasTopFocus = true;
    CanvasSideFocus = false;
    CanvasFrontFocus = false;
}
function ChangeFocusToCanvasSide(event) {
    CanvasFocus = false;
    CanvasTopFocus = false;
    CanvasSideFocus = true;
    CanvasFrontFocus = false;
}
function ChangeFocusToCanvasFront(event) {
    CanvasFocus = false;
    CanvasTopFocus = false;
    CanvasSideFocus = false;
    CanvasFrontFocus = true;
}
function ChangeFocusToCanvasAll(event) {
    if (CanvasObjectAll.style.border == "1px solid red") {
        UnSelectObject("all");
        CanvasObjectAll.style.border = "1px solid black";
    } else {
        SelectObject("all");
        CanvasObjectAll.style.border = "1px solid red";
    }
}
function ChangeFocusToCanvas0(event) {
    if (CanvasObject0.style.border == "1px solid red") {
        UnSelectObject(String(0 + SelectedEightObjects));
        CanvasObject0.style.border = "1px solid black";
    } else {
        if (CanvasObjectAll.style.border == "1px solid red") {
            UnSelectObject("all");
        }
        SelectObject(String(0 + SelectedEightObjects));
        CanvasObject0.style.border = "1px solid red";
    }
}
function ChangeFocusToCanvas1(event) {
    if (CanvasObject1.style.border == "1px solid red") {
        UnSelectObject(String(1 + SelectedEightObjects));
        CanvasObject1.style.border = "1px solid black";
    } else {
        if (CanvasObjectAll.style.border == "1px solid red") {
            UnSelectObject("all");
        }
        SelectObject(String(1 + SelectedEightObjects));
        CanvasObject1.style.border = "1px solid red";
    }
}
function ChangeFocusToCanvas2(event) {
    if (CanvasObject2.style.border == "1px solid red") {
        UnSelectObject(String(2 + SelectedEightObjects));
        CanvasObject2.style.border = "1px solid black";
    } else {
        if (CanvasObjectAll.style.border == "1px solid red") {
            UnSelectObject("all");
        }
        SelectObject(String(2 + SelectedEightObjects));
        CanvasObject2.style.border = "1px solid red";
    }
}
function ChangeFocusToCanvas3(event) {
    if (CanvasObject3.style.border == "1px solid red") {
        UnSelectObject(String(3 + SelectedEightObjects));
        CanvasObject3.style.border = "1px solid black";
    } else {
        if (CanvasObjectAll.style.border == "1px solid red") {
            UnSelectObject("all");
        }
        SelectObject(String(3 + SelectedEightObjects));
        CanvasObject3.style.border = "1px solid red";
    }
}
function ChangeFocusToCanvas4(event) {
    if (CanvasObject4.style.border == "1px solid red") {
        UnSelectObject(String(4 + SelectedEightObjects));
        CanvasObject4.style.border = "1px solid black";
    } else {
        if (CanvasObjectAll.style.border == "1px solid red") {
            UnSelectObject("all");
        }
        SelectObject(String(4 + SelectedEightObjects));
        CanvasObject4.style.border = "1px solid red";
    }
}
function ChangeFocusToCanvas5(event) {
    if (CanvasObject5.style.border == "1px solid red") {
        UnSelectObject(String(5 + SelectedEightObjects));
        CanvasObject5.style.border = "1px solid black";
    } else {
        if (CanvasObjectAll.style.border == "1px solid red") {
            UnSelectObject("all");
        }
        SelectObject(String(5 + SelectedEightObjects));
        CanvasObject5.style.border = "1px solid red";
    }
}
function ChangeFocusToCanvas6(event) {
    if (CanvasObject6.style.border == "1px solid red") {
        UnSelectObject(String(6 + SelectedEightObjects));
        CanvasObject6.style.border = "1px solid black";
    } else {
        if (CanvasObjectAll.style.border == "1px solid red") {
            UnSelectObject("all");
        }
        SelectObject(String(6 + SelectedEightObjects));
        CanvasObject6.style.border = "1px solid red";
    }
}
function ChangeFocusToCanvas7(event) {
    if (CanvasObject7.style.border == "1px solid red") {
        UnSelectObject(String(7 + SelectedEightObjects));
        CanvasObject7.style.border = "1px solid black";
    } else {
        if (CanvasObjectAll.style.border == "1px solid red") {
            UnSelectObject("all");
        }
        SelectObject(String(7 + SelectedEightObjects));
        CanvasObject7.style.border = "1px solid red";
    }
}
function ChangeFocusToCanvas8(event) {
    if (CanvasObject8.style.border == "1px solid red") {
        UnSelectObject(String(8 + SelectedEightObjects));
        CanvasObject8.style.border = "1px solid black";
    } else {
        if (CanvasObjectAll.style.border == "1px solid red") {
            UnSelectObject("all");
        }
        SelectObject(String(8 + SelectedEightObjects));
        CanvasObject8.style.border = "1px solid red";
    }
}

function mousemoveevent(event) {
    mousePos = getMousePos(Canvas, event);
    if (ShiftPressed == true && NumberOfPoints > 0) {
        if (Math.abs(mousePos.y - oldkoory) < Math.abs(mousePos.x - oldkoorx)) {
            mousePos.y = oldkoory;
        } else {
            mousePos.x = oldkoorx;
        }
    }
    ShowMousemove();
}
function mousedownevent(event) {
    AddMousePosition();
}
function RightMouseClickEvent(event) {
    event.preventDefault();
    KeyPressed = 1;
    CheckIfAllPointsWereEntered();
}
function keyUpevent(event) {
    window.removeEventListener("keyup", keyUpevent);
    window.addEventListener("keydown", keydownevent);
    ShiftPressed = false;
}
function keydownevent(event) {
    switch (event.keyCode) {
        case 16: // "shift" key
            if (KeyPressed != 1 && ShiftPressed == false) {
                window.addEventListener("keyup", keyUpevent);
                window.removeEventListener("keydown", keydownevent);
                ShiftPressed = true;
            }
            break;
        case 33: // "page up" key
            if (EnterObjectPoints == true) {
                if (KeyPressed != 1) {
                    KeyPressed = 1;
                    CheckIfAllPointsWereEntered();
                }
                CloneAreaValues(AreaOriginal, Area);
                NumberOfCompleteObjects--;
                DeleteObject(NumberOfCompleteObjects);
                NumberOfRotationSegments++;
                // clearScreen();
                if (NumberOfRotationSegments > MaxNbOfRotSegments) {
                    NumberOfRotationSegments = MaxNbOfRotSegments;
                }
                CreateRotationObject();
                UnSelectAll();
                SelectObject(NumberOfCompleteObjects);
                NumberOfCompleteObjects++;
                // CopyObject(NumberOfCompleteObjects);
            }
            break;
        case 34: // "page down" key
            if (EnterObjectPoints == true) {
                if (KeyPressed != 1) {
                    KeyPressed = 1;
                    CheckIfAllPointsWereEntered();
                }
                CloneAreaValues(AreaOriginal, Area);
                NumberOfCompleteObjects--;
                DeleteObject(NumberOfCompleteObjects);
                NumberOfRotationSegments--;
                // clearScreen();
                if (NumberOfRotationSegments < 2) {
                    NumberOfRotationSegments = 2;
                }
                CreateRotationObject();
                UnSelectAll();
                SelectObject(NumberOfCompleteObjects);
                NumberOfCompleteObjects++;
                // CopyObject(NumberOfCompleteObjects);
            }
            break;
        case 86: // "v" key
            Perspective = 1 - Perspective;
            RotateAll();
            // ApplyPerspectiveDistortionIfRequired();
            // Show3dObject();
            ShowAreaOf3DObject();
            break;
        case 54: // "6" key
        case 102:
            NumberOfRotationsX = 1;
            AngleX = NumberOfRotationsX * increment;
            AngleY = 0;
            AngleZ = 0;
            RotateAll();
            // ApplyPerspectiveDistortionIfRequired();
            // Show3dObject();
            ShowAreaOf3DObject();
            break;
        case 52: // "4" key
        case 100:
            NumberOfRotationsX = -1;
            AngleX = NumberOfRotationsX * increment;
            AngleY = 0;
            AngleZ = 0;
            RotateAll();
            // ApplyPerspectiveDistortionIfRequired();
            // Show3dObject();
            ShowAreaOf3DObject();
            break;
        case 56: // "8" key
        case 104:
            NumberOfRotationsY = 1;
            AngleY = NumberOfRotationsY * increment;
            AngleX = 0;
            AngleZ = 0;
            RotateAll();
            // ApplyPerspectiveDistortionIfRequired();
            // Show3dObject();
            ShowAreaOf3DObject();
            break;
        case 50: // "2" key
        case 98:
            NumberOfRotationsY = -1;
            AngleY = NumberOfRotationsY * increment;
            AngleX = 0;
            AngleZ = 0;
            RotateAll();
            // ApplyPerspectiveDistortionIfRequired();
            // Show3dObject();
            ShowAreaOf3DObject();
            break;
        case 49: // "1" key
        case 97:
            NumberOfRotationsZ = 1;
            AngleZ = NumberOfRotationsZ * increment;
            AngleX = 0;
            AngleY = 0;
            RotateAll();
            // ApplyPerspectiveDistortionIfRequired();
            // Show3dObject();
            ShowAreaOf3DObject();
            break;
        case 57: // "9" key
        case 105:
            NumberOfRotationsZ = -1;
            AngleZ = NumberOfRotationsZ * increment;
            AngleX = 0;
            AngleY = 0;
            RotateAll();
            // ApplyPerspectiveDistortionIfRequired();
            // Show3dObject();
            ShowAreaOf3DObject();
            break;
        case 68: // "d" key
            DrawingMethod = DrawingMethod + 1;
            if (DrawingMethod > 3) {
                DrawingMethod = 0;
            }
            ShowAreaOf3DObject();
            break;
        case 82: // "r" key
            if (RayTracingStarted == true) {
                // setTimeout(function() {StopRayTracing();},0);
                var x = setTimeout('alert("x");', 0); //It is very low probability that after 100000 seconds x timeout will not be cleared
                for (var i = 0; i <= x; i++) clearTimeout(i);
                RayTracingStarted = false;
                RayTracingCompleted = true;
                setTimeout(function () {
                    document.title = "Calculation stopped";
                }, 0);
                RemoveSurroundingBox();
            } else RayTracingStart();
            break;
        case 81: // "q"	key
            if (Resolution < StandardResolution * 100) {
                Resolution = Resolution * 2;
            } else {
                Resolution = StandardResolution;
            }
            setTimeout(function () {
                document.title = "Resolution set to: " + Resolution;
            }, 0);
            break;
        case 83: // "s" key
            SaveAsImage();
            break;
        case 75: // "k" key
            SaveAreaObject();
            break;
        case 76: // "l" key
            LoadAreaObject();
            break;
        case 67: // "c" key
            CreateCube();
            break;
        case 80: // "p" key
            CreateWall();
            break;
        case 77: // "m" key
            CreateSphere();
            break;
        case 78: // "n" key
            CreateWaves();
            break;
        case 70: // "f" key
            MoveX = 1;
            MoveAll();
            ShowAreaOf3DObject();
            break;
        case 71: // "g" key
            MoveX = -1;
            MoveAll();
            ShowAreaOf3DObject();
            break;
        case 72: // "h" key
            MoveY = 1;
            MoveAll();
            ShowAreaOf3DObject();
            break;
        case 73: // "i" key
            MoveY = -1;
            MoveAll();
            ShowAreaOf3DObject();
            break;
        case 89: // "y" key
            MoveZ = 1;
            MoveAll();
            ShowAreaOf3DObject();
            break;
        case 90: // "z" key
            MoveZ = -1;
            MoveAll();
            ShowAreaOf3DObject();
            break;
        case 88: // "x" key
            BezierBernsteinApproximation();
            zoomen(1.02);
            break;
        case 32: // "space" key
            for (var i = 0; i < AreaIndex; i++) {
                if (SelectedArea[i] == true)
                    AreaConstants.items[i].RoundedEdges =
                        1 - AreaConstants.items[i].RoundedEdges;
            }
            break;
    }
}

function StopRayTracing() {
    var x = setTimeout('alert("x");', 0); //It is very low probability that after 100000 seconds x timeout will not be cleared
    for (var i = 0; i <= x; i++) clearTimeout(i);
    RayTracingStarted = false;
}

function RayTracingStart() {
    RayTracingCompleted = false;
    RayTracingStarted = true;
    setTimeout(function () {
        document.title = "Starting calculation...";
        var tempTime = new Date();
        StartTime = tempTime.getTime();
        console.log("Start time: " + StartTime);
    }, 0);
    // ApplyPerspectiveDistortionForArea();
    CheckForSurroundingBox();
    PrepareConstants();
    RayTracing();

    var StopCalculation = setInterval(function () {
        if (RayTracingCompleted == true) {
            var tempTime = new Date();
            document.title =
                "Calculation finished. (" +
                (tempTime.getTime() - StartTime) / 1000 +
                "s)";
            console.log("End time: " + tempTime.getTime());
            console.log(
                "Total calculation time: " +
                    (tempTime.getTime() - StartTime) / 1000 +
                    "s"
            );
            // alert("Total calculation time: " + (tempTime.getTime() - StartTime) / 1000 +"s)");
            docTitle = 0;
            RayTracingStarted = false;
            RayTracingCompleted = false;
            //DeleteObject(AreaBelongsToObject[SurroundingBoxAreas[0]]);
            RemoveSurroundingBox();
            clearInterval(StopCalculation);
        }
    }, 5000);
}

function RayTracingStart2K() {
    RayTracingCompleted = false;
    setTimeout(function () {
        document.title = "Starting calculation...";
        var tempTime = new Date();
        StartTime = tempTime.getTime();
    }, 0);
    // ApplyPerspectiveDistortionForArea();

    setTimeout(function () {
        Image2K = true;
        // Canvas2K.style.zIndex = 100000;
        // var CanvasOriginal = Canvas;

        // Canvas = document.getElementById("Canvas2K");
        // rect = Canvas.getBoundingClientRect();

        // Canvas.width = rect2K.width;
        // Canvas.height = rect2K.height;
        // Canvas.left = rect2K.left;
        // Canvas.top = rect2K.top;
        // DrawingContext = Canvas.getContext("2d");
        // DrawingContext.scale(1, 1);

        // width = Canvas2K.width;
        // height = Canvas2K.height
    }, 0);

    setTimeout(function () {
        // SelectObject("all");
        /* zoomen(width/Canvas.width);  */
        ZoomFaktor = Canvas2K.width / Canvas.width;
        // ApplyPerspectiveDistortionForArea();
    }, 3);

    setTimeout(function () {
        CheckForSurroundingBox();
        PrepareConstants();
        RayTracing();
    }, 5);

    var StopCalculation = setInterval(function () {
        if (RayTracingCompleted == true) {
            SaveAsImage();
            // SelectObject("all");
            // zoomen(Canvas.width/width);
            ZoomFaktor = 1;

            Image2K = false;
            // width = Canvas.width;
            // height = Canvas.height

            // Canvas = document.getElementById("Canvas");
            // rect = Canvas.getBoundingClientRect();

            // Canvas.width = rect.width;
            // Canvas.height = rect.height;
            // Canvas.left = rect.left;
            // Canvas.top = rect.left;
            // DrawingContext = Canvas.getContext("2d");
            // DrawingContext.scale(1, 1);
            ShowAreaOf3DObject();
            ShowAreaOf3DObjectSmallWindows();
            RayTracingCompleted = false;
            clearInterval(StopCalculation);
        }
    }, 5000);

    setTimeout(function () {
        var tempTime = new Date();
        document.title =
            "Calculation finished. (" +
            (tempTime.getTime() - StartTime) / 1000 +
            "s and 2K-Image saved)";
        docTitle = 0;
    }, 10000);
}

function RemoveSurroundingBox() {
    NumberOfCompleteObjects--;
    AreaIndex = AreaIndex - 12;
}

function CheckIfAllPointsWereEntered() {
    if (
        NumberOfPoints >= 2 &&
        (NumberOfPoints > MaxNumberOfPoints || KeyPressed == 1)
    ) {
        clearScreen();
        ShowAxesAndEnteredPoints();
        drawLine(
            PointCoordinatesArray.items[NumberOfPoints - 1][0] + width / 2,
            height / 2 - PointCoordinatesArray.items[NumberOfPoints - 1][1],
            PointCoordinatesArray.items[0][0] + width / 2,
            height / 2 - PointCoordinatesArray.items[0][1],
            1,
            DrawingContextFront,
            "#000000"
        );
        window.removeEventListener("mousemove", mousemoveevent);
        window.removeEventListener("mousedown", mousedownevent);
        window.removeEventListener("contextmenu", RightMouseClickEvent);
        //window.removeEventListener('keydown',keydownevent);
        TotalEnteredPoints = NumberOfPoints;
        CreateRotationObject();
        NumberOfCompleteObjects++;
        document.getElementById("CreateNewObjectMenu").style.display = "block";
        document.getElementById("StopCreateNewObject").style.display = "none";
        RemoveEmptyObjectNumbers();
        RemoveEmptyObjectNumbers();
        UnhideAllExceptFrontView();
    } else {
        KeyPressed = 0;
    }
}

function UnhideAllExceptFrontView() {
    CanvasTop.hidden = false;
    CanvasSide.hidden = false;
    Canvas.hidden = false;
    zoom.hidden = false;
    zoomnumber.hidden = false;
    perspective.hidden = false;
    perspectivenumber.hidden = false;
    rangex1.hidden = false;
    rangex1number.hidden = false;
    rangez1.hidden = false;
    rangez1number.hidden = false;
    rangez2.hidden = false;
    rangez2number.hidden = false;
    rangey2.hidden = false;
    rangey2number.hidden = false;
    rangex3.hidden = false;
    rangex3number.hidden = false;
    rangey3.hidden = false;
    rangey3number.hidden = false;
}

function ShowMousemove() {
    if (NumberOfPoints == 0) {
        oldx = mousePos.x;
        oldy = mousePos.y;
    } else {
        if (mousePos.x != oldx || mousePos.y != oldy) {
            drawLine(
                oldkoorx,
                oldkoory,
                oldx,
                oldy,
                3,
                DrawingContextFront,
                "#FFFFFF"
            );
            drawLine(
                oldkoorx,
                oldkoory,
                mousePos.x,
                mousePos.y,
                1,
                DrawingContextFront,
                "#000000"
            );
            oldx = mousePos.x;
            oldy = mousePos.y;
        }
    }
    ShowAxesAndEnteredPoints();
}

function AddMousePosition() {
    // if (CanvasFocus == true) drawText(30, 30, ((mousePos.x - Canvas.left) +" / "+(mousePos.y - Canvas.top)), DrawingContext,"#000000","left");
    // if (CanvasTopFocus == true) drawText(30, 30, ((mousePos.x - CanvasTop.left) +" / "+(mousePos.y - CanvasTop.top)), DrawingContextTop,"#000000","left");
    // if (CanvasSideFocus == true) drawText(30, 30, ((mousePos.x - CanvasSide.left) +" / "+(mousePos.y - CanvasSide.top)), DrawingContextSide,"#000000","left");
    // if (CanvasFrontFocus == true) drawText(30, 30, ((mousePos.x - CanvasFront.left) +" / "+(mousePos.y - CanvasFront.top)), DrawingContextFront,"#000000","left");
    if (
        mousePos.x < CanvasFront.width &&
        mousePos.x > 0 &&
        mousePos.y < CanvasFront.height &&
        mousePos.y > 0
    ) {
        PointCoordinatesArray.items[NumberOfPoints][0] = mousePos.x - width / 2;
        PointCoordinatesArray.items[NumberOfPoints][1] =
            height / 2 - mousePos.y;
        PointCoordinatesArray.items[NumberOfPoints][2] = 0;
        oldkoorx = mousePos.x;
        oldkoory = mousePos.y;
        NumberOfPoints = NumberOfPoints + 1;
        ShowAxesAndEnteredPoints();
        CheckIfAllPointsWereEntered();
    }
}

function ShowAxesAndEnteredPoints() {
    for (i = 0; i < 1; i++) {
        drawLine(width / 2, 0, width / 2, height, 1, DrawingContext, "#000000");
        drawLine(
            0,
            height / 2,
            width,
            height / 2,
            1,
            DrawingContext,
            "#000000"
        );
        drawText(10, 15, "Perspective", DrawingContext, "#000000", "left");
        for (i = 0; i < NumberOfPoints; i++) {
            var x1 = PointCoordinatesArray.items[i][0] + width / 2;
            var y1 = height / 2 - PointCoordinatesArray.items[i][1];
            if (i >= 1) {
                var x2 = PointCoordinatesArray.items[i - 1][0] + width / 2;
                var y2 = height / 2 - PointCoordinatesArray.items[i - 1][1];
                drawLine(x1, y1, x2, y2, 1, DrawingContext, "#000000");
            }
            drawText(
                x1 + 10,
                y1 + 10,
                i + 1,
                DrawingContext,
                "#000000",
                "left"
            );
        }
    }

    for (i = 0; i < 1; i++) {
        drawLine(
            width / 2,
            0,
            width / 2,
            height,
            1,
            DrawingContextTop,
            "#000000"
        );
        drawLine(
            0,
            height / 2,
            width,
            height / 2,
            1,
            DrawingContextTop,
            "#000000"
        );
        drawText(10, 15, "Top", DrawingContextTop, "#000000", "left");
        for (i = 0; i < NumberOfPoints; i++) {
            var x1 = PointCoordinatesArray.items[i][0] + width / 2;
            var z1 = height / 2 - PointCoordinatesArray.items[i][2];
            if (i >= 1) {
                var x2 = PointCoordinatesArray.items[i - 1][0] + width / 2;
                var z2 = height / 2 - PointCoordinatesArray.items[i - 1][2];
                drawLine(x1, z1, x2, z2, 1, DrawingContextTop, "#000000");
            }
            drawText(
                x1 + 10,
                z1 + 10,
                i + 1,
                DrawingContextTop,
                "#000000",
                "left"
            );
        }
    }

    for (i = 0; i < 1; i++) {
        drawLine(
            width / 2,
            0,
            width / 2,
            height,
            1,
            DrawingContextSide,
            "#000000"
        );
        drawLine(
            0,
            height / 2,
            width,
            height / 2,
            1,
            DrawingContextSide,
            "#000000"
        );
        drawText(10, 15, "Side", DrawingContextSide, "#000000", "left");
        for (i = 0; i < NumberOfPoints; i++) {
            var y1 = PointCoordinatesArray.items[i][1] + width / 2;
            var z1 = height / 2 - PointCoordinatesArray.items[i][2];
            if (i >= 1) {
                var y2 = PointCoordinatesArray.items[i - 1][1] + width / 2;
                var z2 = height / 2 - PointCoordinatesArray.items[i - 1][2];
                drawLine(z1, y1, z2, y2, 1, DrawingContextSide, "#000000");
            }
            drawText(
                z1 + 10,
                y1 + 10,
                i + 1,
                DrawingContextSide,
                "#000000",
                "left"
            );
        }
    }

    for (i = 0; i < 1; i++) {
        drawLine(
            width / 2,
            0,
            width / 2,
            height,
            1,
            DrawingContextFront,
            "#ff0000"
        );
        drawLine(
            0,
            height / 2,
            width,
            height / 2,
            1,
            DrawingContextFront,
            "#ff0000"
        );
        drawText(10, 15, "Front", DrawingContextFront, "#ff0000", "left");
        for (i = 0; i < NumberOfPoints; i++) {
            var x1 = PointCoordinatesArray.items[i][0] + width / 2;
            var y1 = height / 2 - PointCoordinatesArray.items[i][1];
            if (i >= 1) {
                var x2 = PointCoordinatesArray.items[i - 1][0] + width / 2;
                var y2 = height / 2 - PointCoordinatesArray.items[i - 1][1];
                drawLine(x1, y1, x2, y2, 1, DrawingContextFront, "#000000");
            }
            drawText(
                x1 + 10,
                y1 + 10,
                i + 1,
                DrawingContextFront,
                "#000000",
                "left"
            );
        }
    }
    //drawCircle(width/2,200,200,0,360,1,DrawingContext,"#000000",false);
}

function CreateRotationObject() {
    for (i = 0; i < NumberOfRotationSegments; i++) {
        var s = Math.sin(((2 * Math.PI) / NumberOfRotationSegments) * i);
        var c = Math.cos(((2 * Math.PI) / NumberOfRotationSegments) * i);

        for (j = 0; j < TotalEnteredPoints; j++) {
            OriginPointCoords.items[i][j][0] =
                PointCoordinatesArray.items[j][0] * c;
            Points.items[i][j][0] = OriginPointCoords.items[i][j][0];

            OriginPointCoords.items[i][j][1] =
                PointCoordinatesArray.items[j][1];
            Points.items[i][j][1] = OriginPointCoords.items[i][j][1];

            OriginPointCoords.items[i][j][2] = -(
                PointCoordinatesArray.items[j][0] * s
            );
            Points.items[i][j][2] = OriginPointCoords.items[i][j][2];
        }
    }
    // Rotation();
    // ApplyPerspectiveDistortionIfRequired();
    // Show3dObject();
    Build3PointsAreasFrom3DPoints();
    ShowAreaOf3DObject();
    ShowAreaOf3DObjectSmallWindows();
}

function Show3dObject() {
    // Rotation();
    // Perspective = 1;
    // ApplyPerspectiveDistortionIfRequired();

    clearScreen();
    drawLine(width / 2, 0, width / 2, height, 1, DrawingContext, "#aaaaaa");
    drawLine(0, height / 2, width, height / 2, 1, DrawingContext, "#aaaaaa");
    drawText(10, 15, "Perspective", DrawingContext, "#000000", "left");

    // var TempPointX = new Array2D(MaxNbOfRotSegments,MaxNumberOfPoints);
    // var TempPointY = new Array2D(MaxNbOfRotSegments,MaxNumberOfPoints);

    // for (i = 0; i < NumberOfRotationSegments; i++)
    // {
    // for (j = 0; j < TotalEnteredPoints; j++)
    // {
    // TempPointX.items[i][j] = width/2-Points.items[i][j][0];
    // TempPointY.items[i][j] = height/2-Points.items[i][j][1];
    // if (j > 0) {drawLine(TempPointX.items[i][j-1], TempPointY.items[i][j-1], TempPointX.items[i][j], TempPointY.items[i][j], 1,DrawingContext,"#000000");}
    // if (i > 0) {drawLine(TempPointX.items[i][j], TempPointY.items[i][j], TempPointX.items[i-1][j], TempPointY.items[i-1][j], 1,DrawingContext,"#000000");}
    // }
    // }
    // for (j = 0; j < TotalEnteredPoints; j++)
    // {
    // drawLine(TempPointX.items[0][j], TempPointY.items[0][j], TempPointX.items[NumberOfRotationSegments-1][j], TempPointY.items[NumberOfRotationSegments-1][j], 1, DrawingContext,"#000000");
    // }

    // Rotation();
    // Perspective = 0;
    // ApplyPerspectiveDistortionIfRequired();

    drawLine(width / 2, 0, width / 2, height, 1, DrawingContextTop, "#aaaaaa");
    drawLine(0, height / 2, width, height / 2, 1, DrawingContextTop, "#aaaaaa");
    drawText(10, 15, "Top", DrawingContextTop, "#000000", "left");

    var TempPointX = new Array2D(MaxNbOfRotSegments, MaxNumberOfPoints);
    var TempPointZ = new Array2D(MaxNbOfRotSegments, MaxNumberOfPoints);

    for (i = 0; i < NumberOfRotationSegments; i++) {
        for (j = 0; j < TotalEnteredPoints; j++) {
            TempPointX.items[i][j] = width / 2 - Points.items[i][j][0];
            TempPointZ.items[i][j] = height / 2 - Points.items[i][j][2];
            if (j > 0) {
                drawLine(
                    TempPointX.items[i][j - 1],
                    TempPointZ.items[i][j - 1],
                    TempPointX.items[i][j],
                    TempPointZ.items[i][j],
                    1,
                    DrawingContextTop,
                    "#000000"
                );
            }
            if (i > 0) {
                drawLine(
                    TempPointX.items[i][j],
                    TempPointZ.items[i][j],
                    TempPointX.items[i - 1][j],
                    TempPointZ.items[i - 1][j],
                    1,
                    DrawingContextTop,
                    "#000000"
                );
            }
        }
    }
    for (j = 0; j < TotalEnteredPoints; j++) {
        drawLine(
            TempPointX.items[0][j],
            TempPointZ.items[0][j],
            TempPointX.items[NumberOfRotationSegments - 1][j],
            TempPointZ.items[NumberOfRotationSegments - 1][j],
            1,
            DrawingContextTop,
            "#000000"
        );
    }

    drawLine(width / 2, 0, width / 2, height, 1, DrawingContextSide, "#aaaaaa");
    drawLine(
        0,
        height / 2,
        width,
        height / 2,
        1,
        DrawingContextSide,
        "#aaaaaa"
    );
    drawText(10, 15, "Side", DrawingContextSide, "#000000", "left");

    var TempPointY = new Array2D(MaxNbOfRotSegments, MaxNumberOfPoints);
    var TempPointZ = new Array2D(MaxNbOfRotSegments, MaxNumberOfPoints);

    for (i = 0; i < NumberOfRotationSegments; i++) {
        for (j = 0; j < TotalEnteredPoints; j++) {
            TempPointZ.items[i][j] = width / 2 - Points.items[i][j][2];
            TempPointY.items[i][j] = height / 2 - Points.items[i][j][1];
            if (j > 0) {
                drawLine(
                    TempPointZ.items[i][j - 1],
                    TempPointY.items[i][j - 1],
                    TempPointZ.items[i][j],
                    TempPointY.items[i][j],
                    1,
                    DrawingContextSide,
                    "#000000"
                );
            }
            if (i > 0) {
                drawLine(
                    TempPointZ.items[i][j],
                    TempPointY.items[i][j],
                    TempPointZ.items[i - 1][j],
                    TempPointY.items[i - 1][j],
                    1,
                    DrawingContextSide,
                    "#000000"
                );
            }
        }
    }
    for (j = 0; j < TotalEnteredPoints; j++) {
        drawLine(
            TempPointZ.items[0][j],
            TempPointY.items[0][j],
            TempPointZ.items[NumberOfRotationSegments - 1][j],
            TempPointY.items[NumberOfRotationSegments - 1][j],
            1,
            DrawingContextSide,
            "#000000"
        );
    }

    drawLine(
        width / 2,
        0,
        width / 2,
        height,
        1,
        DrawingContextFront,
        "#aaaaaa"
    );
    drawLine(
        0,
        height / 2,
        width,
        height / 2,
        1,
        DrawingContextFront,
        "#aaaaaa"
    );
    drawText(10, 15, "Front", DrawingContextFront, "#000000", "left");

    var TempPointX = new Array2D(MaxNbOfRotSegments, MaxNumberOfPoints);
    var TempPointY = new Array2D(MaxNbOfRotSegments, MaxNumberOfPoints);

    for (i = 0; i < NumberOfRotationSegments; i++) {
        for (j = 0; j < TotalEnteredPoints; j++) {
            TempPointX.items[i][j] = width / 2 - Points.items[i][j][0];
            TempPointY.items[i][j] = height / 2 - Points.items[i][j][1];
            if (j > 0) {
                drawLine(
                    TempPointX.items[i][j - 1],
                    TempPointY.items[i][j - 1],
                    TempPointX.items[i][j],
                    TempPointY.items[i][j],
                    1,
                    DrawingContextFront,
                    "#000000"
                );
            }
            if (i > 0) {
                drawLine(
                    TempPointX.items[i][j],
                    TempPointY.items[i][j],
                    TempPointX.items[i - 1][j],
                    TempPointY.items[i - 1][j],
                    1,
                    DrawingContextFront,
                    "#000000"
                );
            }
        }
    }
    for (j = 0; j < TotalEnteredPoints; j++) {
        drawLine(
            TempPointX.items[0][j],
            TempPointY.items[0][j],
            TempPointX.items[NumberOfRotationSegments - 1][j],
            TempPointY.items[NumberOfRotationSegments - 1][j],
            1,
            DrawingContextFront,
            "#000000"
        );
    }

    //BuildAreasFrom3DPoints();

    DrawingMethod = 1;
    // Rotation();
    // Perspective = 1;
    // ApplyPerspectiveDistortionIfRequired();

    Build3PointsAreasFrom3DPoints();
    ShowAreaOf3DObject();
    ShowAreaOf3DObjectSmallWindows();
}

function ApplyPerspectiveDistortionIfRequired() {
    var DistortionDistance = -1000;
    for (i = 0; i < NumberOfRotationSegments; i++) {
        for (j = 0; j < TotalEnteredPoints; j++) {
            if (Perspective == 1) {
                // x' = x / ((z+d)+1)
                Points.items[i][j][0] =
                    Points.items[i][j][0] /
                    (Points.items[i][j][2] / DistortionDistance + 1);
                // y' = y / ((z+d)+1)
                Points.items[i][j][1] =
                    Points.items[i][j][1] /
                    (Points.items[i][j][2] / DistortionDistance + 1);
            } else {
                Points.items[i][j][0] = Points.items[i][j][0];
                Points.items[i][j][1] = Points.items[i][j][1];
            }
        }
    }
}

function ApplyPerspectiveDistortionForArea() {
    // var DistortionDistance = -1000;
    CloneAreaValues(AreaOriginal, Area);
    for (i = 0; i < AreaIndex; i++) {
        for (j = 0; j < 3; j++) {
            Area.items[i][j][0] =
                Area.items[i][j][0] /
                (Area.items[i][j][2] / DistortionDistance + 1);
            Area.items[i][j][1] =
                Area.items[i][j][1] /
                (Area.items[i][j][2] / DistortionDistance + 1);
        }
    }
}

function Rotation() {
    var RadFromGrad = (2 * Math.PI) / 360;
    for (i = 0; i < NumberOfRotationSegments; i++) {
        for (j = 0; j < TotalEnteredPoints; j++) {
            // Rotation around X
            var y_rot =
                OriginPointCoords.items[i][j][1] *
                    Math.cos(RadFromGrad * AngleX) -
                OriginPointCoords.items[i][j][2] *
                    Math.sin(RadFromGrad * AngleX);
            var z_rot =
                OriginPointCoords.items[i][j][1] *
                    Math.sin(RadFromGrad * AngleX) +
                OriginPointCoords.items[i][j][2] *
                    Math.cos(RadFromGrad * AngleX);
            Points.items[i][j][0] = OriginPointCoords.items[i][j][0];
            Points.items[i][j][1] = y_rot;
            Points.items[i][j][2] = z_rot;

            // Rotation around Y
            var x_rot =
                Points.items[i][j][0] * Math.cos(RadFromGrad * AngleY) +
                Points.items[i][j][2] * Math.sin(RadFromGrad * AngleY);
            var z_rot =
                -Points.items[i][j][0] * Math.sin(RadFromGrad * AngleY) +
                Points.items[i][j][2] * Math.cos(RadFromGrad * AngleY);
            Points.items[i][j][0] = x_rot;
            Points.items[i][j][2] = z_rot;

            // Rotation around Z
            var x_rot =
                Points.items[i][j][0] * Math.cos(RadFromGrad * AngleZ) -
                Points.items[i][j][1] * Math.sin(RadFromGrad * AngleZ);
            var y_rot =
                Points.items[i][j][0] * Math.sin(RadFromGrad * AngleZ) +
                Points.items[i][j][1] * Math.cos(RadFromGrad * AngleZ);
            Points.items[i][j][0] = x_rot;
            Points.items[i][j][1] = y_rot;
        }
    }
}

function MoveAll() {
    //if (MoveLight.items[0] == true || MoveLight.items[1] == true || MoveLight.items[2] == true || MoveLight.items[3] == true || MoveLight.items[4] == true || MoveLight.items[5] == true || MoveLight.items[6] == true || MoveLight.items[7] == true || MoveLight.items[8] == true || MoveLight.items[9] == true)
    //{
    //for (lamp = 0; lamp < 5; lamp++)
    //{
    //if (MoveLight.items[lamp] == true)
    //{
    //LightSourceX.items[lamp] = LightSourceX.items[lamp] + MoveX;
    //LightSourceY.items[lamp] = LightSourceY.items[lamp] + MoveY;
    //LightSourceZ.items[lamp] = LightSourceZ.items[lamp] + MoveZ;
    //}
    //}
    //}
    //else
    //{
    CloneAreaValues(AreaOriginal, Area);
    for (i = 0; i < AreaIndex; i++) {
        if (SelectedArea[i] == true) {
            for (j = 0; j < 3; j++) {
                Area.items[i][j][0] = Area.items[i][j][0] + MoveX;
                Area.items[i][j][1] = Area.items[i][j][1] + MoveY;
                Area.items[i][j][2] = Area.items[i][j][2] + MoveZ;
            }
        }
    }
    for (lamp = 0; lamp < 5; lamp++) {
        if (MoveLight.items[lamp] == true) {
            LightSourceX.items[lamp] = LightSourceX.items[lamp] + MoveX;
            LightSourceY.items[lamp] = LightSourceY.items[lamp] + MoveY;
            LightSourceZ.items[lamp] = LightSourceZ.items[lamp] + MoveZ;
        }
    }
    CloneAreaValues(Area, AreaOriginal);
    //}
    MoveX = 0;
    MoveY = 0;
    MoveZ = 0;
}

function RotateAll() {
    var RadFromGrad = (2 * Math.PI) / 360;
    var AreaRotate = new Array3D(maxarea, 4, 3);
    CloneAreaValues(AreaOriginal, AreaRotate);
    for (i = 0; i < AreaIndex; i++) {
        if (SelectedArea[i] == true) {
            for (j = 0; j < 3; j++) {
                // Rotation around X
                var y_rot =
                    AreaOriginal.items[i][j][1] *
                        Math.cos(RadFromGrad * AngleX) -
                    AreaOriginal.items[i][j][2] *
                        Math.sin(RadFromGrad * AngleX);
                var z_rot =
                    AreaOriginal.items[i][j][1] *
                        Math.sin(RadFromGrad * AngleX) +
                    AreaOriginal.items[i][j][2] *
                        Math.cos(RadFromGrad * AngleX);
                AreaRotate.items[i][j][0] = AreaOriginal.items[i][j][0];
                AreaRotate.items[i][j][1] = y_rot;
                AreaRotate.items[i][j][2] = z_rot;

                // Rotation around Y
                var x_rot =
                    AreaRotate.items[i][j][0] * Math.cos(RadFromGrad * AngleY) +
                    AreaRotate.items[i][j][2] * Math.sin(RadFromGrad * AngleY);
                var z_rot =
                    -AreaRotate.items[i][j][0] *
                        Math.sin(RadFromGrad * AngleY) +
                    AreaRotate.items[i][j][2] * Math.cos(RadFromGrad * AngleY);
                AreaRotate.items[i][j][0] = x_rot;
                AreaRotate.items[i][j][2] = z_rot;

                // Rotation around Z
                var x_rot =
                    AreaRotate.items[i][j][0] * Math.cos(RadFromGrad * AngleZ) -
                    AreaRotate.items[i][j][1] * Math.sin(RadFromGrad * AngleZ);
                var y_rot =
                    AreaRotate.items[i][j][0] * Math.sin(RadFromGrad * AngleZ) +
                    AreaRotate.items[i][j][1] * Math.cos(RadFromGrad * AngleZ);
                AreaRotate.items[i][j][0] = x_rot;
                AreaRotate.items[i][j][1] = y_rot;
            }
            AreaConstants.items[i].TotalAngleX =
                parseInt(AreaConstants.items[i].TotalAngleX) + parseInt(AngleX);
            AreaConstants.items[i].TotalAngleY =
                parseInt(AreaConstants.items[i].TotalAngleY) + parseInt(AngleY);
            AreaConstants.items[i].TotalAngleZ =
                parseInt(AreaConstants.items[i].TotalAngleZ) + parseInt(AngleZ);
        }
    }
    CloneAreaValues(AreaRotate, AreaOriginal);
    CloneAreaValues(AreaOriginal, Area);
    AngleX = 0;
    AngleY = 0;
    AngleZ = 0;
}

function CalcOrderOfAreasAlongZAxis() {
    AreaZValues = new Array1D(AreaIndex);
    AreaOrderIndex = new Array1D(AreaIndex);
    for (i = 0; i < AreaIndex; i++) {
        //AreaZValues.items[i] = AverageAreaCornerZValues(i);
        AreaZValues.items[i] = Average3PointsAreaCornerZValues(i);
        AreaOrderIndex.items[i] = i;
    }
    AreaOrderIndex.items.sort(function (a, b) {
        return AreaZValues.items[b] - AreaZValues.items[a];
    });
}

function AverageAreaCornerZValues(CheckAreaIndex) {
    var CornerA = Area.items[CheckAreaIndex][0][2];
    var CornerB = Area.items[CheckAreaIndex][1][2];
    var CornerC = Area.items[CheckAreaIndex][2][2];
    var CornerD = Area.items[CheckAreaIndex][3][2];
    var AverageArea = (CornerA + CornerB + CornerC + CornerD) / 4;
    return AverageArea;
}

function Average3PointsAreaCornerZValues(CheckAreaIndex) {
    var CornerA = Area.items[CheckAreaIndex][0][2];
    var CornerB = Area.items[CheckAreaIndex][1][2];
    var CornerC = Area.items[CheckAreaIndex][2][2];
    var AverageArea = (CornerA + CornerB + CornerC) / 3;
    return AverageArea;
}

function BuildAreasFrom3DPoints() {
    AreaIndex = 0;
    for (i = 0; i < NumberOfRotationSegments - 1; i++) {
        for (j = 0; j < TotalEnteredPoints - 1; j++) {
            for (k = 0; k < 3; k++) {
                Area.items[AreaIndex][0][k] = Points.items[i][j][k];
                Area.items[AreaIndex][1][k] = Points.items[i][j + 1][k];
                Area.items[AreaIndex][2][k] = Points.items[i + 1][j + 1][k];
                Area.items[AreaIndex][3][k] = Points.items[i + 1][j][k];
            }
            AreaIndex = AreaIndex + 1;
        }
    }

    for (j = 0; j < TotalEnteredPoints - 1; j++) {
        for (k = 0; k < 3; k++) {
            Area.items[AreaIndex][0][k] =
                Points.items[NumberOfRotationSegments - 1][j][k];
            Area.items[AreaIndex][1][k] =
                Points.items[NumberOfRotationSegments - 1][j + 1][k];
            Area.items[AreaIndex][2][k] = Points.items[0][j + 1][k];
            Area.items[AreaIndex][3][k] = Points.items[0][j][k];
        }
        AreaIndex = AreaIndex + 1;
    }
}

function Build3PointsAreasFrom3DPoints() {
    // AreaIndex = 0;
    for (i = 0; i < NumberOfRotationSegments - 1; i++) {
        for (j = 0; j < TotalEnteredPoints - 1; j++) {
            for (k = 0; k < 3; k++) {
                Area.items[AreaIndex][0][k] = Points.items[i][j][k];
                Area.items[AreaIndex][1][k] = Points.items[i + 1][j][k];
                Area.items[AreaIndex][2][k] = Points.items[i][j + 1][k];
            }
            AreaBelongsToObject[AreaIndex] = NumberOfCompleteObjects;
            SelectedArea[AreaIndex] = true;
            SetupAreaConstants(AreaIndex);
            AreaIndex = AreaIndex + 1;
            for (k = 0; k < 3; k++) {
                Area.items[AreaIndex][0][k] = Points.items[i][j + 1][k];
                Area.items[AreaIndex][1][k] = Points.items[i + 1][j][k];
                Area.items[AreaIndex][2][k] = Points.items[i + 1][j + 1][k];
            }
            AreaBelongsToObject[AreaIndex] = NumberOfCompleteObjects;
            SelectedArea[AreaIndex] = true;
            SetupAreaConstants(AreaIndex);
            AreaIndex = AreaIndex + 1;
        }
    }

    for (j = 0; j < TotalEnteredPoints - 1; j++) {
        for (k = 0; k < 3; k++) {
            Area.items[AreaIndex][0][k] =
                Points.items[NumberOfRotationSegments - 1][j][k];
            Area.items[AreaIndex][1][k] = Points.items[0][j][k];
            Area.items[AreaIndex][2][k] =
                Points.items[NumberOfRotationSegments - 1][j + 1][k];
        }
        AreaBelongsToObject[AreaIndex] = NumberOfCompleteObjects;
        SelectedArea[AreaIndex] = true;
        SetupAreaConstants(AreaIndex);
        AreaIndex = AreaIndex + 1;
        for (k = 0; k < 3; k++) {
            Area.items[AreaIndex][0][k] =
                Points.items[NumberOfRotationSegments - 1][j + 1][k];
            Area.items[AreaIndex][1][k] = Points.items[0][j][k];
            Area.items[AreaIndex][2][k] = Points.items[0][j + 1][k];
        }
        AreaBelongsToObject[AreaIndex] = NumberOfCompleteObjects;
        SelectedArea[AreaIndex] = true;
        SetupAreaConstants(AreaIndex);
        AreaIndex = AreaIndex + 1;
    }
    CloneAreaValues(Area, AreaOriginal);
    //CalcSizeOfObject();
    //ShowAreaOf3DObjectSmallWindows();
}

function CloneAreaValues(From, To) {
    for (var i = 0; i < AreaIndex; i++) {
        for (var j = 0; j < 3; j++) {
            for (var k = 0; k < 3; k++) {
                To.items[i][j][k] = From.items[i][j][k];
            }
        }
    }
}

function CloneAreaValuesOfSpecificArea(From, To) {
    for (j = 0; j < 3; j++) {
        for (k = 0; k < 3; k++) {
            Area.items[To][j][k] = Area.items[From][j][k];
        }
    }
}

function ShowAreaOf3DObject() {
    //CalcSizeOfObject();
    // CloneAreaValues(AreaOriginal, Area);
    clearScreenMainWindows();

    // Perspective window
    drawLine(width / 2, 0, width / 2, height, 1, DrawingContext, "#aaaaaa");
    drawLine(0, height / 2, width, height / 2, 1, DrawingContext, "#aaaaaa");
    drawText(10, 15, "Perspective", DrawingContext, "#000000", "left");
    ApplyPerspectiveDistortionForArea();
    CalcOrderOfAreasAlongZAxis();

    for (i = 0; i < AreaIndex; i++) {
        var NewIndexAccordingToZValue = AreaOrderIndex.items[i];
        var ColorAccordingToDepthLevel = (1 / AreaIndex) * i;
        // console.log(AreaIndex);
        // console.log(AreaConstants.items[NewIndexAccordingToZValue].ColorOfObjectBlue);
        // console.log(NewIndexAccordingToZValue);
        // console.log("rgb("+(ColorAccordingToDepthLevel*AreaConstants.items[NewIndexAccordingToZValue].ColorOfObjectRed)+", "+(ColorAccordingToDepthLevel*AreaConstants.items[NewIndexAccordingToZValue].ColorOfObjectGreen)+", "+(ColorAccordingToDepthLevel*AreaConstants.items[NewIndexAccordingToZValue].ColorOfObjectBlue)+")");
        DrawingContext.fillStyle =
            "rgb(" +
            ColorAccordingToDepthLevel *
                AreaConstants.items[NewIndexAccordingToZValue]
                    .ColorOfObjectRed *
                255 +
            ", " +
            ColorAccordingToDepthLevel *
                AreaConstants.items[NewIndexAccordingToZValue]
                    .ColorOfObjectGreen *
                255 +
            ", " +
            ColorAccordingToDepthLevel *
                AreaConstants.items[NewIndexAccordingToZValue]
                    .ColorOfObjectBlue *
                255 +
            ")";
        // if (DrawingMethod == 2) DrawingContext.fillStyle = "#ffffff";
        // DrawingContext.strokeStyle = "#000000";
        DrawingContext.beginPath();
        for (j = 0; j < 3; j++) {
            var CornerXCoord =
                width / 2 - Area.items[NewIndexAccordingToZValue][j][0];
            var CornerYCoord =
                height / 2 - Area.items[NewIndexAccordingToZValue][j][1];
            if (j == 0) {
                DrawingContext.moveTo(CornerXCoord, CornerYCoord);
            } else {
                DrawingContext.lineTo(CornerXCoord, CornerYCoord);
            }
        }
        DrawingContext.closePath();
        if (DrawingMethod != 3) DrawingContext.fill();
        if (
            AreaConstants.items[NewIndexAccordingToZValue].ColorOfObjectRed >
                0.7 &&
            AreaConstants.items[NewIndexAccordingToZValue].ColorOfObjectGreen >
                0.7 &&
            AreaConstants.items[NewIndexAccordingToZValue].ColorOfObjectBlue >
                0.7
        )
            DrawingContext.stroke();
        // if (DrawingMethod == 0 || DrawingMethod == 2 || DrawingMethod == 3) DrawingContext.stroke();
    }

    //StopRayTracing(); RayTracingCompleted = true; setTimeout(function() {MaxRecursionDepth = 1; RayTracingStart(); MaxRecursionDepth = 10;},5000);
    // Top window
    drawLine(width / 2, 0, width / 2, height, 1, DrawingContextTop, "#aaaaaa");
    drawLine(0, height / 2, width, height / 2, 1, DrawingContextTop, "#aaaaaa");
    drawText(10, 15, "Top", DrawingContextTop, "#000000", "left");
    for (i = 0; i < AreaIndex; i++) {
        DrawingContextTop.strokeStyle =
            "rgb(" +
            AreaConstants.items[i].ColorOfObjectRed * 255 +
            ", " +
            AreaConstants.items[i].ColorOfObjectGreen * 255 +
            ", " +
            AreaConstants.items[i].ColorOfObjectBlue * 255 +
            ")";
        DrawingContextTop.beginPath();
        for (j = 0; j < 3; j++) {
            var CornerXCoord = width / 2 - AreaOriginal.items[i][j][0];
            var CornerZCoord = height / 2 - AreaOriginal.items[i][j][2];
            if (j == 0) {
                DrawingContextTop.moveTo(CornerXCoord, CornerZCoord);
            } else {
                DrawingContextTop.lineTo(CornerXCoord, CornerZCoord);
            }
        }
        DrawingContextTop.closePath();
        DrawingContextTop.stroke();
    }
    for (lamp = 0; lamp < 5; lamp++) {
        if (LightOn.items[lamp] == true) {
            drawCircle(
                width / 2 - LightSourceX.items[lamp],
                height / 2 - LightSourceZ.items[lamp],
                10,
                0,
                360,
                1,
                DrawingContextTop,
                "rgb(" +
                    ColorOfLightSource.items[lamp].Red * 255 +
                    ", " +
                    ColorOfLightSource.items[lamp].Green * 255 +
                    ", " +
                    ColorOfLightSource.items[lamp].Blue * 255 +
                    ")",
                true
            );
            drawCircle(
                width / 2 - LightSourceX.items[lamp],
                height / 2 - LightSourceZ.items[lamp],
                10,
                0,
                360,
                1,
                DrawingContextTop,
                "rgb(0,0,0)",
                false
            );
            drawText(
                width / 2 - LightSourceX.items[lamp],
                5 + height / 2 - LightSourceZ.items[lamp],
                lamp,
                DrawingContextTop,
                "#000000",
                "center"
            );
        }
    }

    // Side window
    drawLine(width / 2, 0, width / 2, height, 1, DrawingContextSide, "#aaaaaa");
    drawLine(
        0,
        height / 2,
        width,
        height / 2,
        1,
        DrawingContextSide,
        "#aaaaaa"
    );
    drawText(10, 15, "Side", DrawingContextSide, "#000000", "left");
    for (i = 0; i < AreaIndex; i++) {
        DrawingContextSide.strokeStyle =
            "rgb(" +
            AreaConstants.items[i].ColorOfObjectRed * 255 +
            ", " +
            AreaConstants.items[i].ColorOfObjectGreen * 255 +
            ", " +
            AreaConstants.items[i].ColorOfObjectBlue * 255 +
            ")";
        DrawingContextSide.beginPath();
        for (j = 0; j < 3; j++) {
            var CornerZCoord = width / 2 - AreaOriginal.items[i][j][2];
            var CornerYCoord = height / 2 - AreaOriginal.items[i][j][1];
            if (j == 0) {
                DrawingContextSide.moveTo(CornerZCoord, CornerYCoord);
            } else {
                DrawingContextSide.lineTo(CornerZCoord, CornerYCoord);
            }
        }
        DrawingContextSide.closePath();
        DrawingContextSide.stroke();
    }
    for (lamp = 0; lamp < 5; lamp++) {
        if (LightOn.items[lamp] == true) {
            drawCircle(
                width / 2 - LightSourceZ.items[lamp],
                height / 2 - LightSourceY.items[lamp],
                10,
                0,
                360,
                1,
                DrawingContextSide,
                "rgb(" +
                    ColorOfLightSource.items[lamp].Red * 255 +
                    ", " +
                    ColorOfLightSource.items[lamp].Green * 255 +
                    ", " +
                    ColorOfLightSource.items[lamp].Blue * 255 +
                    ")",
                true
            );
            drawCircle(
                width / 2 - LightSourceZ.items[lamp],
                height / 2 - LightSourceY.items[lamp],
                10,
                0,
                360,
                1,
                DrawingContextSide,
                "rgb(0,0,0)",
                false
            );
            drawText(
                width / 2 - LightSourceZ.items[lamp],
                5 + height / 2 - LightSourceY.items[lamp],
                lamp,
                DrawingContextSide,
                "#000000",
                "center"
            );
        }
    }

    // Front window
    // ColorToShowText = new Array();
    // ColorToShowText[0] = "#ff0000";
    // ColorToShowText[1] = "#00ff00";
    // ColorToShowText[2] = "#0000ff";
    // ColorToShowText[3] = "#ff00ff";
    // ColorToShowText[4] = "#00ffff";
    // ColorToShowText[5] = "#999999";
    // ColorToShowText[6] = "#222222";
    // ColorToShowText[7] = "#243098";
    // ColorToShowText[8] = "#095432";
    // ColorToShowText[9] = "#ba32a9";
    // ColorToShowText[10]= "#053243";

    drawLine(
        width / 2,
        0,
        width / 2,
        height,
        1,
        DrawingContextFront,
        "#aaaaaa"
    );
    drawLine(
        0,
        height / 2,
        width,
        height / 2,
        1,
        DrawingContextFront,
        "#aaaaaa"
    );
    drawText(10, 15, "Front", DrawingContextFront, "#000000", "left");
    for (i = 0; i < AreaIndex; i++) {
        DrawingContextFront.strokeStyle =
            "rgb(" +
            AreaConstants.items[i].ColorOfObjectRed * 255 +
            ", " +
            AreaConstants.items[i].ColorOfObjectGreen * 255 +
            ", " +
            AreaConstants.items[i].ColorOfObjectBlue * 255 +
            ")";
        // DrawingContextFront.strokeStyle = ColorToShowText[i];
        DrawingContextFront.beginPath();
        var CenterX = 0;
        var CenterY = 0;
        for (j = 0; j < 3; j++) {
            var CornerXCoord = width / 2 - AreaOriginal.items[i][j][0];
            var CornerYCoord = height / 2 - AreaOriginal.items[i][j][1];
            CenterX = CenterX + AreaOriginal.items[i][j][0];
            CenterY = CenterY + AreaOriginal.items[i][j][1];

            if (j == 0) {
                DrawingContextFront.moveTo(CornerXCoord, CornerYCoord);
                // drawText(CornerXCoord+2,CornerYCoord+i*10,j,DrawingContextFront,ColorToShowText[i],"center");
            } else {
                DrawingContextFront.lineTo(CornerXCoord, CornerYCoord);
                // drawText(CornerXCoord+2,CornerYCoord+i*10,j,DrawingContextFront,ColorToShowText[i],"center");
            }
        }
        DrawingContextFront.closePath();
        DrawingContextFront.stroke();
        // drawText(width/2-CenterX/3,height/2-CenterY/3,i,DrawingContextFront,ColorToShowText[i],"center");
    }
    for (lamp = 0; lamp < 5; lamp++) {
        if (LightOn.items[lamp] == true) {
            drawCircle(
                width / 2 - LightSourceX.items[lamp],
                height / 2 - LightSourceY.items[lamp],
                10,
                0,
                360,
                1,
                DrawingContextFront,
                "rgb(" +
                    ColorOfLightSource.items[lamp].Red * 255 +
                    ", " +
                    ColorOfLightSource.items[lamp].Green * 255 +
                    ", " +
                    ColorOfLightSource.items[lamp].Blue * 255 +
                    ")",
                true
            );
            drawCircle(
                width / 2 - LightSourceX.items[lamp],
                height / 2 - LightSourceY.items[lamp],
                10,
                0,
                360,
                1,
                DrawingContextFront,
                "rgb(0,0,0)",
                false
            );
            drawText(
                width / 2 - LightSourceX.items[lamp],
                5 + height / 2 - LightSourceY.items[lamp],
                lamp,
                DrawingContextFront,
                "#000000",
                "center"
            );
        }
    }
}

function ShowAreaOf3DObjectSmallWindows() {
    CalcSizeOfObject();
    // CloneAreaValues(AreaOriginal, Area);
    clearScreenSmallWindows();

    CheckIfSelectedWindow();

    for (i = 0; i < AreaIndex; i++) {
        var NewIndexAccordingToZValue = AreaOrderIndex.items[i];
        var ColorAccordingToDepthLevel = (1 / AreaIndex) * i;
        DrawingContextObjectAll.fillStyle =
            "rgb(" +
            ColorAccordingToDepthLevel *
                AreaConstants.items[NewIndexAccordingToZValue]
                    .ColorOfObjectRed *
                255 +
            ", " +
            ColorAccordingToDepthLevel *
                AreaConstants.items[NewIndexAccordingToZValue]
                    .ColorOfObjectGreen *
                255 +
            ", " +
            ColorAccordingToDepthLevel *
                AreaConstants.items[NewIndexAccordingToZValue]
                    .ColorOfObjectBlue *
                255 +
            ")";
        DrawingContextObjectAll.beginPath();
        for (j = 0; j < 3; j++) {
            var CornerXCoord =
                CanvasObjectAll.width / 2 -
                Area.items[NewIndexAccordingToZValue][j][0] / 5;
            var CornerYCoord =
                CanvasObjectAll.height / 2 -
                Area.items[NewIndexAccordingToZValue][j][1] / 3;
            if (j == 0) {
                DrawingContextObjectAll.moveTo(CornerXCoord, CornerYCoord);
            } else {
                DrawingContextObjectAll.lineTo(CornerXCoord, CornerYCoord);
            }
        }
        DrawingContextObjectAll.closePath();
        DrawingContextObjectAll.fill();
    }

    // Objects little windows
    // var PreviousObjectNumbers = 0;
    // var ShiftOverEmptyNumbers = 0;
    for (i = 0; i < AreaIndex; i++) {
        // if (AreaBelongsToObject[i]-PreviousObjectNumbers > 1) ShiftOverEmptyNumbers++;
        // PreviousObjectNumbers = AreaBelongsToObject[i];
        // switch (AreaBelongsToObject[i]-ShiftOverEmptyNumbers)
        switch (AreaBelongsToObject[i]) {
            case 0 + SelectedEightObjects:
                if (SelectedArea[i] == true) {
                    CanvasObject0.style.border = "1px solid red";
                }

                DrawingContextObject0.fillStyle =
                    "rgb(" +
                    AreaConstants.items[i].ColorOfObjectRed * 255 +
                    ", " +
                    AreaConstants.items[i].ColorOfObjectGreen * 255 +
                    ", " +
                    AreaConstants.items[i].ColorOfObjectBlue * 255 +
                    ")";
                DrawingContextObject0.strokeStyle = "#aaaaaa";
                DrawingContextObject0.beginPath();
                for (j = 0; j < 3; j++) {
                    CornerXCoord =
                        CanvasObject0.width / 2 -
                        (((AreaOriginal.items[i][j][0] -
                            (AreaConstants.items[i]
                                .LargestSizeOfAreaInXDirectionMax +
                                AreaConstants.items[i]
                                    .LargestSizeOfAreaInXDirectionMin) /
                                2) /
                            (AreaConstants.items[i]
                                .LargestSizeOfAreaInXDirectionMax -
                                AreaConstants.items[i]
                                    .LargestSizeOfAreaInXDirectionMin)) *
                            CanvasObject0.width) /
                            2.5;
                    CornerYCoord =
                        CanvasObject0.height / 2 -
                        (((AreaOriginal.items[i][j][1] -
                            (AreaConstants.items[i]
                                .LargestSizeOfAreaInYDirectionMax +
                                AreaConstants.items[i]
                                    .LargestSizeOfAreaInYDirectionMin) /
                                2) /
                            (AreaConstants.items[i]
                                .LargestSizeOfAreaInYDirectionMax -
                                AreaConstants.items[i]
                                    .LargestSizeOfAreaInYDirectionMin)) *
                            CanvasObject0.height) /
                            1.5; //2.5/height*width;
                    if (j == 0) {
                        DrawingContextObject0.moveTo(
                            CornerXCoord,
                            CornerYCoord
                        );
                    } else {
                        DrawingContextObject0.lineTo(
                            CornerXCoord,
                            CornerYCoord
                        );
                    }
                }
                DrawingContextObject0.closePath();
                DrawingContextObject0.fill();
                if (
                    AreaConstants.items[i].ColorOfObjectRed > 0.7 &&
                    AreaConstants.items[i].ColorOfObjectGreen > 0.7 &&
                    AreaConstants.items[i].ColorOfObjectBlue > 0.7
                )
                    DrawingContextObject0.stroke();
                break;

            case 1 + SelectedEightObjects:
                if (SelectedArea[i] == true) {
                    CanvasObject1.style.border = "1px solid red";
                }
                DrawingContextObject1.fillStyle =
                    "rgb(" +
                    AreaConstants.items[i].ColorOfObjectRed * 255 +
                    ", " +
                    AreaConstants.items[i].ColorOfObjectGreen * 255 +
                    ", " +
                    AreaConstants.items[i].ColorOfObjectBlue * 255 +
                    ")";
                DrawingContextObject1.strokeStyle = "#aaaaaa";
                DrawingContextObject1.beginPath();
                for (j = 0; j < 3; j++) {
                    CornerXCoord =
                        CanvasObject1.width / 2 -
                        (((AreaOriginal.items[i][j][0] -
                            (AreaConstants.items[i]
                                .LargestSizeOfAreaInXDirectionMax +
                                AreaConstants.items[i]
                                    .LargestSizeOfAreaInXDirectionMin) /
                                2) /
                            (AreaConstants.items[i]
                                .LargestSizeOfAreaInXDirectionMax -
                                AreaConstants.items[i]
                                    .LargestSizeOfAreaInXDirectionMin)) *
                            CanvasObject1.width) /
                            2.5;
                    CornerYCoord =
                        CanvasObject1.height / 2 -
                        (((AreaOriginal.items[i][j][1] -
                            (AreaConstants.items[i]
                                .LargestSizeOfAreaInYDirectionMax +
                                AreaConstants.items[i]
                                    .LargestSizeOfAreaInYDirectionMin) /
                                2) /
                            (AreaConstants.items[i]
                                .LargestSizeOfAreaInYDirectionMax -
                                AreaConstants.items[i]
                                    .LargestSizeOfAreaInYDirectionMin)) *
                            CanvasObject1.height) /
                            1.5; //2.5/height*width;
                    if (j == 0) {
                        DrawingContextObject1.moveTo(
                            CornerXCoord,
                            CornerYCoord
                        );
                    } else {
                        DrawingContextObject1.lineTo(
                            CornerXCoord,
                            CornerYCoord
                        );
                    }
                }
                DrawingContextObject1.closePath();
                DrawingContextObject1.fill();
                if (
                    AreaConstants.items[i].ColorOfObjectRed > 0.7 &&
                    AreaConstants.items[i].ColorOfObjectGreen > 0.7 &&
                    AreaConstants.items[i].ColorOfObjectBlue > 0.7
                )
                    DrawingContextObject1.stroke();
                break;

            case 2 + SelectedEightObjects:
                if (SelectedArea[i] == true) {
                    CanvasObject2.style.border = "1px solid red";
                }
                DrawingContextObject2.fillStyle =
                    "rgb(" +
                    AreaConstants.items[i].ColorOfObjectRed * 255 +
                    ", " +
                    AreaConstants.items[i].ColorOfObjectGreen * 255 +
                    ", " +
                    AreaConstants.items[i].ColorOfObjectBlue * 255 +
                    ")";
                DrawingContextObject2.strokeStyle = "#aaaaaa";
                DrawingContextObject2.beginPath();
                for (j = 0; j < 3; j++) {
                    CornerXCoord =
                        CanvasObject2.width / 2 -
                        (((AreaOriginal.items[i][j][0] -
                            (AreaConstants.items[i]
                                .LargestSizeOfAreaInXDirectionMax +
                                AreaConstants.items[i]
                                    .LargestSizeOfAreaInXDirectionMin) /
                                2) /
                            (AreaConstants.items[i]
                                .LargestSizeOfAreaInXDirectionMax -
                                AreaConstants.items[i]
                                    .LargestSizeOfAreaInXDirectionMin)) *
                            CanvasObject2.width) /
                            2.5;
                    CornerYCoord =
                        CanvasObject2.height / 2 -
                        (((AreaOriginal.items[i][j][1] -
                            (AreaConstants.items[i]
                                .LargestSizeOfAreaInYDirectionMax +
                                AreaConstants.items[i]
                                    .LargestSizeOfAreaInYDirectionMin) /
                                2) /
                            (AreaConstants.items[i]
                                .LargestSizeOfAreaInYDirectionMax -
                                AreaConstants.items[i]
                                    .LargestSizeOfAreaInYDirectionMin)) *
                            CanvasObject2.height) /
                            1.5; //2.5/height*width;
                    if (j == 0) {
                        DrawingContextObject2.moveTo(
                            CornerXCoord,
                            CornerYCoord
                        );
                    } else {
                        DrawingContextObject2.lineTo(
                            CornerXCoord,
                            CornerYCoord
                        );
                    }
                }
                DrawingContextObject2.closePath();
                DrawingContextObject2.fill();
                if (
                    AreaConstants.items[i].ColorOfObjectRed > 0.7 &&
                    AreaConstants.items[i].ColorOfObjectGreen > 0.7 &&
                    AreaConstants.items[i].ColorOfObjectBlue > 0.7
                )
                    DrawingContextObject2.stroke();
                break;

            case 3 + SelectedEightObjects:
                if (SelectedArea[i] == true) {
                    CanvasObject3.style.border = "1px solid red";
                }
                DrawingContextObject3.fillStyle =
                    "rgb(" +
                    AreaConstants.items[i].ColorOfObjectRed * 255 +
                    ", " +
                    AreaConstants.items[i].ColorOfObjectGreen * 255 +
                    ", " +
                    AreaConstants.items[i].ColorOfObjectBlue * 255 +
                    ")";
                DrawingContextObject3.strokeStyle = "#aaaaaa";
                DrawingContextObject3.beginPath();
                for (j = 0; j < 3; j++) {
                    CornerXCoord =
                        CanvasObject3.width / 2 -
                        (((AreaOriginal.items[i][j][0] -
                            (AreaConstants.items[i]
                                .LargestSizeOfAreaInXDirectionMax +
                                AreaConstants.items[i]
                                    .LargestSizeOfAreaInXDirectionMin) /
                                2) /
                            (AreaConstants.items[i]
                                .LargestSizeOfAreaInXDirectionMax -
                                AreaConstants.items[i]
                                    .LargestSizeOfAreaInXDirectionMin)) *
                            CanvasObject3.width) /
                            2.5;
                    CornerYCoord =
                        CanvasObject3.height / 2 -
                        (((AreaOriginal.items[i][j][1] -
                            (AreaConstants.items[i]
                                .LargestSizeOfAreaInYDirectionMax +
                                AreaConstants.items[i]
                                    .LargestSizeOfAreaInYDirectionMin) /
                                2) /
                            (AreaConstants.items[i]
                                .LargestSizeOfAreaInYDirectionMax -
                                AreaConstants.items[i]
                                    .LargestSizeOfAreaInYDirectionMin)) *
                            CanvasObject3.height) /
                            1.5; //2.5/height*width;
                    if (j == 0) {
                        DrawingContextObject3.moveTo(
                            CornerXCoord,
                            CornerYCoord
                        );
                    } else {
                        DrawingContextObject3.lineTo(
                            CornerXCoord,
                            CornerYCoord
                        );
                    }
                }
                DrawingContextObject3.closePath();
                DrawingContextObject3.fill();
                if (
                    AreaConstants.items[i].ColorOfObjectRed > 0.7 &&
                    AreaConstants.items[i].ColorOfObjectGreen > 0.7 &&
                    AreaConstants.items[i].ColorOfObjectBlue > 0.7
                )
                    DrawingContextObject3.stroke();
                break;

            case 4 + SelectedEightObjects:
                if (SelectedArea[i] == true) {
                    CanvasObject4.style.border = "1px solid red";
                }
                DrawingContextObject4.fillStyle =
                    "rgb(" +
                    AreaConstants.items[i].ColorOfObjectRed * 255 +
                    ", " +
                    AreaConstants.items[i].ColorOfObjectGreen * 255 +
                    ", " +
                    AreaConstants.items[i].ColorOfObjectBlue * 255 +
                    ")";
                DrawingContextObject4.strokeStyle = "#aaaaaa";
                DrawingContextObject4.beginPath();
                for (j = 0; j < 3; j++) {
                    CornerXCoord =
                        CanvasObject4.width / 2 -
                        (((AreaOriginal.items[i][j][0] -
                            (AreaConstants.items[i]
                                .LargestSizeOfAreaInXDirectionMax +
                                AreaConstants.items[i]
                                    .LargestSizeOfAreaInXDirectionMin) /
                                2) /
                            (AreaConstants.items[i]
                                .LargestSizeOfAreaInXDirectionMax -
                                AreaConstants.items[i]
                                    .LargestSizeOfAreaInXDirectionMin)) *
                            CanvasObject4.width) /
                            2.5;
                    CornerYCoord =
                        CanvasObject4.height / 2 -
                        (((AreaOriginal.items[i][j][1] -
                            (AreaConstants.items[i]
                                .LargestSizeOfAreaInYDirectionMax +
                                AreaConstants.items[i]
                                    .LargestSizeOfAreaInYDirectionMin) /
                                2) /
                            (AreaConstants.items[i]
                                .LargestSizeOfAreaInYDirectionMax -
                                AreaConstants.items[i]
                                    .LargestSizeOfAreaInYDirectionMin)) *
                            CanvasObject4.height) /
                            1.5; //2.5/height*width;
                    if (j == 0) {
                        DrawingContextObject4.moveTo(
                            CornerXCoord,
                            CornerYCoord
                        );
                    } else {
                        DrawingContextObject4.lineTo(
                            CornerXCoord,
                            CornerYCoord
                        );
                    }
                }
                DrawingContextObject4.closePath();
                DrawingContextObject4.fill();
                if (
                    AreaConstants.items[i].ColorOfObjectRed > 0.7 &&
                    AreaConstants.items[i].ColorOfObjectGreen > 0.7 &&
                    AreaConstants.items[i].ColorOfObjectBlue > 0.7
                )
                    DrawingContextObject4.stroke();
                break;

            case 5 + SelectedEightObjects:
                if (SelectedArea[i] == true) {
                    CanvasObject5.style.border = "1px solid red";
                }
                DrawingContextObject5.fillStyle =
                    "rgb(" +
                    AreaConstants.items[i].ColorOfObjectRed * 255 +
                    ", " +
                    AreaConstants.items[i].ColorOfObjectGreen * 255 +
                    ", " +
                    AreaConstants.items[i].ColorOfObjectBlue * 255 +
                    ")";
                DrawingContextObject5.strokeStyle = "#aaaaaa";
                DrawingContextObject5.beginPath();
                for (j = 0; j < 3; j++) {
                    CornerXCoord =
                        CanvasObject5.width / 2 -
                        (((AreaOriginal.items[i][j][0] -
                            (AreaConstants.items[i]
                                .LargestSizeOfAreaInXDirectionMax +
                                AreaConstants.items[i]
                                    .LargestSizeOfAreaInXDirectionMin) /
                                2) /
                            (AreaConstants.items[i]
                                .LargestSizeOfAreaInXDirectionMax -
                                AreaConstants.items[i]
                                    .LargestSizeOfAreaInXDirectionMin)) *
                            CanvasObject5.width) /
                            2.5;
                    CornerYCoord =
                        CanvasObject5.height / 2 -
                        (((AreaOriginal.items[i][j][1] -
                            (AreaConstants.items[i]
                                .LargestSizeOfAreaInYDirectionMax +
                                AreaConstants.items[i]
                                    .LargestSizeOfAreaInYDirectionMin) /
                                2) /
                            (AreaConstants.items[i]
                                .LargestSizeOfAreaInYDirectionMax -
                                AreaConstants.items[i]
                                    .LargestSizeOfAreaInYDirectionMin)) *
                            CanvasObject5.height) /
                            1.5; //2.5/height*width;
                    if (j == 0) {
                        DrawingContextObject5.moveTo(
                            CornerXCoord,
                            CornerYCoord
                        );
                    } else {
                        DrawingContextObject5.lineTo(
                            CornerXCoord,
                            CornerYCoord
                        );
                    }
                }
                DrawingContextObject5.closePath();
                DrawingContextObject5.fill();
                if (
                    AreaConstants.items[i].ColorOfObjectRed > 0.7 &&
                    AreaConstants.items[i].ColorOfObjectGreen > 0.7 &&
                    AreaConstants.items[i].ColorOfObjectBlue > 0.7
                )
                    DrawingContextObject5.stroke();
                break;

            case 6 + SelectedEightObjects:
                if (SelectedArea[i] == true) {
                    CanvasObject6.style.border = "1px solid red";
                }
                DrawingContextObject6.fillStyle =
                    "rgb(" +
                    AreaConstants.items[i].ColorOfObjectRed * 255 +
                    ", " +
                    AreaConstants.items[i].ColorOfObjectGreen * 255 +
                    ", " +
                    AreaConstants.items[i].ColorOfObjectBlue * 255 +
                    ")";
                DrawingContextObject6.strokeStyle = "#aaaaaa";
                DrawingContextObject6.beginPath();
                for (j = 0; j < 3; j++) {
                    CornerXCoord =
                        CanvasObject6.width / 2 -
                        (((AreaOriginal.items[i][j][0] -
                            (AreaConstants.items[i]
                                .LargestSizeOfAreaInXDirectionMax +
                                AreaConstants.items[i]
                                    .LargestSizeOfAreaInXDirectionMin) /
                                2) /
                            (AreaConstants.items[i]
                                .LargestSizeOfAreaInXDirectionMax -
                                AreaConstants.items[i]
                                    .LargestSizeOfAreaInXDirectionMin)) *
                            CanvasObject6.width) /
                            2.5;
                    CornerYCoord =
                        CanvasObject6.height / 2 -
                        (((AreaOriginal.items[i][j][1] -
                            (AreaConstants.items[i]
                                .LargestSizeOfAreaInYDirectionMax +
                                AreaConstants.items[i]
                                    .LargestSizeOfAreaInYDirectionMin) /
                                2) /
                            (AreaConstants.items[i]
                                .LargestSizeOfAreaInYDirectionMax -
                                AreaConstants.items[i]
                                    .LargestSizeOfAreaInYDirectionMin)) *
                            CanvasObject6.height) /
                            1.5; //2.5/height*width;
                    if (j == 0) {
                        DrawingContextObject6.moveTo(
                            CornerXCoord,
                            CornerYCoord
                        );
                    } else {
                        DrawingContextObject6.lineTo(
                            CornerXCoord,
                            CornerYCoord
                        );
                    }
                }
                DrawingContextObject6.closePath();
                DrawingContextObject6.fill();
                if (
                    AreaConstants.items[i].ColorOfObjectRed > 0.7 &&
                    AreaConstants.items[i].ColorOfObjectGreen > 0.7 &&
                    AreaConstants.items[i].ColorOfObjectBlue > 0.7
                )
                    DrawingContextObject6.stroke();
                break;

            case 7 + SelectedEightObjects:
                if (SelectedArea[i] == true) {
                    CanvasObject7.style.border = "1px solid red";
                }
                DrawingContextObject7.fillStyle =
                    "rgb(" +
                    AreaConstants.items[i].ColorOfObjectRed * 255 +
                    ", " +
                    AreaConstants.items[i].ColorOfObjectGreen * 255 +
                    ", " +
                    AreaConstants.items[i].ColorOfObjectBlue * 255 +
                    ")";
                DrawingContextObject7.strokeStyle = "#aaaaaa";
                DrawingContextObject7.beginPath();
                for (j = 0; j < 3; j++) {
                    CornerXCoord =
                        CanvasObject7.width / 2 -
                        (((AreaOriginal.items[i][j][0] -
                            (AreaConstants.items[i]
                                .LargestSizeOfAreaInXDirectionMax +
                                AreaConstants.items[i]
                                    .LargestSizeOfAreaInXDirectionMin) /
                                2) /
                            (AreaConstants.items[i]
                                .LargestSizeOfAreaInXDirectionMax -
                                AreaConstants.items[i]
                                    .LargestSizeOfAreaInXDirectionMin)) *
                            CanvasObject7.width) /
                            2.5;
                    CornerYCoord =
                        CanvasObject7.height / 2 -
                        (((AreaOriginal.items[i][j][1] -
                            (AreaConstants.items[i]
                                .LargestSizeOfAreaInYDirectionMax +
                                AreaConstants.items[i]
                                    .LargestSizeOfAreaInYDirectionMin) /
                                2) /
                            (AreaConstants.items[i]
                                .LargestSizeOfAreaInYDirectionMax -
                                AreaConstants.items[i]
                                    .LargestSizeOfAreaInYDirectionMin)) *
                            CanvasObject7.height) /
                            1.5; //2.5/height*width;
                    if (j == 0) {
                        DrawingContextObject7.moveTo(
                            CornerXCoord,
                            CornerYCoord
                        );
                    } else {
                        DrawingContextObject7.lineTo(
                            CornerXCoord,
                            CornerYCoord
                        );
                    }
                }
                DrawingContextObject7.closePath();
                DrawingContextObject7.fill();
                if (
                    AreaConstants.items[i].ColorOfObjectRed > 0.7 &&
                    AreaConstants.items[i].ColorOfObjectGreen > 0.7 &&
                    AreaConstants.items[i].ColorOfObjectBlue > 0.7
                )
                    DrawingContextObject7.stroke();
                break;

            case 8 + SelectedEightObjects:
                if (SelectedArea[i] == true) {
                    CanvasObject8.style.border = "1px solid red";
                }
                DrawingContextObject8.fillStyle =
                    "rgb(" +
                    AreaConstants.items[i].ColorOfObjectRed * 255 +
                    ", " +
                    AreaConstants.items[i].ColorOfObjectGreen * 255 +
                    ", " +
                    AreaConstants.items[i].ColorOfObjectBlue * 255 +
                    ")";
                DrawingContextObject8.strokeStyle = "#aaaaaa";
                DrawingContextObject8.beginPath();
                for (j = 0; j < 3; j++) {
                    CornerXCoord =
                        CanvasObject8.width / 2 -
                        (((AreaOriginal.items[i][j][0] -
                            (AreaConstants.items[i]
                                .LargestSizeOfAreaInXDirectionMax +
                                AreaConstants.items[i]
                                    .LargestSizeOfAreaInXDirectionMin) /
                                2) /
                            (AreaConstants.items[i]
                                .LargestSizeOfAreaInXDirectionMax -
                                AreaConstants.items[i]
                                    .LargestSizeOfAreaInXDirectionMin)) *
                            CanvasObject8.width) /
                            2.5;
                    CornerYCoord =
                        CanvasObject8.height / 2 -
                        (((AreaOriginal.items[i][j][1] -
                            (AreaConstants.items[i]
                                .LargestSizeOfAreaInYDirectionMax +
                                AreaConstants.items[i]
                                    .LargestSizeOfAreaInYDirectionMin) /
                                2) /
                            (AreaConstants.items[i]
                                .LargestSizeOfAreaInYDirectionMax -
                                AreaConstants.items[i]
                                    .LargestSizeOfAreaInYDirectionMin)) *
                            CanvasObject8.height) /
                            1.5; //2.5/height*width;
                    if (j == 0) {
                        DrawingContextObject8.moveTo(
                            CornerXCoord,
                            CornerYCoord
                        );
                    } else {
                        DrawingContextObject8.lineTo(
                            CornerXCoord,
                            CornerYCoord
                        );
                    }
                }
                DrawingContextObject8.closePath();
                DrawingContextObject8.fill();
                if (
                    AreaConstants.items[i].ColorOfObjectRed > 0.7 &&
                    AreaConstants.items[i].ColorOfObjectGreen > 0.7 &&
                    AreaConstants.items[i].ColorOfObjectBlue > 0.7
                )
                    DrawingContextObject8.stroke();
                break;
        }
        NumbersForObjectWindows();
    }
}

function AngleBetweenVectors(V1x, V1y, V1z, V2x, V2y, V2z) {
    var ScalarProduct = V1x * V2x + V1y * V2y + V1z * V2z;
    var LengthV1 = Math.sqrt(V1x * V1x + V1y * V1y + V1z * V1z);
    var LengthV2 = Math.sqrt(V2x * V2x + V2y * V2y + V2z * V2z);
    var fraction = ScalarProduct / (LengthV1 * LengthV2);
    return Math.acos(fraction);
}

function LengthOfVector(PointX, PointY, PointZ) {
    return Math.sqrt(PointX * PointX + PointY * PointY + PointZ * PointZ);
}

function SaveAsImage() {
    var link = document.getElementById("link");
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    var today_ISO = today.toISOString();
    today_ISO = today_ISO.replace(":", "-");
    today_ISO = today_ISO.replace(".", "-");
    link.setAttribute("download", "RayTracing" + today_ISO + ".png");
    if (!Image2K)
        link.setAttribute(
            "href",
            Canvas.toDataURL("image/png").replace(
                "image/png",
                "image/octet-stream"
            )
        );
    else
        link.setAttribute(
            "href",
            Canvas2K.toDataURL("image/png").replace(
                "image/png",
                "image/octet-stream"
            )
        );
    link.click();
}

function SaveObject() {
    if ("localStorage" in window && window["localStorage"] !== null) {
        try {
            localStorage.setItem(
                "PointCoordinatesArray",
                JSON.stringify(PointCoordinatesArray)
            );
            localStorage.setItem(
                "NumberOfRotationSegments",
                JSON.stringify(NumberOfRotationSegments)
            );
            localStorage.setItem(
                "TotalEnteredPoints",
                JSON.stringify(TotalEnteredPoints)
            );
            localStorage.setItem("AngleX", JSON.stringify(AngleX));
            localStorage.setItem("AngleY", JSON.stringify(AngleY));
            localStorage.setItem("AngleZ", JSON.stringify(AngleZ));
            localStorage.setItem("Perspective", JSON.stringify(Perspective));
            document.title = "3D-Object saved";
        } catch (err) {
            alert("Sorry, saving was not possible.");
        }
    } else {
        alert("Sorry, your browser is too old to save data");
    }
}

function SaveAreaObject() {
    if ("localStorage" in window && window["localStorage"] !== null) {
        localStorage.setItem("AreaOriginal", JSON.stringify(AreaOriginal));
        localStorage.setItem("AreaConstants", JSON.stringify(AreaConstants));
        localStorage.setItem("AreaIndex", JSON.stringify(AreaIndex));
        localStorage.setItem(
            "AreaBelongsToObject",
            JSON.stringify(AreaBelongsToObject)
        );
        localStorage.setItem(
            "NumberOfCompleteObjects",
            JSON.stringify(NumberOfCompleteObjects)
        );
        localStorage.setItem("AngleX", JSON.stringify(AngleX));
        localStorage.setItem("AngleY", JSON.stringify(AngleY));
        localStorage.setItem("AngleZ", JSON.stringify(AngleZ));
        localStorage.setItem("Perspective", JSON.stringify(Perspective));
        localStorage.setItem("LightSourceX", JSON.stringify(LightSourceX));
        localStorage.setItem("LightSourceY", JSON.stringify(LightSourceY));
        localStorage.setItem("LightSourceZ", JSON.stringify(LightSourceZ));
        localStorage.setItem(
            "ColorOfLightSource",
            JSON.stringify(ColorOfLightSource)
        );
        localStorage.setItem("LightOn", JSON.stringify(LightOn));
        document.title = "3D-Object saved";
    } else {
        alert("Sorry, your browser is too old to save data");
    }
}

function LoadObject() {
    if ("localStorage" in window && window["localStorage"] !== null) {
        PointCoordinatesArray = JSON.parse(
            localStorage.getItem("PointCoordinatesArray")
        );
        NumberOfRotationSegments = JSON.parse(
            localStorage.getItem("NumberOfRotationSegments")
        );
        TotalEnteredPoints = JSON.parse(
            localStorage.getItem("TotalEnteredPoints")
        );
        AreaBelongsToObject = JSON.parse(
            localStorage.getItem("AreaBelongsToObject")
        );
        NumberOfCompleteObjects = JSON.parse(
            localStorage.getItem("NumberOfCompleteObjects")
        );
        AngleX = JSON.parse(localStorage.getItem("AngleX"));
        NumberOfRotationsX = AngleX / increment;
        AngleY = JSON.parse(localStorage.getItem("AngleY"));
        NumberOfRotationsY = AngleY / increment;
        AngleZ = JSON.parse(localStorage.getItem("AngleZ"));
        NumberOfRotationsZ = AngleZ / increment;
        Perspective = JSON.parse(localStorage.getItem("Perspective"));
        clearScreen();
        CreateRotationObject();
        window.removeEventListener("mousemove", mousemoveevent);
        window.removeEventListener("mousedown", mousedownevent);
        window.removeEventListener("contextmenu", RightMouseClickEvent);
        document.title = "3D-Object loaded";
    } else {
        alert("Sorry, your browser is too old to save data");
    }
}

function LoadAreaObject() {
    if ("localStorage" in window && window["localStorage"] !== null) {
        AreaOriginal = JSON.parse(localStorage.getItem("AreaOriginal"));
        CloneAreaValues(AreaOriginal, Area);
        AreaConstants = JSON.parse(localStorage.getItem("AreaConstants"));
        AreaIndex = JSON.parse(localStorage.getItem("AreaIndex"));
        NumberOfCompleteObjects = JSON.parse(
            localStorage.getItem("NumberOfCompleteObjects")
        );
        AreaBelongsToObject = JSON.parse(
            localStorage.getItem("AreaBelongsToObject")
        );
        AngleX = JSON.parse(localStorage.getItem("AngleX"));
        NumberOfRotationsX = AngleX / increment;
        AngleY = JSON.parse(localStorage.getItem("AngleY"));
        NumberOfRotationsY = AngleY / increment;
        AngleZ = JSON.parse(localStorage.getItem("AngleZ"));
        NumberOfRotationsZ = AngleZ / increment;
        Perspective = JSON.parse(localStorage.getItem("Perspective"));
        LightSourceX = JSON.parse(localStorage.getItem("LightSourceX"));
        if (LightSourceX.items[0] == null) {
            for (lamp = 0; lamp < 5; lamp++) LightSourceX.items[lamp] = 0;
        }
        LightSourceY = JSON.parse(localStorage.getItem("LightSourceY"));
        if (LightSourceY.items[0] == null) {
            for (lamp = 0; lamp < 5; lamp++) LightSourceY.items[lamp] = 0;
        }
        LightSourceZ = JSON.parse(localStorage.getItem("LightSourceZ"));
        if (LightSourceZ.items[0] == null) {
            for (lamp = 0; lamp < 5; lamp++) LightSourceZ.items[lamp] = 0;
        }
        ColorOfLightSource = JSON.parse(
            localStorage.getItem("ColorOfLightSource")
        );
        if (ColorOfLightSource.items[0] == null) {
            for (lamp = 0; lamp < 5; lamp++)
                ColorOfLightSource.items[lamp] = { Red: 1, Green: 1, Blue: 0 };
        }
        LightOn = JSON.parse(localStorage.getItem("LightOn"));
        if (LightOn == null) {
            LightOn = new Array1D(10);
            SetUpLights();
        }
        for (lamp = 0; lamp < 5; lamp++) {
            if (LightOn.items[lamp] == true) ActivateLight(lamp);
            else DeActivateLight(lamp);
        }
        //alert(NumberOfCompleteObjects+" objects loaded");
        window.removeEventListener("mousemove", mousemoveevent);
        window.removeEventListener("mousedown", mousedownevent);
        window.removeEventListener("contextmenu", RightMouseClickEvent);
        KeyPressed = 1;
        document.title = NumberOfCompleteObjects + " Object loaded";
        clearScreen();
        ShowAreaOf3DObject();
        ShowAreaOf3DObjectSmallWindows();
        ShowAreaOf3DObject();
        ShowAreaOf3DObjectSmallWindows();
        ShowAllObjects();
        UnSelectAll();
    } else {
        alert("Sorry, your browser is too old to save data");
    }
}

function CreateCube() {
    if (NumberOfCompleteObjects < MaxNbOfCompleteObjects) {
        CloneAreaValues(AreaOriginal, Area);
        NumberOfPoints = 0;
        KeyPressed = 0;
        UnSelectAll();
        NumberOfRotationSegments = 4;
        TotalEnteredPoints = 4;

        PointCoordinatesArray.items[0][0] = 0;
        PointCoordinatesArray.items[0][1] = ((-height * 0.2) / height) * width;

        PointCoordinatesArray.items[1][0] = -width * 0.2;
        PointCoordinatesArray.items[1][1] = ((-height * 0.2) / height) * width;

        PointCoordinatesArray.items[2][0] = -width * 0.2;
        PointCoordinatesArray.items[2][1] = ((height * 0.2) / height) * width;

        PointCoordinatesArray.items[3][0] = 0;
        PointCoordinatesArray.items[3][1] = ((height * 0.2) / height) * width;

        clearScreen();
        CreateRotationObject();
        window.removeEventListener("mousemove", mousemoveevent);
        window.removeEventListener("mousedown", mousedownevent);
        window.removeEventListener("contextmenu", RightMouseClickEvent);
        KeyPressed = 1;
        NumberOfCompleteObjects++;
        // RemoveEmptyObjectNumbers();
    } else {
        alert("Number of total objects reached");
    }
}

function CreateSphere() {
    if (NumberOfCompleteObjects < MaxNbOfCompleteObjects) {
        CloneAreaValues(AreaOriginal, Area);
        NumberOfPoints = 0;
        KeyPressed = 0;
        UnSelectAll();
        var NbrOfSegments = 25;
        for (SegmentNo = 0; SegmentNo < NbrOfSegments; SegmentNo++) {
            PointCoordinatesArray.items[SegmentNo][0] =
                Math.sin(
                    ((SegmentNo * (180 / NbrOfSegments)) / 360) * 2 * Math.PI
                ) * 150;
            PointCoordinatesArray.items[SegmentNo][1] =
                Math.cos(
                    ((SegmentNo * (180 / NbrOfSegments)) / 360) * 2 * Math.PI
                ) * 150;
        }

        NumberOfRotationSegments = NbrOfSegments;
        TotalEnteredPoints = NbrOfSegments;

        clearScreen();
        CreateRotationObject();
        window.removeEventListener("mousemove", mousemoveevent);
        window.removeEventListener("mousedown", mousedownevent);
        window.removeEventListener("contextmenu", RightMouseClickEvent);
        KeyPressed = 1;
        NumberOfCompleteObjects++;
        // RemoveEmptyObjectNumbers();
    } else {
        alert("Number of total objects reached");
    }
}

function CreateWaves() {
    if (NumberOfCompleteObjects < MaxNbOfCompleteObjects) {
        CloneAreaValues(AreaOriginal, Area);
        NumberOfPoints = 0;
        KeyPressed = 0;
        UnSelectAll();
        var NbrOfWaves = 5;
        var NbrOfSegments = 30;
        var counter = 0;
        for (
            SegmentNo = 0;
            SegmentNo < 2 * Math.PI * NbrOfWaves;
            SegmentNo = SegmentNo + (2 * Math.PI * NbrOfWaves) / NbrOfSegments
        ) {
            PointCoordinatesArray.items[counter][0] =
                (width / (2 * Math.PI * NbrOfWaves)) * SegmentNo;
            PointCoordinatesArray.items[counter][1] =
                (Math.sin(SegmentNo) * Math.exp(-SegmentNo / 10) * height) / 5;
            counter++;
        }

        NumberOfRotationSegments = NbrOfSegments;
        TotalEnteredPoints = NbrOfSegments;

        clearScreen();
        CreateRotationObject();
        window.removeEventListener("mousemove", mousemoveevent);
        window.removeEventListener("mousedown", mousedownevent);
        window.removeEventListener("contextmenu", RightMouseClickEvent);
        KeyPressed = 1;
        NumberOfCompleteObjects++;
        // RemoveEmptyObjectNumbers();
    } else {
        alert("Number of total objects reached");
    }
}

function HideAllExceptFrontView() {
    CanvasTop.hidden = true;
    CanvasSide.hidden = true;
    Canvas.hidden = true;
    zoom.hidden = true;
    zoomnumber.hidden = true;
    perspective.hidden = true;
    perspectivenumber.hidden = true;
    rangex1.hidden = true;
    rangex1number.hidden = true;
    rangez1.hidden = true;
    rangez1number.hidden = true;
    rangez2.hidden = true;
    rangez2number.hidden = true;
    rangey2.hidden = true;
    rangey2number.hidden = true;
    rangex3.hidden = true;
    rangex3number.hidden = true;
    rangey3.hidden = true;
    rangey3number.hidden = true;
}

function PrepareCanvas() {
    Canvas2K.width = rect2K.width;
    Canvas2K.height = rect2K.height;
    Canvas2K.left = rect2K.left;
    Canvas2K.top = rect2K.top;
    DrawingContext2K = Canvas2K.getContext("2d");
    DrawingContext2K.scale(1, 1);
    Canvas2K.style.zIndex = -100000;
    Canvas2K.hidden = true;

    Canvas.width = rect.width;
    Canvas.height = rect.height;
    Canvas.left = rect.left;
    Canvas.top = rect.top;
    DrawingContext = Canvas.getContext("2d");
    DrawingContext.scale(1, 1);

    CanvasTop.width = rect.width;
    CanvasTop.height = rect.height;
    CanvasTop.left = rectTop.left;
    CanvasTop.top = rectTop.top;
    DrawingContextTop = CanvasTop.getContext("2d");
    DrawingContextTop.scale(1, 1);

    CanvasSide.width = rect.width;
    CanvasSide.height = rect.height;
    CanvasSide.left = rectSide.left;
    CanvasSide.top = rectSide.top;
    DrawingContextSide = CanvasSide.getContext("2d");
    DrawingContextSide.scale(1, 1);

    CanvasFront.width = rect.width;
    CanvasFront.height = rect.height;
    CanvasFront.left = rectFront.left;
    CanvasFront.top = rectFront.top;
    DrawingContextFront = CanvasFront.getContext("2d");
    DrawingContextFront.scale(1, 1);

    CanvasObjectAll.width = rectObjectAll.width;
    CanvasObjectAll.height = CanvasObjectAll.height;
    CanvasObjectAll.left = CanvasObjectAll.left;
    CanvasObjectAll.top = CanvasObjectAll.top;
    DrawingContextObjectAll = CanvasObjectAll.getContext("2d");
    DrawingContextObjectAll.scale(1, 1);

    CanvasObject0.width = rectObject0.width;
    CanvasObject0.height = CanvasObject0.height;
    CanvasObject0.left = CanvasObject0.left;
    CanvasObject0.top = CanvasObject0.top;
    DrawingContextObject0 = CanvasObject0.getContext("2d");
    DrawingContextObject0.scale(1, 1);

    CanvasObject1.width = rectObject1.width;
    CanvasObject1.height = CanvasObject1.height;
    CanvasObject1.left = CanvasObject1.left;
    CanvasObject1.top = CanvasObject1.top;
    DrawingContextObject1 = CanvasObject1.getContext("2d");
    DrawingContextObject1.scale(1, 1);

    CanvasObject2.width = rectObject2.width;
    CanvasObject2.height = CanvasObject2.height;
    CanvasObject2.left = CanvasObject2.left;
    CanvasObject2.top = CanvasObject2.top;
    DrawingContextObject2 = CanvasObject2.getContext("2d");
    DrawingContextObject2.scale(1, 1);

    CanvasObject3.width = rectObject3.width;
    CanvasObject3.height = CanvasObject3.height;
    CanvasObject3.left = CanvasObject3.left;
    CanvasObject3.top = CanvasObject3.top;
    DrawingContextObject3 = CanvasObject3.getContext("2d");
    DrawingContextObject3.scale(1, 1);

    CanvasObject4.width = rectObject4.width;
    CanvasObject4.height = CanvasObject4.height;
    CanvasObject4.left = CanvasObject4.left;
    CanvasObject4.top = CanvasObject4.top;
    DrawingContextObject4 = CanvasObject4.getContext("2d");
    DrawingContextObject4.scale(1, 1);

    CanvasObject5.width = rectObject5.width;
    CanvasObject5.height = CanvasObject5.height;
    CanvasObject5.left = CanvasObject5.left;
    CanvasObject5.top = CanvasObject5.top;
    DrawingContextObject5 = CanvasObject5.getContext("2d");
    DrawingContextObject5.scale(1, 1);

    CanvasObject6.width = rectObject6.width;
    CanvasObject6.height = CanvasObject6.height;
    CanvasObject6.left = CanvasObject6.left;
    CanvasObject6.top = CanvasObject6.top;
    DrawingContextObject6 = CanvasObject6.getContext("2d");
    DrawingContextObject6.scale(1, 1);

    CanvasObject7.width = rectObject7.width;
    CanvasObject7.height = CanvasObject7.height;
    CanvasObject7.left = CanvasObject7.left;
    CanvasObject7.top = CanvasObject7.top;
    DrawingContextObject7 = CanvasObject7.getContext("2d");
    DrawingContextObject7.scale(1, 1);

    CanvasObject8.width = rectObject8.width;
    CanvasObject8.height = CanvasObject8.height;
    CanvasObject8.left = CanvasObject8.left;
    CanvasObject8.top = CanvasObject8.top;
    DrawingContextObject8 = CanvasObject8.getContext("2d");
    DrawingContextObject8.scale(1, 1);
}

function NumbersForObjectWindows() {
    drawTextSmallWindow(
        2,
        25,
        "All",
        DrawingContextObjectAll,
        "#000000",
        "left"
    );
    drawTextSmallWindow(
        2,
        25,
        0 + SelectedEightObjects,
        DrawingContextObject0,
        "#000000",
        "left"
    );
    drawTextSmallWindow(
        2,
        25,
        1 + SelectedEightObjects,
        DrawingContextObject1,
        "#000000",
        "left"
    );
    drawTextSmallWindow(
        2,
        25,
        2 + SelectedEightObjects,
        DrawingContextObject2,
        "#000000",
        "left"
    );
    drawTextSmallWindow(
        2,
        25,
        3 + SelectedEightObjects,
        DrawingContextObject3,
        "#000000",
        "left"
    );
    drawTextSmallWindow(
        2,
        25,
        4 + SelectedEightObjects,
        DrawingContextObject4,
        "#000000",
        "left"
    );
    drawTextSmallWindow(
        2,
        25,
        5 + SelectedEightObjects,
        DrawingContextObject5,
        "#000000",
        "left"
    );
    drawTextSmallWindow(
        2,
        25,
        6 + SelectedEightObjects,
        DrawingContextObject6,
        "#000000",
        "left"
    );
    drawTextSmallWindow(
        2,
        25,
        7 + SelectedEightObjects,
        DrawingContextObject7,
        "#000000",
        "left"
    );
    drawTextSmallWindow(
        2,
        25,
        8 + SelectedEightObjects,
        DrawingContextObject8,
        "#000000",
        "left"
    );
}

function UnSelectAll() {
    CanvasObjectAll.style.border = "1px solid black";
    CanvasObject0.style.border = "1px solid black";
    CanvasObject1.style.border = "1px solid black";
    CanvasObject2.style.border = "1px solid black";
    CanvasObject3.style.border = "1px solid black";
    CanvasObject4.style.border = "1px solid black";
    CanvasObject5.style.border = "1px solid black";
    CanvasObject6.style.border = "1px solid black";
    CanvasObject7.style.border = "1px solid black";
    CanvasObject8.style.border = "1px solid black";
    for (i = 0; i < AreaIndex; i++) {
        SelectedArea[i] = false;
    }

    rangeRed.value = 0;
    rangeGreen.value = 0;
    rangeBlue.value = 0;
    rangeColors.value = "#000000";
    rangeRefractiveIndexOfMaterial.value = 0.1;
    rangeSurfaceStructur.value = 1;
    rangePartOfDirectLight.value = 0;
    rangePartOfReflectlight.value = 0;
    rangePartOfRefractionlight.value = 0;
    //rangePartSurrounding.value = 0;
}

function UnSelectObject(what) {
    what.replace(" ", "");
    for (i = 0; i < AreaIndex; i++) {
        if (what == "all" || AreaBelongsToObject[i] == parseInt(what, 10)) {
            SelectedArea[i] = false;
        }
    }
}

function CheckIfSelectedWindow() {
    CanvasObject0.style.border = "1px solid black";
    CanvasObject1.style.border = "1px solid black";
    CanvasObject2.style.border = "1px solid black";
    CanvasObject3.style.border = "1px solid black";
    CanvasObject4.style.border = "1px solid black";
    CanvasObject5.style.border = "1px solid black";
    CanvasObject6.style.border = "1px solid black";
    CanvasObject7.style.border = "1px solid black";
    CanvasObject8.style.border = "1px solid black";
    for (i = 0; i < AreaIndex; i++) {
        if (
            AreaBelongsToObject[i] == 0 + SelectedEightObjects &&
            SelectedArea[i] == true
        ) {
            CanvasObject0.style.border = "1px solid red";
        }
        if (
            AreaBelongsToObject[i] == 1 + SelectedEightObjects &&
            SelectedArea[i] == true
        ) {
            CanvasObject1.style.border = "1px solid red";
        }
        if (
            AreaBelongsToObject[i] == 2 + SelectedEightObjects &&
            SelectedArea[i] == true
        ) {
            CanvasObject2.style.border = "1px solid red";
        }
        if (
            AreaBelongsToObject[i] == 3 + SelectedEightObjects &&
            SelectedArea[i] == true
        ) {
            CanvasObject3.style.border = "1px solid red";
        }
        if (
            AreaBelongsToObject[i] == 4 + SelectedEightObjects &&
            SelectedArea[i] == true
        ) {
            CanvasObject4.style.border = "1px solid red";
        }
        if (
            AreaBelongsToObject[i] == 5 + SelectedEightObjects &&
            SelectedArea[i] == true
        ) {
            CanvasObject5.style.border = "1px solid red";
        }
        if (
            AreaBelongsToObject[i] == 6 + SelectedEightObjects &&
            SelectedArea[i] == true
        ) {
            CanvasObject6.style.border = "1px solid red";
        }
        if (
            AreaBelongsToObject[i] == 7 + SelectedEightObjects &&
            SelectedArea[i] == true
        ) {
            CanvasObject7.style.border = "1px solid red";
        }
        if (
            AreaBelongsToObject[i] == 8 + SelectedEightObjects &&
            SelectedArea[i] == true
        ) {
            CanvasObject8.style.border = "1px solid red";
        }
    }
}

function SelectObject(what) {
    if (isNaN(what)) {
        what = what.replace(" ", "");
    }
    // UnSelectAll();
    if (what == "all") {
        UnSelectAll();
    } else {
        CanvasObjectAll.style.border = "1px solid black";
    }

    document.getElementById("Light0UnSelect").style.display = "none";
    document.getElementById("Light0Select").style.display = "block";
    MoveLight.items[0] = false;
    SetColorOfLight.items[0] = false;
    document.getElementById("Light1UnSelect").style.display = "none";
    document.getElementById("Light1Select").style.display = "block";
    MoveLight.items[1] = false;
    SetColorOfLight.items[1] = false;
    document.getElementById("Light2UnSelect").style.display = "none";
    document.getElementById("Light2Select").style.display = "block";
    MoveLight.items[2] = false;
    SetColorOfLight.items[2] = false;
    document.getElementById("Light3UnSelect").style.display = "none";
    document.getElementById("Light3Select").style.display = "block";
    MoveLight.items[3] = false;
    SetColorOfLight.items[3] = false;
    document.getElementById("Light4UnSelect").style.display = "none";
    document.getElementById("Light4Select").style.display = "block";
    MoveLight.items[4] = false;
    SetColorOfLight.items[4] = false;

    for (i = 0; i < AreaIndex; i++) {
        if (what == "all" || AreaBelongsToObject[i] == parseInt(what, 10)) {
            SelectedArea[i] = true;
            if (AreaConstants.items[i] != null) {
                rangeRed.value = AreaConstants.items[i].ColorOfObjectRed;
                rangeGreen.value = AreaConstants.items[i].ColorOfObjectGreen;
                rangeBlue.value = AreaConstants.items[i].ColorOfObjectBlue;
                var a = (
                    "0000" +
                    parseInt(
                        AreaConstants.items[i].ColorOfObjectRed * 255,
                        10
                    ).toString(16)
                ).slice(-2);
                var b = (
                    "0000" +
                    parseInt(
                        AreaConstants.items[i].ColorOfObjectGreen * 255,
                        10
                    ).toString(16)
                ).slice(-2);
                var c = (
                    "0000" +
                    parseInt(
                        AreaConstants.items[i].ColorOfObjectBlue * 255,
                        10
                    ).toString(16)
                ).slice(-2);
                rangeColors.value = "#" + a + b + c;
                rangeRefractiveIndexOfMaterial.value =
                    AreaConstants.items[i].RefractiveIndexOfMaterial;
                rangeSurfaceStructur.value =
                    AreaConstants.items[i].SurfaceStructur;
                rangePartOfDirectLight.value =
                    AreaConstants.items[i].PartOfDirectLight;
                rangePartOfReflectlight.value =
                    AreaConstants.items[i].PartOfReflectlight;
                rangePartOfRefractionlight.value =
                    AreaConstants.items[i].PartOfRefractionlight;
                rangePartSurrounding.value = PartSurrounding;
                document.getElementById(
                    "RefractiveIndexOfMaterialnumber"
                ).value = AreaConstants.items[i].RefractiveIndexOfMaterial;
                document.getElementById("SurfaceStructurnumber").value =
                    AreaConstants.items[i].SurfaceStructur;
                document.getElementById("PartOfDirectLightnumber").value =
                    AreaConstants.items[i].PartOfDirectLight;
                document.getElementById("PartOfReflectlightnumber").value =
                    AreaConstants.items[i].PartOfReflectlight;
                document.getElementById("PartOfRefractionlightnumber").value =
                    AreaConstants.items[i].PartOfRefractionlight;
                document.getElementById("PartSurroundingnumber").value =
                    PartSurrounding;
            }
        }
        rangePartSurrounding.value = PartSurrounding;
    }
    // RemoveEmptyObjectNumbers();
}

function DeleteObject(Number) {
    // Funktion tut nicht richtig. Sie verzieht alle Objekte.
    CloneAreaValues(AreaOriginal, Area);
    var deleted = false;
    var AreaIndexOrig = AreaIndex;
    for (ii = AreaIndexOrig - 1; ii >= 0; ii--) {
        if (
            (Number != undefined && AreaBelongsToObject[ii] == Number) ||
            (Number == undefined && SelectedArea[ii] == true)
        ) {
            for (jj = ii + 1; jj < AreaIndex; jj++) {
                CloneAreaValuesOfSpecificArea(jj, ii);
                AreaBelongsToObject[ii] = AreaBelongsToObject[jj];
                SetupAreaConstants(ii);
                CloneAreaConstants(jj, ii);
                deleted = true;
            }
            // if (deleted == true) {AreaIndex--;}
            AreaIndex--;
            deleted = false;
        }
    }
    // if (deleted == true) {NumberOfCompleteObjects--;}
    CloneAreaValues(Area, AreaOriginal);
    UnSelectAll();
    RemoveEmptyObjectNumbers();
    RemoveEmptyObjectNumbers();
    ShowAreaOf3DObjectSmallWindows();
}

function RemoveEmptyObjectNumbers() {
    CloneAreaValues(AreaOriginal, Area);
    var deleted = false;
    var AreaIndexOrig = AreaIndex;
    var empty = true;
    for (kk = 0; kk < NumberOfCompleteObjects; kk++) {
        empty = true;
        for (ii = 0; ii < AreaIndexOrig; ii++) {
            if (AreaBelongsToObject[ii] == kk) {
                empty = false;
            }
        }
        if (empty == true) {
            // kk = NumberOfCompleteObjects;
            // for (iii = AreaIndexOrig-1; iii >= 0; iii--)
            // {
            // for (jj = iii+1; jj < AreaIndex; jj++)
            // {
            // CloneAreaValuesOfSpecificArea(jj, iii);
            // AreaBelongsToObject[iii] = AreaBelongsToObject[jj];
            // CloneAreaConstants(jj, iii);
            // }
            // AreaIndex--;
            // deleted = true;
            // }
            // }
            // if (deleted == true) {NumberOfCompleteObjects--;}
            for (iii = AreaIndexOrig - 1; iii >= 0; iii--) {
                if (AreaBelongsToObject[iii] > kk) {
                    AreaBelongsToObject[iii] = AreaBelongsToObject[iii] - 1;
                    //kk = 0;
                }
            }
        }
    }
    CloneAreaValues(Area, AreaOriginal);
}

function CheckForEmptyObjectNumbers(Number) {
    var empty = true;
    for (ii = 0; ii < AreaIndex; ii++) {
        if (AreaBelongsToObject[ii] == number) {
            return false;
        }
    }
    return true;
}

function CopyObject(Number) {
    CloneAreaValues(AreaOriginal, Area);
    var NewObjectCreated = false;
    var AreaIndexOrig = AreaIndex;
    for (i = 0; i < AreaIndexOrig; i++) {
        if (
            (Number != undefined && AreaBelongsToObject[i] == Number) ||
            (Number == undefined && SelectedArea[i] == true)
        ) {
            CloneAreaValuesOfSpecificArea(i, AreaIndex);
            AreaBelongsToObject[AreaIndex] = NumberOfCompleteObjects;
            CloneAreaConstants(i, AreaIndex);
            AreaIndex++;
            NewObjectCreated = true;
        }
    }
    if (NewObjectCreated == true) {
        NumberOfCompleteObjects++;
        NewObjectCreated = false;
    }
    CloneAreaValues(Area, AreaOriginal);
    RemoveEmptyObjectNumbers();
    RemoveEmptyObjectNumbers();
    ShowAreaOf3DObjectSmallWindows();
}

function SetColor(value, component) {
    if (
        SetColorOfLight.items[0] == true ||
        SetColorOfLight.items[1] == true ||
        SetColorOfLight.items[2] == true ||
        SetColorOfLight.items[3] == true ||
        SetColorOfLight.items[4] == true ||
        SetColorOfLight.items[5] == true ||
        SetColorOfLight.items[6] == true ||
        SetColorOfLight.items[7] == true ||
        SetColorOfLight.items[8] == true ||
        SetColorOfLight.items[9] == true
    ) {
        if (component == "colors") {
            var a = parseInt(rangeColors.value.substring(1, 3), 16) / 255;
            var b = parseInt(rangeColors.value.substring(3, 5), 16) / 255;
            var c = parseInt(rangeColors.value.substring(5, 7), 16) / 255;
            for (lamp = 0; lamp < 5; lamp++) {
                if (SetColorOfLight.items[lamp] == true) {
                    ColorOfLightSource.items[lamp] = {
                        Red: a,
                        Green: b,
                        Blue: c,
                    };
                }
            }
        }
    } else {
        CloneAreaValues(AreaOriginal, Area);
        for (i = 0; i < AreaIndex; i++) {
            if (SelectedArea[i] == true) {
                if (component == "red") {
                    AreaConstants.items[i].ColorOfObjectRed = value / 255;
                }
                if (component == "green") {
                    AreaConstants.items[i].ColorOfObjectGreen = value / 255;
                }
                if (component == "blue") {
                    AreaConstants.items[i].ColorOfObjectBlue = value / 255;
                }
                if (component == "colors") {
                    AreaConstants.items[i].ColorOfObjectRed =
                        parseInt(value.substring(1, 3), 16) / 255;
                    AreaConstants.items[i].ColorOfObjectGreen =
                        parseInt(value.substring(3, 5), 16) / 255;
                    AreaConstants.items[i].ColorOfObjectBlue =
                        parseInt(value.substring(5, 7), 16) / 255;
                }
            }
        }
        CloneAreaValues(Area, AreaOriginal);
    }
    ShowAreaOf3DObject();
    ShowAreaOf3DObjectSmallWindows();
}

function CloneAreaConstants(From, To) {
    AreaConstants.items[To] = {
        a: AreaConstants.items[From].a,
        b: AreaConstants.items[From].b,
        c: AreaConstants.items[From].c,
        d: AreaConstants.items[From].d,
        nx: AreaConstants.items[From].nx,
        ny: AreaConstants.items[From].ny,
        nz: AreaConstants.items[From].nz,
        CenterX: AreaConstants.items[From].CenterX,
        CenterY: AreaConstants.items[From].CenterY,
        CenterZ: AreaConstants.items[From].CenterZ,
        ColorOfObjectRed: AreaConstants.items[From].ColorOfObjectRed,
        ColorOfObjectGreen: AreaConstants.items[From].ColorOfObjectGreen,
        ColorOfObjectBlue: AreaConstants.items[From].ColorOfObjectBlue,
        TypeOfColor: AreaConstants.items[From].TypeOfColor,
        RefractiveIndexOfMaterial:
            AreaConstants.items[From].RefractiveIndexOfMaterial,
        SurfaceStructur: AreaConstants.items[From].SurfaceStructur,
        PartOfDirectLight: AreaConstants.items[From].PartOfDirectLight,
        PartOfReflectlight: AreaConstants.items[From].PartOfReflectlight,
        PartOfRefractionlight: AreaConstants.items[From].PartOfRefractionlight,
        PartSurrounding: AreaConstants.items[From].PartSurrounding,
        LargestSizeOfAreaInXDirectionMax:
            AreaConstants.items[From].LargestSizeOfAreaInXDirectionMax,
        LargestSizeOfAreaInYDirectionMax:
            AreaConstants.items[From].LargestSizeOfAreaInYDirectionMax,
        LargestSizeOfAreaInZDirectionMax:
            AreaConstants.items[From].LargestSizeOfAreaInZDirectionMax,
        LargestSizeOfAreaInXDirectionMin:
            AreaConstants.items[From].LargestSizeOfAreaInXDirectionMin,
        LargestSizeOfAreaInYDirectionMin:
            AreaConstants.items[From].LargestSizeOfAreaInYDirectionMin,
        LargestSizeOfAreaInZDirectionMin:
            AreaConstants.items[From].LargestSizeOfAreaInZDirectionMin,
        TotalAngleX: AreaConstants.items[From].TotalAngleX,
        TotalAngleY: AreaConstants.items[From].TotalAngleY,
        TotalAngleZ: AreaConstants.items[From].TotalAngleZ,
        RoundedEdges: AreaConstants.items[From].RoundedEdges,
        AdjacentAreas: AreaConstants.items[From].AdjacentAreas,
    };
}

function SetupAreaConstants(index) {
    AreaConstants.items[index] = {
        a: 0,
        b: 0,
        c: 0,
        d: 0,
        nx: 0,
        ny: 0,
        nz: 0,
        ColorOfObjectRed: 212 / 255,
        ColorOfObjectGreen: 175 / 255,
        ColorOfObjectBlue: 55 / 255,
        TypeOfColor: "Color",
        RefractiveIndexOfMaterial: 1.5,
        SurfaceStructur: 4,
        PartOfDirectLight: 0.6,
        PartOfReflectlight: 0.25,
        PartOfRefractionlight: 0.15,
        PartSurrounding: 0.0,
        LargestSizeOfAreaInXDirectionMax: 100,
        LargestSizeOfAreaInYDirectionMax: 100,
        LargestSizeOfAreaInZDirectionMax: 100,
        LargestSizeOfAreaInXDirectionMin: 100,
        LargestSizeOfAreaInYDirectionMin: 100,
        LargestSizeOfAreaInZDirectionMin: 100,
        TotalAngleX: 0,
        TotalAngleY: 0,
        TotalAngleZ: 0,
        RoundedEdges: false,
    };
}

function SetPropertiesOfMaterial(value, property) {
    CloneAreaValues(AreaOriginal, Area);
    var LastSelectedItem = 999999;
    for (i = 0; i < AreaIndex; i++) {
        if (SelectedArea[i] == true) {
            if (property == "RefractiveIndexOfMaterial") {
                AreaConstants.items[i].RefractiveIndexOfMaterial = value;
            }
            if (property == "SurfaceStructur") {
                AreaConstants.items[i].SurfaceStructur = value;
            }
            if (property == "PartOfDirectLight") {
                AreaConstants.items[i].PartOfDirectLight = value;
                var TotalParts =
                    parseFloat(rangePartOfReflectlight.value) +
                    parseFloat(rangePartOfRefractionlight.value); // + parseFloat(PartSurrounding);
                if (TotalParts == 0)
                    AreaConstants.items[i].PartOfReflectlight = 0.1;
                else
                    AreaConstants.items[i].PartOfReflectlight =
                        (AreaConstants.items[i].PartOfReflectlight /
                            TotalParts) *
                        (1 - AreaConstants.items[i].PartOfDirectLight);
                if (TotalParts == 0)
                    AreaConstants.items[i].PartOfRefractionlight = 0.1;
                else
                    AreaConstants.items[i].PartOfRefractionlight =
                        (AreaConstants.items[i].PartOfRefractionlight /
                            TotalParts) *
                        (1 - AreaConstants.items[i].PartOfDirectLight);
                // if (TotalParts == 0) PartSurrounding = 0.1; else PartSurrounding = PartSurrounding / TotalParts * (1-AreaConstants.items[i].PartOfDirectLight);
            }
            if (property == "PartOfReflectlight") {
                AreaConstants.items[i].PartOfReflectlight = value;
                var TotalParts =
                    parseFloat(rangePartOfDirectLight.value) +
                    parseFloat(rangePartOfRefractionlight.value); // + parseFloat(PartSurrounding);
                if (TotalParts == 0)
                    AreaConstants.items[i].PartOfDirectLight = 0.1;
                else
                    AreaConstants.items[i].PartOfDirectLight =
                        (AreaConstants.items[i].PartOfDirectLight /
                            TotalParts) *
                        (1 - AreaConstants.items[i].PartOfReflectlight);
                if (TotalParts == 0)
                    AreaConstants.items[i].PartOfRefractionlight = 0.1;
                else
                    AreaConstants.items[i].PartOfRefractionlight =
                        (AreaConstants.items[i].PartOfRefractionlight /
                            TotalParts) *
                        (1 - AreaConstants.items[i].PartOfReflectlight);
                // if (TotalParts == 0) PartSurrounding = 0.1; else PartSurrounding = PartSurrounding / TotalParts * (1-AreaConstants.items[i].PartOfReflectlight);
            }
            if (property == "PartOfRefractionlight") {
                AreaConstants.items[i].PartOfRefractionlight = value;
                var TotalParts =
                    parseFloat(rangePartOfDirectLight.value) +
                    parseFloat(rangePartOfReflectlight.value); // + parseFloat(PartSurrounding);
                if (TotalParts == 0)
                    AreaConstants.items[i].PartOfDirectLight = 0.1;
                else
                    AreaConstants.items[i].PartOfDirectLight =
                        (AreaConstants.items[i].PartOfDirectLight /
                            TotalParts) *
                        (1 - AreaConstants.items[i].PartOfRefractionlight);
                if (TotalParts == 0)
                    AreaConstants.items[i].PartOfReflectlight = 0.1;
                else
                    AreaConstants.items[i].PartOfReflectlight =
                        (AreaConstants.items[i].PartOfReflectlight /
                            TotalParts) *
                        (1 - AreaConstants.items[i].PartOfRefractionlight);
                // if (TotalParts == 0) PartSurrounding = 0.1; else PartSurrounding = PartSurrounding / TotalParts * (1-AreaConstants.items[i].PartOfRefractionlight);
            }
            if (property == "PartSurrounding") {
                PartSurrounding = value;
                // var TotalParts = parseFloat(rangePartOfDirectLight.value) + parseFloat(rangePartOfReflectlight.value) + parseFloat(rangePartOfRefractionlight.value);
                // if (TotalParts == 0) AreaConstants.items[i].PartOfDirectLight = 0.1; else AreaConstants.items[i].PartOfDirectLight = AreaConstants.items[i].PartOfDirectLight / TotalParts * (1-PartSurrounding);
                // if (TotalParts == 0) AreaConstants.items[i].PartOfReflectlight = 0.1; else AreaConstants.items[i].PartOfReflectlight = AreaConstants.items[i].PartOfReflectlight / TotalParts * (1-PartSurrounding);
                // if (TotalParts == 0) AreaConstants.items[i].PartOfRefractionlight = 0.1; else AreaConstants.items[i].PartOfRefractionlight = AreaConstants.items[i].PartOfRefractionlight / TotalParts * (1-PartSurrounding);
            }
            LastSelectedItem = i;
        }
    }
    if (LastSelectedItem != 999999) {
        rangePartOfDirectLight.value =
            AreaConstants.items[LastSelectedItem].PartOfDirectLight;
        rangePartOfReflectlight.value =
            AreaConstants.items[LastSelectedItem].PartOfReflectlight;
        rangePartOfRefractionlight.value =
            AreaConstants.items[LastSelectedItem].PartOfRefractionlight;
        rangePartSurrounding.value = PartSurrounding;
        document.getElementById("RefractiveIndexOfMaterialnumber").value =
            AreaConstants.items[LastSelectedItem].RefractiveIndexOfMaterial;
        document.getElementById("SurfaceStructurnumber").value =
            AreaConstants.items[LastSelectedItem].SurfaceStructur;
        document.getElementById("PartOfDirectLightnumber").value =
            AreaConstants.items[LastSelectedItem].PartOfDirectLight;
        document.getElementById("PartOfReflectlightnumber").value =
            AreaConstants.items[LastSelectedItem].PartOfReflectlight;
        document.getElementById("PartOfRefractionlightnumber").value =
            AreaConstants.items[LastSelectedItem].PartOfRefractionlight;
        document.getElementById("PartSurroundingnumber").value =
            PartSurrounding;
    }
    CloneAreaValues(Area, AreaOriginal);
}

function max(a, b) {
    if (a > b) {
        return a;
    } else {
        return b;
    }
}

function zoomen(value) {
    CloneAreaValues(AreaOriginal, Area);
    for (i = 0; i < AreaIndex; i++) {
        // if (SelectedArea[i] == true)
        // {
        for (k = 0; k < 3; k++) {
            Area.items[i][0][k] = Area.items[i][0][k] * value;
            Area.items[i][1][k] = Area.items[i][1][k] * value;
            Area.items[i][2][k] = Area.items[i][2][k] * value;
        }
        // }
    }
    CloneAreaValues(Area, AreaOriginal);
    for (lamp = 0; lamp < 5; lamp++) {
        LightSourceX.items[lamp] = LightSourceX.items[lamp] * value;
        LightSourceY.items[lamp] = LightSourceY.items[lamp] * value;
        LightSourceZ.items[lamp] = LightSourceZ.items[lamp] * value;
    }
}

function CenterLight(number) {
    LightSourceX.items[number] = 0;
    LightSourceY.items[number] = 0;
    LightSourceZ.items[number] = 0;
}

function ReduceSizeInOneDirection() {
    CloneAreaValues(AreaOriginal, Area);
    for (i = 0; i < AreaIndex; i++) {
        if (SelectedArea[i] == true) {
            for (j = 0; j < 3; j++) {
                if (MoveX != 0)
                    Area.items[i][j][0] =
                        Area.items[i][j][0] * (Math.sign(MoveX) * 0.01 + 1);
                if (MoveY != 0)
                    Area.items[i][j][1] =
                        Area.items[i][j][1] * (Math.sign(MoveY) * 0.01 + 1);
                if (MoveZ != 0)
                    Area.items[i][j][2] =
                        Area.items[i][j][2] * (Math.sign(MoveZ) * 0.01 + 1);
            }
        }
    }
    CloneAreaValues(Area, AreaOriginal);
    MoveX = 0;
    MoveY = 0;
    MoveZ = 0;
}

function MakeFourAreasFromOne() {
    CloneAreaValues(AreaOriginal, Area);
    var AreaIndexOrig = AreaIndex;
    for (i = 0; i < AreaIndexOrig; i++) {
        if (SelectedArea[i] == true) {
            CloneAreaValuesOfSpecificArea(i, AreaIndex);
            AreaBelongsToObject[AreaIndex] = AreaBelongsToObject[i];
            SetupAreaConstants(AreaIndex);
            CloneAreaConstants(i, AreaIndex);
            SelectedArea[AreaIndex] = true;
            Area.items[AreaIndex][0][0] = Area.items[i][0][0];
            Area.items[AreaIndex][0][1] = Area.items[i][0][1];
            Area.items[AreaIndex][0][2] = Area.items[i][0][2];
            Area.items[AreaIndex][1][0] =
                (Area.items[i][0][0] + Area.items[i][1][0]) / 2;
            Area.items[AreaIndex][1][1] =
                (Area.items[i][0][1] + Area.items[i][1][1]) / 2;
            Area.items[AreaIndex][1][2] =
                (Area.items[i][0][2] + Area.items[i][1][2]) / 2;
            Area.items[AreaIndex][2][0] =
                (Area.items[i][0][0] + Area.items[i][2][0]) / 2;
            Area.items[AreaIndex][2][1] =
                (Area.items[i][0][1] + Area.items[i][2][1]) / 2;
            Area.items[AreaIndex][2][2] =
                (Area.items[i][0][2] + Area.items[i][2][2]) / 2;
            AreaIndex++;
            CloneAreaValuesOfSpecificArea(i, AreaIndex);
            AreaBelongsToObject[AreaIndex] = AreaBelongsToObject[i];
            SetupAreaConstants(AreaIndex);
            CloneAreaConstants(i, AreaIndex);
            SelectedArea[AreaIndex] = true;
            Area.items[AreaIndex][1][0] = Area.items[i][1][0];
            Area.items[AreaIndex][1][1] = Area.items[i][1][1];
            Area.items[AreaIndex][1][2] = Area.items[i][1][2];
            Area.items[AreaIndex][2][0] =
                (Area.items[i][1][0] + Area.items[i][2][0]) / 2;
            Area.items[AreaIndex][2][1] =
                (Area.items[i][1][1] + Area.items[i][2][1]) / 2;
            Area.items[AreaIndex][2][2] =
                (Area.items[i][1][2] + Area.items[i][2][2]) / 2;
            Area.items[AreaIndex][0][0] =
                (Area.items[i][1][0] + Area.items[i][0][0]) / 2;
            Area.items[AreaIndex][0][1] =
                (Area.items[i][1][1] + Area.items[i][0][1]) / 2;
            Area.items[AreaIndex][0][2] =
                (Area.items[i][1][2] + Area.items[i][0][2]) / 2;
            AreaIndex++;
            CloneAreaValuesOfSpecificArea(i, AreaIndex);
            AreaBelongsToObject[AreaIndex] = AreaBelongsToObject[i];
            SetupAreaConstants(AreaIndex);
            CloneAreaConstants(i, AreaIndex);
            SelectedArea[AreaIndex] = true;
            Area.items[AreaIndex][2][0] = Area.items[i][2][0];
            Area.items[AreaIndex][2][1] = Area.items[i][2][1];
            Area.items[AreaIndex][2][2] = Area.items[i][2][2];
            Area.items[AreaIndex][0][0] =
                (Area.items[i][2][0] + Area.items[i][0][0]) / 2;
            Area.items[AreaIndex][0][1] =
                (Area.items[i][2][1] + Area.items[i][0][1]) / 2;
            Area.items[AreaIndex][0][2] =
                (Area.items[i][2][2] + Area.items[i][0][2]) / 2;
            Area.items[AreaIndex][1][0] =
                (Area.items[i][2][0] + Area.items[i][1][0]) / 2;
            Area.items[AreaIndex][1][1] =
                (Area.items[i][2][1] + Area.items[i][1][1]) / 2;
            Area.items[AreaIndex][1][2] =
                (Area.items[i][2][2] + Area.items[i][1][2]) / 2;
            AreaIndex++;
            CloneAreaValuesOfSpecificArea(i, AreaIndex);
            AreaBelongsToObject[AreaIndex] = AreaBelongsToObject[i];
            SetupAreaConstants(AreaIndex);
            CloneAreaConstants(i, AreaIndex);
            SelectedArea[AreaIndex] = true;
            Area.items[AreaIndex][0][0] =
                (Area.items[i][0][0] + Area.items[i][1][0]) / 2;
            Area.items[AreaIndex][0][1] =
                (Area.items[i][0][1] + Area.items[i][1][1]) / 2;
            Area.items[AreaIndex][0][2] =
                (Area.items[i][0][2] + Area.items[i][1][2]) / 2;
            Area.items[AreaIndex][1][0] =
                (Area.items[i][1][0] + Area.items[i][2][0]) / 2;
            Area.items[AreaIndex][1][1] =
                (Area.items[i][1][1] + Area.items[i][2][1]) / 2;
            Area.items[AreaIndex][1][2] =
                (Area.items[i][1][2] + Area.items[i][2][2]) / 2;
            Area.items[AreaIndex][2][0] =
                (Area.items[i][0][0] + Area.items[i][2][0]) / 2;
            Area.items[AreaIndex][2][1] =
                (Area.items[i][0][1] + Area.items[i][2][1]) / 2;
            Area.items[AreaIndex][2][2] =
                (Area.items[i][0][2] + Area.items[i][2][2]) / 2;
            // AreaIndex++;
            Area.items[i][0][0] = Area.items[AreaIndex][0][0];
            Area.items[i][0][1] = Area.items[AreaIndex][0][1];
            Area.items[i][0][2] = Area.items[AreaIndex][0][2];
            Area.items[i][1][0] = Area.items[AreaIndex][1][0];
            Area.items[i][1][1] = Area.items[AreaIndex][1][1];
            Area.items[i][1][2] = Area.items[AreaIndex][1][2];
            Area.items[i][2][0] = Area.items[AreaIndex][2][0];
            Area.items[i][2][1] = Area.items[AreaIndex][2][1];
            Area.items[i][2][2] = Area.items[AreaIndex][2][2];
        }
    }
    CloneAreaValues(Area, AreaOriginal);
}

function MakeLessSmooth() {
    var a = 1;
    var b = 0;
    var c = 0;
    var d = 0;
    CloneAreaValues(AreaOriginal, Area);
    for (i = 0; i < AreaIndex; i++) {
        if (SelectedArea[i] == true) {
            for (j = 0; j < 3; j++) {
                a = (Math.random() - 0.5) / 100 + 1;
                b = Area.items[i][j][0];
                c = Area.items[i][j][1];
                d = Area.items[i][j][2];
                for (ii = 0; ii < AreaIndex; ii++) {
                    for (jj = 0; jj < 3; jj++) {
                        if (
                            Math.abs(Area.items[ii][jj][0] - b) < 1e-9 &&
                            Math.abs(Area.items[ii][jj][1] - c) < 1e-9 &&
                            Math.abs(Area.items[ii][jj][2] - d) < 1e-9
                        ) {
                            Area.items[ii][jj][0] = Area.items[ii][jj][0] * a;
                            Area.items[ii][jj][1] = Area.items[ii][jj][1] * a;
                            Area.items[ii][jj][2] = Area.items[ii][jj][2] * a;
                        }
                    }
                }
            }
        }
    }
    CloneAreaValues(Area, AreaOriginal);
}

function CalcSizeOfObject() {
    var xmax = -1e10;
    var xmin = 1e10;
    var ymax = -1e10;
    var ymin = 1e10;
    var zmax = -1e10;
    var zmin = 1e10;

    for (i = 0; i < AreaIndex; i++) {
        xmax = -1e10;
        xmin = 1e10;
        ymax = -1e10;
        ymin = 1e10;
        zmax = -1e10;
        zmin = 1e10;

        if (Area.items[i][0][0] > xmax) {
            xmax = Area.items[i][0][0];
        }
        if (Area.items[i][1][0] > xmax) {
            xmax = Area.items[i][1][0];
        }
        if (Area.items[i][2][0] > xmax) {
            xmax = Area.items[i][2][0];
        }

        if (Area.items[i][0][0] < xmin) {
            xmin = Area.items[i][0][0];
        }
        if (Area.items[i][1][0] < xmin) {
            xmin = Area.items[i][1][0];
        }
        if (Area.items[i][2][0] < xmin) {
            xmin = Area.items[i][2][0];
        }

        if (Area.items[i][0][1] > ymax) {
            ymax = Area.items[i][0][1];
        }
        if (Area.items[i][1][1] > ymax) {
            ymax = Area.items[i][1][1];
        }
        if (Area.items[i][2][1] > ymax) {
            ymax = Area.items[i][2][1];
        }

        if (Area.items[i][0][1] < ymin) {
            ymin = Area.items[i][0][1];
        }
        if (Area.items[i][1][1] < ymin) {
            ymin = Area.items[i][1][1];
        }
        if (Area.items[i][2][1] < ymin) {
            ymin = Area.items[i][2][1];
        }

        if (Area.items[i][0][2] > zmax) {
            zmax = Area.items[i][0][2];
        }
        if (Area.items[i][1][2] > zmax) {
            zmax = Area.items[i][1][2];
        }
        if (Area.items[i][2][2] > zmax) {
            zmax = Area.items[i][2][2];
        }

        if (Area.items[i][0][2] < zmin) {
            zmin = Area.items[i][0][2];
        }
        if (Area.items[i][1][2] < zmin) {
            zmin = Area.items[i][1][2];
        }
        if (Area.items[i][2][2] < zmin) {
            zmin = Area.items[i][2][2];
        }

        AreaConstants.items[i].LargestSizeOfAreaInXDirectionMax = xmax;
        AreaConstants.items[i].LargestSizeOfAreaInYDirectionMax = ymax;
        AreaConstants.items[i].LargestSizeOfAreaInZDirectionMax = zmax;
        AreaConstants.items[i].LargestSizeOfAreaInXDirectionMin = xmin;
        AreaConstants.items[i].LargestSizeOfAreaInYDirectionMin = ymin;
        AreaConstants.items[i].LargestSizeOfAreaInZDirectionMin = zmin;
    }
    for (j = 0; j <= NumberOfCompleteObjects; j++) {
        xmax = -1e10;
        ymax = -1e10;
        zmax = -1e10;
        xmin = 1e10;
        ymin = 1e10;
        zmin = 1e10;
        for (i = 0; i < AreaIndex; i++) {
            if (AreaBelongsToObject[i] == j) {
                if (
                    xmax <
                    AreaConstants.items[i].LargestSizeOfAreaInXDirectionMax
                ) {
                    xmax =
                        AreaConstants.items[i].LargestSizeOfAreaInXDirectionMax;
                }
                if (
                    ymax <
                    AreaConstants.items[i].LargestSizeOfAreaInYDirectionMax
                ) {
                    ymax =
                        AreaConstants.items[i].LargestSizeOfAreaInYDirectionMax;
                }
                if (
                    zmax <
                    AreaConstants.items[i].LargestSizeOfAreaInZDirectionMax
                ) {
                    zmax =
                        AreaConstants.items[i].LargestSizeOfAreaInZDirectionMax;
                }
                if (
                    xmin >
                    AreaConstants.items[i].LargestSizeOfAreaInXDirectionMin
                ) {
                    xmin =
                        AreaConstants.items[i].LargestSizeOfAreaInXDirectionMin;
                }
                if (
                    ymin >
                    AreaConstants.items[i].LargestSizeOfAreaInYDirectionMin
                ) {
                    ymin =
                        AreaConstants.items[i].LargestSizeOfAreaInYDirectionMin;
                }
                if (
                    zmin >
                    AreaConstants.items[i].LargestSizeOfAreaInZDirectionMin
                ) {
                    zmin =
                        AreaConstants.items[i].LargestSizeOfAreaInZDirectionMin;
                }
            }
        }
        for (i = 0; i < AreaIndex; i++) {
            if (AreaBelongsToObject[i] == j) {
                AreaConstants.items[i].LargestSizeOfAreaInXDirectionMax = xmax;
                AreaConstants.items[i].LargestSizeOfAreaInYDirectionMax = ymax;
                AreaConstants.items[i].LargestSizeOfAreaInZDirectionMax = zmax;
                AreaConstants.items[i].LargestSizeOfAreaInXDirectionMin = xmin;
                AreaConstants.items[i].LargestSizeOfAreaInYDirectionMin = ymin;
                AreaConstants.items[i].LargestSizeOfAreaInZDirectionMin = zmin;
            }
        }
    }
}

function SaveSTLFile() {
    var Light = "";
    for (var lamp = 0; lamp < 5; lamp++)
        Light =
            Light +
            "LightSourceX" +
            lamp +
            ": " +
            LightSourceX.items[lamp] +
            " / " +
            "LightSourceY" +
            lamp +
            ": " +
            LightSourceY.items[lamp] +
            " / " +
            "LightSourceZ" +
            lamp +
            ": " +
            LightSourceZ.items[lamp] +
            " / " +
            "ColorOfLightSourceRed" +
            lamp +
            ": " +
            ColorOfLightSource.items[lamp].Red +
            " / " +
            "ColorOfLightSourceGreen" +
            lamp +
            ": " +
            ColorOfLightSource.items[lamp].Green +
            " / " +
            "ColorOfLightSourceBlue" +
            lamp +
            ": " +
            ColorOfLightSource.items[lamp].Blue +
            " / " +
            "LightOn" +
            lamp +
            ": " +
            LightOn.items[lamp] +
            " / ";

    var filename = prompt("Filename", "Name without path");
    var ThereIsData = false;
    var ThereIsDataInNumber = -1;

    if (filename != null) {
        let data = "";
        for (var j = 0; j < NumberOfCompleteObjects; j++) {
            ThereIsData = false;
            for (var i = 0; i < AreaIndex; i++) {
                if (
                    !isNaN(Area.items[i][0][0]) &&
                    AreaBelongsToObject[i] == j
                ) {
                    ThereIsData = true;
                    ThereIsDataInNumber = i;
                }
            }
            if (ThereIsData == true) {
                var ObjectAttributes =
                    "ColorOfObjectRed: " +
                    AreaConstants.items[ThereIsDataInNumber].ColorOfObjectRed +
                    " / " +
                    "ColorOfObjectGreen: " +
                    AreaConstants.items[ThereIsDataInNumber]
                        .ColorOfObjectGreen +
                    " / " +
                    "ColorOfObjectBlue: " +
                    AreaConstants.items[ThereIsDataInNumber].ColorOfObjectBlue +
                    " / " +
                    "TypeOfColor: " +
                    AreaConstants.items[ThereIsDataInNumber].TypeOfColor +
                    " / " +
                    "RefractiveIndexOfMaterial: " +
                    AreaConstants.items[ThereIsDataInNumber]
                        .RefractiveIndexOfMaterial +
                    " / " +
                    "SurfaceStructur: " +
                    AreaConstants.items[ThereIsDataInNumber].SurfaceStructur +
                    " / " +
                    "PartOfDirectLight: " +
                    AreaConstants.items[ThereIsDataInNumber].PartOfDirectLight +
                    " / " +
                    "PartOfReflectlight: " +
                    AreaConstants.items[ThereIsDataInNumber]
                        .PartOfReflectlight +
                    " / " +
                    "PartOfRefractionlight: " +
                    AreaConstants.items[ThereIsDataInNumber]
                        .PartOfRefractionlight +
                    " / " +
                    "PartSurrounding: " +
                    AreaConstants.items[ThereIsDataInNumber].PartSurrounding;
                data =
                    data +
                    "solid object" +
                    j +
                    " " +
                    ObjectAttributes +
                    " / " +
                    Light +
                    " \r\n";
                for (var i = 0; i < AreaIndex; i++) {
                    if (
                        !isNaN(Area.items[i][0][0]) &&
                        AreaBelongsToObject[i] == j
                    ) {
                        data =
                            data +
                            " facet normal" +
                            " " +
                            AreaConstants.items[i].nx +
                            " " +
                            AreaConstants.items[i].ny +
                            " " +
                            AreaConstants.items[i].nz +
                            " \r\n";
                        data = data + "  outer loop" + "\r\n";
                        data =
                            data +
                            "   vertex" +
                            " " +
                            Area.items[i][0][0] +
                            " " +
                            Area.items[i][0][1] +
                            " " +
                            Area.items[i][0][2] +
                            " \r\n";
                        data =
                            data +
                            "   vertex" +
                            " " +
                            Area.items[i][1][0] +
                            " " +
                            Area.items[i][1][1] +
                            " " +
                            Area.items[i][1][2] +
                            " \r\n";
                        data =
                            data +
                            "   vertex" +
                            " " +
                            Area.items[i][2][0] +
                            " " +
                            Area.items[i][2][1] +
                            " " +
                            Area.items[i][2][2] +
                            " \r\n";
                        data = data + "  endloop" + " \r\n";
                        data = data + " endfacet" + " \r\n";
                    }
                }
                data = data + "endsolid object" + j + " \r\n";
            }
        }
        const textToBLOB = new Blob([data], { type: "text/plain" });
        let newLink = document.createElement("a");
        newLink.download = filename.replace(".txt", "") + ".stl";
        //var link = document.getElementById('link');
        // link.setAttribute('download', filename.replace(".txt","")+'.txt');
        // link.setAttribute('href', canvas.toDataURL("image/png").replace("image/png", "image/octet-stream"));
        // link.click();

        if (window.webkitURL != null) {
            newLink.href = window.webkitURL.createObjectURL(textToBLOB);
        } else {
            newLink.href = window.URL.createObjectURL(textToBLOB);
            newLink.style.display = "none";
            document.body.appendChild(newLink);
        }
        newLink.click();
    }

    // Format:
    // solid name
    // facet normal n1 n2 n3
    // outer loop
    // vertex p1x p1y p1z
    // vertex p2x p2y p2z
    // vertex p3x p3y p3z
    // endloop
    // endfacet
    // endsolid name

    // Example:
    // solid auto
    // facet normal -0 0 -1
    // outer loop
    // vertex 30.1662 -0.39597 10.5969
    // vertex 28.1638 -14.6515 10.5969
    // vertex 26.1852 -0.39597 10.5969
    // vertex 30.1662 -0.39597 10.5969
    // vertex 28.1638 -14.6515 10.5969
    // vertex 26.1852 -0.39597 10.5969
    // vertex 30.1662 -0.39597 10.5969
    // vertex 28.1638 -14.6515 10.5969
    // vertex 26.1852 -0.39597 10.5969
    // endloop
    // endfacet
    // ...
    // facet normal -0.409164 -0.806802 0.426211
    // outer loop
    // vertex -66.6583 -19.912 25.3576
    // vertex -64.0037 -18.34 30.8818
    // vertex -69.3568 -16.0529 30.0721
    // vertex -66.6583 -19.912 25.3576
    // vertex -64.0037 -18.34 30.8818
    // vertex -69.3568 -16.0529 30.0721
    // vertex -66.6583 -19.912 25.3576
    // vertex -64.0037 -18.34 30.8818
    // vertex -69.3568 -16.0529 30.0721
    // endloop
    // endfacet
    // endsolid auto
}

function LoadSTLFile(TextFromFile) {
    CloneAreaValues(AreaOriginal, Area);
    var objectNameBefore = "";
    var objectName = "";
    if (NumberOfCompleteObjects < MaxNbOfCompleteObjects) {
        while (TextFromFile.indexOf("outer loop", 0) >= 0) {
            var posObjectStart = TextFromFile.indexOf("solid", 0);
            var posObjectEnd = TextFromFile.indexOf("facet normal", 0);
            if (posObjectStart >= 0 && posObjectEnd >= posObjectStart)
                objectName = TextFromFile.substring(
                    posObjectStart,
                    posObjectEnd
                ).replace(/(\r\n|\n|\r)/gm, "");
            if ((objectNameBefore != "") & (objectName != objectNameBefore)) {
                NumberOfCompleteObjects++;
            }
            objectNameBefore = objectName;
            var pos1 = TextFromFile.indexOf("vertex", 0);
            var space1 = TextFromFile.indexOf(" ", pos1 + 1);
            var space2 = TextFromFile.indexOf(" ", space1 + 1);
            var space3 = TextFromFile.indexOf(" ", space2 + 1);
            var pos2 = TextFromFile.indexOf("vertex", space3);
            var value1x = parseInt(TextFromFile.substring(space1, space2));
            var value1y = parseInt(TextFromFile.substring(space2, space3));
            var value1z = parseInt(TextFromFile.substring(space3, pos2));
            var space1 = TextFromFile.indexOf(" ", pos2 + 1);
            var space2 = TextFromFile.indexOf(" ", space1 + 1);
            var space3 = TextFromFile.indexOf(" ", space2 + 1);
            var pos3 = TextFromFile.indexOf("vertex", space3);
            var value2x = parseInt(TextFromFile.substring(space1, space2));
            var value2y = parseInt(TextFromFile.substring(space2, space3));
            var value2z = parseInt(TextFromFile.substring(space3, pos3));
            var space1 = TextFromFile.indexOf(" ", pos3 + 1);
            var space2 = TextFromFile.indexOf(" ", space1 + 1);
            var space3 = TextFromFile.indexOf(" ", space2 + 1);
            var pos4 = TextFromFile.indexOf("endloop", space3);
            var value3x = parseInt(TextFromFile.substring(space1, space2));
            var value3y = parseInt(TextFromFile.substring(space2, space3));
            var value3z = parseInt(TextFromFile.substring(space3, pos4));
            TextFromFile = TextFromFile.substring(pos4);
            // console.log(value1x, value1y, value1z);
            // console.log(value2x, value2y, value2z);
            // console.log(value3x, value3y, value3z);
            Area.items[AreaIndex][0][0] = value1x;
            Area.items[AreaIndex][0][1] = value1y;
            Area.items[AreaIndex][0][2] = value1z;
            Area.items[AreaIndex][1][0] = value2x;
            Area.items[AreaIndex][1][1] = value2y;
            Area.items[AreaIndex][1][2] = value2z;
            Area.items[AreaIndex][2][0] = value3x;
            Area.items[AreaIndex][2][1] = value3y;
            Area.items[AreaIndex][2][2] = value3z;
            AreaBelongsToObject[AreaIndex] = NumberOfCompleteObjects;
            SelectedArea[AreaIndex] = true;
            SetupAreaConstants(AreaIndex);
            if (objectName.search("ColorOfObjectRed:") > -1) {
                AreaConstants.items[AreaIndex].ColorOfObjectRed = parseFloat(
                    objectName
                        .substring(
                            objectName.search("ColorOfObjectRed:"),
                            objectName.indexOf(
                                "/",
                                objectName.search("ColorOfObjectRed:")
                            )
                        )
                        .replace("ColorOfObjectRed:", "")
                );
            }
            if (objectName.search("ColorOfObjectGreen:") > -1) {
                AreaConstants.items[AreaIndex].ColorOfObjectGreen = parseFloat(
                    objectName
                        .substring(
                            objectName.search("ColorOfObjectGreen:"),
                            objectName.indexOf(
                                "/",
                                objectName.search("ColorOfObjectGreen:")
                            )
                        )
                        .replace("ColorOfObjectGreen:", "")
                );
            }
            if (objectName.search("ColorOfObjectBlue:") > -1) {
                AreaConstants.items[AreaIndex].ColorOfObjectBlue = parseFloat(
                    objectName
                        .substring(
                            objectName.search("ColorOfObjectBlue:"),
                            objectName.indexOf(
                                "/",
                                objectName.search("ColorOfObjectBlue:")
                            )
                        )
                        .replace("ColorOfObjectBlue:", "")
                );
            }
            if (objectName.search("TypeOfColor:") > -1) {
                AreaConstants.items[AreaIndex].TypeOfColor = objectName
                    .substring(
                        objectName.search("TypeOfColor:"),
                        objectName.indexOf(
                            "/",
                            objectName.search("TypeOfColor:")
                        )
                    )
                    .replace("TypeOfColor:", "")
                    .trim();
            }
            if (objectName.search("RefractiveIndexOfMaterial:") > -1) {
                AreaConstants.items[AreaIndex].RefractiveIndexOfMaterial =
                    parseFloat(
                        objectName
                            .substring(
                                objectName.search("RefractiveIndexOfMaterial:"),
                                objectName.indexOf(
                                    "/",
                                    objectName.search(
                                        "RefractiveIndexOfMaterial:"
                                    )
                                )
                            )
                            .replace("RefractiveIndexOfMaterial:", "")
                    );
            }
            if (objectName.search("SurfaceStructur:") > -1) {
                AreaConstants.items[AreaIndex].SurfaceStructur = parseFloat(
                    objectName
                        .substring(
                            objectName.search("SurfaceStructur:"),
                            objectName.indexOf(
                                "/",
                                objectName.search("SurfaceStructur:")
                            )
                        )
                        .replace("SurfaceStructur:", "")
                );
            }
            if (objectName.search("PartOfDirectLight:") > -1) {
                AreaConstants.items[AreaIndex].PartOfDirectLight = parseFloat(
                    objectName
                        .substring(
                            objectName.search("PartOfDirectLight:"),
                            objectName.indexOf(
                                "/",
                                objectName.search("PartOfDirectLight:")
                            )
                        )
                        .replace("PartOfDirectLight:", "")
                );
            }
            if (objectName.search("PartOfReflectlight:") > -1) {
                AreaConstants.items[AreaIndex].PartOfReflectlight = parseFloat(
                    objectName
                        .substring(
                            objectName.search("PartOfReflectlight:"),
                            objectName.indexOf(
                                "/",
                                objectName.search("PartOfReflectlight:")
                            )
                        )
                        .replace("PartOfReflectlight:", "")
                );
            }
            if (objectName.search("PartOfRefractionlight:") > -1) {
                AreaConstants.items[AreaIndex].PartOfRefractionlight =
                    parseFloat(
                        objectName
                            .substring(
                                objectName.search("PartOfRefractionlight:"),
                                objectName.indexOf(
                                    "/",
                                    objectName.search("PartOfRefractionlight:")
                                )
                            )
                            .replace("PartOfRefractionlight:", "")
                    );
            }
            if (objectName.search("PartSurrounding:") > -1) {
                AreaConstants.items[AreaIndex].PartSurrounding = parseFloat(
                    objectName
                        .substring(
                            objectName.search("PartSurrounding:"),
                            objectName.indexOf(
                                "/",
                                objectName.search("PartSurrounding:")
                            )
                        )
                        .replace("PartSurrounding:", "")
                );
            }
            AreaIndex = AreaIndex + 1;

            // console.log(posObjectStart,posObjectEnd,objectName,objectNameBefore);
        }
        NumberOfCompleteObjects++;
        CloneAreaValues(Area, AreaOriginal);
        CalcSizeOfObject();
        SetUpLights();
        for (var lamp = 0; lamp < 5; lamp++) {
            if (objectName.search("LightSourceX" + lamp + ":") > -1) {
                LightSourceX.items[lamp] = parseFloat(
                    objectName
                        .substring(
                            objectName.search("LightSourceX" + lamp + ":"),
                            objectName.indexOf(
                                "/",
                                objectName.search("LightSourceX" + lamp + ":")
                            )
                        )
                        .replace("LightSourceX" + lamp + ":", "")
                );
            }
            if (objectName.search("LightSourceY" + lamp + ":") > -1) {
                LightSourceY.items[lamp] = parseFloat(
                    objectName
                        .substring(
                            objectName.search("LightSourceY" + lamp + ":"),
                            objectName.indexOf(
                                "/",
                                objectName.search("LightSourceY" + lamp + ":")
                            )
                        )
                        .replace("LightSourceY" + lamp + ":", "")
                );
            }
            if (objectName.search("LightSourceZ" + lamp + ":") > -1) {
                LightSourceZ.items[lamp] = parseFloat(
                    objectName
                        .substring(
                            objectName.search("LightSourceZ" + lamp + ":"),
                            objectName.indexOf(
                                "/",
                                objectName.search("LightSourceZ" + lamp + ":")
                            )
                        )
                        .replace("LightSourceZ" + lamp + ":", "")
                );
            }
            if (objectName.search("ColorOfLightSourceRed" + lamp + ":") > -1) {
                var ColorOfLightSourceRed = parseFloat(
                    objectName
                        .substring(
                            objectName.search(
                                "ColorOfLightSourceRed" + lamp + ":"
                            ),
                            objectName.indexOf(
                                "/",
                                objectName.search(
                                    "ColorOfLightSourceRed" + lamp + ":"
                                )
                            )
                        )
                        .replace("ColorOfLightSourceRed" + lamp + ":", "")
                );
            }
            if (
                objectName.search("ColorOfLightSourceGreen" + lamp + ":") > -1
            ) {
                var ColorOfLightSourceGreen = parseFloat(
                    objectName
                        .substring(
                            objectName.search(
                                "ColorOfLightSourceGreen" + lamp + ":"
                            ),
                            objectName.indexOf(
                                "/",
                                objectName.search(
                                    "ColorOfLightSourceGreen" + lamp + ":"
                                )
                            )
                        )
                        .replace("ColorOfLightSourceGreen" + lamp + ":", "")
                );
            }
            if (objectName.search("ColorOfLightSourceBlue" + lamp + ":") > -1) {
                var ColorOfLightSourceBlue = parseFloat(
                    objectName
                        .substring(
                            objectName.search(
                                "ColorOfLightSourceBlue" + lamp + ":"
                            ),
                            objectName.indexOf(
                                "/",
                                objectName.search(
                                    "ColorOfLightSourceBlue" + lamp + ":"
                                )
                            )
                        )
                        .replace("ColorOfLightSourceBlue" + lamp + ":", "")
                );
            }
            ColorOfLightSource.items[lamp] = {
                Red: ColorOfLightSourceRed,
                Green: ColorOfLightSourceGreen,
                Blue: ColorOfLightSourceBlue,
            };
            if (objectName.search("LightOn" + lamp + ":") > -1) {
                LightOn.items[lamp] = objectName
                    .substring(
                        objectName.search("LightOn" + lamp + ":"),
                        objectName.indexOf(
                            "/",
                            objectName.search("LightOn" + lamp + ":")
                        )
                    )
                    .replace("LightOn" + lamp + ":", "");
                if (LightOn.items[lamp].trim() == "true") {
                    ActivateLight(lamp);
                }
            }
        }
        ShowAreaOf3DObject();
        ShowAreaOf3DObjectSmallWindows();
    } else {
        alert("Number of total objects reached");
    }
}

function ActivateLight(LightNbr) {
    switch (LightNbr) {
        case 0:
            LightOn.items[0] = true;
            document.getElementById("Light0On").style.display = "none";
            document.getElementById("Light0Off").style.display = "block";
            document.getElementById("Light0Center").style.display = "block";
            document.getElementById("Light0Select").style.display = "block";
            document.getElementById("Light0UnSelect").style.display = "none";
            break;
        case 1:
            LightOn.items[1] = true;
            document.getElementById("Light1On").style.display = "none";
            document.getElementById("Light1Off").style.display = "block";
            document.getElementById("Light1Center").style.display = "block";
            document.getElementById("Light1Select").style.display = "block";
            document.getElementById("Light1UnSelect").style.display = "none";
            break;
        case 2:
            LightOn.items[2] = true;
            document.getElementById("Light2On").style.display = "none";
            document.getElementById("Light2Off").style.display = "block";
            document.getElementById("Light2Center").style.display = "block";
            document.getElementById("Light2Select").style.display = "block";
            document.getElementById("Light2UnSelect").style.display = "none";
            break;
        case 3:
            LightOn.items[3] = true;
            document.getElementById("Light3On").style.display = "none";
            document.getElementById("Light3Off").style.display = "block";
            document.getElementById("Light3Center").style.display = "block";
            document.getElementById("Light3Select").style.display = "block";
            document.getElementById("Light3UnSelect").style.display = "none";
            break;
        case 4:
            LightOn.items[4] = true;
            document.getElementById("Light4On").style.display = "none";
            document.getElementById("Light4Off").style.display = "block";
            document.getElementById("Light4Center").style.display = "block";
            document.getElementById("Light4Select").style.display = "block";
            document.getElementById("Light4UnSelect").style.display = "none";
            break;
    }
}

function DeActivateLight(LightNbr) {
    switch (LightNbr) {
        case 0:
            LightOn.items[0] = false;
            document.getElementById("Light0On").style.display = "block";
            document.getElementById("Light0Off").style.display = "none";
            document.getElementById("Light0Center").style.display = "none";
            document.getElementById("Light0Select").style.display = "none";
            document.getElementById("Light0UnSelect").style.display = "none";
            break;
        case 1:
            LightOn.items[1] = false;
            document.getElementById("Light1On").style.display = "block";
            document.getElementById("Light1Off").style.display = "none";
            document.getElementById("Light1Center").style.display = "none";
            document.getElementById("Light1Select").style.display = "none";
            document.getElementById("Light1UnSelect").style.display = "none";
            break;
        case 2:
            LightOn.items[2] = false;
            document.getElementById("Light2On").style.display = "block";
            document.getElementById("Light2Off").style.display = "none";
            document.getElementById("Light2Center").style.display = "none";
            document.getElementById("Light2Select").style.display = "none";
            document.getElementById("Light2UnSelect").style.display = "none";
            break;
        case 3:
            LightOn.items[3] = false;
            document.getElementById("Light3On").style.display = "block";
            document.getElementById("Light3Off").style.display = "none";
            document.getElementById("Light3Center").style.display = "none";
            document.getElementById("Light3Select").style.display = "none";
            document.getElementById("Light3UnSelect").style.display = "none";
            break;
        case 4:
            LightOn.items[4] = false;
            document.getElementById("Light4On").style.display = "block";
            document.getElementById("Light4Off").style.display = "none";
            document.getElementById("Light4Center").style.display = "none";
            document.getElementById("Light4Select").style.display = "none";
            document.getElementById("Light4UnSelect").style.display = "none";
            break;
    }
}

function SetUpLights() {
    for (lamp = 0; lamp < 5; lamp++) {
        LightSourceX.items[lamp] = -10000 * lamp + 25000;
        LightSourceY.items[lamp] = 10000;
        LightSourceZ.items[lamp] = 10000 * lamp - 15000;
        ColorOfLightSource.items[lamp] = { Red: 1, Green: 1, Blue: 1 };
        LightOn.items[lamp] = false;
    }
    LightOn.items[0] = true;
    document.getElementById("Light0On").style.display = "none";
    document.getElementById("Light0Off").style.display = "block";
    document.getElementById("Light0Center").style.display = "block";
    document.getElementById("Light0Select").style.display = "block";
    document.getElementById("Light0UnSelect").style.display = "none";
    document.getElementById("Light1On").style.display = "block";
    document.getElementById("Light1Off").style.display = "none";
    document.getElementById("Light1Center").style.display = "none";
    document.getElementById("Light1Select").style.display = "none";
    document.getElementById("Light1UnSelect").style.display = "none";
    document.getElementById("Light2On").style.display = "block";
    document.getElementById("Light2Off").style.display = "none";
    document.getElementById("Light2Center").style.display = "none";
    document.getElementById("Light2Select").style.display = "none";
    document.getElementById("Light2UnSelect").style.display = "none";
    document.getElementById("Light3On").style.display = "block";
    document.getElementById("Light3Off").style.display = "none";
    document.getElementById("Light3Center").style.display = "none";
    document.getElementById("Light3Select").style.display = "none";
    document.getElementById("Light3UnSelect").style.display = "none";
    document.getElementById("Light4On").style.display = "block";
    document.getElementById("Light4Off").style.display = "none";
    document.getElementById("Light4Center").style.display = "none";
    document.getElementById("Light4Select").style.display = "none";
    document.getElementById("Light4UnSelect").style.display = "none";
}

function ShowAllLamps() {
    SelectObject("all");
    var LampMin = 1e6;
    var LampMax = -1e6;
    do {
        LampMin = 1e6;
        LampMax = -1e6;
        zoomen(1 / 2);
        for (lamp = 0; lamp < 5; lamp++) {
            if (LampMin > LightSourceX.items[lamp]) {
                LampMin = LightSourceX.items[lamp];
            }
            if (LampMax < LightSourceX.items[lamp]) {
                LampMax = LightSourceX.items[lamp];
            }
        }
    } while (LampMin < -width / 2 || LampMax > width / 2);
    zoomen(1 / 4);
    ShowAreaOf3DObject();
    ShowAreaOf3DObjectSmallWindows();
}

function ShowAllObjects() {
    SelectObject("all");
    ShowAllLamps();
    var ObjectMin = 1e6;
    var ObjectMax = -1e6;
    var ObjectAverage = 0;
    do {
        ObjectMin = 1e6;
        ObjectMax = -1e6;
        zoomen(1.1);
        for (i = 0; i < AreaIndex; i++) {
            for (j = 0; j < 3; j++) {
                if (ObjectMin > AreaOriginal.items[i][j][0]) {
                    ObjectMin = AreaOriginal.items[i][j][0];
                }
                if (ObjectMax < AreaOriginal.items[i][j][0]) {
                    ObjectMax = AreaOriginal.items[i][j][0];
                }
            }
        }
        ObjectAverage = (ObjectMax - ObjectMin) / 2;
    } while (Math.abs(ObjectMin - ObjectMax) < width);
    MoveX = width / 2 - ObjectAverage;
    MoveAll();
    MoveX = 0;

    ShowAllLamps();
    ObjectAverage = 0;
    do {
        ObjectMin = 1e6;
        ObjectMax = -1e6;
        zoomen(1.1);
        for (i = 0; i < AreaIndex; i++) {
            for (j = 0; j < 3; j++) {
                if (ObjectMin > AreaOriginal.items[i][j][1]) {
                    ObjectMin = AreaOriginal.items[i][j][1];
                }
                if (ObjectMax < AreaOriginal.items[i][j][1]) {
                    ObjectMax = AreaOriginal.items[i][j][1];
                }
            }
        }
        ObjectAverage = (ObjectMax - ObjectMin) / 2;
    } while (Math.abs(ObjectMin - ObjectMax) < height);
    MoveY = height / 2 - ObjectAverage;
    MoveAll();
    MoveY = 0;
    zoomen(0.5);
    ShowAreaOf3DObject();
    ShowAreaOf3DObjectSmallWindows();
}

function BezierBernsteinApproximation() {
    try {
        // Source1: http://www.tm-mathe.de/Themen/html/funbezierbernstein.html
        // Source2: https://ocw.mit.edu/courses/electrical-engineering-and-computer-science/6-837-computer-graphics-fall-2012/lecture-notes/MIT6_837F12_Lec01.pdf

        CloneAreaValues(AreaOriginal, Area);
        var PointNbr = 0; //new Array1D(Math.min(36,AreaIndex));
        var PointCorner = 0; //new Array1D(Math.min(36,AreaIndex));
        var PointDistance = 0; //new Array1D(Math.min(36,AreaIndex));
        var CornerOfNeighbour;
        var Area1,
            Corner1,
            Distance1,
            Area2,
            Corner2,
            Distance2,
            Area3,
            Corner3,
            Distance3,
            Area4,
            Corner4,
            Distance4;
        var counter = 0;
        var AreaTemp = new Array3D(maxarea, 4, 3);

        //for (i = 0; i < AreaIndex; i++)
        for (
            var RandomAreaSelection = 0;
            RandomAreaSelection < AreaIndex;
            RandomAreaSelection++
        ) {
            var i = Math.floor(Math.random() * AreaIndex); // Chosen Area
            var ii = Math.floor(Math.random() * 3); // Chosen Corner
            if (SelectedArea[i] == true) {
                DrawPointOfAreaInViews(i, ii, 0);

                // for (ii = 0; ii < 3; ii++)
                // { // Chosen Corner
                var DoCounter = 0;
                do {
                    CornerOfNeighbour = FindCornerOfNeighbourArea(i, ii); // FindClosestNeighbourCorner(i, ii);
                    Area1 = CornerOfNeighbour[0];
                    Corner1 = CornerOfNeighbour[1];
                    Distance1 = CornerOfNeighbour[2];
                    // Area1 = PointNbr; //.items[0];
                    // Corner1 = PointCorner; //.items[0];
                    // Distance1 = PointDistance; //.items[0];
                    DoCounter++;
                    if (DoCounter == 1000) {
                        Area1 = undefined;
                    }
                } while (Area1 == i);
                if (Area1 == undefined || Corner1 == undefined) {
                    Area1 = i;
                    Corner1 = ii;
                    Distance1 = 0;
                }

                DrawPointOfAreaInViews(Area1, Corner1, 1);

                var DoCounter = 0;
                do {
                    CornerOfNeighbour = FindCornerOfNeighbourArea(
                        Area1,
                        Corner1
                    ); // FindClosestNeighbourCorner(Area1, Corner1);
                    Area2 = CornerOfNeighbour[0];
                    Corner2 = CornerOfNeighbour[1];
                    Distance2 = CornerOfNeighbour[2];
                    // Area2 = PointNbr; //.items[0];
                    // Corner2 = PointCorner; //.items[0];
                    // Distance2 = PointDistance; //.items[0];
                    // counter = 0;
                    DoCounter++;
                    if (DoCounter == 1000) {
                        Area2 = undefined;
                    }
                } while (Area2 == i || Area2 == Area1);
                // if ((Area2 == i && Corner2 == ii) || (Area2 == Area1 && Corner2 == Corner1))  //while ((Area2 == i && Corner2 == ii) || (Area2 == Area1 && Corner2 == Corner1))
                // {
                //// counter++;
                // Area2 = PointNbr; //.items[counter];
                // Corner2 = PointCorner; //.items[counter];
                // }
                if (Area2 == undefined || Corner2 == undefined) {
                    Area2 = Area1;
                    Corner2 = Corner1;
                    Distance2 = 0;
                }

                DrawPointOfAreaInViews(Area2, Corner2, 2);

                var DoCounter = 0;
                do {
                    CornerOfNeighbour = FindCornerOfNeighbourArea(
                        Area2,
                        Corner2
                    ); // FindClosestNeighbourCorner(Area2, Corner2);
                    Area3 = CornerOfNeighbour[0];
                    Corner3 = CornerOfNeighbour[1];
                    Distance3 = CornerOfNeighbour[2];
                    // Area3 = PointNbr; //.items[0];
                    // Corner3 = PointCorner; //.items[0];
                    // Distance3 = PointDistance; //.items[0];
                    // counter = 0;
                    DoCounter++;
                    if (DoCounter == 1000) {
                        Area3 = undefined;
                    }
                } while (Area3 == i || Area3 == Area2 || Area3 == Area1);
                // if ((Area3 == i && Corner3 == ii) || (Area3 == Area2 && Corner3 == Corner2) || (Area3 == Area1 && Corner3 == Corner1))  //while ((Area3 == i && Corner3 == ii) || (Area3 == Area2 && Corner3 == Corner2) || (Area3 == Area1 && Corner3 == Corner1))
                // {
                //// counter++;
                // Area3 = PointNbr; //.items[counter];
                // Corner3 = PointCorner; //.items[counter];
                // }
                if (Area3 == undefined || Corner3 == undefined) {
                    Area3 = Area2;
                    Corner3 = Corner2;
                    Distance3 = 0;
                }

                DrawPointOfAreaInViews(Area3, Corner3, 3);

                var DoCounter = 0;
                do {
                    CornerOfNeighbour = FindCornerOfNeighbourArea(
                        Area3,
                        Corner3
                    ); // FindClosestNeighbourCorner(Area3, Corner3);
                    Area4 = CornerOfNeighbour[0];
                    Corner4 = CornerOfNeighbour[1];
                    Distance4 = CornerOfNeighbour[2];
                    // Area4 = PointNbr; //.items[0];
                    // Corner4 = PointCorner; //.items[0];
                    // Distance4 = PointDistance; //.items[0];
                    // counter = 0;
                    DoCounter++;
                    if (DoCounter == 1000) {
                        Area4 = undefined;
                    }
                } while (
                    Area4 == i ||
                    Area4 == Area3 ||
                    Area4 == Area2 ||
                    Area4 == Area1
                );
                // if ((Area4 == i && Corner4 == ii) || (Area4 == Area3 && Corner4 == Corner3) || (Area4 == Area2 && Corner4 == Corner2) || (Area4 == Area1 && Corner4 == Corner1))  //while ((Area4 == i && Corner4 == ii) || (Area4 == Area3 && Corner4 == Corner3) || (Area4 == Area2 && Corner4 == Corner2) || (Area4 == Area1 && Corner4 == Corner1))
                // {
                //// counter++;
                // Area4 = PointNbr; //.items[counter];
                // Corner4 = PointCorner; //.items[counter];
                // }
                // console.log(i, ii, Area1, Corner1, Area2, Corner2, Area3, Corner3, Area4, Corner4);
                if (Area4 == undefined || Corner4 == undefined) {
                    Area4 = Area3;
                    Corner4 = Corner3;
                    Distance4 = 0;
                }

                DrawPointOfAreaInViews(Area4, Corner4, 4);

                var x0 = Area.items[i][ii][0];
                var y0 = Area.items[i][ii][1];
                var z0 = Area.items[i][ii][2];
                var x1 = Area.items[Area1][Corner1][0];
                var y1 = Area.items[Area1][Corner1][1];
                var z1 = Area.items[Area1][Corner1][2];
                var x2 = Area.items[Area2][Corner2][0];
                var y2 = Area.items[Area2][Corner2][1];
                var z2 = Area.items[Area2][Corner2][2];
                var x3 = Area.items[Area3][Corner3][0];
                var y3 = Area.items[Area3][Corner3][1];
                var z3 = Area.items[Area3][Corner3][2];
                var x4 = Area.items[Area4][Corner4][0];
                var y4 = Area.items[Area4][Corner4][1];
                var z4 = Area.items[Area4][Corner4][2];

                var t =
                    Distance1 / (Distance1 + Distance2 + Distance3 + Distance4);
                var B04 = Math.pow(1 - t, 4);
                var B14 = 4 * t * Math.pow(1 - t, 3);
                var B24 = 6 * t * t * Math.pow(1 - t, 2);
                var B34 = 4 * t * t * t * (1 - t);
                var B44 = Math.pow(t, 4);
                var NewCorner1x =
                    x0 * B04 + x1 * B14 + x2 * B24 + x3 * B34 + x4 * B44;
                var NewCorner1y =
                    y0 * B04 + y1 * B14 + y2 * B24 + y3 * B34 + y4 * B44;
                var NewCorner1z =
                    z0 * B04 + z1 * B14 + z2 * B24 + z3 * B34 + z4 * B44;

                t =
                    (Distance1 + Distance2) /
                    (Distance1 + Distance2 + Distance3 + Distance4);
                // B03 = Math.pow(1-t,3);
                // B13 = 3*t*Math.pow(1-t,2);
                // B23 = 3*Math.pow(t,2)*(1-t);
                // B33 = Math.pow(t,3);
                B04 = Math.pow(1 - t, 4);
                B14 = 4 * t * Math.pow(1 - t, 3);
                B24 = 6 * t * t * Math.pow(1 - t, 2);
                B34 = 4 * t * t * t * (1 - t);
                B44 = Math.pow(t, 4);
                var NewCorner2x =
                    x0 * B04 + x1 * B14 + x2 * B24 + x3 * B34 + x4 * B44;
                var NewCorner2y =
                    y0 * B04 + y1 * B14 + y2 * B24 + y3 * B34 + y4 * B44;
                var NewCorner2z =
                    z0 * B04 + z1 * B14 + z2 * B24 + z3 * B34 + z4 * B44;

                t =
                    (Distance1 + Distance2 + Distance3) /
                    (Distance1 + Distance2 + Distance3 + Distance4);
                B04 = Math.pow(1 - t, 4);
                B14 = 4 * t * Math.pow(1 - t, 3);
                B24 = 6 * t * t * Math.pow(1 - t, 2);
                B34 = 4 * t * t * t * (1 - t);
                B44 = Math.pow(t, 4);
                var NewCorner3x =
                    x0 * B04 + x1 * B14 + x2 * B24 + x3 * B34 + x4 * B44;
                var NewCorner3y =
                    y0 * B04 + y1 * B14 + y2 * B24 + y3 * B34 + y4 * B44;
                var NewCorner3z =
                    z0 * B04 + z1 * B14 + z2 * B24 + z3 * B34 + z4 * B44;

                t =
                    (Distance1 + Distance2 + Distance3 + Distance4) /
                    (Distance1 + Distance2 + Distance3 + Distance4);
                B04 = Math.pow(1 - t, 4);
                B14 = 4 * t * Math.pow(1 - t, 3);
                B24 = 6 * t * t * Math.pow(1 - t, 2);
                B34 = 4 * t * t * t * (1 - t);
                B44 = Math.pow(t, 4);
                var NewCorner4x =
                    x0 * B04 + x1 * B14 + x2 * B24 + x3 * B34 + x4 * B44;
                var NewCorner4y =
                    y0 * B04 + y1 * B14 + y2 * B24 + y3 * B34 + y4 * B44;
                var NewCorner4z =
                    z0 * B04 + z1 * B14 + z2 * B24 + z3 * B34 + z4 * B44;

                DrawPointInViews(x0, y0, z0, 0);
                DrawPointInViews(NewCorner1x, NewCorner1y, NewCorner1z, 1);
                DrawPointInViews(NewCorner2x, NewCorner2y, NewCorner2z, 2);
                DrawPointInViews(NewCorner3x, NewCorner3y, NewCorner3z, 3);
                DrawPointInViews(NewCorner4x, NewCorner4y, NewCorner4z, 4);

                console.log(
                    "0: ",
                    Area.items[i][ii][0],
                    Area.items[i][ii][1],
                    Area.items[i][ii][2]
                );

                console.log(
                    "1 alt: ",
                    Area.items[Area1][Corner1][0],
                    Area.items[Area1][Corner1][1],
                    Area.items[Area1][Corner1][2]
                );
                console.log("1 neu: ", NewCorner1x, NewCorner1y, NewCorner1z);

                console.log(
                    "2 alt: ",
                    Area.items[Area2][Corner2][0],
                    Area.items[Area2][Corner2][1],
                    Area.items[Area2][Corner2][2]
                );
                console.log("2 neu: ", NewCorner2x, NewCorner2y, NewCorner2z);

                console.log(
                    "3 alt: ",
                    Area.items[Area3][Corner3][0],
                    Area.items[Area3][Corner3][1],
                    Area.items[Area3][Corner3][2]
                );
                console.log("3 neu: ", NewCorner3x, NewCorner3y, NewCorner3z);

                console.log(
                    "4 alt: ",
                    Area.items[Area4][Corner4][0],
                    Area.items[Area4][Corner4][1],
                    Area.items[Area4][Corner4][2]
                );
                console.log("4 neu: ", NewCorner4x, NewCorner4y, NewCorner4z);

                // Find each corner, which is at the position of one of the Bezier-Points, then assign new coordinates to this corner for each area, which has this corner
                if (
                    LengthOfVector(
                        NewCorner1x - NewCorner2x,
                        NewCorner1y - NewCorner2y,
                        NewCorner1z - NewCorner2z
                    ) > 1e-9 &&
                    LengthOfVector(
                        NewCorner1x - NewCorner3x,
                        NewCorner1y - NewCorner3y,
                        NewCorner1z - NewCorner3z
                    ) > 1e-9 &&
                    LengthOfVector(
                        NewCorner1x - NewCorner4x,
                        NewCorner1y - NewCorner4y,
                        NewCorner1z - NewCorner4z
                    ) > 1e-9 &&
                    LengthOfVector(
                        NewCorner2x - NewCorner3x,
                        NewCorner2y - NewCorner3y,
                        NewCorner2z - NewCorner3z
                    ) > 1e-9 &&
                    LengthOfVector(
                        NewCorner2x - NewCorner4x,
                        NewCorner2y - NewCorner4y,
                        NewCorner2z - NewCorner4z
                    ) > 1e-9 &&
                    LengthOfVector(
                        NewCorner3x - NewCorner4x,
                        NewCorner3y - NewCorner4y,
                        NewCorner3z - NewCorner4z
                    ) > 1e-9
                ) {
                    CloneAreaValues(Area, AreaTemp);

                    for (inew = 0; inew < AreaIndex; inew++) {
                        for (jnew = 0; jnew < 3; jnew++) {
                            var Tempx = Area.items[inew][jnew][0];
                            var Tempy = Area.items[inew][jnew][1];
                            var Tempz = Area.items[inew][jnew][2];

                            if (
                                NewCorner1x != NaN &&
                                NewCorner1y != NaN &&
                                NewCorner1z != NaN &&
                                Math.abs(
                                    Tempx - AreaTemp.items[Area1][Corner1][0]
                                ) < 1e-9 &&
                                Math.abs(
                                    Tempy - AreaTemp.items[Area1][Corner1][1]
                                ) < 1e-9 &&
                                Math.abs(
                                    Tempz - AreaTemp.items[Area1][Corner1][2]
                                ) < 1e-9
                            ) {
                                Area.items[inew][jnew][0] = NewCorner1x;
                                Area.items[inew][jnew][1] = NewCorner1y;
                                Area.items[inew][jnew][2] = NewCorner1z;
                            }

                            if (
                                NewCorner2x != NaN &&
                                NewCorner2y != NaN &&
                                NewCorner2z != NaN &&
                                Math.abs(
                                    Tempx - AreaTemp.items[Area2][Corner2][0]
                                ) < 1e-9 &&
                                Math.abs(
                                    Tempy - AreaTemp.items[Area2][Corner2][1]
                                ) < 1e-9 &&
                                Math.abs(
                                    Tempz - AreaTemp.items[Area2][Corner2][2]
                                ) < 1e-9
                            ) {
                                Area.items[inew][jnew][0] = NewCorner2x;
                                Area.items[inew][jnew][1] = NewCorner2y;
                                Area.items[inew][jnew][2] = NewCorner2z;
                            }
                            if (
                                NewCorner3x != NaN &&
                                NewCorner3y != NaN &&
                                NewCorner3z != NaN &&
                                Math.abs(
                                    Tempx - AreaTemp.items[Area3][Corner3][0]
                                ) < 1e-9 &&
                                Math.abs(
                                    Tempy - AreaTemp.items[Area3][Corner3][1]
                                ) < 1e-9 &&
                                Math.abs(
                                    Tempz - AreaTemp.items[Area3][Corner3][2]
                                ) < 1e-9
                            ) {
                                Area.items[inew][jnew][0] = NewCorner3x;
                                Area.items[inew][jnew][1] = NewCorner3y;
                                Area.items[inew][jnew][2] = NewCorner3z;
                            }
                            if (
                                NewCorner4x != NaN &&
                                NewCorner4y != NaN &&
                                NewCorner4z != NaN &&
                                Math.abs(
                                    Tempx - AreaTemp.items[Area4][Corner4][0]
                                ) < 1e-9 &&
                                Math.abs(
                                    Tempy - AreaTemp.items[Area4][Corner4][1]
                                ) < 1e-9 &&
                                Math.abs(
                                    Tempz - AreaTemp.items[Area4][Corner4][2]
                                ) < 1e-9
                            ) {
                                Area.items[inew][jnew][0] = NewCorner4x;
                                Area.items[inew][jnew][1] = NewCorner4y;
                                Area.items[inew][jnew][2] = NewCorner4z;
                            }
                        }
                    }
                }
                // CloneAreaValues(AreaTemp, Area);
                // }
            }
        }
        CloneAreaValues(Area, AreaOriginal);
        ShowAreaOf3DObject();
        ShowAreaOf3DObjectSmallWindows();
        console.log("done completely");
    } catch (e) {
        console.log(e);
        return;
    }
}

function FindClosestNeighbourCorner(OriginArea, OriginCorner) {
    // console.log(OriginArea,OriginCorner);
    var PointNbr = new Array1D(Math.min(36, AreaIndex));
    var PointCorner = new Array1D(Math.min(36, AreaIndex));
    var PointDistance = new Array1D(Math.min(36, AreaIndex));
    var ClosestCornerFound = false;
    var Distance = 1e6;

    for (m0 = 0; m0 < Math.min(36, AreaIndex); m0++) {
        PointDistance.items[m0] = 1e6;
    }
    for (ComparedArea = 0; ComparedArea < AreaIndex; ComparedArea++) {
        // Compared Area
        for (ComparedCorner = 0; ComparedCorner < 3; ComparedCorner++) {
            // Compared Corner
            ClosestCornerFound = false;
            Distance = LengthOfVector(
                Math.abs(
                    Area.items[OriginArea][OriginCorner][0] -
                        Area.items[ComparedArea][ComparedCorner][0]
                ),
                Math.abs(
                    Area.items[OriginArea][OriginCorner][1] -
                        Area.items[ComparedArea][ComparedCorner][1]
                ),
                Math.abs(
                    Area.items[OriginArea][OriginCorner][2] -
                        Area.items[ComparedArea][ComparedCorner][2]
                )
            );
            for (m2 = 0; m2 < Math.min(36, AreaIndex); m2++) {
                if (
                    Distance > 0 &&
                    Distance < PointDistance.items[m2] &&
                    ClosestCornerFound == false &&
                    HaveTwoAreasCommonCorner(OriginArea, ComparedArea) == true
                ) {
                    PointNbr.items[m2] = ComparedArea;
                    PointCorner.items[m2] = ComparedCorner;
                    PointDistance.items[m2] = Distance;
                    ClosestCornerFound = true;
                }
            }
        }
    }
    // for (m3 = 0; m3 < Math.min(36,AreaIndex); m3++)
    // {
    // console.log("Für Flaeche / Ecke, gefundene Flaeche / Ecke / Distanz: ",OriginArea,OriginCorner,PointNbr.items[m3], PointCorner.items[m3], PointDistance.items[m3]);
    // }
    return [PointNbr, PointCorner, PointDistance];
}

function HaveTwoAreasCommonCorner(OriginArea, OriginCorner, ComparedArea) {
    // for (var k = 0; k < 3; k++)
    // {
    for (var l = 0; l < 3; l++) {
        // console.log(Area.items[OriginArea][k][0],Area.items[ComparedArea][l][0],Area.items[OriginArea][k][1],Area.items[ComparedArea][l][1],Area.items[OriginArea][k][2],Area.items[ComparedArea][l][2]);
        if (
            OriginArea != ComparedArea &&
            LengthOfVector(
                Area.items[OriginArea][OriginCorner][0] -
                    Area.items[ComparedArea][l][0],
                Area.items[OriginArea][OriginCorner][1] -
                    Area.items[ComparedArea][l][1],
                Area.items[OriginArea][OriginCorner][2] -
                    Area.items[ComparedArea][l][2]
            ) < 1e-6
        ) {
            // console.log("Ecke: ",l);
            return true;
        }
    }
    // }
    return false;
}

function MakeSmooth() {
    PrepareConstants();
    var AreaIndexOrig = AreaIndex;
    // for (var OriginArea = 0; OriginArea < AreaIndexOrig; OriginArea++)
    // {
    // var result = FindAreaWhichHasTwoCommonCornersWithArea(OriginArea, AreaIndexOrig);
    // var CloseArea = result.ComparedArea;
    // if (CloseArea > -1 && result.longest == true)
    // {
    // var AngleInBetween = AngleBetweenVectors(AreaConstants.items[OriginArea].nx, AreaConstants.items[OriginArea].ny, AreaConstants.items[OriginArea].nz, AreaConstants.items[CloseArea].nx, AreaConstants.items[CloseArea].ny, AreaConstants.items[CloseArea].nz);
    // console.log(AngleInBetween);
    // if (AngleInBetween>0.01)
    // {
    // MakeSixAreasFromAdjacentTwo(OriginArea, CloseArea);
    // OriginArea = AreaIndexOrig;
    // AreaIndexOrig = AreaIndex;
    // }
    // }
    // if (CloseArea > -1 && result.longest == false)
    // {
    // var AngleInBetween = AngleBetweenVectors(AreaConstants.items[OriginArea].nx, AreaConstants.items[OriginArea].ny, AreaConstants.items[OriginArea].nz, AreaConstants.items[CloseArea].nx, AreaConstants.items[CloseArea].ny, AreaConstants.items[CloseArea].nz);
    // console.log(AngleInBetween);
    // if (AngleInBetween>0.01)
    // {
    // MakeSixAreasFromAdjacentTwoOnShortSide(OriginArea, CloseArea);
    // OriginArea = AreaIndexOrig;
    // AreaIndexOrig = AreaIndex;
    // }
    // }
    // }
    CloneAreaValues(AreaOriginal, Area);
    for (var OriginArea = 0; OriginArea < AreaIndexOrig; OriginArea++) {
        PrepareConstants();
        MakeSmoothEdgeBetweenTwoAreas(OriginArea, 0, 1, 2, AreaIndexOrig);
        PrepareConstants();
        MakeSmoothEdgeBetweenTwoAreas(OriginArea, 1, 2, 0, AreaIndexOrig);
        PrepareConstants();
        MakeSmoothEdgeBetweenTwoAreas(OriginArea, 2, 0, 1, AreaIndexOrig);
    }
    CloneAreaValues(Area, AreaOriginal);
    ShowAreaOf3DObject();
}

function SuchAreaDidNotYetExist(AreaNr) {
    for (var counter1 = 0; counter1 < AreaIndex; counter1++) {
        if (
            counter1 != AreaNr &&
            Math.abs(
                LengthOfVector(
                    Area.items[AreaNr][0][0] - Area.items[counter1][0][0],
                    Area.items[AreaNr][0][1] - Area.items[counter1][0][1],
                    Area.items[AreaNr][0][2] - Area.items[counter1][0][2]
                ) < 1e-9
            ) &&
            Math.abs(
                LengthOfVector(
                    Area.items[AreaNr][1][0] - Area.items[counter1][1][0],
                    Area.items[AreaNr][1][1] - Area.items[counter1][1][1],
                    Area.items[AreaNr][1][2] - Area.items[counter1][1][2]
                ) < 1e-9
            ) &&
            Math.abs(
                LengthOfVector(
                    Area.items[AreaNr][2][0] - Area.items[counter1][2][0],
                    Area.items[AreaNr][2][1] - Area.items[counter1][2][1],
                    Area.items[AreaNr][2][2] - Area.items[counter1][2][2]
                ) < 1e-9
            )
        ) {
            return false;
        }
    }
    return true;
}

function GetNxNyNzForArea(AreaNmbr, PosX, PosY, PosZ) {
    if (!AreaConstants.items[AreaNmbr].RoundedEdges)
        return {
            nx: AreaConstants.items[AreaNmbr].nx,
            ny: AreaConstants.items[AreaNmbr].ny,
            nz: AreaConstants.items[AreaNmbr].nz,
        };
    // console.log("rounded edges calculation");
    var ResultingNx = 0;
    var ResultingNy = 0;
    var ResultingNz = 0;
    var NumberOfValues = 0;
    var LengthCenters = 0;
    var LengthToCenter1 = 0;
    var LengthToCenter2 = 0;
    var AngleToCenter1 = 0;
    var AngleToCenter2 = 0;
    // console.log(counter, "1: ",AreaConstants.items[AreaNmbr].CenterX, AreaConstants.items[AreaNmbr].CenterY, AreaConstants.items[AreaNmbr].CenterZ);
    // console.log(counter, "2: ",PosX, PosY, PosZ);
    // console.log(counter, "3: ",LengthOfVector(AreaConstants.items[AreaNmbr].CenterX - PosX, AreaConstants.items[AreaNmbr].CenterY - PosY, AreaConstants.items[AreaNmbr].CenterZ - PosZ));
    LengthToCenter1 = Math.abs(
        LengthOfVector(
            AreaConstants.items[AreaNmbr].CenterX - PosX,
            AreaConstants.items[AreaNmbr].CenterY - PosY,
            AreaConstants.items[AreaNmbr].CenterZ - PosZ
        )
    );
    for (
        var ii = 0;
        ii < AreaConstants.items[AreaNmbr].AdjacentAreas.length;
        ii++
    ) {
        var i = AreaConstants.items[AreaNmbr].AdjacentAreas[ii];
        // console.log(counter, "4: ",i, AreaNmbr, !isNaN(LengthToCenter1), !isNaN(AreaConstants.items[i].nx), DoTwoAreasHaveACommonCorner(AreaNmbr, i));
        if (
            i != AreaNmbr &&
            !isNaN(LengthToCenter1) &&
            !isNaN(AreaConstants.items[AreaNmbr].nx) &&
            !isNaN(AreaConstants.items[AreaNmbr].ny) &&
            !isNaN(AreaConstants.items[AreaNmbr].nz) &&
            !isNaN(AreaConstants.items[i].nx) &&
            !isNaN(AreaConstants.items[i].ny) &&
            !isNaN(AreaConstants.items[i].nz)
        ) {
            // LengthCenters   = LengthOfVector(AreaConstants.items[AreaNmbr].CenterX - AreaConstants.items[i].CenterX, AreaConstants.items[AreaNmbr].CenterY - AreaConstants.items[i].CenterY, AreaConstants.items[AreaNmbr].CenterZ - AreaConstants.items[i].CenterZ);
            LengthToCenter2 = Math.abs(
                LengthOfVector(
                    AreaConstants.items[i].CenterX - PosX,
                    AreaConstants.items[i].CenterY - PosY,
                    AreaConstants.items[i].CenterZ - PosZ
                )
            );
            // console.log(counter, "5: ",LengthToCenter1, LengthToCenter2, LengthCenters);
            // AngleToCenter1 = AngleBetweenVectors(AreaConstants.items[i].CenterX-AreaConstants.items[AreaNmbr].CenterX, AreaConstants.items[i].CenterY-AreaConstants.items[AreaNmbr].CenterY, AreaConstants.items[i].CenterZ-AreaConstants.items[AreaNmbr].CenterZ, PosX-AreaConstants.items[AreaNmbr].CenterX, PosY-AreaConstants.items[AreaNmbr].CenterY, PosZ-AreaConstants.items[AreaNmbr].CenterZ);
            // AngleToCenter2 = AngleBetweenVectors(AreaConstants.items[AreaNmbr].CenterX-AreaConstants.items[i].CenterX, AreaConstants.items[AreaNmbr].CenterY-AreaConstants.items[i].CenterY, AreaConstants.items[AreaNmbr].CenterZ-AreaConstants.items[i].CenterZ, PosX-AreaConstants.items[i].CenterX, PosY-AreaConstants.items[i].CenterY, PosZ-AreaConstants.items[i].CenterZ);
            // console.log(counter, "5: ",LengthToCenter1, LengthToCenter2, AngleToCenter1, AngleToCenter2);
            // if (AngleToCenter1 >= 0 && AngleToCenter2 >= 0 && AreaConstants.items[AreaNmbr].nx * (Math.cos(AngleToCenter1)*LengthToCenter1) < LengthCenters && AreaConstants.items[i].nx * (Math.cos(AngleToCenter2)*LengthToCenter2 < LengthCenters))
            if (!isNaN(LengthToCenter2)) {
                // console.log(counter, "6: ",ResultingNx, AreaConstants.items[AreaNmbr].nx, (Math.cos(AngleToCenter1)*LengthToCenter1)/LengthCenters, AreaConstants.items[i].nx, (Math.cos(AngleToCenter2)*LengthToCenter2)/LengthCenters,AreaConstants.items[AreaNmbr].nx * (Math.cos(AngleToCenter1)*LengthToCenter1)/LengthCenters + AreaConstants.items[i].nx * (Math.cos(AngleToCenter2)*LengthToCenter2)/LengthCenters);
                // ResultingNx     = ResultingNx + AreaConstants.items[AreaNmbr].nx * (Math.cos(AngleToCenter1)*LengthToCenter1)/LengthCenters + AreaConstants.items[i].nx * (Math.cos(AngleToCenter2)*LengthToCenter2)/LengthCenters;
                ResultingNx =
                    ResultingNx +
                    AreaConstants.items[AreaNmbr].nx *
                        (LengthToCenter2 /
                            (LengthToCenter1 + LengthToCenter2)) +
                    AreaConstants.items[i].nx *
                        (LengthToCenter1 / (LengthToCenter1 + LengthToCenter2));
                ResultingNy =
                    ResultingNy +
                    AreaConstants.items[AreaNmbr].ny *
                        (LengthToCenter2 /
                            (LengthToCenter1 + LengthToCenter2)) +
                    AreaConstants.items[i].ny *
                        (LengthToCenter1 / (LengthToCenter1 + LengthToCenter2));
                ResultingNz =
                    ResultingNz +
                    AreaConstants.items[AreaNmbr].nz *
                        (LengthToCenter2 /
                            (LengthToCenter1 + LengthToCenter2)) +
                    AreaConstants.items[i].nz *
                        (LengthToCenter1 / (LengthToCenter1 + LengthToCenter2));
                NumberOfValues++;
                // console.log(counter, "7: ",AreaConstants.items[AreaNmbr].nx, ResultingNx/NumberOfValues);
            }
        }
    }
    // console.log(counter, "7: ",AreaConstants.items[AreaNmbr].nx, ResultingNx/NumberOfValues);
    var Returnnx = ResultingNx / NumberOfValues;
    var Returnny = ResultingNy / NumberOfValues;
    var Returnnz = ResultingNz / NumberOfValues;
    var ReturnLengthOfNormal = LengthOfVector(Returnnx, Returnny, Returnnz);
    return {
        nx: Returnnx / ReturnLengthOfNormal,
        ny: Returnny / ReturnLengthOfNormal,
        nz: Returnnz / ReturnLengthOfNormal,
    };
    //return AreaConstants.items[AreaNmbr].nx;
}

function GetNxNyNzForAreaWithoutLocation(AreaNmbr) {
    return {
        nx: AreaConstants.items[AreaNmbr].nx,
        ny: AreaConstants.items[AreaNmbr].ny,
        nz: AreaConstants.items[AreaNmbr].nz,
    };
}

function DoTwoAreasHaveACommonCorner(OriginArea, ComparedArea) {
    if (OriginArea != ComparedArea) {
        for (var OriginCorner = 0; OriginCorner < 3; OriginCorner++) {
            for (var ComparedCorner = 0; ComparedCorner < 3; ComparedCorner++) {
                if (
                    LengthOfVector(
                        Area.items[OriginArea][OriginCorner][0] -
                            Area.items[ComparedArea][ComparedCorner][0],
                        Area.items[OriginArea][OriginCorner][1] -
                            Area.items[ComparedArea][ComparedCorner][1],
                        Area.items[OriginArea][OriginCorner][2] -
                            Area.items[ComparedArea][ComparedCorner][2]
                    ) < 1e-6
                )
                    return true;
            }
        }
    }
    return false;
}

function MakeSmoothEdgeBetweenTwoAreas(
    OriginArea,
    CornerB,
    CornerD,
    CornerA,
    AreaIndexOrig
) {
    // OriginArea 		= Area, which is checked against other areas
    // CornerB, CornerD = Corners, which form the edge that should be made smoother
    // CornerA 			= Third CornerA of same area
    // AreaIndexOrig	= Number of current triangles
    console.log(OriginArea, CornerB, CornerD, CornerA);
    //CloneAreaValues(AreaOriginal, Area);
    CloseArea = -1;
    // var AreaIndexOrig = AreaIndex;

    // Check for adjecent triangle
    //raushier:
    for (
        var CloseAreaCounter = 0;
        CloseAreaCounter < AreaIndexOrig;
        CloseAreaCounter++
    ) {
        if (CloseAreaCounter != OriginArea) {
            // Get coordinates of corners of adjecent triangle
            var CloseAreaCorner0x = AreaOriginal.items[CloseAreaCounter][0][0];
            var CloseAreaCorner0y = AreaOriginal.items[CloseAreaCounter][0][1];
            var CloseAreaCorner0z = AreaOriginal.items[CloseAreaCounter][0][2];
            var CloseAreaCorner1x = AreaOriginal.items[CloseAreaCounter][1][0];
            var CloseAreaCorner1y = AreaOriginal.items[CloseAreaCounter][1][1];
            var CloseAreaCorner1z = AreaOriginal.items[CloseAreaCounter][1][2];
            var CloseAreaCorner2x = AreaOriginal.items[CloseAreaCounter][2][0];
            var CloseAreaCorner2y = AreaOriginal.items[CloseAreaCounter][2][1];
            var CloseAreaCorner2z = AreaOriginal.items[CloseAreaCounter][2][2];

            // Calculate distance of each Corner of adjecent triangle to CornerB / CornerD of OriginArea
            var CommonCorners = "";
            if (
                Math.abs(
                    LengthOfVector(
                        CloseAreaCorner0x -
                            AreaOriginal.items[OriginArea][CornerB][0],
                        CloseAreaCorner0y -
                            AreaOriginal.items[OriginArea][CornerB][1],
                        CloseAreaCorner0z -
                            AreaOriginal.items[OriginArea][CornerB][2]
                    ) < 1e-9
                )
            ) {
                CommonCorners = CommonCorners + "0";
            }
            if (
                Math.abs(
                    LengthOfVector(
                        CloseAreaCorner0x -
                            AreaOriginal.items[OriginArea][CornerD][0],
                        CloseAreaCorner0y -
                            AreaOriginal.items[OriginArea][CornerD][1],
                        CloseAreaCorner0z -
                            AreaOriginal.items[OriginArea][CornerD][2]
                    ) < 1e-9
                )
            ) {
                CommonCorners = CommonCorners + "0";
            }
            if (
                Math.abs(
                    LengthOfVector(
                        CloseAreaCorner1x -
                            AreaOriginal.items[OriginArea][CornerB][0],
                        CloseAreaCorner1y -
                            AreaOriginal.items[OriginArea][CornerB][1],
                        CloseAreaCorner1z -
                            AreaOriginal.items[OriginArea][CornerB][2]
                    ) < 1e-9
                )
            ) {
                CommonCorners = CommonCorners + "1";
            }
            if (
                Math.abs(
                    LengthOfVector(
                        CloseAreaCorner1x -
                            AreaOriginal.items[OriginArea][CornerD][0],
                        CloseAreaCorner1y -
                            AreaOriginal.items[OriginArea][CornerD][1],
                        CloseAreaCorner1z -
                            AreaOriginal.items[OriginArea][CornerD][2]
                    ) < 1e-9
                )
            ) {
                CommonCorners = CommonCorners + "1";
            }
            if (
                Math.abs(
                    LengthOfVector(
                        CloseAreaCorner2x -
                            AreaOriginal.items[OriginArea][CornerB][0],
                        CloseAreaCorner2y -
                            AreaOriginal.items[OriginArea][CornerB][1],
                        CloseAreaCorner2z -
                            AreaOriginal.items[OriginArea][CornerB][2]
                    ) < 1e-9
                )
            ) {
                CommonCorners = CommonCorners + "2";
            }
            if (
                Math.abs(
                    LengthOfVector(
                        CloseAreaCorner2x -
                            AreaOriginal.items[OriginArea][CornerD][0],
                        CloseAreaCorner2y -
                            AreaOriginal.items[OriginArea][CornerD][1],
                        CloseAreaCorner2z -
                            AreaOriginal.items[OriginArea][CornerD][2]
                    ) < 1e-9
                )
            ) {
                CommonCorners = CommonCorners + "2";
            }

            // Calculate angle between normal vectors of OriginArea and adjecent triangle
            var NxNyNzOriginArea = GetNxNyNzForAreaWithoutLocation(OriginArea);
            var NxNyNzCloseAreaCounter =
                GetNxNyNzForAreaWithoutLocation(CloseAreaCounter);
            var AngleInBetween = AngleBetweenVectors(
                NxNyNzOriginArea.nx,
                NxNyNzOriginArea.ny,
                NxNyNzOriginArea.nz,
                NxNyNzCloseAreaCounter.nx,
                NxNyNzCloseAreaCounter.ny,
                NxNyNzCloseAreaCounter.nz
            );

            // Check if angle between normal vectors of OriginArea and adjecent triangle not zero and number of common corners between both triangles equal two, then they are tilded against each other and we have found the right edge
            if (
                parseInt(CommonCorners.substr(0, 1), 10) !=
                    parseInt(CommonCorners.substr(1, 2), 10) &&
                CommonCorners.length == 2 &&
                AngleInBetween > 0.01
            ) {
                // Which are the three new corners of the adjecent triangle? CloseAreaCornerS (part of edge), CloseAreaCornerT (part of edge), CloseAreaCornerC (other Corner)
                var CloseAreaCornerS = parseInt(CommonCorners.substr(1, 2), 10);
                var CloseAreaCornerT = parseInt(CommonCorners.substr(0, 1), 10);
                if (CloseAreaCornerS == 0 && CloseAreaCornerT == 1) {
                    var CloseAreaCornerC = 2;
                }
                if (CloseAreaCornerS == 0 && CloseAreaCornerT == 2) {
                    var CloseAreaCornerC = 1;
                }
                if (CloseAreaCornerS == 1 && CloseAreaCornerT == 2) {
                    var CloseAreaCornerC = 0;
                }
                if (CloseAreaCornerS == 1 && CloseAreaCornerT == 0) {
                    var CloseAreaCornerC = 2;
                }
                if (CloseAreaCornerS == 2 && CloseAreaCornerT == 0) {
                    var CloseAreaCornerC = 1;
                }
                if (CloseAreaCornerS == 2 && CloseAreaCornerT == 1) {
                    var CloseAreaCornerC = 0;
                }

                // Calculate Q and R for corners D and B, which form the original edge from side of OriginArea
                var Qx =
                    AreaOriginal.items[OriginArea][CornerA][0] +
                    (2 / 3) *
                        (-AreaOriginal.items[OriginArea][CornerA][0] +
                            AreaOriginal.items[OriginArea][CornerD][0]);
                var Qy =
                    AreaOriginal.items[OriginArea][CornerA][1] +
                    (2 / 3) *
                        (-AreaOriginal.items[OriginArea][CornerA][1] +
                            AreaOriginal.items[OriginArea][CornerD][1]);
                var Qz =
                    AreaOriginal.items[OriginArea][CornerA][2] +
                    (2 / 3) *
                        (-AreaOriginal.items[OriginArea][CornerA][2] +
                            AreaOriginal.items[OriginArea][CornerD][2]);
                var Rx =
                    AreaOriginal.items[OriginArea][CornerA][0] +
                    (2 / 3) *
                        (-AreaOriginal.items[OriginArea][CornerA][0] +
                            AreaOriginal.items[OriginArea][CornerB][0]);
                var Ry =
                    AreaOriginal.items[OriginArea][CornerA][1] +
                    (2 / 3) *
                        (-AreaOriginal.items[OriginArea][CornerA][1] +
                            AreaOriginal.items[OriginArea][CornerB][1]);
                var Rz =
                    AreaOriginal.items[OriginArea][CornerA][2] +
                    (2 / 3) *
                        (-AreaOriginal.items[OriginArea][CornerA][2] +
                            AreaOriginal.items[OriginArea][CornerB][2]);

                // Calculate T and S for corners D and B, which form the original edge from side of adjecent triangle
                var Tx =
                    AreaOriginal.items[CloseAreaCounter][CloseAreaCornerC][0] +
                    (2 / 3) *
                        (-AreaOriginal.items[CloseAreaCounter][
                            CloseAreaCornerC
                        ][0] +
                            AreaOriginal.items[OriginArea][CornerD][0]);
                var Ty =
                    AreaOriginal.items[CloseAreaCounter][CloseAreaCornerC][1] +
                    (2 / 3) *
                        (-AreaOriginal.items[CloseAreaCounter][
                            CloseAreaCornerC
                        ][1] +
                            AreaOriginal.items[OriginArea][CornerD][1]);
                var Tz =
                    AreaOriginal.items[CloseAreaCounter][CloseAreaCornerC][2] +
                    (2 / 3) *
                        (-AreaOriginal.items[CloseAreaCounter][
                            CloseAreaCornerC
                        ][2] +
                            AreaOriginal.items[OriginArea][CornerD][2]);
                var Sx =
                    AreaOriginal.items[CloseAreaCounter][CloseAreaCornerC][0] +
                    (2 / 3) *
                        (-AreaOriginal.items[CloseAreaCounter][
                            CloseAreaCornerC
                        ][0] +
                            AreaOriginal.items[OriginArea][CornerB][0]);
                var Sy =
                    AreaOriginal.items[CloseAreaCounter][CloseAreaCornerC][1] +
                    (2 / 3) *
                        (-AreaOriginal.items[CloseAreaCounter][
                            CloseAreaCornerC
                        ][1] +
                            AreaOriginal.items[OriginArea][CornerB][1]);
                var Sz =
                    AreaOriginal.items[CloseAreaCounter][CloseAreaCornerC][2] +
                    (2 / 3) *
                        (-AreaOriginal.items[CloseAreaCounter][
                            CloseAreaCornerC
                        ][2] +
                            AreaOriginal.items[OriginArea][CornerB][2]);

                // Check all triangles if they have one corner at the location of B or D, if yes, then move this Corner to Q, R, T or S
                var ChangeCornerA1 = -1;
                var ChangeCornerA2 = -1;
                var ChangeCornerB1 = -1;
                var ChangeCornerB2 = -1;
                for (
                    var OtherTriangle = 0;
                    OtherTriangle < AreaIndexOrig;
                    OtherTriangle++
                ) {
                    for (
                        var OtherTriangleCorner = 0;
                        OtherTriangleCorner < 3;
                        OtherTriangleCorner++
                    ) {
                        // Check if triangle has the corner at the location of B
                        if (
                            Math.abs(
                                LengthOfVector(
                                    AreaOriginal.items[OriginArea][CornerB][0] -
                                        AreaOriginal.items[OtherTriangle][
                                            OtherTriangleCorner
                                        ][0],
                                    AreaOriginal.items[OriginArea][CornerB][1] -
                                        AreaOriginal.items[OtherTriangle][
                                            OtherTriangleCorner
                                        ][1],
                                    AreaOriginal.items[OriginArea][CornerB][2] -
                                        AreaOriginal.items[OtherTriangle][
                                            OtherTriangleCorner
                                        ][2]
                                ) < 1e-9
                            )
                        ) {
                            // If this is the case move this corner to the closer of R or S
                            var CenterOfTriangleX =
                                (1 / 3) *
                                (AreaOriginal.items[OtherTriangle][0][0] +
                                    AreaOriginal.items[OtherTriangle][1][0] +
                                    AreaOriginal.items[OtherTriangle][2][0]);
                            var CenterOfTriangleY =
                                (1 / 3) *
                                (AreaOriginal.items[OtherTriangle][0][1] +
                                    AreaOriginal.items[OtherTriangle][1][1] +
                                    AreaOriginal.items[OtherTriangle][2][1]);
                            var CenterOfTriangleZ =
                                (1 / 3) *
                                (AreaOriginal.items[OtherTriangle][0][2] +
                                    AreaOriginal.items[OtherTriangle][1][2] +
                                    AreaOriginal.items[OtherTriangle][2][2]);
                            var DistanceToR = Math.abs(
                                LengthOfVector(
                                    Rx - CenterOfTriangleX,
                                    Ry - CenterOfTriangleY,
                                    Rz - CenterOfTriangleZ
                                )
                            );
                            // var DistanceToR1 = Math.abs(LengthOfVector(Rx-AreaOriginal.items[OtherTriangle][0][0],Ry-AreaOriginal.items[OtherTriangle][0][1],Rz-AreaOriginal.items[OtherTriangle][0][2]));
                            // var DistanceToR2 = Math.abs(LengthOfVector(Rx-AreaOriginal.items[OtherTriangle][1][0],Ry-AreaOriginal.items[OtherTriangle][1][1],Rz-AreaOriginal.items[OtherTriangle][1][2]));
                            // var DistanceToR3 = Math.abs(LengthOfVector(Rx-AreaOriginal.items[OtherTriangle][2][0],Ry-AreaOriginal.items[OtherTriangle][2][1],Rz-AreaOriginal.items[OtherTriangle][2][2]));
                            // var DistanceToR = 1/3*(DistanceToR1 + DistanceToR2 + DistanceToR3);

                            var DistanceToS = Math.abs(
                                LengthOfVector(
                                    Sx - CenterOfTriangleX,
                                    Sy - CenterOfTriangleY,
                                    Sz - CenterOfTriangleZ
                                )
                            );
                            // var DistanceToS1 = Math.abs(LengthOfVector(Sx-AreaOriginal.items[OtherTriangle][0][0],Sy-AreaOriginal.items[OtherTriangle][0][1],Sz-AreaOriginal.items[OtherTriangle][0][2]));
                            // var DistanceToS2 = Math.abs(LengthOfVector(Sx-AreaOriginal.items[OtherTriangle][1][0],Sy-AreaOriginal.items[OtherTriangle][1][1],Sz-AreaOriginal.items[OtherTriangle][1][2]));
                            // var DistanceToS3 = Math.abs(LengthOfVector(Sx-AreaOriginal.items[OtherTriangle][2][0],Sy-AreaOriginal.items[OtherTriangle][2][1],Sz-AreaOriginal.items[OtherTriangle][2][2]));
                            // var DistanceToS = 1/3*(DistanceToS1 + DistanceToS2 + DistanceToS3);

                            // or closer of Q or T
                            var DistanceToQ = Math.abs(
                                LengthOfVector(
                                    Qx - CenterOfTriangleX,
                                    Qy - CenterOfTriangleY,
                                    Qz - CenterOfTriangleZ
                                )
                            );
                            // var DistanceToQ1 = Math.abs(LengthOfVector(Qx-AreaOriginal.items[OtherTriangle][0][0],Qy-AreaOriginal.items[OtherTriangle][0][1],Qz-AreaOriginal.items[OtherTriangle][0][2]));
                            // var DistanceToQ2 = Math.abs(LengthOfVector(Qx-AreaOriginal.items[OtherTriangle][1][0],Qy-AreaOriginal.items[OtherTriangle][1][1],Qz-AreaOriginal.items[OtherTriangle][1][2]));
                            // var DistanceToQ3 = Math.abs(LengthOfVector(Qx-AreaOriginal.items[OtherTriangle][2][0],Qy-AreaOriginal.items[OtherTriangle][2][1],Qz-AreaOriginal.items[OtherTriangle][2][2]));
                            // var DistanceToQ = 1/3*(DistanceToQ1 + DistanceToQ2 + DistanceToQ3);

                            var DistanceToT = Math.abs(
                                LengthOfVector(
                                    Tx - CenterOfTriangleX,
                                    Ty - CenterOfTriangleY,
                                    Tz - CenterOfTriangleZ
                                )
                            );
                            // var DistanceToT1 = Math.abs(LengthOfVector(Tx-AreaOriginal.items[OtherTriangle][0][0],Ty-AreaOriginal.items[OtherTriangle][0][1],Tz-AreaOriginal.items[OtherTriangle][0][2]));
                            // var DistanceToT2 = Math.abs(LengthOfVector(Tx-AreaOriginal.items[OtherTriangle][1][0],Ty-AreaOriginal.items[OtherTriangle][1][1],Tz-AreaOriginal.items[OtherTriangle][1][2]));
                            // var DistanceToT3 = Math.abs(LengthOfVector(Tx-AreaOriginal.items[OtherTriangle][2][0],Ty-AreaOriginal.items[OtherTriangle][2][1],Tz-AreaOriginal.items[OtherTriangle][2][2]));
                            // var DistanceToT = 1/3*(DistanceToT1 + DistanceToT2 + DistanceToT3);

                            if (DistanceToR < DistanceToS) {
                                // Move Corner that was at the location of B to the new closest location R for OtherTriangle
                                Area.items[OtherTriangle][
                                    OtherTriangleCorner
                                ][0] = Rx;
                                Area.items[OtherTriangle][
                                    OtherTriangleCorner
                                ][1] = Ry;
                                Area.items[OtherTriangle][
                                    OtherTriangleCorner
                                ][2] = Rz;
                                ChangeCornerA1 = OtherTriangleCorner;

                                // Move Corner that was at the location of B to the new closest location S for OriginArea
                                // Area.items[OriginArea][CornerB][0] = Sx;
                                // Area.items[OriginArea][CornerB][1] = Sy;
                                // Area.items[OriginArea][CornerB][2] = Sz;

                                // Build new triangle between the other corners and location of B
                                // for (var TriangleCornerCounter = 0; TriangleCornerCounter < 3; TriangleCornerCounter++)
                                // {
                                // if (TriangleCornerCounter != OtherTriangleCorner)
                                // {
                                // CloneAreaValuesOfSpecificArea(OriginArea, AreaIndex);
                                // AreaBelongsToObject[AreaIndex] = AreaBelongsToObject[OriginArea];
                                // SetupAreaConstants(AreaIndex);
                                // CloneAreaConstants(OriginArea, AreaIndex);
                                // SelectedArea[AreaIndex] = true;
                                // Area.items[AreaIndex][0][0] = Area.items[OtherTriangle][TriangleCornerCounter][0];
                                // Area.items[AreaIndex][0][1] = Area.items[OtherTriangle][TriangleCornerCounter][1];
                                // Area.items[AreaIndex][0][2] = Area.items[OtherTriangle][TriangleCornerCounter][2];
                                // Area.items[AreaIndex][1][0] = Area.items[OriginArea][CornerB][0];
                                // Area.items[AreaIndex][1][1] = Area.items[OriginArea][CornerB][1];
                                // Area.items[AreaIndex][1][2] = Area.items[OriginArea][CornerB][2];
                                // Area.items[AreaIndex][2][0] = Rx;
                                // Area.items[AreaIndex][2][1] = Ry;
                                // Area.items[AreaIndex][2][2] = Rz;
                                // if (SuchAreaDidNotYetExist(AreaIndex))
                                // {
                                // AreaIndex++;
                                //// break raushier;
                                // }
                                // }
                                // }
                            } else {
                                // Move Corner that was at the location of B to the new closest location S for OtherTriangle
                                Area.items[OtherTriangle][
                                    OtherTriangleCorner
                                ][0] = Sx;
                                Area.items[OtherTriangle][
                                    OtherTriangleCorner
                                ][1] = Sy;
                                Area.items[OtherTriangle][
                                    OtherTriangleCorner
                                ][2] = Sz;
                                ChangeCornerA2 = OtherTriangleCorner;

                                // Move Corner that was at the location of B to the new closest location R for OriginArea
                                // Area.items[OriginArea][CornerB][0] = Rx;
                                // Area.items[OriginArea][CornerB][1] = Ry;
                                // Area.items[OriginArea][CornerB][2] = Rz;

                                // Build new triangle between the other corners and location of B
                                // for (var TriangleCornerCounter = 0; TriangleCornerCounter < 3; TriangleCornerCounter++)
                                // {
                                // if (TriangleCornerCounter != OtherTriangleCorner)
                                // {
                                // CloneAreaValuesOfSpecificArea(OriginArea, AreaIndex);
                                // AreaBelongsToObject[AreaIndex] = AreaBelongsToObject[OriginArea];
                                // SetupAreaConstants(AreaIndex);
                                // CloneAreaConstants(OriginArea, AreaIndex);
                                // SelectedArea[AreaIndex] = true;
                                // Area.items[AreaIndex][0][0] = Area.items[OtherTriangle][TriangleCornerCounter][0];
                                // Area.items[AreaIndex][0][1] = Area.items[OtherTriangle][TriangleCornerCounter][1];
                                // Area.items[AreaIndex][0][2] = Area.items[OtherTriangle][TriangleCornerCounter][2];
                                // Area.items[AreaIndex][1][0] = Area.items[OriginArea][CornerB][0];
                                // Area.items[AreaIndex][1][1] = Area.items[OriginArea][CornerB][1];
                                // Area.items[AreaIndex][1][2] = Area.items[OriginArea][CornerB][2];
                                // Area.items[AreaIndex][2][0] = Sx;
                                // Area.items[AreaIndex][2][1] = Sy;
                                // Area.items[AreaIndex][2][2] = Sz;
                                // if (SuchAreaDidNotYetExist(AreaIndex))
                                // {
                                // AreaIndex++;
                                //// break raushier;
                                // }
                                // }
                                // }
                            }
                        }
                        // Check if triangle has the corner at the location of D
                        if (
                            Math.abs(
                                LengthOfVector(
                                    AreaOriginal.items[OriginArea][CornerD][0] -
                                        AreaOriginal.items[OtherTriangle][
                                            OtherTriangleCorner
                                        ][0],
                                    AreaOriginal.items[OriginArea][CornerD][1] -
                                        AreaOriginal.items[OtherTriangle][
                                            OtherTriangleCorner
                                        ][1],
                                    AreaOriginal.items[OriginArea][CornerD][2] -
                                        AreaOriginal.items[OtherTriangle][
                                            OtherTriangleCorner
                                        ][2]
                                ) < 1e-9
                            )
                        ) {
                            var CenterOfTriangleX =
                                (1 / 3) *
                                (AreaOriginal.items[OtherTriangle][0][0] +
                                    AreaOriginal.items[OtherTriangle][1][0] +
                                    AreaOriginal.items[OtherTriangle][2][0]);
                            var CenterOfTriangleY =
                                (1 / 3) *
                                (AreaOriginal.items[OtherTriangle][0][1] +
                                    AreaOriginal.items[OtherTriangle][1][1] +
                                    AreaOriginal.items[OtherTriangle][2][1]);
                            var CenterOfTriangleZ =
                                (1 / 3) *
                                (AreaOriginal.items[OtherTriangle][0][2] +
                                    AreaOriginal.items[OtherTriangle][1][2] +
                                    AreaOriginal.items[OtherTriangle][2][2]);
                            var DistanceToR = Math.abs(
                                LengthOfVector(
                                    Rx - CenterOfTriangleX,
                                    Ry - CenterOfTriangleY,
                                    Rz - CenterOfTriangleZ
                                )
                            );
                            // var DistanceToR1 = Math.abs(LengthOfVector(Rx-AreaOriginal.items[OtherTriangle][0][0],Ry-AreaOriginal.items[OtherTriangle][0][1],Rz-AreaOriginal.items[OtherTriangle][0][2]));
                            // var DistanceToR2 = Math.abs(LengthOfVector(Rx-AreaOriginal.items[OtherTriangle][1][0],Ry-AreaOriginal.items[OtherTriangle][1][1],Rz-AreaOriginal.items[OtherTriangle][1][2]));
                            // var DistanceToR3 = Math.abs(LengthOfVector(Rx-AreaOriginal.items[OtherTriangle][2][0],Ry-AreaOriginal.items[OtherTriangle][2][1],Rz-AreaOriginal.items[OtherTriangle][2][2]));
                            // var DistanceToR = 1/3*(DistanceToR1 + DistanceToR2 + DistanceToR3);

                            var DistanceToS = Math.abs(
                                LengthOfVector(
                                    Sx - CenterOfTriangleX,
                                    Sy - CenterOfTriangleY,
                                    Sz - CenterOfTriangleZ
                                )
                            );
                            // var DistanceToS1 = Math.abs(LengthOfVector(Sx-AreaOriginal.items[OtherTriangle][0][0],Sy-AreaOriginal.items[OtherTriangle][0][1],Sz-AreaOriginal.items[OtherTriangle][0][2]));
                            // var DistanceToS2 = Math.abs(LengthOfVector(Sx-AreaOriginal.items[OtherTriangle][1][0],Sy-AreaOriginal.items[OtherTriangle][1][1],Sz-AreaOriginal.items[OtherTriangle][1][2]));
                            // var DistanceToS3 = Math.abs(LengthOfVector(Sx-AreaOriginal.items[OtherTriangle][2][0],Sy-AreaOriginal.items[OtherTriangle][2][1],Sz-AreaOriginal.items[OtherTriangle][2][2]));
                            // var DistanceToS = 1/3*(DistanceToS1 + DistanceToS2 + DistanceToS3);

                            // or closer of Q or T
                            var DistanceToQ = Math.abs(
                                LengthOfVector(
                                    Qx - CenterOfTriangleX,
                                    Qy - CenterOfTriangleY,
                                    Qz - CenterOfTriangleZ
                                )
                            );
                            // var DistanceToQ1 = Math.abs(LengthOfVector(Qx-AreaOriginal.items[OtherTriangle][0][0],Qy-AreaOriginal.items[OtherTriangle][0][1],Qz-AreaOriginal.items[OtherTriangle][0][2]));
                            // var DistanceToQ2 = Math.abs(LengthOfVector(Qx-AreaOriginal.items[OtherTriangle][1][0],Qy-AreaOriginal.items[OtherTriangle][1][1],Qz-AreaOriginal.items[OtherTriangle][1][2]));
                            // var DistanceToQ3 = Math.abs(LengthOfVector(Qx-AreaOriginal.items[OtherTriangle][2][0],Qy-AreaOriginal.items[OtherTriangle][2][1],Qz-AreaOriginal.items[OtherTriangle][2][2]));
                            // var DistanceToQ = 1/3*(DistanceToQ1 + DistanceToQ2 + DistanceToQ3);

                            var DistanceToT = Math.abs(
                                LengthOfVector(
                                    Tx - CenterOfTriangleX,
                                    Ty - CenterOfTriangleY,
                                    Tz - CenterOfTriangleZ
                                )
                            );
                            // var DistanceToT1 = Math.abs(LengthOfVector(Tx-AreaOriginal.items[OtherTriangle][0][0],Ty-AreaOriginal.items[OtherTriangle][0][1],Tz-AreaOriginal.items[OtherTriangle][0][2]));
                            // var DistanceToT2 = Math.abs(LengthOfVector(Tx-AreaOriginal.items[OtherTriangle][1][0],Ty-AreaOriginal.items[OtherTriangle][1][1],Tz-AreaOriginal.items[OtherTriangle][1][2]));
                            // var DistanceToT3 = Math.abs(LengthOfVector(Tx-AreaOriginal.items[OtherTriangle][2][0],Ty-AreaOriginal.items[OtherTriangle][2][1],Tz-AreaOriginal.items[OtherTriangle][2][2]));
                            // var DistanceToT = 1/3*(DistanceToT1 + DistanceToT2 + DistanceToT3);

                            if (DistanceToQ < DistanceToT) {
                                // Move Corner that was at the location of D to the new closest location Q for OtherTriangle
                                Area.items[OtherTriangle][
                                    OtherTriangleCorner
                                ][0] = Qx;
                                Area.items[OtherTriangle][
                                    OtherTriangleCorner
                                ][1] = Qy;
                                Area.items[OtherTriangle][
                                    OtherTriangleCorner
                                ][2] = Qz;
                                ChangeCornerB1 = OtherTriangleCorner;

                                // Move Corner that was at the location of D to the new closest location T for OriginArea
                                // Area.items[OriginArea][CornerD][0] = Tx;
                                // Area.items[OriginArea][CornerD][1] = Ty;
                                // Area.items[OriginArea][CornerD][2] = Tz;

                                // Build new triangle between the other corners and location of D
                                // for (var TriangleCornerCounter = 0; TriangleCornerCounter < 3; TriangleCornerCounter++)
                                // {
                                // if (TriangleCornerCounter != OtherTriangleCorner)
                                // {
                                // CloneAreaValuesOfSpecificArea(OriginArea, AreaIndex);
                                // AreaBelongsToObject[AreaIndex] = AreaBelongsToObject[OriginArea];
                                // SetupAreaConstants(AreaIndex);
                                // CloneAreaConstants(OriginArea, AreaIndex);
                                // SelectedArea[AreaIndex] = true;
                                // Area.items[AreaIndex][0][0] = Area.items[OtherTriangle][TriangleCornerCounter][0];
                                // Area.items[AreaIndex][0][1] = Area.items[OtherTriangle][TriangleCornerCounter][1];
                                // Area.items[AreaIndex][0][2] = Area.items[OtherTriangle][TriangleCornerCounter][2];
                                // Area.items[AreaIndex][1][0] = Area.items[OriginArea][CornerD][0];
                                // Area.items[AreaIndex][1][1] = Area.items[OriginArea][CornerD][1];
                                // Area.items[AreaIndex][1][2] = Area.items[OriginArea][CornerD][2];
                                // Area.items[AreaIndex][2][0] = Qx;
                                // Area.items[AreaIndex][2][1] = Qy;
                                // Area.items[AreaIndex][2][2] = Qz;
                                // if (SuchAreaDidNotYetExist(AreaIndex))
                                // {
                                // AreaIndex++;
                                //// break raushier;
                                // }
                                // }
                                // }
                            } else {
                                // Move Corner that was at the location of D to the new closest location T for OtherTriangle
                                Area.items[OtherTriangle][
                                    OtherTriangleCorner
                                ][0] = Tx;
                                Area.items[OtherTriangle][
                                    OtherTriangleCorner
                                ][1] = Ty;
                                Area.items[OtherTriangle][
                                    OtherTriangleCorner
                                ][2] = Tz;
                                ChangeCornerB2 = OtherTriangleCorner;

                                // Move Corner that was at the location of D to the new closest location Q for OriginArea
                                // Area.items[OriginArea][CornerD][0] = Qx;
                                // Area.items[OriginArea][CornerD][1] = Qy;
                                // Area.items[OriginArea][CornerD][2] = Qz;

                                // Build new triangle between the other corners and location of B
                                // for (var TriangleCornerCounter = 0; TriangleCornerCounter < 3; TriangleCornerCounter++)
                                // {
                                // if (TriangleCornerCounter != OtherTriangleCorner)
                                // {
                                // CloneAreaValuesOfSpecificArea(OriginArea, AreaIndex);
                                // AreaBelongsToObject[AreaIndex] = AreaBelongsToObject[OriginArea];
                                // SetupAreaConstants(AreaIndex);
                                // CloneAreaConstants(OriginArea, AreaIndex);
                                // SelectedArea[AreaIndex] = true;
                                // Area.items[AreaIndex][0][0] = Area.items[OtherTriangle][TriangleCornerCounter][0];
                                // Area.items[AreaIndex][0][1] = Area.items[OtherTriangle][TriangleCornerCounter][1];
                                // Area.items[AreaIndex][0][2] = Area.items[OtherTriangle][TriangleCornerCounter][2];
                                // Area.items[AreaIndex][1][0] = Area.items[OriginArea][CornerD][0];
                                // Area.items[AreaIndex][1][1] = Area.items[OriginArea][CornerD][1];
                                // Area.items[AreaIndex][1][2] = Area.items[OriginArea][CornerD][2];
                                // Area.items[AreaIndex][2][0] = Tx;
                                // Area.items[AreaIndex][2][1] = Ty;
                                // Area.items[AreaIndex][2][2] = Tz;
                                // if (SuchAreaDidNotYetExist(AreaIndex))
                                // {
                                // AreaIndex++;
                                //// break raushier;
                                // }
                                // }
                                // }
                            }
                        }
                    }
                    // Prüfe, ob 4 Ecken verschoben wurden
                    if (
                        ChangeCornerA1 != -1 &&
                        ChangeCornerA2 != -1 &&
                        ChangeCornerB1 != -1 &&
                        ChangeCornerB2 != -1
                    ) {
                        // Falls dies der Fall ist bilde 2 Dreiecke. Von R zu S zu Q, Von Q zu S zu T
                        // Von R zu S zu Q
                        CloneAreaValuesOfSpecificArea(OriginArea, AreaIndex);
                        AreaBelongsToObject[AreaIndex] =
                            AreaBelongsToObject[OriginArea];
                        SetupAreaConstants(AreaIndex);
                        CloneAreaConstants(OriginArea, AreaIndex);
                        SelectedArea[AreaIndex] = true;
                        Area.items[AreaIndex][0][0] = Rx;
                        Area.items[AreaIndex][0][1] = Ry;
                        Area.items[AreaIndex][0][2] = Rz;
                        Area.items[AreaIndex][1][0] = Sx;
                        Area.items[AreaIndex][1][1] = Sy;
                        Area.items[AreaIndex][1][2] = Sz;
                        Area.items[AreaIndex][2][0] = Qx;
                        Area.items[AreaIndex][2][1] = Qy;
                        Area.items[AreaIndex][2][2] = Qz;
                        if (SuchAreaDidNotYetExist(AreaIndex)) {
                            AreaIndex++;
                        }
                        // Von Q zu S zu T
                        CloneAreaValuesOfSpecificArea(OriginArea, AreaIndex);
                        AreaBelongsToObject[AreaIndex] =
                            AreaBelongsToObject[OriginArea];
                        SetupAreaConstants(AreaIndex);
                        CloneAreaConstants(OriginArea, AreaIndex);
                        SelectedArea[AreaIndex] = true;
                        Area.items[AreaIndex][0][0] = Qx;
                        Area.items[AreaIndex][0][1] = Qy;
                        Area.items[AreaIndex][0][2] = Qz;
                        Area.items[AreaIndex][1][0] = Sx;
                        Area.items[AreaIndex][1][1] = Sy;
                        Area.items[AreaIndex][1][2] = Sz;
                        Area.items[AreaIndex][2][0] = Tx;
                        Area.items[AreaIndex][2][1] = Ty;
                        Area.items[AreaIndex][2][2] = Tz;
                        if (SuchAreaDidNotYetExist(AreaIndex)) {
                            AreaIndex++;
                        }
                    }
                }
            }
        }
    }

    //CloneAreaValues(Area, AreaOriginal);
}

function MakeSixAreasFromAdjacentTwoOnShortSide(OriginArea, CloseArea) {
    console.log(OriginArea, CloseArea);
    CloneAreaValues(AreaOriginal, Area);
    if (
        Math.abs(Area.items[OriginArea][1][0] - Area.items[CloseArea][0][0]) <
            1e-9 &&
        Math.abs(Area.items[OriginArea][2][0] - Area.items[CloseArea][2][0]) <
            1e-9 &&
        Math.abs(Area.items[OriginArea][1][1] - Area.items[CloseArea][0][1]) <
            1e-9 &&
        Math.abs(Area.items[OriginArea][2][1] - Area.items[CloseArea][2][1]) <
            1e-9 &&
        Math.abs(Area.items[OriginArea][1][2] - Area.items[CloseArea][0][2]) <
            1e-9 &&
        Math.abs(Area.items[OriginArea][2][2] - Area.items[CloseArea][2][2]) <
            1e-9
    ) {
        var Pq1x =
            Area.items[CloseArea][0][0] +
            (1 / 3) *
                (Area.items[CloseArea][1][0] - Area.items[CloseArea][0][0]);
        var Pq1y =
            Area.items[CloseArea][0][1] +
            (1 / 3) *
                (Area.items[CloseArea][1][1] - Area.items[CloseArea][0][1]);
        var Pq1z =
            Area.items[CloseArea][0][2] +
            (1 / 3) *
                (Area.items[CloseArea][1][2] - Area.items[CloseArea][0][2]);

        var Pq2x =
            Area.items[CloseArea][2][0] +
            (1 / 3) *
                (Area.items[CloseArea][1][0] - Area.items[CloseArea][0][0]);
        var Pq2y =
            Area.items[CloseArea][2][1] +
            (1 / 3) *
                (Area.items[CloseArea][1][1] - Area.items[CloseArea][0][1]);
        var Pq2z =
            Area.items[CloseArea][2][2] +
            (1 / 3) *
                (Area.items[CloseArea][1][2] - Area.items[CloseArea][0][2]);

        var Pq3x =
            Area.items[OriginArea][1][0] +
            (1 / 3) *
                (Area.items[OriginArea][0][0] - Area.items[OriginArea][2][0]);
        var Pq3y =
            Area.items[OriginArea][1][1] +
            (1 / 3) *
                (Area.items[OriginArea][0][1] - Area.items[OriginArea][2][1]);
        var Pq3z =
            Area.items[OriginArea][1][2] +
            (1 / 3) *
                (Area.items[OriginArea][0][2] - Area.items[OriginArea][2][2]);

        var Pq4x =
            Area.items[OriginArea][0][0] +
            (2 / 3) *
                (Area.items[OriginArea][2][0] - Area.items[OriginArea][0][0]);
        var Pq4y =
            Area.items[OriginArea][0][1] +
            (2 / 3) *
                (Area.items[OriginArea][2][1] - Area.items[OriginArea][0][1]);
        var Pq4z =
            Area.items[OriginArea][0][2] +
            (2 / 3) *
                (Area.items[OriginArea][2][2] - Area.items[OriginArea][0][2]);

        var P1x = Area.items[OriginArea][1][0];
        var P1y = Area.items[OriginArea][1][1];
        var P1z = Area.items[OriginArea][1][2];

        var P2x = Area.items[CloseArea][2][0];
        var P2y = Area.items[CloseArea][2][1];
        var P2z = Area.items[CloseArea][2][2];

        // ist OK
        Area.items[OriginArea][0][0] = Area.items[OriginArea][0][0];
        Area.items[OriginArea][0][1] = Area.items[OriginArea][0][1];
        Area.items[OriginArea][0][2] = Area.items[OriginArea][0][2];
        Area.items[OriginArea][1][0] = Pq3x;
        Area.items[OriginArea][1][1] = Pq3y;
        Area.items[OriginArea][1][2] = Pq3z;
        Area.items[OriginArea][2][0] = Pq4x;
        Area.items[OriginArea][2][1] = Pq4y;
        Area.items[OriginArea][2][2] = Pq4z;

        // ist OK
        Area.items[CloseArea][0][0] = Pq1x;
        Area.items[CloseArea][0][1] = Pq1y;
        Area.items[CloseArea][0][2] = Pq1z;
        Area.items[CloseArea][1][0] = Area.items[CloseArea][1][0];
        Area.items[CloseArea][1][1] = Area.items[CloseArea][1][1];
        Area.items[CloseArea][1][2] = Area.items[CloseArea][1][2];
        Area.items[CloseArea][2][0] = Pq2x;
        Area.items[CloseArea][2][1] = Pq2y;
        Area.items[CloseArea][2][2] = Pq2z;
    } else {
        var Pq1x =
            Area.items[CloseArea][2][0] -
            (1 / 3) *
                (-Area.items[CloseArea][0][0] + Area.items[CloseArea][2][0]);
        var Pq1y =
            Area.items[CloseArea][2][1] -
            (1 / 3) *
                (-Area.items[CloseArea][0][1] + Area.items[CloseArea][2][1]);
        var Pq1z =
            Area.items[CloseArea][2][2] -
            (1 / 3) *
                (-Area.items[CloseArea][0][2] + Area.items[CloseArea][2][2]);

        var Pq2x =
            Area.items[CloseArea][1][0] -
            (1 / 3) *
                (-Area.items[CloseArea][0][0] + Area.items[CloseArea][2][0]);
        var Pq2y =
            Area.items[CloseArea][1][1] -
            (1 / 3) *
                (-Area.items[CloseArea][0][1] + Area.items[CloseArea][2][1]);
        var Pq2z =
            Area.items[CloseArea][1][2] -
            (1 / 3) *
                (-Area.items[CloseArea][0][2] + Area.items[CloseArea][2][2]);

        var Pq3x =
            Area.items[OriginArea][2][0] -
            (1 / 3) *
                (-Area.items[OriginArea][1][0] + Area.items[OriginArea][0][0]);
        var Pq3y =
            Area.items[OriginArea][2][1] -
            (1 / 3) *
                (-Area.items[OriginArea][1][1] + Area.items[OriginArea][0][1]);
        var Pq3z =
            Area.items[OriginArea][2][2] -
            (1 / 3) *
                (-Area.items[OriginArea][1][2] + Area.items[OriginArea][0][2]);

        var Pq4x =
            Area.items[OriginArea][1][0] -
            (2 / 3) *
                (-Area.items[OriginArea][0][0] + Area.items[OriginArea][1][0]);
        var Pq4y =
            Area.items[OriginArea][1][1] -
            (2 / 3) *
                (-Area.items[OriginArea][0][1] + Area.items[OriginArea][1][1]);
        var Pq4z =
            Area.items[OriginArea][1][2] -
            (2 / 3) *
                (-Area.items[OriginArea][0][2] + Area.items[OriginArea][1][2]);

        var P1x = Area.items[OriginArea][2][0];
        var P1y = Area.items[OriginArea][2][1];
        var P1z = Area.items[OriginArea][2][2];

        var P2x = Area.items[CloseArea][1][0];
        var P2y = Area.items[CloseArea][1][1];
        var P2z = Area.items[CloseArea][1][2];

        // ist OK
        Area.items[OriginArea][0][0] = Area.items[OriginArea][0][0];
        Area.items[OriginArea][0][1] = Area.items[OriginArea][0][1];
        Area.items[OriginArea][0][2] = Area.items[OriginArea][0][2];
        Area.items[OriginArea][1][0] = Pq3x;
        Area.items[OriginArea][1][1] = Pq3y;
        Area.items[OriginArea][1][2] = Pq3z;
        Area.items[OriginArea][2][0] = Pq4x;
        Area.items[OriginArea][2][1] = Pq4y;
        Area.items[OriginArea][2][2] = Pq4z;

        // ist OK
        Area.items[CloseArea][0][0] = Pq1x;
        Area.items[CloseArea][0][1] = Pq1y;
        Area.items[CloseArea][0][2] = Pq1z;
        Area.items[CloseArea][1][0] = Area.items[CloseArea][1][0];
        Area.items[CloseArea][1][1] = Area.items[CloseArea][1][1];
        Area.items[CloseArea][1][2] = Area.items[CloseArea][1][2];
        Area.items[CloseArea][2][0] = Pq2x;
        Area.items[CloseArea][2][1] = Pq2y;
        Area.items[CloseArea][2][2] = Pq2z;
    }

    console.log(AreaIndex);

    for (var i = 0; i < AreaIndex; i++) {
        for (var ij = 0; ij < 3; ij++) {
            if (
                OriginArea != i &&
                CloseArea != i &&
                Math.abs(Area.items[i][ij][0] - P1x) < 1e-9 &&
                Math.abs(Area.items[i][ij][1] - P1y) < 1e-9 &&
                Math.abs(Area.items[i][ij][2] - P1z) < 1e-9
            ) {
                console.log(
                    "A: From Area ",
                    OriginArea,
                    " Corner ",
                    1,
                    " to Area ",
                    i,
                    " Corner ",
                    ij
                );
                Area.items[i][ij][0] = Area.items[OriginArea][1][0];
                Area.items[i][ij][1] = Area.items[OriginArea][1][1];
                Area.items[i][ij][2] = Area.items[OriginArea][1][2];
            }
            if (
                OriginArea != i &&
                CloseArea != i &&
                Math.abs(Area.items[i][ij][0] - P2x) < 1e-9 &&
                Math.abs(Area.items[i][ij][1] - P2y) < 1e-9 &&
                Math.abs(Area.items[i][ij][2] - P2z) < 1e-9
            ) {
                console.log(
                    "B: From Area ",
                    CloseArea,
                    " Corner ",
                    2,
                    " to Area ",
                    i,
                    " Corner ",
                    ij
                );
                Area.items[i][ij][0] = Area.items[CloseArea][2][0];
                Area.items[i][ij][1] = Area.items[CloseArea][2][1];
                Area.items[i][ij][2] = Area.items[CloseArea][2][2];
            }
        }
    }

    // ist OK
    CloneAreaValuesOfSpecificArea(OriginArea, AreaIndex);
    AreaBelongsToObject[AreaIndex] = AreaBelongsToObject[OriginArea];
    SetupAreaConstants(AreaIndex);
    CloneAreaConstants(OriginArea, AreaIndex);
    SelectedArea[AreaIndex] = true;
    Area.items[AreaIndex][1][0] = Area.items[CloseArea][0][0];
    Area.items[AreaIndex][1][1] = Area.items[CloseArea][0][1];
    Area.items[AreaIndex][1][2] = Area.items[CloseArea][0][2];
    Area.items[AreaIndex][2][0] = Area.items[CloseArea][2][0];
    Area.items[AreaIndex][2][1] = Area.items[CloseArea][2][1];
    Area.items[AreaIndex][2][2] = Area.items[CloseArea][2][2];
    Area.items[AreaIndex][0][0] = Area.items[OriginArea][2][0];
    Area.items[AreaIndex][0][1] = Area.items[OriginArea][2][1];
    Area.items[AreaIndex][0][2] = Area.items[OriginArea][2][2];
    AreaIndex++;

    // ist OK
    CloneAreaValuesOfSpecificArea(OriginArea, AreaIndex);
    AreaBelongsToObject[AreaIndex] = AreaBelongsToObject[OriginArea];
    SetupAreaConstants(AreaIndex);
    CloneAreaConstants(OriginArea, AreaIndex);
    SelectedArea[AreaIndex] = true;
    Area.items[AreaIndex][0][0] = Area.items[OriginArea][1][0];
    Area.items[AreaIndex][0][1] = Area.items[OriginArea][1][1];
    Area.items[AreaIndex][0][2] = Area.items[OriginArea][1][2];
    Area.items[AreaIndex][1][0] = Area.items[CloseArea][0][0];
    Area.items[AreaIndex][1][1] = Area.items[CloseArea][0][1];
    Area.items[AreaIndex][1][2] = Area.items[CloseArea][0][2];
    Area.items[AreaIndex][2][0] = Area.items[OriginArea][2][0];
    Area.items[AreaIndex][2][1] = Area.items[OriginArea][2][1];
    Area.items[AreaIndex][2][2] = Area.items[OriginArea][2][2];
    AreaIndex++;

    CloneAreaValues(Area, AreaOriginal);
}

function MakeSixAreasFromAdjacentTwo(OriginArea, CloseArea) {
    CloneAreaValues(AreaOriginal, Area);
    var Pq2x =
        Area.items[OriginArea][0][0] +
        (2 / 3) * (Area.items[OriginArea][1][0] - Area.items[OriginArea][0][0]);
    var Pq2y =
        Area.items[OriginArea][0][1] +
        (2 / 3) * (Area.items[OriginArea][1][1] - Area.items[OriginArea][0][1]);
    var Pq2z =
        Area.items[OriginArea][0][2] +
        (2 / 3) * (Area.items[OriginArea][1][2] - Area.items[OriginArea][0][2]);

    var Pq1x =
        Area.items[OriginArea][0][0] +
        (2 / 3) * (Area.items[OriginArea][2][0] - Area.items[OriginArea][0][0]);
    var Pq1y =
        Area.items[OriginArea][0][1] +
        (2 / 3) * (Area.items[OriginArea][2][1] - Area.items[OriginArea][0][1]);
    var Pq1z =
        Area.items[OriginArea][0][2] +
        (2 / 3) * (Area.items[OriginArea][2][2] - Area.items[OriginArea][0][2]);

    var Pq3x =
        Area.items[CloseArea][2][0] +
        (2 / 3) * (Area.items[CloseArea][1][0] - Area.items[CloseArea][2][0]);
    var Pq3y =
        Area.items[CloseArea][2][1] +
        (2 / 3) * (Area.items[CloseArea][1][1] - Area.items[CloseArea][2][1]);
    var Pq3z =
        Area.items[CloseArea][2][2] +
        (2 / 3) * (Area.items[CloseArea][1][2] - Area.items[CloseArea][2][2]);

    var Pq4x =
        Area.items[CloseArea][2][0] +
        (2 / 3) * (Area.items[CloseArea][0][0] - Area.items[CloseArea][2][0]);
    var Pq4y =
        Area.items[CloseArea][2][1] +
        (2 / 3) * (Area.items[CloseArea][0][1] - Area.items[CloseArea][2][1]);
    var Pq4z =
        Area.items[CloseArea][2][2] +
        (2 / 3) * (Area.items[CloseArea][0][2] - Area.items[CloseArea][2][2]);

    var P4x = Area.items[OriginArea][1][0];
    var P4y = Area.items[OriginArea][1][1];
    var P4z = Area.items[OriginArea][1][2];

    var P2x = Area.items[CloseArea][1][0];
    var P2y = Area.items[CloseArea][1][1];
    var P2z = Area.items[CloseArea][1][2];

    var P4neux =
        (((P4z * Pq2y - P4y * Pq2z) * Pq3x -
            (P4z * Pq2x - P4x * Pq2z) * Pq3y +
            (P4y * Pq2x - P4x * Pq2y) * Pq3z -
            (P4z * Pq2y -
                P4y * Pq2z -
                (P4z - Pq2z) * Pq3y +
                (P4y - Pq2y) * Pq3z) *
                Pq4x +
            (P4z * Pq2x -
                P4x * Pq2z -
                (P4z - Pq2z) * Pq3x +
                (P4x - Pq2x) * Pq3z) *
                Pq4y -
            (P4y * Pq2x -
                P4x * Pq2y -
                (P4y - Pq2y) * Pq3x +
                (P4x - Pq2x) * Pq3y) *
                Pq4z) *
            ((Pq2z - Pq4z) * (Pq3y - Pq4y) - (Pq2y - Pq4y) * (Pq3z - Pq4z))) /
            (2 * Pq2x * Pq2y * Pq3x * Pq3y -
                (Pq2y * Pq2y + Pq2z * Pq2z) * Pq3x * Pq3x -
                (Pq2x * Pq2x + Pq2z * Pq2z) * Pq3y * Pq3y -
                (Pq2x * Pq2x + Pq2y * Pq2y) * Pq3z * Pq3z -
                (Pq2y * Pq2y +
                    Pq2z * Pq2z -
                    2 * Pq2y * Pq3y +
                    Pq3y * Pq3y -
                    2 * Pq2z * Pq3z +
                    Pq3z * Pq3z) *
                    Pq4x *
                    Pq4x -
                (Pq2x * Pq2x +
                    Pq2z * Pq2z -
                    2 * Pq2x * Pq3x +
                    Pq3x * Pq3x -
                    2 * Pq2z * Pq3z +
                    Pq3z * Pq3z) *
                    Pq4y *
                    Pq4y -
                (Pq2x * Pq2x +
                    Pq2y * Pq2y -
                    2 * Pq2x * Pq3x +
                    Pq3x * Pq3x -
                    2 * Pq2y * Pq3y +
                    Pq3y * Pq3y) *
                    Pq4z *
                    Pq4z +
                2 * (Pq2x * Pq2z * Pq3x + Pq2y * Pq2z * Pq3y) * Pq3z +
                2 *
                    (Pq2x * Pq3y * Pq3y +
                        Pq2x * Pq3z * Pq3z +
                        (Pq2y * Pq2y + Pq2z * Pq2z) * Pq3x -
                        (Pq2x * Pq2y + Pq2y * Pq3x) * Pq3y -
                        (Pq2x * Pq2z + Pq2z * Pq3x) * Pq3z) *
                    Pq4x -
                2 *
                    (Pq2x * Pq2y * Pq3x -
                        Pq2y * Pq3x * Pq3x -
                        Pq2y * Pq3z * Pq3z -
                        (Pq2x * Pq2x + Pq2z * Pq2z - Pq2x * Pq3x) * Pq3y +
                        (Pq2y * Pq2z + Pq2z * Pq3y) * Pq3z -
                        (Pq2x * Pq2y - Pq2y * Pq3x - (Pq2x - Pq3x) * Pq3y) *
                            Pq4x) *
                    Pq4y -
                2 *
                    (Pq2x * Pq2z * Pq3x -
                        Pq2z * Pq3x * Pq3x +
                        Pq2y * Pq2z * Pq3y -
                        Pq2z * Pq3y * Pq3y -
                        (Pq2x * Pq2x +
                            Pq2y * Pq2y -
                            Pq2x * Pq3x -
                            Pq2y * Pq3y) *
                            Pq3z -
                        (Pq2x * Pq2z - Pq2z * Pq3x - (Pq2x - Pq3x) * Pq3z) *
                            Pq4x -
                        (Pq2y * Pq2z - Pq2z * Pq3y - (Pq2y - Pq3y) * Pq3z) *
                            Pq4y) *
                    Pq4z) +
        P4x;

    var P4neuy =
        (-((Pq2z - Pq4z) * (Pq3x - Pq4x) - (Pq2x - Pq4x) * (Pq3z - Pq4z)) *
            ((P4z * Pq2y - P4y * Pq2z) * Pq3x -
                (P4z * Pq2x - P4x * Pq2z) * Pq3y +
                (P4y * Pq2x - P4x * Pq2y) * Pq3z -
                (P4z * Pq2y -
                    P4y * Pq2z -
                    (P4z - Pq2z) * Pq3y +
                    (P4y - Pq2y) * Pq3z) *
                    Pq4x +
                (P4z * Pq2x -
                    P4x * Pq2z -
                    (P4z - Pq2z) * Pq3x +
                    (P4x - Pq2x) * Pq3z) *
                    Pq4y -
                (P4y * Pq2x -
                    P4x * Pq2y -
                    (P4y - Pq2y) * Pq3x +
                    (P4x - Pq2x) * Pq3y) *
                    Pq4z)) /
            (2 * Pq2x * Pq2y * Pq3x * Pq3y -
                (Pq2y * Pq2y + Pq2z * Pq2z) * Pq3x * Pq3x -
                (Pq2x * Pq2x + Pq2z * Pq2z) * Pq3y * Pq3y -
                (Pq2x * Pq2x + Pq2y * Pq2y) * Pq3z * Pq3z -
                (Pq2y * Pq2y +
                    Pq2z * Pq2z -
                    2 * Pq2y * Pq3y +
                    Pq3y * Pq3y -
                    2 * Pq2z * Pq3z +
                    Pq3z * Pq3z) *
                    Pq4x *
                    Pq4x -
                (Pq2x * Pq2x +
                    Pq2z * Pq2z -
                    2 * Pq2x * Pq3x +
                    Pq3x * Pq3x -
                    2 * Pq2z * Pq3z +
                    Pq3z * Pq3z) *
                    Pq4y *
                    Pq4y -
                (Pq2x * Pq2x +
                    Pq2y * Pq2y -
                    2 * Pq2x * Pq3x +
                    Pq3x * Pq3x -
                    2 * Pq2y * Pq3y +
                    Pq3y * Pq3y) *
                    Pq4z *
                    Pq4z +
                2 * (Pq2x * Pq2z * Pq3x + Pq2y * Pq2z * Pq3y) * Pq3z +
                2 *
                    (Pq2x * Pq3y * Pq3y +
                        Pq2x * Pq3z * Pq3z +
                        (Pq2y * Pq2y + Pq2z * Pq2z) * Pq3x -
                        (Pq2x * Pq2y + Pq2y * Pq3x) * Pq3y -
                        (Pq2x * Pq2z + Pq2z * Pq3x) * Pq3z) *
                    Pq4x -
                2 *
                    (Pq2x * Pq2y * Pq3x -
                        Pq2y * Pq3x * Pq3x -
                        Pq2y * Pq3z * Pq3z -
                        (Pq2x * Pq2x + Pq2z * Pq2z - Pq2x * Pq3x) * Pq3y +
                        (Pq2y * Pq2z + Pq2z * Pq3y) * Pq3z -
                        (Pq2x * Pq2y - Pq2y * Pq3x - (Pq2x - Pq3x) * Pq3y) *
                            Pq4x) *
                    Pq4y -
                2 *
                    (Pq2x * Pq2z * Pq3x -
                        Pq2z * Pq3x * Pq3x +
                        Pq2y * Pq2z * Pq3y -
                        Pq2z * Pq3y * Pq3y -
                        (Pq2x * Pq2x +
                            Pq2y * Pq2y -
                            Pq2x * Pq3x -
                            Pq2y * Pq3y) *
                            Pq3z -
                        (Pq2x * Pq2z - Pq2z * Pq3x - (Pq2x - Pq3x) * Pq3z) *
                            Pq4x -
                        (Pq2y * Pq2z - Pq2z * Pq3y - (Pq2y - Pq3y) * Pq3z) *
                            Pq4y) *
                    Pq4z) +
        P4y;

    var P4neuz =
        (((Pq2y - Pq4y) * (Pq3x - Pq4x) - (Pq2x - Pq4x) * (Pq3y - Pq4y)) *
            ((P4z * Pq2y - P4y * Pq2z) * Pq3x -
                (P4z * Pq2x - P4x * Pq2z) * Pq3y +
                (P4y * Pq2x - P4x * Pq2y) * Pq3z -
                (P4z * Pq2y -
                    P4y * Pq2z -
                    (P4z - Pq2z) * Pq3y +
                    (P4y - Pq2y) * Pq3z) *
                    Pq4x +
                (P4z * Pq2x -
                    P4x * Pq2z -
                    (P4z - Pq2z) * Pq3x +
                    (P4x - Pq2x) * Pq3z) *
                    Pq4y -
                (P4y * Pq2x -
                    P4x * Pq2y -
                    (P4y - Pq2y) * Pq3x +
                    (P4x - Pq2x) * Pq3y) *
                    Pq4z)) /
            (2 * Pq2x * Pq2y * Pq3x * Pq3y -
                (Pq2y * Pq2y + Pq2z * Pq2z) * Pq3x * Pq3x -
                (Pq2x * Pq2x + Pq2z * Pq2z) * Pq3y * Pq3y -
                (Pq2x * Pq2x + Pq2y * Pq2y) * Pq3z * Pq3z -
                (Pq2y * Pq2y +
                    Pq2z * Pq2z -
                    2 * Pq2y * Pq3y +
                    Pq3y * Pq3y -
                    2 * Pq2z * Pq3z +
                    Pq3z * Pq3z) *
                    Pq4x *
                    Pq4x -
                (Pq2x * Pq2x +
                    Pq2z * Pq2z -
                    2 * Pq2x * Pq3x +
                    Pq3x * Pq3x -
                    2 * Pq2z * Pq3z +
                    Pq3z * Pq3z) *
                    Pq4y *
                    Pq4y -
                (Pq2x * Pq2x +
                    Pq2y * Pq2y -
                    2 * Pq2x * Pq3x +
                    Pq3x * Pq3x -
                    2 * Pq2y * Pq3y +
                    Pq3y * Pq3y) *
                    Pq4z *
                    Pq4z +
                2 * (Pq2x * Pq2z * Pq3x + Pq2y * Pq2z * Pq3y) * Pq3z +
                2 *
                    (Pq2x * Pq3y * Pq3y +
                        Pq2x * Pq3z * Pq3z +
                        (Pq2y * Pq2y + Pq2z * Pq2z) * Pq3x -
                        (Pq2x * Pq2y + Pq2y * Pq3x) * Pq3y -
                        (Pq2x * Pq2z + Pq2z * Pq3x) * Pq3z) *
                    Pq4x -
                2 *
                    (Pq2x * Pq2y * Pq3x -
                        Pq2y * Pq3x * Pq3x -
                        Pq2y * Pq3z * Pq3z -
                        (Pq2x * Pq2x + Pq2z * Pq2z - Pq2x * Pq3x) * Pq3y +
                        (Pq2y * Pq2z + Pq2z * Pq3y) * Pq3z -
                        (Pq2x * Pq2y - Pq2y * Pq3x - (Pq2x - Pq3x) * Pq3y) *
                            Pq4x) *
                    Pq4y -
                2 *
                    (Pq2x * Pq2z * Pq3x -
                        Pq2z * Pq3x * Pq3x +
                        Pq2y * Pq2z * Pq3y -
                        Pq2z * Pq3y * Pq3y -
                        (Pq2x * Pq2x +
                            Pq2y * Pq2y -
                            Pq2x * Pq3x -
                            Pq2y * Pq3y) *
                            Pq3z -
                        (Pq2x * Pq2z - Pq2z * Pq3x - (Pq2x - Pq3x) * Pq3z) *
                            Pq4x -
                        (Pq2y * Pq2z - Pq2z * Pq3y - (Pq2y - Pq3y) * Pq3z) *
                            Pq4y) *
                    Pq4z) +
        P4z;

    var P2neux =
        (((P2z * Pq2y - P2y * Pq2z) * Pq3x -
            (P2z * Pq2x - P2x * Pq2z) * Pq3y +
            (P2y * Pq2x - P2x * Pq2y) * Pq3z -
            (P2z * Pq2y -
                P2y * Pq2z -
                (P2z - Pq2z) * Pq3y +
                (P2y - Pq2y) * Pq3z) *
                Pq4x +
            (P2z * Pq2x -
                P2x * Pq2z -
                (P2z - Pq2z) * Pq3x +
                (P2x - Pq2x) * Pq3z) *
                Pq4y -
            (P2y * Pq2x -
                P2x * Pq2y -
                (P2y - Pq2y) * Pq3x +
                (P2x - Pq2x) * Pq3y) *
                Pq4z) *
            ((Pq2z - Pq4z) * (Pq3y - Pq4y) - (Pq2y - Pq4y) * (Pq3z - Pq4z))) /
            (2 * Pq2x * Pq2y * Pq3x * Pq3y -
                (Pq2y * Pq2y + Pq2z * Pq2z) * Pq3x * Pq3x -
                (Pq2x * Pq2x + Pq2z * Pq2z) * Pq3y * Pq3y -
                (Pq2x * Pq2x + Pq2y * Pq2y) * Pq3z * Pq3z -
                (Pq2y * Pq2y +
                    Pq2z * Pq2z -
                    2 * Pq2y * Pq3y +
                    Pq3y * Pq3y -
                    2 * Pq2z * Pq3z +
                    Pq3z * Pq3z) *
                    Pq4x *
                    Pq4x -
                (Pq2x * Pq2x +
                    Pq2z * Pq2z -
                    2 * Pq2x * Pq3x +
                    Pq3x * Pq3x -
                    2 * Pq2z * Pq3z +
                    Pq3z * Pq3z) *
                    Pq4y *
                    Pq4y -
                (Pq2x * Pq2x +
                    Pq2y * Pq2y -
                    2 * Pq2x * Pq3x +
                    Pq3x * Pq3x -
                    2 * Pq2y * Pq3y +
                    Pq3y * Pq3y) *
                    Pq4z *
                    Pq4z +
                2 * (Pq2x * Pq2z * Pq3x + Pq2y * Pq2z * Pq3y) * Pq3z +
                2 *
                    (Pq2x * Pq3y * Pq3y +
                        Pq2x * Pq3z * Pq3z +
                        (Pq2y * Pq2y + Pq2z * Pq2z) * Pq3x -
                        (Pq2x * Pq2y + Pq2y * Pq3x) * Pq3y -
                        (Pq2x * Pq2z + Pq2z * Pq3x) * Pq3z) *
                    Pq4x -
                2 *
                    (Pq2x * Pq2y * Pq3x -
                        Pq2y * Pq3x * Pq3x -
                        Pq2y * Pq3z * Pq3z -
                        (Pq2x * Pq2x + Pq2z * Pq2z - Pq2x * Pq3x) * Pq3y +
                        (Pq2y * Pq2z + Pq2z * Pq3y) * Pq3z -
                        (Pq2x * Pq2y - Pq2y * Pq3x - (Pq2x - Pq3x) * Pq3y) *
                            Pq4x) *
                    Pq4y -
                2 *
                    (Pq2x * Pq2z * Pq3x -
                        Pq2z * Pq3x * Pq3x +
                        Pq2y * Pq2z * Pq3y -
                        Pq2z * Pq3y * Pq3y -
                        (Pq2x * Pq2x +
                            Pq2y * Pq2y -
                            Pq2x * Pq3x -
                            Pq2y * Pq3y) *
                            Pq3z -
                        (Pq2x * Pq2z - Pq2z * Pq3x - (Pq2x - Pq3x) * Pq3z) *
                            Pq4x -
                        (Pq2y * Pq2z - Pq2z * Pq3y - (Pq2y - Pq3y) * Pq3z) *
                            Pq4y) *
                    Pq4z) +
        P2x;

    var P2neuy =
        (-((Pq2z - Pq4z) * (Pq3x - Pq4x) - (Pq2x - Pq4x) * (Pq3z - Pq4z)) *
            ((P2z * Pq2y - P2y * Pq2z) * Pq3x -
                (P2z * Pq2x - P2x * Pq2z) * Pq3y +
                (P2y * Pq2x - P2x * Pq2y) * Pq3z -
                (P2z * Pq2y -
                    P2y * Pq2z -
                    (P2z - Pq2z) * Pq3y +
                    (P2y - Pq2y) * Pq3z) *
                    Pq4x +
                (P2z * Pq2x -
                    P2x * Pq2z -
                    (P2z - Pq2z) * Pq3x +
                    (P2x - Pq2x) * Pq3z) *
                    Pq4y -
                (P2y * Pq2x -
                    P2x * Pq2y -
                    (P2y - Pq2y) * Pq3x +
                    (P2x - Pq2x) * Pq3y) *
                    Pq4z)) /
            (2 * Pq2x * Pq2y * Pq3x * Pq3y -
                (Pq2y * Pq2y + Pq2z * Pq2z) * Pq3x * Pq3x -
                (Pq2x * Pq2x + Pq2z * Pq2z) * Pq3y * Pq3y -
                (Pq2x * Pq2x + Pq2y * Pq2y) * Pq3z * Pq3z -
                (Pq2y * Pq2y +
                    Pq2z * Pq2z -
                    2 * Pq2y * Pq3y +
                    Pq3y * Pq3y -
                    2 * Pq2z * Pq3z +
                    Pq3z * Pq3z) *
                    Pq4x *
                    Pq4x -
                (Pq2x * Pq2x +
                    Pq2z * Pq2z -
                    2 * Pq2x * Pq3x +
                    Pq3x * Pq3x -
                    2 * Pq2z * Pq3z +
                    Pq3z * Pq3z) *
                    Pq4y *
                    Pq4y -
                (Pq2x * Pq2x +
                    Pq2y * Pq2y -
                    2 * Pq2x * Pq3x +
                    Pq3x * Pq3x -
                    2 * Pq2y * Pq3y +
                    Pq3y * Pq3y) *
                    Pq4z *
                    Pq4z +
                2 * (Pq2x * Pq2z * Pq3x + Pq2y * Pq2z * Pq3y) * Pq3z +
                2 *
                    (Pq2x * Pq3y * Pq3y +
                        Pq2x * Pq3z * Pq3z +
                        (Pq2y * Pq2y + Pq2z * Pq2z) * Pq3x -
                        (Pq2x * Pq2y + Pq2y * Pq3x) * Pq3y -
                        (Pq2x * Pq2z + Pq2z * Pq3x) * Pq3z) *
                    Pq4x -
                2 *
                    (Pq2x * Pq2y * Pq3x -
                        Pq2y * Pq3x * Pq3x -
                        Pq2y * Pq3z * Pq3z -
                        (Pq2x * Pq2x + Pq2z * Pq2z - Pq2x * Pq3x) * Pq3y +
                        (Pq2y * Pq2z + Pq2z * Pq3y) * Pq3z -
                        (Pq2x * Pq2y - Pq2y * Pq3x - (Pq2x - Pq3x) * Pq3y) *
                            Pq4x) *
                    Pq4y -
                2 *
                    (Pq2x * Pq2z * Pq3x -
                        Pq2z * Pq3x * Pq3x +
                        Pq2y * Pq2z * Pq3y -
                        Pq2z * Pq3y * Pq3y -
                        (Pq2x * Pq2x +
                            Pq2y * Pq2y -
                            Pq2x * Pq3x -
                            Pq2y * Pq3y) *
                            Pq3z -
                        (Pq2x * Pq2z - Pq2z * Pq3x - (Pq2x - Pq3x) * Pq3z) *
                            Pq4x -
                        (Pq2y * Pq2z - Pq2z * Pq3y - (Pq2y - Pq3y) * Pq3z) *
                            Pq4y) *
                    Pq4z) +
        P2y;

    var P2neuz =
        (((Pq2y - Pq4y) * (Pq3x - Pq4x) - (Pq2x - Pq4x) * (Pq3y - Pq4y)) *
            ((P2z * Pq2y - P2y * Pq2z) * Pq3x -
                (P2z * Pq2x - P2x * Pq2z) * Pq3y +
                (P2y * Pq2x - P2x * Pq2y) * Pq3z -
                (P2z * Pq2y -
                    P2y * Pq2z -
                    (P2z - Pq2z) * Pq3y +
                    (P2y - Pq2y) * Pq3z) *
                    Pq4x +
                (P2z * Pq2x -
                    P2x * Pq2z -
                    (P2z - Pq2z) * Pq3x +
                    (P2x - Pq2x) * Pq3z) *
                    Pq4y -
                (P2y * Pq2x -
                    P2x * Pq2y -
                    (P2y - Pq2y) * Pq3x +
                    (P2x - Pq2x) * Pq3y) *
                    Pq4z)) /
            (2 * Pq2x * Pq2y * Pq3x * Pq3y -
                (Pq2y * Pq2y + Pq2z * Pq2z) * Pq3x * Pq3x -
                (Pq2x * Pq2x + Pq2z * Pq2z) * Pq3y * Pq3y -
                (Pq2x * Pq2x + Pq2y * Pq2y) * Pq3z * Pq3z -
                (Pq2y * Pq2y +
                    Pq2z * Pq2z -
                    2 * Pq2y * Pq3y +
                    Pq3y * Pq3y -
                    2 * Pq2z * Pq3z +
                    Pq3z * Pq3z) *
                    Pq4x *
                    Pq4x -
                (Pq2x * Pq2x +
                    Pq2z * Pq2z -
                    2 * Pq2x * Pq3x +
                    Pq3x * Pq3x -
                    2 * Pq2z * Pq3z +
                    Pq3z * Pq3z) *
                    Pq4y *
                    Pq4y -
                (Pq2x * Pq2x +
                    Pq2y * Pq2y -
                    2 * Pq2x * Pq3x +
                    Pq3x * Pq3x -
                    2 * Pq2y * Pq3y +
                    Pq3y * Pq3y) *
                    Pq4z *
                    Pq4z +
                2 * (Pq2x * Pq2z * Pq3x + Pq2y * Pq2z * Pq3y) * Pq3z +
                2 *
                    (Pq2x * Pq3y * Pq3y +
                        Pq2x * Pq3z * Pq3z +
                        (Pq2y * Pq2y + Pq2z * Pq2z) * Pq3x -
                        (Pq2x * Pq2y + Pq2y * Pq3x) * Pq3y -
                        (Pq2x * Pq2z + Pq2z * Pq3x) * Pq3z) *
                    Pq4x -
                2 *
                    (Pq2x * Pq2y * Pq3x -
                        Pq2y * Pq3x * Pq3x -
                        Pq2y * Pq3z * Pq3z -
                        (Pq2x * Pq2x + Pq2z * Pq2z - Pq2x * Pq3x) * Pq3y +
                        (Pq2y * Pq2z + Pq2z * Pq3y) * Pq3z -
                        (Pq2x * Pq2y - Pq2y * Pq3x - (Pq2x - Pq3x) * Pq3y) *
                            Pq4x) *
                    Pq4y -
                2 *
                    (Pq2x * Pq2z * Pq3x -
                        Pq2z * Pq3x * Pq3x +
                        Pq2y * Pq2z * Pq3y -
                        Pq2z * Pq3y * Pq3y -
                        (Pq2x * Pq2x +
                            Pq2y * Pq2y -
                            Pq2x * Pq3x -
                            Pq2y * Pq3y) *
                            Pq3z -
                        (Pq2x * Pq2z - Pq2z * Pq3x - (Pq2x - Pq3x) * Pq3z) *
                            Pq4x -
                        (Pq2y * Pq2z - Pq2z * Pq3y - (Pq2y - Pq3y) * Pq3z) *
                            Pq4y) *
                    Pq4z) +
        P2z;

    // ist OK
    CloneAreaValuesOfSpecificArea(OriginArea, AreaIndex);
    AreaBelongsToObject[AreaIndex] = AreaBelongsToObject[OriginArea];
    SetupAreaConstants(AreaIndex);
    CloneAreaConstants(OriginArea, AreaIndex);
    Area.items[AreaIndex][0][0] = Pq1x;
    Area.items[AreaIndex][0][1] = Pq1y;
    Area.items[AreaIndex][0][2] = Pq1z;
    Area.items[AreaIndex][1][0] = P4neux;
    Area.items[AreaIndex][1][1] = P4neuy;
    Area.items[AreaIndex][1][2] = P4neuz;
    Area.items[AreaIndex][2][0] = Pq2x;
    Area.items[AreaIndex][2][1] = Pq2y;
    Area.items[AreaIndex][2][2] = Pq2z;
    AreaIndex++;

    // ist OK
    CloneAreaValuesOfSpecificArea(OriginArea, AreaIndex);
    AreaBelongsToObject[AreaIndex] = AreaBelongsToObject[OriginArea];
    SetupAreaConstants(AreaIndex);
    CloneAreaConstants(OriginArea, AreaIndex);
    Area.items[AreaIndex][0][0] = Area.items[OriginArea][2][0];
    Area.items[AreaIndex][0][1] = Area.items[OriginArea][2][1];
    Area.items[AreaIndex][0][2] = Area.items[OriginArea][2][2];
    Area.items[AreaIndex][2][0] = P2neux;
    Area.items[AreaIndex][2][1] = P2neuy;
    Area.items[AreaIndex][2][2] = P2neuz;
    Area.items[AreaIndex][1][0] = Pq4x;
    Area.items[AreaIndex][1][1] = Pq4y;
    Area.items[AreaIndex][1][2] = Pq4z;
    AreaIndex++;

    // ist OK
    CloneAreaValuesOfSpecificArea(OriginArea, AreaIndex);
    AreaBelongsToObject[AreaIndex] = AreaBelongsToObject[OriginArea];
    SetupAreaConstants(AreaIndex);
    CloneAreaConstants(OriginArea, AreaIndex);
    Area.items[AreaIndex][0][0] = Area.items[OriginArea][2][0];
    Area.items[AreaIndex][0][1] = Area.items[OriginArea][2][1];
    Area.items[AreaIndex][0][2] = Area.items[OriginArea][2][2];
    Area.items[AreaIndex][1][0] = Pq1x;
    Area.items[AreaIndex][1][1] = Pq1y;
    Area.items[AreaIndex][1][2] = Pq1z;
    Area.items[AreaIndex][2][0] = P4neux;
    Area.items[AreaIndex][2][1] = P4neuy;
    Area.items[AreaIndex][2][2] = P4neuz;
    AreaIndex++;

    // ist OK
    CloneAreaValuesOfSpecificArea(OriginArea, AreaIndex);
    AreaBelongsToObject[AreaIndex] = AreaBelongsToObject[OriginArea];
    SetupAreaConstants(AreaIndex);
    CloneAreaConstants(OriginArea, AreaIndex);
    Area.items[AreaIndex][0][0] = P4neux;
    Area.items[AreaIndex][0][1] = P4neuy;
    Area.items[AreaIndex][0][2] = P4neuz;
    Area.items[AreaIndex][1][0] = Pq4x;
    Area.items[AreaIndex][1][1] = Pq4y;
    Area.items[AreaIndex][1][2] = Pq4z;
    Area.items[AreaIndex][2][0] = Pq3x;
    Area.items[AreaIndex][2][1] = Pq3y;
    Area.items[AreaIndex][2][2] = Pq3z;
    AreaIndex++;

    // ist OK
    Area.items[CloseArea][1][0] = Pq4x;
    Area.items[CloseArea][1][1] = Pq4y;
    Area.items[CloseArea][1][2] = Pq4z;
    Area.items[CloseArea][0][0] = Area.items[CloseArea][2][0];
    Area.items[CloseArea][0][1] = Area.items[CloseArea][2][1];
    Area.items[CloseArea][0][2] = Area.items[CloseArea][2][2];
    Area.items[CloseArea][2][0] = Pq3x;
    Area.items[CloseArea][2][1] = Pq3y;
    Area.items[CloseArea][2][2] = Pq3z;

    // ist OK
    Area.items[OriginArea][0][0] = Area.items[OriginArea][0][0];
    Area.items[OriginArea][0][1] = Area.items[OriginArea][0][1];
    Area.items[OriginArea][0][2] = Area.items[OriginArea][0][2];
    Area.items[OriginArea][1][0] = Pq1x;
    Area.items[OriginArea][1][1] = Pq1y;
    Area.items[OriginArea][1][2] = Pq1z;
    Area.items[OriginArea][2][0] = Pq2x;
    Area.items[OriginArea][2][1] = Pq2y;
    Area.items[OriginArea][2][2] = Pq2z;

    for (var i = 0; i < AreaIndex; i++) {
        for (var ij = 0; ij < 3; ij++) {
            if (
                DoTwoAreasHaveTwoCommonCorners(OriginArea, i) &&
                Math.abs(Area.items[i][ij][0] - P4x) < 1e-9 &&
                Math.abs(Area.items[i][ij][1] - P4y) < 1e-9 &&
                Math.abs(Area.items[i][ij][2] - P4z) < 1e-9
            ) {
                Area.items[i][ij][0] = P4neux;
                Area.items[i][ij][1] = P4neuy;
                Area.items[i][ij][2] = P4neuz;
            }
            if (
                DoTwoAreasHaveTwoCommonCorners(CloseArea, i) &&
                Math.abs(Area.items[i][ij][0] - P2x) < 1e-9 &&
                Math.abs(Area.items[i][ij][1] - P2y) < 1e-9 &&
                Math.abs(Area.items[i][ij][2] - P2z) < 1e-9
            ) {
                Area.items[i][ij][0] = P2neux;
                Area.items[i][ij][1] = P2neuy;
                Area.items[i][ij][2] = P2neuz;
            }
        }
    }

    CloneAreaValues(Area, AreaOriginal);
}

function FindAreaWhichHasTwoCommonCornersWithArea(OriginArea, AreaIndexOrig) {
    for (var ComparedArea = 0; ComparedArea < AreaIndexOrig; ComparedArea++) {
        var CommonCorner = "";
        if (OriginArea != ComparedArea) {
            for (var OriginCorner = 0; OriginCorner < 3; OriginCorner++) {
                for (
                    var ComparedCorner = 0;
                    ComparedCorner < 3;
                    ComparedCorner++
                ) {
                    if (
                        LengthOfVector(
                            Area.items[OriginArea][OriginCorner][0] -
                                Area.items[ComparedArea][ComparedCorner][0],
                            Area.items[OriginArea][OriginCorner][1] -
                                Area.items[ComparedArea][ComparedCorner][1],
                            Area.items[OriginArea][OriginCorner][2] -
                                Area.items[ComparedArea][ComparedCorner][2]
                        ) < 1e-6
                    )
                        CommonCorner = CommonCorner + "" + OriginCorner;
                }
            }
        }
        if (CommonCorner.length > 1) {
            var length1 = LengthOfVector(
                Area.items[OriginArea][CommonCorner.substring(1, 2)][0] -
                    Area.items[OriginArea][CommonCorner.substring(0, 1)][0],
                Area.items[OriginArea][CommonCorner.substring(1, 2)][1] -
                    Area.items[OriginArea][CommonCorner.substring(0, 1)][1],
                Area.items[CommonCorner.substring(1, 2)][OriginCorner][2] -
                    Area.items[OriginArea][CommonCorner.substring(0, 1)][2]
            );
            var length01 = LengthOfVector(
                Area.items[OriginArea][0][0] - Area.items[OriginArea][1][0],
                Area.items[OriginArea][0][1] - Area.items[OriginArea][1][1],
                Area.items[OriginCorner][0][2] - Area.items[OriginArea][1][2]
            );
            var length12 = LengthOfVector(
                Area.items[OriginArea][1][0] - Area.items[OriginArea][2][0],
                Area.items[OriginArea][1][1] - Area.items[OriginArea][2][1],
                Area.items[OriginCorner][1][2] - Area.items[OriginArea][2][2]
            );
            var length20 = LengthOfVector(
                Area.items[OriginArea][2][0] - Area.items[OriginArea][0][0],
                Area.items[OriginArea][2][1] - Area.items[OriginArea][0][1],
                Area.items[OriginCorner][2][2] - Area.items[OriginArea][0][2]
            );
            if (
                length01 > length12 &&
                length01 > length20 &&
                length1 - length01 < 1e6
            )
                return { ComparedArea: ComparedArea, longest: true };
            else if (
                length12 > length20 &&
                length12 > length01 &&
                length1 - length12 < 1e6
            )
                return { ComparedArea: ComparedArea, longest: true };
            else if (
                length20 > length01 &&
                length20 > length12 &&
                length1 - length20 < 1e6
            )
                return { ComparedArea: ComparedArea, longest: true };
            else return { ComparedArea: ComparedArea, longest: false };
        }
    }
    return { ComparedArea: -1, longest: false };
}

function DoTwoAreasHaveTwoCommonCorners(OriginArea, ComparedArea) {
    if (OriginArea != ComparedArea) {
        var CommonCorner = 0;
        for (var OriginCorner = 0; OriginCorner < 3; OriginCorner++) {
            for (var ComparedCorner = 0; ComparedCorner < 3; ComparedCorner++) {
                if (
                    LengthOfVector(
                        Area.items[OriginArea][OriginCorner][0] -
                            Area.items[ComparedArea][ComparedCorner][0],
                        Area.items[OriginArea][OriginCorner][1] -
                            Area.items[ComparedArea][ComparedCorner][1],
                        Area.items[OriginArea][OriginCorner][2] -
                            Area.items[ComparedArea][ComparedCorner][2]
                    ) < 1e-6
                )
                    CommonCorner++;
            }
        }
    }
    if (CommonCorner == 2) {
        return true;
    }
    return false;
}

function FindCornerOfNeighbourArea(AreaOrigin, CornerOrigin) {
    var ChoseCorner = 0;
    for (var i = 0; i < 100; i++) {
        ChoseArea = Math.floor(Math.random() * AreaIndex);
        // console.log(AreaOrigin, ChoseArea);
        if (
            ChoseArea != AreaOrigin &&
            HaveTwoAreasCommonCorner(AreaOrigin, CornerOrigin, ChoseArea) ==
                true
        ) {
            // var counter = 0;
            // do
            // {
            // counter++;
            // ChoseCorner = Math.floor(Math.random() * 3);
            // } while (counter < 1000 && Area.items[AreaOrigin][CornerOrigin][0] == Area.items[ChoseArea][ChoseCorner][0] && Area.items[AreaOrigin][CornerOrigin][1] == Area.items[ChoseArea][ChoseCorner][1] && Area.items[AreaOrigin][CornerOrigin][2] == Area.items[ChoseArea][ChoseCorner][2])

            // if (counter == 1000) {ChoseArea = AreaOrigin; ChoseCorner = CornerOrigin;}
            var Distance0 = LengthOfVector(
                Area.items[AreaOrigin][CornerOrigin][0] -
                    Area.items[ChoseArea][0][0],
                Area.items[AreaOrigin][CornerOrigin][1] -
                    Area.items[ChoseArea][0][1],
                Area.items[AreaOrigin][CornerOrigin][2] -
                    Area.items[ChoseArea][0][2]
            );
            var Distance1 = LengthOfVector(
                Area.items[AreaOrigin][CornerOrigin][0] -
                    Area.items[ChoseArea][1][0],
                Area.items[AreaOrigin][CornerOrigin][1] -
                    Area.items[ChoseArea][1][1],
                Area.items[AreaOrigin][CornerOrigin][2] -
                    Area.items[ChoseArea][1][2]
            );
            var Distance2 = LengthOfVector(
                Area.items[AreaOrigin][CornerOrigin][0] -
                    Area.items[ChoseArea][2][0],
                Area.items[AreaOrigin][CornerOrigin][1] -
                    Area.items[ChoseArea][2][1],
                Area.items[AreaOrigin][CornerOrigin][2] -
                    Area.items[ChoseArea][2][2]
            );
            // console.log(Distance0, Distance1, Distance2);
            if (Distance0 < 1e-6) {
                if (Distance1 < Distance2) {
                    return [ChoseArea, 1, Distance1];
                } else {
                    return [ChoseArea, 2, Distance2];
                }
            }
            if (Distance1 < 1e-6) {
                if (Distance0 < Distance2) {
                    return [ChoseArea, 0, Distance0];
                } else {
                    return [ChoseArea, 2, Distance2];
                }
            }
            if (Distance2 < 1e-6) {
                if (Distance0 < Distance1) {
                    return [ChoseArea, 1, Distance1];
                } else {
                    return [ChoseArea, 0, Distance0];
                }
            }
        }
    }
    return [AreaOrigin, CornerOrigin, 0];
}

function CreateRoof() {
    CloneAreaValues(AreaOriginal, Area);

    Area.items[AreaIndex][0][0] = 0;
    Area.items[AreaIndex][0][1] = -100;
    Area.items[AreaIndex][0][2] = 100;

    Area.items[AreaIndex][1][0] = -200;
    Area.items[AreaIndex][1][1] = -100;
    Area.items[AreaIndex][1][2] = 50;

    Area.items[AreaIndex][2][0] = 0;
    Area.items[AreaIndex][2][1] = 100;
    Area.items[AreaIndex][2][2] = 100;

    AreaBelongsToObject[AreaIndex] = NumberOfCompleteObjects;
    SelectedArea[AreaIndex] = true;
    SetupAreaConstants(AreaIndex);
    AreaIndex = AreaIndex + 1;

    Area.items[AreaIndex][0][0] = 0;
    Area.items[AreaIndex][0][1] = 100;
    Area.items[AreaIndex][0][2] = 100;

    Area.items[AreaIndex][1][0] = -200;
    Area.items[AreaIndex][1][1] = -100;
    Area.items[AreaIndex][1][2] = 50;

    Area.items[AreaIndex][2][0] = -200;
    Area.items[AreaIndex][2][1] = 100;
    Area.items[AreaIndex][2][2] = 50;

    AreaBelongsToObject[AreaIndex] = NumberOfCompleteObjects;
    SelectedArea[AreaIndex] = true;
    SetupAreaConstants(AreaIndex);
    AreaIndex = AreaIndex + 1;

    Area.items[AreaIndex][0][0] = 200;
    Area.items[AreaIndex][0][1] = -100;
    Area.items[AreaIndex][0][2] = 50;

    Area.items[AreaIndex][1][0] = 0;
    Area.items[AreaIndex][1][1] = -100;
    Area.items[AreaIndex][1][2] = 100;

    Area.items[AreaIndex][2][0] = 200;
    Area.items[AreaIndex][2][1] = 100;
    Area.items[AreaIndex][2][2] = 50;

    AreaBelongsToObject[AreaIndex] = NumberOfCompleteObjects;
    SelectedArea[AreaIndex] = true;
    SetupAreaConstants(AreaIndex);
    AreaIndex = AreaIndex + 1;

    Area.items[AreaIndex][0][0] = 200;
    Area.items[AreaIndex][0][1] = 100;
    Area.items[AreaIndex][0][2] = 50;

    Area.items[AreaIndex][1][0] = 0;
    Area.items[AreaIndex][1][1] = -100;
    Area.items[AreaIndex][1][2] = 100;

    Area.items[AreaIndex][2][0] = 0;
    Area.items[AreaIndex][2][1] = 100;
    Area.items[AreaIndex][2][2] = 100;

    AreaBelongsToObject[AreaIndex] = NumberOfCompleteObjects;
    SelectedArea[AreaIndex] = true;
    SetupAreaConstants(AreaIndex);
    AreaIndex = AreaIndex + 1;

    // Area.items[AreaIndex][0][0] = 0;
    // Area.items[AreaIndex][0][1] = -300;
    // Area.items[AreaIndex][0][2] = 100;

    // Area.items[AreaIndex][1][0] = -200;
    // Area.items[AreaIndex][1][1] = -300;
    // Area.items[AreaIndex][1][2] = 50;

    // Area.items[AreaIndex][2][0] = 0;
    // Area.items[AreaIndex][2][1] = -100;
    // Area.items[AreaIndex][2][2] = 100;

    // AreaBelongsToObject[AreaIndex] = NumberOfCompleteObjects;
    // SelectedArea[AreaIndex] = true;
    // SetupAreaConstants(AreaIndex);
    // AreaIndex = AreaIndex + 1;

    // Area.items[AreaIndex][0][0] = 0;
    // Area.items[AreaIndex][0][1] = -100;
    // Area.items[AreaIndex][0][2] = 100;

    // Area.items[AreaIndex][1][0] = -200;
    // Area.items[AreaIndex][1][1] = -300;
    // Area.items[AreaIndex][1][2] = 50;

    // Area.items[AreaIndex][2][0] = -200;
    // Area.items[AreaIndex][2][1] = -100;
    // Area.items[AreaIndex][2][2] = 50;

    // AreaBelongsToObject[AreaIndex] = NumberOfCompleteObjects;
    // SelectedArea[AreaIndex] = true;
    // SetupAreaConstants(AreaIndex);
    // AreaIndex = AreaIndex + 1;

    // Area.items[AreaIndex][0][0] = 200;
    // Area.items[AreaIndex][0][1] = -300;
    // Area.items[AreaIndex][0][2] = 50;

    // Area.items[AreaIndex][1][0] = 0;
    // Area.items[AreaIndex][1][1] = -300;
    // Area.items[AreaIndex][1][2] = 100;

    // Area.items[AreaIndex][2][0] = 200;
    // Area.items[AreaIndex][2][1] = -100;
    // Area.items[AreaIndex][2][2] = 50;

    // AreaBelongsToObject[AreaIndex] = NumberOfCompleteObjects;
    // SelectedArea[AreaIndex] = true;
    // SetupAreaConstants(AreaIndex);
    // AreaIndex = AreaIndex + 1;

    // Area.items[AreaIndex][0][0] = 200;
    // Area.items[AreaIndex][0][1] = -100;
    // Area.items[AreaIndex][0][2] = 50;

    // Area.items[AreaIndex][1][0] = 0;
    // Area.items[AreaIndex][1][1] = -300;
    // Area.items[AreaIndex][1][2] = 100;

    // Area.items[AreaIndex][2][0] = 0;
    // Area.items[AreaIndex][2][1] = -100;
    // Area.items[AreaIndex][2][2] = 100;

    // AreaBelongsToObject[AreaIndex] = NumberOfCompleteObjects;
    // SelectedArea[AreaIndex] = true;
    // SetupAreaConstants(AreaIndex);
    // AreaIndex = AreaIndex + 1;

    NumberOfCompleteObjects++;
    CloneAreaValues(Area, AreaOriginal);
    CalcSizeOfObject();
    ShowAreaOf3DObject();
    ShowAreaOf3DObjectSmallWindows();
    ShowAllObjects();
}

function CreateWall() {
    CloneAreaValues(AreaOriginal, Area);

    Area.items[AreaIndex][0][0] = 1000;
    Area.items[AreaIndex][0][1] = -1000;
    Area.items[AreaIndex][0][2] = 1000;

    Area.items[AreaIndex][1][0] = -1000;
    Area.items[AreaIndex][1][1] = -1000;
    Area.items[AreaIndex][1][2] = 1000;

    Area.items[AreaIndex][2][0] = 1000;
    Area.items[AreaIndex][2][1] = 1000;
    Area.items[AreaIndex][2][2] = 1000;

    AreaBelongsToObject[AreaIndex] = NumberOfCompleteObjects;
    SelectedArea[AreaIndex] = true;
    SetupAreaConstants(AreaIndex);
    AreaIndex = AreaIndex + 1;

    Area.items[AreaIndex][0][0] = 1000;
    Area.items[AreaIndex][0][1] = 1000;
    Area.items[AreaIndex][0][2] = 1000;

    Area.items[AreaIndex][1][0] = -1000;
    Area.items[AreaIndex][1][1] = -1000;
    Area.items[AreaIndex][1][2] = 1000;

    Area.items[AreaIndex][2][0] = -1000;
    Area.items[AreaIndex][2][1] = 1000;
    Area.items[AreaIndex][2][2] = 1000;

    AreaBelongsToObject[AreaIndex] = NumberOfCompleteObjects;
    SelectedArea[AreaIndex] = true;
    SetupAreaConstants(AreaIndex);
    AreaIndex = AreaIndex + 1;

    NumberOfCompleteObjects++;
    CloneAreaValues(Area, AreaOriginal);
    CalcSizeOfObject();
    ShowAreaOf3DObject();
    ShowAreaOf3DObjectSmallWindows();
}

function CheckerBoard() {
    UnSelectAll();
    CloneAreaValues(AreaOriginal, Area);
    for (var x = -5; x < 5; x = x + 1) {
        for (var z = -5; z < 5; z = z + 1) {
            var y = 0;
            var ColorChecker = "#aaaaaa";
            if ((Math.floor(x) + Math.floor(y) + Math.floor(z)) % 2 == 0)
                ColorChecker = "#ff0000";
            Area.items[AreaIndex][0][0] = x;
            Area.items[AreaIndex][0][1] = y;
            Area.items[AreaIndex][0][2] = z;

            Area.items[AreaIndex][1][0] = x + 1;
            Area.items[AreaIndex][1][1] = y;
            Area.items[AreaIndex][1][2] = z;

            Area.items[AreaIndex][2][0] = x;
            Area.items[AreaIndex][2][1] = y;
            Area.items[AreaIndex][2][2] = z + 1;

            AreaBelongsToObject[AreaIndex] = NumberOfCompleteObjects;
            SelectedArea[AreaIndex] = true;
            SetupAreaConstants(AreaIndex);
            AreaIndex = AreaIndex + 1;
            CloneAreaValues(Area, AreaOriginal);
            SetColor(ColorChecker, "colors");
            SelectedArea[AreaIndex - 1] = false;

            Area.items[AreaIndex][0][0] = x + 1;
            Area.items[AreaIndex][0][1] = y;
            Area.items[AreaIndex][0][2] = z;

            Area.items[AreaIndex][1][0] = x + 1;
            Area.items[AreaIndex][1][1] = y;
            Area.items[AreaIndex][1][2] = z + 1;

            Area.items[AreaIndex][2][0] = x;
            Area.items[AreaIndex][2][1] = y;
            Area.items[AreaIndex][2][2] = z + 1;

            AreaBelongsToObject[AreaIndex] = NumberOfCompleteObjects;
            SelectedArea[AreaIndex] = true;
            SetupAreaConstants(AreaIndex);
            AreaIndex = AreaIndex + 1;
            CloneAreaValues(Area, AreaOriginal);
            SetColor(ColorChecker, "colors");
            SelectedArea[AreaIndex - 1] = false;
        }
    }
    NumberOfCompleteObjects++;
    CalcSizeOfObject();
    ShowAreaOf3DObject();
    ShowAreaOf3DObjectSmallWindows();
}

function ColorRedOfAreaAtThisPoint(objectNr, x, y, z) {
    if (AreaConstants.items[objectNr].TypeOfColor == "CheckBoard") {
        var xtemp = x;
        var ytemp = y;
        var ztemp = z;
        var RadFromGrad = (2 * Math.PI) / 360;
        var y_rot =
            ytemp *
                Math.cos(
                    RadFromGrad * AreaConstants.items[objectNr].TotalAngleX
                ) -
            ztemp *
                Math.sin(
                    RadFromGrad * AreaConstants.items[objectNr].TotalAngleX
                );
        var z_rot =
            ytemp *
                Math.sin(
                    RadFromGrad * AreaConstants.items[objectNr].TotalAngleX
                ) +
            ztemp *
                Math.cos(
                    RadFromGrad * AreaConstants.items[objectNr].TotalAngleX
                );
        ytemp = y_rot;
        ztemp = z_rot;
        var x_rot =
            xtemp *
                Math.cos(
                    RadFromGrad * AreaConstants.items[objectNr].TotalAngleY
                ) +
            ztemp *
                Math.sin(
                    RadFromGrad * AreaConstants.items[objectNr].TotalAngleY
                );
        var z_rot =
            -xtemp *
                Math.sin(
                    RadFromGrad * AreaConstants.items[objectNr].TotalAngleY
                ) +
            ztemp *
                Math.cos(
                    RadFromGrad * AreaConstants.items[objectNr].TotalAngleY
                );
        xtemp = x_rot;
        ztemp = z_rot;
        var x_rot =
            xtemp *
                Math.cos(
                    RadFromGrad * AreaConstants.items[objectNr].TotalAngleZ
                ) -
            ytemp *
                Math.sin(
                    RadFromGrad * AreaConstants.items[objectNr].TotalAngleZ
                );
        var y_rot =
            xtemp *
                Math.sin(
                    RadFromGrad * AreaConstants.items[objectNr].TotalAngleZ
                ) +
            ytemp *
                Math.cos(
                    RadFromGrad * AreaConstants.items[objectNr].TotalAngleZ
                );
        xtemp = x_rot;
        ytemp = y_rot;
        if (
            (Math.floor(xtemp) + Math.floor(ytemp) + Math.floor(ztemp)) % 2 ==
            0
        )
            return 1;
        else return 0.7;
    } else if (AreaConstants.items[objectNr].TypeOfColor == "Color") {
        return AreaConstants.items[objectNr].ColorOfObjectRed;
    }
}

function ColorGreenOfAreaAtThisPoint(objectNr, x, y, z) {
    if (AreaConstants.items[objectNr].TypeOfColor == "CheckBoard") {
        var xtemp = x;
        var ytemp = y;
        var ztemp = z;
        var RadFromGrad = (2 * Math.PI) / 360;
        var y_rot =
            ytemp *
                Math.cos(
                    RadFromGrad * AreaConstants.items[objectNr].TotalAngleX
                ) -
            ztemp *
                Math.sin(
                    RadFromGrad * AreaConstants.items[objectNr].TotalAngleX
                );
        var z_rot =
            ytemp *
                Math.sin(
                    RadFromGrad * AreaConstants.items[objectNr].TotalAngleX
                ) +
            ztemp *
                Math.cos(
                    RadFromGrad * AreaConstants.items[objectNr].TotalAngleX
                );
        ytemp = y_rot;
        ztemp = z_rot;
        var x_rot =
            xtemp *
                Math.cos(
                    RadFromGrad * AreaConstants.items[objectNr].TotalAngleY
                ) +
            ztemp *
                Math.sin(
                    RadFromGrad * AreaConstants.items[objectNr].TotalAngleY
                );
        var z_rot =
            -xtemp *
                Math.sin(
                    RadFromGrad * AreaConstants.items[objectNr].TotalAngleY
                ) +
            ztemp *
                Math.cos(
                    RadFromGrad * AreaConstants.items[objectNr].TotalAngleY
                );
        xtemp = x_rot;
        ztemp = z_rot;
        var x_rot =
            xtemp *
                Math.cos(
                    RadFromGrad * AreaConstants.items[objectNr].TotalAngleZ
                ) -
            ytemp *
                Math.sin(
                    RadFromGrad * AreaConstants.items[objectNr].TotalAngleZ
                );
        var y_rot =
            xtemp *
                Math.sin(
                    RadFromGrad * AreaConstants.items[objectNr].TotalAngleZ
                ) +
            ytemp *
                Math.cos(
                    RadFromGrad * AreaConstants.items[objectNr].TotalAngleZ
                );
        xtemp = x_rot;
        ytemp = y_rot;
        if (
            (Math.floor(xtemp) + Math.floor(ytemp) + Math.floor(ztemp)) % 2 ==
            0
        )
            return 0;
        else return 0.7;
    } else if (AreaConstants.items[objectNr].TypeOfColor == "Color") {
        return AreaConstants.items[objectNr].ColorOfObjectGreen;
    }
}

function ColorBlueOfAreaAtThisPoint(objectNr, x, y, z) {
    if (AreaConstants.items[objectNr].TypeOfColor == "CheckBoard") {
        var xtemp = x;
        var ytemp = y;
        var ztemp = z;
        var RadFromGrad = (2 * Math.PI) / 360;
        var y_rot =
            ytemp *
                Math.cos(
                    RadFromGrad * AreaConstants.items[objectNr].TotalAngleX
                ) -
            ztemp *
                Math.sin(
                    RadFromGrad * AreaConstants.items[objectNr].TotalAngleX
                );
        var z_rot =
            ytemp *
                Math.sin(
                    RadFromGrad * AreaConstants.items[objectNr].TotalAngleX
                ) +
            ztemp *
                Math.cos(
                    RadFromGrad * AreaConstants.items[objectNr].TotalAngleX
                );
        ytemp = y_rot;
        ztemp = z_rot;
        var x_rot =
            xtemp *
                Math.cos(
                    RadFromGrad * AreaConstants.items[objectNr].TotalAngleY
                ) +
            ztemp *
                Math.sin(
                    RadFromGrad * AreaConstants.items[objectNr].TotalAngleY
                );
        var z_rot =
            -xtemp *
                Math.sin(
                    RadFromGrad * AreaConstants.items[objectNr].TotalAngleY
                ) +
            ztemp *
                Math.cos(
                    RadFromGrad * AreaConstants.items[objectNr].TotalAngleY
                );
        xtemp = x_rot;
        ztemp = z_rot;
        var x_rot =
            xtemp *
                Math.cos(
                    RadFromGrad * AreaConstants.items[objectNr].TotalAngleZ
                ) -
            ytemp *
                Math.sin(
                    RadFromGrad * AreaConstants.items[objectNr].TotalAngleZ
                );
        var y_rot =
            xtemp *
                Math.sin(
                    RadFromGrad * AreaConstants.items[objectNr].TotalAngleZ
                ) +
            ytemp *
                Math.cos(
                    RadFromGrad * AreaConstants.items[objectNr].TotalAngleZ
                );
        xtemp = x_rot;
        ytemp = y_rot;
        if (
            (Math.floor(xtemp) + Math.floor(ytemp) + Math.floor(ztemp)) % 2 ==
            0
        )
            return 0;
        else return 0.7;
    } else if (AreaConstants.items[objectNr].TypeOfColor == "Color") {
        return AreaConstants.items[objectNr].ColorOfObjectBlue;
    }
}

function ApplyCheckerBoard() {
    for (var i = 0; i < AreaIndex; i++)
        if (SelectedArea[i] == true)
            AreaConstants.items[i].TypeOfColor = "CheckBoard";
}

function ApplyPlainColor() {
    for (var i = 0; i < AreaIndex; i++)
        if (SelectedArea[i] == true)
            AreaConstants.items[i].TypeOfColor = "Color";
}

function DrawPointOfAreaInViews(Area, Corner, text) {
    drawCircle(
        width / 2 - AreaOriginal.items[Area][Corner][0],
        height / 2 - AreaOriginal.items[Area][Corner][1],
        10,
        0,
        360,
        1,
        DrawingContextFront,
        "#ff0000",
        false
    );
    drawText(
        width / 2 - AreaOriginal.items[Area][Corner][0],
        5 + height / 2 - AreaOriginal.items[Area][Corner][1],
        text,
        DrawingContextFront,
        "#ff0000",
        "center"
    );

    drawCircle(
        width / 2 - AreaOriginal.items[Area][Corner][0],
        height / 2 - AreaOriginal.items[Area][Corner][2],
        10,
        0,
        360,
        1,
        DrawingContextTop,
        "#ff0000",
        false
    );
    drawText(
        width / 2 - AreaOriginal.items[Area][Corner][0],
        5 + height / 2 - AreaOriginal.items[Area][Corner][2],
        text,
        DrawingContextTop,
        "#ff0000",
        "center"
    );

    drawCircle(
        width / 2 - AreaOriginal.items[Area][Corner][2],
        height / 2 - AreaOriginal.items[Area][Corner][1],
        10,
        0,
        360,
        1,
        DrawingContextSide,
        "#ff0000",
        false
    );
    drawText(
        width / 2 - AreaOriginal.items[Area][Corner][2],
        5 + height / 2 - AreaOriginal.items[Area][Corner][1],
        text,
        DrawingContextSide,
        "#ff0000",
        "center"
    );

    debugger;
}

function DrawPointInViews(xCoord, yCoord, zCoord, text) {
    drawCircle(
        width / 2 - xCoord,
        height / 2 - yCoord,
        10,
        0,
        360,
        1,
        DrawingContextFront,
        "#00ff00",
        false
    );
    drawText(
        width / 2 - xCoord,
        5 + height / 2 - yCoord,
        text,
        DrawingContextFront,
        "#00ff00",
        "center"
    );

    drawCircle(
        width / 2 - xCoord,
        height / 2 - zCoord,
        10,
        0,
        360,
        1,
        DrawingContextTop,
        "#00ff00",
        false
    );
    drawText(
        width / 2 - xCoord,
        5 + height / 2 - zCoord,
        text,
        DrawingContextTop,
        "#00ff00",
        "center"
    );

    drawCircle(
        width / 2 - zCoord,
        height / 2 - yCoord,
        10,
        0,
        360,
        1,
        DrawingContextSide,
        "#00ff00",
        false
    );
    drawText(
        width / 2 - zCoord,
        5 + height / 2 - yCoord,
        text,
        DrawingContextSide,
        "#00ff00",
        "center"
    );

    debugger;
}

function SecToHourMinSec(value) {
    var hours = Math.floor(value / 3600);
    value = value - hours * 3600;
    var minutes = Math.floor(value / 60);
    var seconds = value - minutes * 60;
    var finalTime = parseInt(hours, 10) + ":";
    if (parseInt(minutes, 10) < 10)
        finalTime = finalTime + "0" + parseInt(minutes, 10) + ":";
    else finalTime = finalTime + parseInt(minutes, 10) + ":";
    if (parseInt(seconds, 10) < 10)
        finalTime = finalTime + "0" + parseInt(seconds, 10);
    else finalTime = finalTime + parseInt(seconds, 10);
    return finalTime;
}
