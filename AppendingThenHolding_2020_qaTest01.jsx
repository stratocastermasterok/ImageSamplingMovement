﻿{
    
        /*Copyright 2019 Tomilola Adewale
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at
    http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/ 

//Copyright 2019, Tomilola Adewale All rights reserved.



    app.beginUndoGroup("Add Images");
    
    
    
    function saveTxt(txt,theName)
{


    var saveFile = File("/Users/tomilola/Desktop" + "/" + theName +".txt");

    if(saveFile.exists)
        saveFile.remove();

    saveFile.encoding = "UTF8";
    saveFile.open("e", "TEXT", "????");
    saveFile.writeln(txt);
    saveFile.close();
}
//end of save function




function tomiImageSample(startPosition, endPosition, xInterval, yInterval, circleSize, theFolderVar, myIndexx) {


    var sourceName = theFolderVar.item(parseInt(myIndexx + 1)).name;

//alert(sourceName);
    var myComp = app.project.activeItem;
    var myNull = myComp.layers.addNull();



    var startPosition = startPosition
    var endPosition = endPosition;
    var xInterval = xInterval
    var yInterval = yInterval;



    var xSize = endPosition[0] - startPosition[0];
    var ySize = endPosition[1] - startPosition[1];


    var xTimes = Math.floor(xSize / xInterval);
    var yTimes = Math.floor(ySize / yInterval);


    var gridCount = xTimes * yTimes;
    //alert([gridCount, xTimes, yTimes]);



    if (circleSize == null) {
        var circleSize = xInterval / 2;
    } else {
        var circleSize = circleSize
    };



    var capturedData = "";

    //start of calc loop
    var nothingCounter = 0;
    
    
    for (i = 0; i < gridCount; i++) {
        var positionToInspect = startPosition + [(i % xTimes) * xInterval, Math.floor(i / xTimes) * yInterval];
        //alert(positionToInspect);
        var myExp = 'target = comp("opts").layer("'+sourceName+'");\nresult=target.sampleImage([' + positionToInspect[0] + ',' + positionToInspect[1] + '], [.5, .5]/2, true, time);\n[(result[1]+result[2]+result[0]/3),result[3]];'
        myNull.property("position").expression = myExp;
        //alert(myNull.property("rotation").valueAtTime(0, false));
        var myFoundAlpha = parseFloat(myNull.property("position").valueAtTime(0, false)[1]);
        //alert(myFoundVal);

        if (myFoundAlpha == 1) { //something is there ... do something
            //alert("triggered")
            var myFoundVal = parseFloat(myNull.property("position").valueAtTime(0, false)[0]);

                                                            //if over a certain amount, put it in the list
                                                            if (myFoundVal <= .85) {
                                                                capturedData += positionToInspect[0] + ":" + positionToInspect[1] + ",";
                                                            }

                                            } else 
                                        
                                            { //nothin is ther, keep count
                                                        nothingCounter++;
                                                            if (nothingCounter % 100 == 0) {
                                                                //alert(nothingCounter +" out of "+ gridCount);
                                                            }


                                              }//end  of found alphaElse case 
                                          
                                          
                                         }//end  of gridCount



myNull.remove();
//alert(capturedData+" aye");

                                                        var myChangeToTheText = capturedData.split("");
                                                        myChangeToTheText.pop();
                                                        //myChangeToTheText.push('"');

                                                        var brandNewText = myChangeToTheText.join("");
                                                        return brandNewText;


} //end of ImageSampling function










                                                       function augmentString(indexHere,capturedString,myFiguresGroup,pos)
                                                       {
                                                           
                                                           
                                                                            var myFiguresGroupArray=myFiguresGroup.split(";");
                                                                            var getAppendDirections="";
                                                                            var rememberMe=0;
                                                                            var hybrid=[];
                                                                            for (yy=0; yy<myFiguresGroupArray.length; yy++)
                                                                            {
                                                                                
                                                                                
                                                                                var valuesPerImage= myFiguresGroupArray[yy].split(",");
                                                                                              var soughtAfterValues = valuesPerImage[indexHere%valuesPerImage.length].split(":");
                                                                                              var myNeededValues= [parseFloat(soughtAfterValues[0]), parseFloat(soughtAfterValues[1])];
                                                                                              
                                                                                              
                                                                                              

                                                                                                        
                                                                                              if (myNeededValues==null)
                                                                                              {
                                                                                                  
                                                                                                    if (yy==0){
                                                                                                         getAppendDirections+= "[2,[["+0,0+"]]],";
                                                                                                        }
                                                                                                    else
                                                                                                    {             
                                                                                                        getAppendDirections+= "[2,[["+0,0+"]]],"+"[2,[["+0,0+"]]],";
                                                                                                        }
                                                                                                  
                                                                                                  }
                                                                                              else
                                                                                              {
                                                                                                  
                                                                                                  if (yy==0){
                                                                                                      var maStartingPoint=[myNeededValues[0],pos[1]];
                                                                                                        getAppendDirections+= "[2,[["+maStartingPoint.toString()+"]]],"+"[2,[["+myNeededValues.toString()+"]]],[2,[["+myNeededValues.toString()+"]]],";
                                                                                                        // i just added in the hold to the dictionary 
                                                                                                        rememberMe= myNeededValues[1];
                                                                                                      }
                                                                                                  else
                                                                                                  {
                                                                                                      
                                                                                                      hybrid=[myNeededValues[0],rememberMe];
                                                                                                        getAppendDirections+= "[2,[["+hybrid.toString()+"]]],"+"[2,[["+myNeededValues.toString()+"]]],[2,[["+myNeededValues.toString()+"]]],";
                                                                                                        // i just added in the hold to the dictionary 

                                                                                                        rememberMe=myNeededValues[1];
                                                                                                        }
                                                                                                }
                                                                                
                                                                                
                                                                                }
                                                                            
                                                                            
                                                                            
                                                                            
                                                                            
                                                                            
                                                                                            var myExpressionTextFound=capturedString;

                                                                                            var stitchCode=']};function tomiEase(rate, startTime, endTime';
                                                                                            var brokenOut= myExpressionTextFound.split(stitchCode);
                                                                                            var firstPart=brokenOut[0];
                                                                                            //alert(firstPart);
                                                                                            var secondPart=brokenOut[1];
                                                                                            //alert(secondPart);



                                                                                            var inject=getAppendDirections;

                                                                                            var myFullString= firstPart+inject+stitchCode+secondPart;



                                                                                            return myFullString;
                                                                            

                                                           }









//end of important functions







                                                          var myCurrentComp = app.project.activeItem;
                                                         var selectedLayers = myCurrentComp.selectedLayers;
                                        alert(selectedLayers.length);



                            var yourFolderName="MyImages";          
                            var folderName = yourFolderName.toLowerCase(); // name of item you're looking for
                                            var myFolder = null;
                                            
                                            
                                            for (var i = 1; i <= app.project.numItems; i++)
                                            {
                                                    if ((app.project.item(i).name.toLowerCase() == folderName))
                                                    {
                                                            myFolder = app.project.item(i);
                                                            break;
                                                    }
                                            } //find the asset folder name you define and make it the variable "myFolder" 
                                        
                                        
                                            if (myFolder != null)
                                            {
                                                    var numInFolder = myFolder.numItems;
                                                   
                                            }
                                            else
                                            {
                                                    alert("Can't find comp '" + folderName + "'");
                                                    yourFolderName="";
                                            } //using the nubmer of rows and columns and other comp secs, we make the griditem comps here
                                            
                                        
                                        
                                        
                                            if (myFolder != null)
                                            {
                                                
                                                
                                           var numInFolder = myFolder.numItems;
                                                        var megaListText="";
                                                        for (var ff = 0; ff < numInFolder; ff++)
                                                        {
                                                            var newAddition=tomiImageSample([50,50],[1230,670],20,20,0,myFolder,ff);

                                                            megaListText+=newAddition.toString()+';';
                                                            
                                                            
                                                            }
                                                        
                                                        
                                                        alter=megaListText.split("");
                                                        alter.pop();
                                                        megaListText=alter.join("");
                                                        saveTxt(megaListText, "MegaList");
                                                        // alert(brandNewText);
//end of create megaList










                   // alert("almosstt there");


                                                        for (myy = 0; myy<selectedLayers.length; myy++)
                                                          {
                                                              
                   // alert("almosstt there22");

                                                              
                                                                            var myLayerNow =selectedLayers[myy];
                                                                            
                                                                            
                                                                            var capturedString= myLayerNow.property("position").expression;
                                                                            var capturedPosition= myLayerNow.property("position").valueAtTime(0,true);
                                                                            myLayerNow.property("position").expression="";
                                                                            var myChangedString=augmentString(myy,capturedString,megaListText,capturedPosition);
                                                                            //alert("thisFarrrr");
                                                                            myLayerNow.property("position").expression=myChangedString;
                                                                            
                                                              
                                                              
                                                              
                                                              }
                                                          
                                                          
                                                          









                                                                                                    
                                            
                                            
                                            
                                            
                                            
                                            
                                            
                                            
                                            
                                            
                                            
                                            
                                            }

                                                
                                                
                                                




                                                
                                                
                                                
                                                




                                                






                            app.endUndoGroup();

}