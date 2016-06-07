$(document).ready(function(){

	// START VIDEO AT 3 SECONDS
	document.getElementById('bgvid').addEventListener('loadedmetadata', function() {
	  this.currentTime = 03;
	}, false);

	// PERVENT THE CALCULATE BUTTON TO SCROLL TO TOP OF THE PAGE
	$('.calculate-deadline').click(function(e){
		e.preventDefault();
	});

	// CLOSE VIDEO MODAL
	$('.fade-black').click(function(){
		closeModal();
	})

	$('.close-modal').click(function(){
		closeModal();
	})

	// OPEN MODAL
	$('.ted-talk').click(function(e){
		e.preventDefault();
		openModal();
	})

	function openModal(){
		$('.modal').velocity({
			'opacity': 1
		}, {display: 'block', duration: 300, delay: false, queue: false });

		$('.fade-black').velocity({
			'opacity': 1
		}, {display: 'block', duration: 300, delay: false, queue: false });
	}

	function closeModal(){
		$('.modal').velocity({
			'opacity': 0
		}, {display: 'none', duration: 300, delay: false, queue: false });

		$('.fade-black').velocity({
			'opacity': 0
		}, {display: 'none', duration: 300, delay: false, queue: false });
	}

	// SCROLL LINKS
	$('.go-to--link').click(function(e){
		e.preventDefault();

		$("#deadline").velocity('scroll', {duration: 300, delay: false, queue: false, offset: '10vh'});
	})

})