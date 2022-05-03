importScripts("3D_SuperGraphics_WebWorkerFunctions.js?cheating=1");
var RayTracingStarted = false;
var KeyPressed = 0;
var mousePos;
var NumberOfPoints = 0;
var oldx = 0;
var oldy = 0;
var oldkoorx = 0;
var oldkoory = 0;

var MaxNumberOfPoints = 200;
var MaxNbOfRotSegments = 360;

var MoveX = 0;
var MoveY = 0;
var MoveZ = 0;

var PointCoordinatesArray = new Array2D(MaxNumberOfPoints, 3);
var OriginPointCoords = new Array3D(MaxNbOfRotSegments, MaxNumberOfPoints, 3);
var Points = new Array3D(MaxNbOfRotSegments, MaxNumberOfPoints, 3);

var maxarea = MaxNumberOfPoints * MaxNbOfRotSegments;
var Area = new Array3D(maxarea, 4, 3);
var AreaOriginal = new Array3D(maxarea, 4, 3);
var MaxNbOfCompleteObjects = 100;
var AreaBelongsToObject = new Array1D(MaxNbOfCompleteObjects);
var NumberOfCompleteObjects = 0;
var SelectedArea = new Array1D(maxarea);
var AreaConstants = new Array1D(maxarea);
var AreaIndex = 0;

var AreaZValues = new Array1D(maxarea);
var AreaOrderIndex = new Array1D(maxarea);

var width = 2000;
var height = 1000;

var GradFromRad = (1 / (2 * Math.PI)) * 360;

var TotalEnteredPoints = 0;
var NumberOfRotationSegments = 60;

var Perspective = 0;
var DistortionDistance = 1000;

var DrawingMethod = 0;

var AngleX = 0; // Rotation angle around X-axis
var AngleY = 0;
var AngleZ = 0;

var NumberOfRotationsX = 0;
var NumberOfRotationsY = 0;
var NumberOfRotationsZ = 0;
var increment = 5;

var StandardResolution = 1;
var Resolution = StandardResolution;

var PartOfDirectLight = 0.8;
var PartOfReflectlight = 0.1;
var PartOfRefractionlight = 0.0;
var PartSurrounding = 0.1;

var LevelOfInfluence = 0.05; // Below this level, call for new light ray shall not be executed anymore

var ColorOfObject = { Red: 0 / 255, Green: 50 / 255, Blue: 255 / 255 };

var MoveLight = new Array1D(10);
var SetColorOfLight = new Array1D(10);
var LightOn = new Array1D(10);
var ColorOfLightSource = new Array1D(10);
var LightSourceX = new Array1D(10);
var LightSourceY = new Array1D(10);
var LightSourceZ = new Array1D(10);

var docTitle = 0;
var StartTime = 0;

var RefractiveIndexOfMaterial = 1.5; //Quartz = 1.46 / Window Glass = 1.54 / Air = 1.00 / Water = 1.33 / Diamond = 2.42
var SurfaceStructur = 20;

var ZoomFaktor = 1;
var MaxRecursionDepth = 10;

//EnterNewPoints();

//RayTracing();

