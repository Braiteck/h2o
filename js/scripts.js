$(function(){
	// Основной слайдер на главной
	$('.main_slider .slider').owlCarousel({
		items: 1,
		margin: 0,
		loop: true,
		nav: false,
		dots: true,
		autoplay: true,
		autoplayTimeout: 4000,
		smartSpeed: 750
	})


	// Слайдер в тексте
	$('.text_block .slider_in_text .big .slider').owlCarousel({
	    items: 1,
		margin: 20,
		loop: false,
		nav: false,
		dots: false,
		smartSpeed: 500,
	    onTranslate: function(event){
	    	$(event.target).parents('.slider_in_text').find('.thumbs .slide a').removeClass('active')
	    	$(event.target).parents('.slider_in_text').find('.thumbs .slide:eq('+ event.item.index +') a').addClass('active')
	    }
	})

	$('.text_block .slider_in_text .thumbs .slider').owlCarousel({
		margin: 11,
		loop: false,
		nav: true,
		dots: false,
		smartSpeed: 500,
		responsive: {
			0:{
	            items: 2
	        },
	        414:{
	            items: 3
	        },
	        768:{
	            items: 4
	        }
		}
	})

	$('.text_block .slider_in_text .thumbs .slide a').click(function(e) {
		e.preventDefault()

		$(this).parents('.slider_in_text').find('.thumbs .slide a').removeClass('active')
		$(this).addClass('active')

	    $(this).parents('.slider_in_text').find('.big .slider').trigger('to.owl.carousel', $(this).attr('data-slide-index'))
	})


	// Переключение типа пользователя в форме
	$('body').on('click', '.form .type label', function() {
		let content = $(this).data('content')
		let parent = $(this).closest('.form')

		parent.find('.type_content').hide()
		parent.find(content).fadeIn(300)
	})


	// Товар в корзину
	$('body').on('click', '.products .product .buy_link', function(e) {
		e.preventDefault()

		// Здесь какие-то действия по добавлению товара в корзину
	})


	// Личный кабинет
	$('.lk .personal .edit_personal').click(function(e){
	    e.preventDefault()

	    let parent = $(this).closest('.personal')

	    parent.find('.info, .form').hide()
	    parent.find('.personal_form').fadeIn()

	    parent.find('.links a').removeClass('active')
	    $(this).addClass('active')
	})


	$('.lk .personal .edit_password').click(function(e){
	    e.preventDefault()

	    let parent = $(this).closest('.personal')

	    parent.find('.info, .form').hide()
	    parent.find('.password_form').fadeIn()

	   	parent.find('.links a').removeClass('active')
	    $(this).addClass('active')
	})


	$('.lk .personal .form .cancel').click(function(e){
	    e.preventDefault()

	    let parent = $(this).closest('.personal')

	    parent.find('.form').hide()
	    parent.find('.info').fadeIn()
	})


	$('.lk .addresses .adres_block .edit_link').click(function(e){
	    e.preventDefault()

	    let parent = $(this).closest('.adres_block')

	    if( $(this).hasClass('active') ){
	        $(this).removeClass('active')

	       	parent.find('.form').hide()
	    	parent.find('.info').fadeIn()
	    }else{
	        $(this).addClass('active')

	       	parent.find('.info').hide()
	    	parent.find('.form').fadeIn()
	    }
	})

	$('.lk .addresses .adres_block form').submit(function(e){
	    e.preventDefault()

	    let parent = $(this).closest('.adres_block')

	    parent.find('.edit_link').removeClass('active')
	    parent.find('.form').hide()
	    parent.find('.info').fadeIn()
	})

	$('.lk .addresses .adres_block .delete_link').click(function(e){
	    e.preventDefault()

	    let parent = $(this).closest('.adres_block')

	    parent.remove()
	})


	// Календарь
	$('.calendar').datepicker({
		autoClose: true,
		minDate: new Date()
	})


	// Добавление товара в корзину
	$('body').on('click', '.buy_link', function(e) {
		e.preventDefault()

		$.fancybox.close()

		$.fancybox.open({
			src  : '#cart_success_modal',
			type : 'inline'
		})
	})


	// Отправка форм
	$('body').on('submit', '.form.ajax_submit', function(e) {
		e.preventDefault()

		$.fancybox.close()

		$.fancybox.open({
			src  : '#success_modal',
			type : 'inline'
		})
	})


	// Доставка - Куда мы доставляем?
	$('.delivery_info .delivery_regions .slider').owlCarousel({
		margin: 20,
		loop: false,
		nav: true,
		dots: false,
		smartSpeed: 500,
		responsive: {
			0:{
	            items: 1
	        },
	        414:{
	            items: 2
	        },
	        768:{
	            items: 3
	        },
	        1024:{
	            items: 4
	        }
		}
	})
})



$(window).load(function(){
	// Доствака - Как мы работаем?
	$('.delivery_steps .flex').each(function(){
		deliveryHeight($(this), parseInt($(this).css('--delivery_steps_count')))
	})
})



$(window).resize(function(){
	// Доствака - Как мы работаем?
	$('.delivery_steps .flex').each(function(){
		deliveryHeight($(this), parseInt($(this).css('--delivery_steps_count')))
	})
})



// Доствака - Как мы работаем?
function deliveryHeight(context, step){
	let start = 0
	let finish = step
	let steps = context.find('.item')

	steps.find('.name').height('auto')

	for( let i = 0; i < steps.length; i++ ){
		let obj = steps.slice(start, finish).find('.name')

		setHeight( obj )

		start = start+step
		finish = finish+step
	}
}