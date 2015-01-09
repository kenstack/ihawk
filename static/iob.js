function iob(hisdata,setdata,ptime)
{
	


	
	var n=Object.keys(hisdata).length; //find number of entries in the history grab, need to ensure bash script grabs enough
	var pt=Date(ptime);
	var ptimem=Date.parse(pt); //this is alreadt converted to local time unlike itimem need to investigate why	
	 itimem=setdata.insulin_action_type*3600000.0;//convert insulin duration to millsec
	var total=0.0;	
	var inonb=0.0;

	for (i = 0; i < n; i++) {
	var btimem=Date.parse(hisdata[i].timestamp)+5*3600000.0; //this method converts to GMT, so add 5 hrs in millisec
	
	//console.log(n,ptimem-btimem,ptimem,itimem,hisdata[i].timestamp,btimem,hisdata[i]._type,hisdata[i].amount);
	//if within active insulin window and the record is a bolus then add it in 
	if ((ptimem-btimem)<itimem && (hisdata[i]._type=="Bolus")) {
	//work off bolus as bolus wizard is not called during manual bolus events and we want those too.
	m=(1.66667e-5*(ptimem-btimem)); //convert current record active time to minutes m from millisec
	var actin=[0.0,0.0,0.0,0.0,0.0,0.0,0.0];
	//common  % remaining insulin vs time curves from literature walsh et al, very close to minimed
	//at time 0 actin=100, minimed actin=0 for first 30 min, walsh uses about 1-5% depending on curve - more then close enough
	actin[3]=-3.2e-7*Math.pow(m,4)+1.354e-4*Math.pow(m,3)-1.76e-2*Math.pow(m,2)+9.255e-2*m+99.951;
	actin[4]=-3.31e-8*Math.pow(m,4)+2.53e-5*Math.pow(m,3)-5.51e-3*Math.pow(m,2)-9.086e-2*m+99.95;
	actin[5]=-2.95e-8*Math.pow(m,4)+2.32e-5*Math.pow(m,3)-5.55e-3*Math.pow(m,2)+4.49e-2*m+99.3;
	actin[6]=-1.493e-8*Math.pow(m,4)+1.413e-5*Math.pow(m,3)-4.095e-3*Math.pow(m,2)+6.365e-2*m+99.7;
	prcremain=actin[setdata.insulin_action_type]/100.0; //calc percent remaining based on insulin duration from settings
	total=total+hisdata[i].amount*prcremain; //total remaining insulin
	fcor=0.0;
	//search thru all history data to see if there is a bolus wizard that matches our timestamp.  
	j=0;
	found=-1;
	while (found==-1&&(j<n)) {
	//if object is a boluswizard and the timestamp matches current bolus use the data for iob split
	if((hisdata[j]._type=="BolusWizard")&&(hisdata[j].timestamp=hisdata[i].timestamp)) {
	found=1;
	fcor=hisdata[j].food_estimate;
	//in quick review food_estimate looked accurate compared to actual pump data, correction did not
	inonb=inonb+(hisdata[i].amount-fcor)*prcremain; //classic iob calc stripping out insulin covering carbs
		} //end if
	j++;
	} //end while
	
	} //end if bolus record
	} //loop thru all records
	return [inonb,total];  //return both
} //end function iob