self.onmessage = function (dataReceived) {
    RotateSelected = dataReceived.data.data.RotateSelected;
    MoveSelected = dataReceived.data.data.MoveSelected;
    ChangeSizeInOneDirectionSelected =
        dataReceived.data.data.ChangeSizeInOneDirectionSelected;
    SelectedEightObjects = dataReceived.data.data.SelectedEightObjects;
    Image2K = dataReceived.data.data.Image2K;
    RayTracingStarted = dataReceived.data.data.RayTracingStarted;
    KeyPressed = dataReceived.data.data.KeyPressed;
    mousePos = dataReceived.data.data.mousePos;
    NumberOfPoints = dataReceived.data.data.NumberOfPoints;
    oldx = dataReceived.data.data.oldx;
    oldy = dataReceived.data.data.oldy;
    oldkoorx = dataReceived.data.data.oldkoorx;
    oldkoory = dataReceived.data.data.oldkoory;
    MaxNumberOfPoints = dataReceived.data.data.MaxNumberOfPoints;
    MaxNbOfRotSegments = dataReceived.data.data.MaxNbOfRotSegments;
    MoveX = dataReceived.data.data.MoveX;
    MoveY = dataReceived.data.data.MoveY;
    MoveZ = dataReceived.data.data.MoveZ;
    PointCoordinatesArray = dataReceived.data.data.PointCoordinatesArray;
    OriginPointCoords = dataReceived.data.data.OriginPointCoords;
    Points = dataReceived.data.data.Points;
    maxarea = dataReceived.data.data.maxarea;
    Area = dataReceived.data.data.Area;
    AreaOriginal = dataReceived.data.data.AreaOriginal;
    MaxNbOfCompleteObjects = dataReceived.data.data.MaxNbOfCompleteObjects;
    AreaBelongsToObject = dataReceived.data.data.AreaBelongsToObject;
    NumberOfCompleteObjects = dataReceived.data.data.NumberOfCompleteObjects;
    SelectedArea = dataReceived.data.data.SelectedArea;
    AreaConstants = dataReceived.data.data.AreaConstants;
    AreaIndex = dataReceived.data.data.AreaIndex;
    AreaZValues = dataReceived.data.data.AreaZValues;
    AreaOrderIndex = dataReceived.data.data.AreaOrderIndex;
    width = dataReceived.data.data.width;
    height = dataReceived.data.data.height;
    GradFromRad = dataReceived.data.data.GradFromRad;
    TotalEnteredPoints = dataReceived.data.data.TotalEnteredPoints;
    NumberOfRotationSegments = dataReceived.data.data.NumberOfRotationSegments;
    Perspective = dataReceived.data.data.Perspective;
    DistortionDistance = dataReceived.data.data.DistortionDistance;
    DrawingMethod = dataReceived.data.data.DrawingMethod;
    AngleX = dataReceived.data.data.AngleX;
    AngleY = dataReceived.data.data.AngleY;
    AngleZ = dataReceived.data.data.AngleZ;
    NumberOfRotationsX = dataReceived.data.data.NumberOfRotationsX;
    NumberOfRotationsY = dataReceived.data.data.NumberOfRotationsY;
    NumberOfRotationsZ = dataReceived.data.data.NumberOfRotationsZ;
    increment = dataReceived.data.data.increment;
    StandardResolution = dataReceived.data.data.StandardResolution;
    Resolution = dataReceived.data.data.Resolution;
    PartOfDirectLight = dataReceived.data.data.PartOfDirectLight;
    PartOfReflectlight = dataReceived.data.data.PartOfReflectlight;
    PartOfRefractionlight = dataReceived.data.data.PartOfRefractionlight;
    PartSurrounding = dataReceived.data.data.PartSurrounding;
    LevelOfInfluence = dataReceived.data.data.LevelOfInfluence;
    ColorOfObject = dataReceived.data.data.ColorOfObject;
    MoveLight = dataReceived.data.data.MoveLight;
    SetColorOfLight = dataReceived.data.data.SetColorOfLight;
    LightOn = dataReceived.data.data.LightOn;
    ColorOfLightSource = dataReceived.data.data.ColorOfLightSource;
    LightSourceX = dataReceived.data.data.LightSourceX;
    LightSourceY = dataReceived.data.data.LightSourceY;
    LightSourceZ = dataReceived.data.data.LightSourceZ;
    docTitle = dataReceived.data.data.docTitle;
    StartTime = dataReceived.data.data.StartTime;
    RefractiveIndexOfMaterial =
        dataReceived.data.data.RefractiveIndexOfMaterial;
    SurfaceStructur = dataReceived.data.data.SurfaceStructur;
    ZoomFaktor = dataReceived.data.data.ZoomFaktor;
    MaxRecursionDepth = dataReceived.data.data.MaxRecursionDepth;
    NumberOfCPUCores = dataReceived.data.data.NumberOfCPUCores;

    counter = dataReceived.data.counter;

    //var NumberOfCPUCores = navigator.hardwareConcurrency - 1 || 1;
    for (
        var y = (height / NumberOfCPUCores) * counter - height / 2;
        y < (height / NumberOfCPUCores) * (counter + 1) - height / 2;
        y = y + Resolution / ZoomFaktor
    ) {
        //console.log("gesendet",counter,y);
        var results = new Array();
        var countLines = 0;
        // for (var x = -width/2; x < width/2; x = x + Resolution/ZoomFaktor)
        // {
        // results[countLines] = {Red:1, Green:0, Blue:0,};
        // countLines++;
        // }
        // self.postMessage({y,results});
        // var results = new Array();
        // var countLines = 0;
        for (
            var x = -width / 2;
            x < width / 2;
            x = x + Resolution / ZoomFaktor
        ) {
            results[countLines] = CalculatePixel(x, y);
            countLines++;
        }
        self.postMessage({ y, results });
    }
    var y = 1e6;
    var results = new Array();
    self.postMessage({ y, results });
    //self.close();
};

function CalculatePixel(x, y) {
    var OriginX = x;
    var OriginY = y;
    var OriginZ = -10000;
    var TargetX = x;
    var TargetY = y;
    var TargetZ = 10000;
    var DirectionX = TargetX - OriginX;
    var DirectionY = TargetY - OriginY;
    var DirectionZ = TargetZ - OriginZ;

    var ColorOfPoint = { Red: 0, Green: 0, Blue: 0 };
    var ColorOfPointPerLamp = { Red: 0, Green: 0, Blue: 0 };
    var LampCounter = 0;
    for (lamp = 0; lamp < 5; lamp++) {
        if (LightOn.items[lamp] == true) {
            ColorOfPointPerLamp = CalculateColorOfPointByRayTracing(
                OriginX,
                OriginY,
                OriginZ,
                DirectionX,
                DirectionY,
                DirectionZ,
                0,
                1.0,
                lamp
            );
            ColorOfPoint = {
                Red: ColorOfPoint.Red + ColorOfPointPerLamp.Red,
                Green: ColorOfPoint.Green + ColorOfPointPerLamp.Green,
                Blue: ColorOfPoint.Blue + ColorOfPointPerLamp.Blue,
            };
            LampCounter++;
        }
    }
    ColorOfPoint = {
        Red: ColorOfPoint.Red / LampCounter,
        Green: ColorOfPoint.Green / LampCounter,
        Blue: ColorOfPoint.Blue / LampCounter,
    };
    return ColorOfPoint;
}

