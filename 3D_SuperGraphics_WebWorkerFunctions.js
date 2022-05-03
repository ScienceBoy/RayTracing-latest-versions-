function Array1D(x) {
    this.items = new Array(x);
}

function Array2D(x, y) {
    this.items = new Array(x);
    for (var i = 0; i < x; i++) this.items[i] = new Array(y);
}

function Array3D(x, y, z) {
    this.items = new Array(x);
    for (var i = 0; i < x; i++) this.items[i] = new Array(y);
    for (var i = 0; i < x; i++)
        for (var j = 0; j < y; j++) this.items[i][j] = new Array(z);
}

function StopRayTracing() {
    var x = setTimeout('alert("x");', 0); //It is very low probability that after 100000 seconds x timeout will not be cleared
    for (var i = 0; i <= x; i++) clearTimeout(i);
    RayTracingStarted = false;
}

function RayTracingStart() {
    RayTracingStarted = true;
    // ApplyPerspectiveDistortionForArea();
    PrepareConstants();
    RayTracing();
}

function RayTracingStart2K() {
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
    }, 0);

    setTimeout(function () {
        PrepareConstants();
        RayTracing();
    }, 0);

    setTimeout(function () {
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
    }, 10000);
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
    CalcSizeOfObject();
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
    // console.log(counter, "7: ",AreaConstants.items[AreaNmbr].nx, ResultingNx/NumberOfValues,AreaConstants.items[AreaNmbr].ny, ResultingNy/NumberOfValues,AreaConstants.items[AreaNmbr].nz, ResultingNz/NumberOfValues);
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

function max(a, b) {
    if (a > b) {
        return a;
    } else {
        return b;
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
