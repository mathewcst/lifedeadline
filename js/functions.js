function daysInPeriod(firstDate, secondDate){
	var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
	return  Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));
}