function CalculateColorOfPointByRayTracing(
    OriginX,
    OriginY,
    OriginZ,
    DirectionX,
    DirectionY,
    DirectionZ,
    RecursionDepth,
    RefractiveIndexInCurrentMedium,
    lamp
) {
    var AreaHitByLightRay = HitObjectByLightRay(
        OriginX,
        OriginY,
        OriginZ,
        DirectionX,
        DirectionY,
        DirectionZ
    );
    if (AreaHitByLightRay.ObjectNo >= 0 && RecursionDepth < MaxRecursionDepth) {
        var ShadowCheckRayOriginX = AreaHitByLightRay.IntersectionPointX;
        var ShadowCheckRayOriginY = AreaHitByLightRay.IntersectionPointY;
        var ShadowCheckRayOriginZ = AreaHitByLightRay.IntersectionPointZ;
        var ShadowCheckRayDirectionX =
            LightSourceX.items[lamp] - ShadowCheckRayOriginX;
        var ShadowCheckRayDirectionY =
            LightSourceY.items[lamp] - ShadowCheckRayOriginY;
        var ShadowCheckRayDirectionZ =
            LightSourceZ.items[lamp] - ShadowCheckRayOriginZ;

        var AreaHitByShadowLightRay = HitObjectByLightRay(
            ShadowCheckRayOriginX,
            ShadowCheckRayOriginY,
            ShadowCheckRayOriginZ,
            ShadowCheckRayDirectionX,
            ShadowCheckRayDirectionY,
            ShadowCheckRayDirectionZ
        );
        if (AreaHitByShadowLightRay.ObjectNo < 0) {
            var AngleForBrightness = CalculateAngleBetweenNormalAndLightSource(
                AreaHitByLightRay.IntersectionPointX,
                AreaHitByLightRay.IntersectionPointY,
                AreaHitByLightRay.IntersectionPointZ,
                LightSourceX.items[lamp],
                LightSourceY.items[lamp],
                LightSourceZ.items[lamp],
                AreaHitByLightRay.ObjectNo
            );
            if (Math.cos(AngleForBrightness) < 0) {
                AngleForBrightness = Math.PI / 2;
            }

            var ColorDirectLight = {
                Red:
                    ColorRedOfAreaAtThisPoint(
                        AreaHitByLightRay.ObjectNo,
                        AreaHitByLightRay.IntersectionPointX,
                        AreaHitByLightRay.IntersectionPointY,
                        AreaHitByLightRay.IntersectionPointZ
                    ) *
                    ColorOfLightSource.items[lamp].Red *
                    Math.cos(AngleForBrightness),
                Green:
                    ColorGreenOfAreaAtThisPoint(
                        AreaHitByLightRay.ObjectNo,
                        AreaHitByLightRay.IntersectionPointX,
                        AreaHitByLightRay.IntersectionPointY,
                        AreaHitByLightRay.IntersectionPointZ
                    ) *
                    ColorOfLightSource.items[lamp].Green *
                    Math.cos(AngleForBrightness),
                Blue:
                    ColorBlueOfAreaAtThisPoint(
                        AreaHitByLightRay.ObjectNo,
                        AreaHitByLightRay.IntersectionPointX,
                        AreaHitByLightRay.IntersectionPointY,
                        AreaHitByLightRay.IntersectionPointZ
                    ) *
                    ColorOfLightSource.items[lamp].Blue *
                    Math.cos(AngleForBrightness),
            };
        } else {
            var ColorShadowLight = CalculateColorOfPointByRayTracing(
                ShadowCheckRayOriginX,
                ShadowCheckRayOriginY,
                ShadowCheckRayOriginZ,
                ShadowCheckRayDirectionX,
                ShadowCheckRayDirectionY,
                ShadowCheckRayDirectionZ,
                RecursionDepth + 1,
                RefractiveIndexInCurrentMedium,
                lamp
            );

            var AngleForBrightness = CalculateAngleBetweenNormalAndLightSource(
                AreaHitByLightRay.IntersectionPointX,
                AreaHitByLightRay.IntersectionPointY,
                AreaHitByLightRay.IntersectionPointZ,
                LightSourceX.items[lamp],
                LightSourceY.items[lamp],
                LightSourceZ.items[lamp],
                AreaHitByLightRay.ObjectNo
            );
            if (Math.cos(AngleForBrightness) < 0) {
                AngleForBrightness = Math.PI / 2;
            }
            var ColorDirectLight = {
                Red:
                    ColorShadowLight.Red *
                        AreaConstants.items[AreaHitByShadowLightRay.ObjectNo]
                            .PartOfRefractionlight +
                    ColorRedOfAreaAtThisPoint(
                        AreaHitByLightRay.ObjectNo,
                        AreaHitByLightRay.IntersectionPointX,
                        AreaHitByLightRay.IntersectionPointY,
                        AreaHitByLightRay.IntersectionPointZ
                    ) *
                        ColorOfLightSource.items[lamp].Red *
                        Math.cos(AngleForBrightness) *
                        AreaConstants.items[AreaHitByShadowLightRay.ObjectNo]
                            .PartOfRefractionlight, // was "0"
                Green:
                    ColorShadowLight.Green *
                        AreaConstants.items[AreaHitByShadowLightRay.ObjectNo]
                            .PartOfRefractionlight +
                    ColorGreenOfAreaAtThisPoint(
                        AreaHitByLightRay.ObjectNo,
                        AreaHitByLightRay.IntersectionPointX,
                        AreaHitByLightRay.IntersectionPointY,
                        AreaHitByLightRay.IntersectionPointZ
                    ) *
                        ColorOfLightSource.items[lamp].Green *
                        Math.cos(AngleForBrightness) *
                        AreaConstants.items[AreaHitByShadowLightRay.ObjectNo]
                            .PartOfRefractionlight, // was "0",
                Blue:
                    ColorShadowLight.Blue *
                        AreaConstants.items[AreaHitByShadowLightRay.ObjectNo]
                            .PartOfRefractionlight +
                    ColorBlueOfAreaAtThisPoint(
                        AreaHitByLightRay.ObjectNo,
                        AreaHitByLightRay.IntersectionPointX,
                        AreaHitByLightRay.IntersectionPointY,
                        AreaHitByLightRay.IntersectionPointZ
                    ) *
                        ColorOfLightSource.items[lamp].Blue *
                        Math.cos(AngleForBrightness) *
                        AreaConstants.items[AreaHitByShadowLightRay.ObjectNo]
                            .PartOfRefractionlight, // was "0",
            };
        }

        var ReflectLight = CalculateReflection(
            OriginX,
            OriginY,
            OriginZ,
            AreaHitByLightRay.IntersectionPointX,
            AreaHitByLightRay.IntersectionPointY,
            AreaHitByLightRay.IntersectionPointZ,
            AreaHitByLightRay.ObjectNo
        );
        if (
            Math.pow(
                AreaConstants.items[AreaHitByLightRay.ObjectNo]
                    .PartOfReflectlight,
                RecursionDepth
            ) > LevelOfInfluence
        ) {
            var ColorReflectLight = CalculateColorOfPointByRayTracing(
                AreaHitByLightRay.IntersectionPointX,
                AreaHitByLightRay.IntersectionPointY,
                AreaHitByLightRay.IntersectionPointZ,
                ReflectLight.DirectionX,
                ReflectLight.DirectionY,
                ReflectLight.DirectionZ,
                RecursionDepth + 1,
                RefractiveIndexInCurrentMedium,
                lamp
            );
        } else {
            var ColorReflectLight = {
                Red: 0,
                Green: 0,
                Blue: 0,
            };
        }

        if (AreaHitByShadowLightRay.ObjectNo < 0) {
            var SurfaceGlossAngleBetweenLightSourceAndReflectionLightRay =
                AngleBetweenVectors(
                    ReflectLight.DirectionX,
                    ReflectLight.DirectionY,
                    ReflectLight.DirectionZ,
                    LightSourceX.items[lamp] -
                        AreaHitByLightRay.IntersectionPointX,
                    LightSourceY.items[lamp] -
                        AreaHitByLightRay.IntersectionPointY,
                    LightSourceZ.items[lamp] -
                        AreaHitByLightRay.IntersectionPointZ
                );
            if (
                Math.abs(
                    SurfaceGlossAngleBetweenLightSourceAndReflectionLightRay
                ) >
                Math.PI / 2
            ) {
                SurfaceGlossAngleBetweenLightSourceAndReflectionLightRay =
                    Math.PI / 2;
            }

            var SurfaceGlossFactor = Math.pow(
                Math.cos(
                    SurfaceGlossAngleBetweenLightSourceAndReflectionLightRay
                ),
                AreaConstants.items[AreaHitByLightRay.ObjectNo].SurfaceStructur
            );
            ////console.log(SurfaceGlossFactor);
            var ColorDirectLight = {
                Red:
                    ColorDirectLight.Red +
                    SurfaceGlossFactor * ColorOfLightSource.items[lamp].Red,
                Green:
                    ColorDirectLight.Green +
                    SurfaceGlossFactor * ColorOfLightSource.items[lamp].Green,
                Blue:
                    ColorDirectLight.Blue +
                    SurfaceGlossFactor * ColorOfLightSource.items[lamp].Blue,
            };
        }

        if (
            RefractiveIndexInCurrentMedium ==
            AreaConstants.items[AreaHitByLightRay.ObjectNo]
                .RefractiveIndexOfMaterial
        ) {
            var RefractiveIndexInNewMedium = 1.0;
        } else {
            var RefractiveIndexInNewMedium =
                AreaConstants.items[AreaHitByLightRay.ObjectNo]
                    .RefractiveIndexOfMaterial;
        }

        var RefractionLight = CalculateRefraction(
            OriginX,
            OriginY,
            OriginZ,
            AreaHitByLightRay.IntersectionPointX,
            AreaHitByLightRay.IntersectionPointY,
            AreaHitByLightRay.IntersectionPointZ,
            AreaHitByLightRay.ObjectNo,
            RefractiveIndexInCurrentMedium,
            RefractiveIndexInNewMedium
        );
        //console.log(Math.pow(AreaConstants.items[AreaHitByLightRay.ObjectNo].PartOfRefractionlight,RecursionDepth));
        //console.log(RefractionLight.TotalReflection);
        if (
            RefractionLight.TotalReflection == false &&
            Math.pow(
                AreaConstants.items[AreaHitByLightRay.ObjectNo]
                    .PartOfRefractionlight,
                RecursionDepth
            ) > LevelOfInfluence
        ) {
            //////console.log(AreaHitByLightRay.IntersectionPointX +" "+ AreaHitByLightRay.IntersectionPointY +" "+ AreaHitByLightRay.IntersectionPointZ +" "+ RefractionLight.DirectionX +" "+ RefractionLight.DirectionY +" "+ RefractionLight.DirectionZ +" "+ (RecursionDepth+1) +" "+ RefractiveIndexInNewMedium);
            var ColorRefractionLight = CalculateColorOfPointByRayTracing(
                AreaHitByLightRay.IntersectionPointX,
                AreaHitByLightRay.IntersectionPointY,
                AreaHitByLightRay.IntersectionPointZ,
                RefractionLight.DirectionX,
                RefractionLight.DirectionY,
                RefractionLight.DirectionZ,
                RecursionDepth + 1,
                RefractiveIndexInNewMedium,
                lamp
            );
        } else {
            var ColorRefractionLight = {
                Red: 0,
                Green: 0,
                Blue: 0,
            };
        }
        //console.log(RecursionDepth);
        ////console.log(ColorDirectLight.Red   +" "+ AreaConstants.items[AreaHitByLightRay.ObjectNo].PartOfDirectLight   +" "+ ColorReflectLight.Red   +" "+ AreaConstants.items[AreaHitByLightRay.ObjectNo].PartOfReflectlight   +" "+ ColorRefractionLight.Red    +" "+ AreaConstants.items[AreaHitByLightRay.ObjectNo].PartOfRefractionlight   +" "+ ColorOfLightSource.Red    +" "+ PartSurrounding,)
        var ColorPixel = {
            Red:
                ColorDirectLight.Red *
                    AreaConstants.items[AreaHitByLightRay.ObjectNo]
                        .PartOfDirectLight +
                ColorReflectLight.Red *
                    AreaConstants.items[AreaHitByLightRay.ObjectNo]
                        .PartOfReflectlight +
                ColorRefractionLight.Red *
                    AreaConstants.items[AreaHitByLightRay.ObjectNo]
                        .PartOfRefractionlight +
                ColorOfLightSource.items[lamp].Red * PartSurrounding,
            Green:
                ColorDirectLight.Green *
                    AreaConstants.items[AreaHitByLightRay.ObjectNo]
                        .PartOfDirectLight +
                ColorReflectLight.Green *
                    AreaConstants.items[AreaHitByLightRay.ObjectNo]
                        .PartOfReflectlight +
                ColorRefractionLight.Green *
                    AreaConstants.items[AreaHitByLightRay.ObjectNo]
                        .PartOfRefractionlight +
                ColorOfLightSource.items[lamp].Green * PartSurrounding,
            Blue:
                ColorDirectLight.Blue *
                    AreaConstants.items[AreaHitByLightRay.ObjectNo]
                        .PartOfDirectLight +
                ColorReflectLight.Blue *
                    AreaConstants.items[AreaHitByLightRay.ObjectNo]
                        .PartOfReflectlight +
                ColorRefractionLight.Blue *
                    AreaConstants.items[AreaHitByLightRay.ObjectNo]
                        .PartOfRefractionlight +
                ColorOfLightSource.items[lamp].Blue * PartSurrounding,
        };
    } else {
        var ColorPixel = {
            Red: 1,
            Green: 1,
            Blue: 1,
        };
    }

    return {
        Red: ColorPixel.Red,
        Green: ColorPixel.Green,
        Blue: ColorPixel.Blue,
    };
}

