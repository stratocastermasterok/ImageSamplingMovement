﻿    /*Copyright 2019 Tomilola AdewaleLicensed under the Apache License, Version 2.0 (the "License");you may not use this file except in compliance with the License.You may obtain a copy of the License at    http://www.apache.org/licenses/LICENSE-2.0Unless required by applicable law or agreed to in writing, softwaredistributed under the License is distributed on an "AS IS" BASIS,WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.See the License for the specific language governing permissions andlimitations under the License.*/ //Copyright 2019, Tomilola Adewale All rights reserved.var hcopies=13;var vcopies=7;var htrans=10;var vtrans=100;  var numC=1; function createArray(start){toadd=[start[0],start[1]];arr = [];for (j = 0; j<numC; j++){        arr[j] = toadd;	addAmount=Math.round(((3+3)*generateRandomNumber())-3);	if (j%2==0)		{		toadd+=[addAmount*(htrans),0];		}    else			{		toadd+=[0,addAmount*(vtrans)];		}}return arr;}    {app.beginUndoGroup("Ma Code");var myComp = app.project.activeItem;var selectedLayers = myComp.selectedLayers;var startt=[50,50];//startingposition  var numDots=hcopies*vcopies;  var myComp = app.project.activeItem; var columns=hcopies; var rows=vcopies;    for (h = 0; h<1; h++) {for (m = 0; m<numDots; m++)  {      var myChoice= m%selectedLayers.length;var myNewLayer=selectedLayers[myChoice].duplicate();//ABOVE IS WHEN WE DECIDE WHICH OF THE SELECTED LAYERS SHOULD DE DUPLICATED ON EACH ITERATION OF THE LOOP //x=myComp.width/columns;//y=myComp.height/rows;x=htrans;y=vtrans;thestartPosition=[((m)%columns)*x,(Math.floor((m/columns))*y)]+startt;var coolArray=createArray(thestartPosition);myTimes = [];timeAmount=0;for (i = 0; i<coolArray.length; i++){    myTimes[i] = timeAmount;    timeAmount+= .25;}//brandcolors=[[0,150,214],[0,0,0],[167,169,172]];//var compBG = brandcolors[m%brandcolors.length]/255;// comp background color             var easeIn = new KeyframeEase(0.5, 50);var easeOut = new KeyframeEase(0.75, 85);myNewLayer.moveToBeginning();myNewLayer.label=11;myNewLayer.name="My Layer" +(m+1);//var point=myNewLayer.property("anchorPoint").setValue([24.4263,-19.7937]);var myPosition=myNewLayer.property("position");myPosition.setValuesAtTimes(myTimes,coolArray);         for (g=0; g<coolArray.length; g++)        {        myPosition.setTemporalEaseAtKey(g+1, [easeIn], [easeOut]);         }          var myRotation = myNewLayer.property("rotation");          for (g=0; g<coolArray.length; g++)          {              if (g%3==1){            myRotation.setValueAtTime(g,((g+1)*180));           myRotation.setTemporalEaseAtKey(Math.ceil(g/3), [easeIn], [easeOut]);                }            }         }}  app.endUndoGroup();  }