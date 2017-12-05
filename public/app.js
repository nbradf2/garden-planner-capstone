var MOCK_GARDEN_LIST = 
 [
		{
			"id": "1111111",
			"name": "Heirloom Tomato",
			"start-date": "April 20, 2018",
			"harvest-date": "July 20, 2018",
			"comments": "Use crushed eggshells to supplement"
		},
		{
			"id": "2222222",
			"name": "Carrots",
			"start-date": "April 4, 2018",
			"harvest-date": "July 10, 2018",
			"comments": "Plant with rosemary"
		},
		{
			"id": "3333333",
			"name": "Basil",
			"start-date": "May 29, 2018",
			"harvest-date": "July 30, 2018",
			"comments": "Good companion for tomatoes"
		},
		{
			"id": "4444444",
			"name": "Lavendar",
			"start-date": "May 5, 2018",
			"harvest-date": "August 1, 2018",
			"comments": "Hard to start from seed"
		},
		{
			"id": "5555555",
			"name": "Peas",
			"start-date": "April 4, 2018",
			"harvest-date": "July 20, 2018",
			"comments": "Likes cooler weather"
		}
	]

// AJAX request to get
// if response from AJAX is success code (200/201) - display results
// else if 400/500, disply error messaage
// should have div that's hidden with id="error"; if a response comes back with error
// this error message will display on html

$(document).ready(function() {

// on landing page, hide #login-page and #register-page; show #login-section and #detail-section

	$("#login-page").hide();
	$("#register-page").hide();
	$(".login-section").show();
	$(".detail-section").show();

	$("#login-form").click(function() {
		$("#register-page").hide();
		$(".login-section").hide();
		$(".detail-section").hide();
		$("#login-page").show();
	})


})

		