function HitObjectByLightRay(
    OriginX,
    OriginY,
    OriginZ,
    DirectionX,
    DirectionY,
    DirectionZ
) {
    var ObjectNo = -1;
    var Distance = 1e6;
    var IntersectionPointX = 1e6;
    var IntersectionPointY = 1e6;
    var IntersectionPointZ = 1e6;

    for (i = 0; i < AreaIndex; i++) {
        var HitWithArea = CheckForHitWithArea(
            OriginX,
            OriginY,
            OriginZ,
            DirectionX,
            DirectionY,
            DirectionZ,
            i
        );
        if (HitWithArea.HitHappend == true && HitWithArea.Distance < Distance) {
            ObjectNo = i;
            Distance = HitWithArea.Distance;
            IntersectionPointX = HitWithArea.IntersectionPointX;
            IntersectionPointY = HitWithArea.IntersectionPointY;
            IntersectionPointZ = HitWithArea.IntersectionPointZ;
        }
    }

    return {
        ObjectNo: ObjectNo,
        IntersectionPointX: IntersectionPointX,
        IntersectionPointY: IntersectionPointY,
        IntersectionPointZ: IntersectionPointZ,
        Distance: Distance,
    };
}

function CheckForHitWithArea(
    OriginX,
    OriginY,
    OriginZ,
    DirectionX,
    DirectionY,
    DirectionZ,
    i
) {
    var HitHappend = false;
    var Distance = 1e6;
    var IntersectionPointX = 1e6;
    var IntersectionPointY = 1e6;
    var IntersectionPointZ = 1e6;

    var a = AreaConstants.items[i].a;
    var b = AreaConstants.items[i].b;
    var c = AreaConstants.items[i].c;
    var d = AreaConstants.items[i].d;

    var ScalarProduct = DirectionX * a + DirectionY * b + DirectionZ * c;

    if (ScalarProduct != 0) {
        var w = (-a * OriginX - b * OriginY - c * OriginZ - d) / ScalarProduct;
        IntersectionPointX = OriginX + w * DirectionX;
        IntersectionPointY = OriginY + w * DirectionY;
        IntersectionPointZ = OriginZ + w * DirectionZ;

        if (
            w > 1e-10 &&
            CheckIfIntersectionWithinArea(
                IntersectionPointX,
                IntersectionPointY,
                IntersectionPointZ,
                i
            ) == true
        ) {
            HitHappend = true;
            Distance = Math.sqrt(
                (OriginX - IntersectionPointX) *
                    (OriginX - IntersectionPointX) +
                    (OriginY - IntersectionPointY) *
                        (OriginY - IntersectionPointY) +
                    (OriginZ - IntersectionPointZ) *
                        (OriginZ - IntersectionPointZ)
            );
        }
    }

    return {
        HitHappend: HitHappend,
        Distance: Distance,
        IntersectionPointX: IntersectionPointX,
        IntersectionPointY: IntersectionPointY,
        IntersectionPointZ: IntersectionPointZ,
    };
}

