/*右侧菜单*/
$(document).ready(function(){

	$('.drawer').drawer();	
	$('.js-trigger').click(function(){
		$('.drawer').drawer("open");
	});
	
});