function CheckIfIntersectionWithinArea(
    IntersectionPointX,
    IntersectionPointY,
    IntersectionPointZ,
    i
) {
    var Ax = Area.items[i][0][0];
    var Ay = Area.items[i][0][1];
    var Az = Area.items[i][0][2];
    var Bx = Area.items[i][1][0];
    var By = Area.items[i][1][1];
    var Bz = Area.items[i][1][2];
    var Cx = Area.items[i][2][0];
    var Cy = Area.items[i][2][1];
    var Cz = Area.items[i][2][2];

    var Mx = (Bx - Ax) / 2 + Ax;
    var My = (By - Ay) / 2 + Ay;
    var Mz = (Bz - Az) / 2 + Az;

    var Sx = IntersectionPointX;
    var Sy = IntersectionPointY;
    var Sz = IntersectionPointZ;

    var T1 =
        ((By - Sy) * Ax + (-Bx + Sx) * Ay + Bx * Sy - By * Sx) /
        ((My - Sy) * Ax + (Sx - Mx) * Ay + (Sy - My) * Bx + By * (Mx - Sx));
    var R1 =
        ((Sy - My) * Bx + By * (Mx - Sx) - Sy * Mx + Sx * My) /
        ((Sy - My) * Bx +
            By * (Mx - Sx) +
            Ax * My -
            Ax * Sy -
            Ay * Mx +
            Ay * Sx);

    var T2 =
        ((Cy - Sy) * Bx + (-Cx + Sx) * By + Cx * Sy - Cy * Sx) /
        ((My - Sy) * Bx + (Sx - Mx) * By + (Sy - My) * Cx + Cy * (Mx - Sx));
    var R2 =
        ((Sy - My) * Cx + Cy * (Mx - Sx) - Sy * Mx + Sx * My) /
        ((Sy - My) * Cx +
            Cy * (Mx - Sx) +
            Bx * My -
            Bx * Sy -
            By * Mx +
            By * Sx);

    var T3 =
        ((Ay - Sy) * Cx + (-Ax + Sx) * Cy + Ax * Sy - Ay * Sx) /
        ((My - Sy) * Cx + (Sx - Mx) * Cy + (Sy - My) * Ax + Ay * (Mx - Sx));
    var R3 =
        ((Sy - My) * Ax + Ay * (Mx - Sx) - Sy * Mx + Sx * My) /
        ((Sy - My) * Ax +
            Ay * (Mx - Sx) +
            Cx * My -
            Cx * Sy -
            Cy * Mx +
            Cy * Sx);

    var NumberOfInterceptionsWithAreaEdges = 0;
    if (T1 >= 0 && R1 >= 0 && R1 <= 1) {
        NumberOfInterceptionsWithAreaEdges =
            NumberOfInterceptionsWithAreaEdges + 1;
    }
    if (T2 >= 0 && R2 >= 0 && R2 <= 1) {
        NumberOfInterceptionsWithAreaEdges =
            NumberOfInterceptionsWithAreaEdges + 1;
    }
    if (T3 >= 0 && R3 >= 0 && R3 <= 1) {
        NumberOfInterceptionsWithAreaEdges =
            NumberOfInterceptionsWithAreaEdges + 1;
    }
    if (NumberOfInterceptionsWithAreaEdges == 1) {
        return true;
    } else {
        return false;
    }
}

function CalculateReflection(
    OriginX,
    OriginY,
    OriginZ,
    IntersectionPointX,
    IntersectionPointY,
    IntersectionPointZ,
    i
) {
    var NxNyNz = GetNxNyNzForArea(
        i,
        IntersectionPointX,
        IntersectionPointY,
        IntersectionPointZ
    );
    var nx = NxNyNz.nx;
    var ny = NxNyNz.ny;
    var nz = NxNyNz.nz;

    var Factor =
        (nx * (OriginX - IntersectionPointX) +
            ny * (OriginY - IntersectionPointY) +
            nz * (OriginZ - IntersectionPointZ)) /
        (nx * nx + ny * ny + nz * nz);
    var Qx = 2 * nx * Factor + 2 * IntersectionPointX - OriginX;
    var Qy = 2 * ny * Factor + 2 * IntersectionPointY - OriginY;
    var Qz = 2 * nz * Factor + 2 * IntersectionPointZ - OriginZ;

    return {
        DirectionX: Qx - IntersectionPointX,
        DirectionY: Qy - IntersectionPointY,
        DirectionZ: Qz - IntersectionPointZ,
    };
}

function CalculateRefraction(
    OriginX,
    OriginY,
    OriginZ,
    IntersectionPointX,
    IntersectionPointY,
    IntersectionPointZ,
    i,
    RefractiveIndexInCurrentMedium,
    RefractiveIndexInNewMaterial
) {
    var NxNyNz = GetNxNyNzForArea(
        i,
        IntersectionPointX,
        IntersectionPointY,
        IntersectionPointZ
    );
    var nx = NxNyNz.nx;
    var ny = NxNyNz.ny;
    var nz = NxNyNz.nz;

    var Factor =
        (nx * (OriginX - IntersectionPointX) +
            ny * (OriginY - IntersectionPointY) +
            nz * (OriginZ - IntersectionPointZ)) /
        (nx * nx + ny * ny + nz * nz);
    var Qx = 2 * nx * Factor + 2 * IntersectionPointX - OriginX;
    var Qy = 2 * ny * Factor + 2 * IntersectionPointY - OriginY;
    var Qz = 2 * nz * Factor + 2 * IntersectionPointZ - OriginZ;

    var Alpha = AngleBetweenVectors(
        IntersectionPointX - OriginX,
        IntersectionPointY - OriginY,
        IntersectionPointZ - OriginZ,
        nx,
        ny,
        nz
    );
    if (Alpha > Math.PI / 2) {
        nx = -nx;
        ny = -ny;
        nz = -nz;
        Alpha = AngleBetweenVectors(
            IntersectionPointX - OriginX,
            IntersectionPointY - OriginY,
            IntersectionPointZ - OriginZ,
            nx,
            ny,
            nz
        );
    }
    var TempBeta =
        (Math.sin(Alpha) * RefractiveIndexInCurrentMedium) /
        RefractiveIndexInNewMaterial;
    if (Math.abs(TempBeta) > 1) {
        var TotalReflection = true;
        var Hx = IntersectionPointX;
        var Hy = IntersectionPointY;
        var Hz = IntersectionPointZ;
    } else {
        var TotalReflection = false;
        var Beta = Math.asin(TempBeta);

        var US = LengthOfVector(
            IntersectionPointX - OriginX,
            IntersectionPointY - OriginY,
            IntersectionPointZ - OriginZ
        );
        var UQ = LengthOfVector(Qx - OriginX, Qy - OriginY, Qz - OriginZ);
        var UW = US * (Math.sin(Alpha) + Math.sin(Beta));

        var Wx = OriginX + (UW / UQ) * (Qx - OriginX);
        var Wy = OriginY + (UW / UQ) * (Qy - OriginY);
        var Wz = OriginZ + (UW / UQ) * (Qz - OriginZ);

        var WH = US * (Math.cos(Alpha) + Math.cos(Beta));

        var Hx = Wx + (WH * nx) / Math.sqrt(nx * nx + ny * ny + nz * nz);
        var Hy = Wy + (WH * ny) / Math.sqrt(nx * nx + ny * ny + nz * nz);
        var Hz = Wz + (WH * nz) / Math.sqrt(nx * nx + ny * ny + nz * nz);
    }

    return {
        TotalReflection: TotalReflection,
        DirectionX: Hx - IntersectionPointX,
        DirectionY: Hy - IntersectionPointY,
        DirectionZ: Hz - IntersectionPointZ,
    };
}

function CalculateAngleBetweenNormalAndLightSource(
    IntersectionPointX,
    IntersectionPointY,
    IntersectionPointZ,
    LightSourceX,
    LightSourceY,
    LightSourceZ,
    i
) {
    var NxNyNz = GetNxNyNzForArea(
        i,
        IntersectionPointX,
        IntersectionPointY,
        IntersectionPointZ
    );
    var nx = NxNyNz.nx;
    var ny = NxNyNz.ny;
    var nz = NxNyNz.nz;

    var TempAngle = AngleBetweenVectors(
        nx,
        ny,
        nz,
        LightSourceX - IntersectionPointX,
        LightSourceY - IntersectionPointY,
        LightSourceZ - IntersectionPointZ
    );
    if (TempAngle > Math.PI / 2) {
        nx = -nx;
        ny = -ny;
        nz = -nz;
    }
    return AngleBetweenVectors(
        nx,
        ny,
        nz,
        LightSourceX - IntersectionPointX,
        LightSourceY - IntersectionPointY,
        LightSourceZ - IntersectionPointZ
    );
}

function PrepareConstants() {
    for (var i = 0; i < AreaIndex; i++) {
        var Ax = Area.items[i][0][0];
        var Ay = Area.items[i][0][1];
        var Az = Area.items[i][0][2];
        var Bx = Area.items[i][1][0];
        var By = Area.items[i][1][1];
        var Bz = Area.items[i][1][2];
        var Cx = Area.items[i][2][0];
        var Cy = Area.items[i][2][1];
        var Cz = Area.items[i][2][2];

        var a = +(By - Ay) * (Cz - Az) - (Cy - Ay) * (Bz - Az);
        var b = -(Bx - Ax) * (Cz - Az) + (Cx - Ax) * (Bz - Az);
        var c = +(Bx - Ax) * (Cy - Ay) - (Cx - Ax) * (By - Ay);
        var d = -(
            Cy * Az * Bx +
            Cz * Ax * By +
            Cx * Ay * Bz -
            Cz * Ay * Bx -
            Cx * Az * By -
            Cy * Ax * Bz
        );
        // a = parseFloat(a.toPrecision(10)); // parseFloal and toPrecision to avoid rounding issues for the corresponding 2 triangle areas splitted from rectangle areas
        // b = parseFloat(b.toPrecision(10));
        // c = parseFloat(c.toPrecision(10));
        // d = parseFloat(d.toPrecision(10));
        var nx = (By - Ay) * (Cz - Az) - (Cy - Ay) * (Bz - Az);
        var ny = -(Bx - Ax) * (Cz - Az) + (Cx - Ax) * (Bz - Az);
        var nz = (Bx - Ax) * (Cy - Ay) - (Cx - Ax) * (By - Ay);
        // nx = parseFloat(nx.toPrecision(10));
        // ny = parseFloat(ny.toPrecision(10));
        // nz = parseFloat(nz.toPrecision(10));

        // console.log("Normalen Vektor: (sollte 2x gleich sein fuer 2 Dreiecke aus einem Viereck)",nx,ny,nz);

        AreaConstants.items[i].a = a;
        AreaConstants.items[i].b = b;
        AreaConstants.items[i].c = c;
        AreaConstants.items[i].d = d;
        AreaConstants.items[i].nx = nx / LengthOfVector(nx, ny, nz);
        AreaConstants.items[i].ny = ny / LengthOfVector(nx, ny, nz);
        AreaConstants.items[i].nz = nz / LengthOfVector(nx, ny, nz);
        AreaConstants.items[i].CenterX = (Ax + Bx + Cx) / 3;
        AreaConstants.items[i].Centery = (Ay + By + Cy) / 3;
        AreaConstants.items[i].CenterZ = (Az + Bz + Cz) / 3;
        AreaConstants.items[i].AdjacentAreas = [];
        for (var j = 0; j < AreaIndex; j++) {
            if (j != i && DoTwoAreasHaveACommonCorner(i, j)) {
                AreaConstants.items[i].AdjacentAreas.push(j);
            }
        }
    }
}
