let MOCK_GARDEN_LIST = 
 [
		{
			"id": "1111111",
			"name": "Heirloom Tomato",
			"startDate": "April 20, 2018",
			"harvestDate": "July 20, 2018",
			"comments": "Use crushed eggshells to supplement"
		},
		{
			"id": "2222222",
			"name": "Carrots",
			"startDate": "April 4, 2018",
			"harvestDate": "July 10, 2018",
			"comments": "Plant with rosemary"
		},
		{
			"id": "3333333",
			"name": "Basil",
			"startDate": "May 29, 2018",
			"harvestDate": "July 30, 2018",
			"comments": "Good companion for tomatoes"
		},
		{
			"id": "4444444",
			"name": "Lavendar",
			"startDate": "May 5, 2018",
			"harvestDate": "August 1, 2018",
			"comments": "Hard to start from seed"
		},
		{
			"id": "5555555",
			"name": "Peas",
			"startDate": "April 4, 2018",
			"harvestDate": "July 20, 2018",
			"comments": "Likes cooler weather"
		}
	]

let gardenItemTemplate = (
	//form template for how plant info will display
	'<div id="plantSection">' +
		'<p class="plant-name"></p>' +
		'<div class="plantInfo">' +
			'<p class="start-date">Started: 05/23/17</p>' +
			'<p class="harvest-date">Ready to Harvest: 07/30/17</p>' +
			'<p class="plant-comments">Comments: Ipsum lorem dolor sit amet.</p>' +
			'<button type="submit" class="update-plant">Update</button>' +
			'<button type="submit" class="delete-plant">Delete</button>' +
		'</div>' +
	'</div>'
);

let serverBase = '//localhost:8080/';
let GARDEN_URL = serverBase + 'Garden';

function getAndDisplayGarden() {
	console.log('Getting garden info')
	$.getJSON(GARDEN_URL, function(gardens) {
		console.log('Rendering garden');
		let gardenElement = gardens.map(function(garden) {
			let element = $(gardenItemTemplate);
			element.attr('id', garden.id);
			// don't need to set attr for name
			let plantName = element.find('.plant-name');
			// plantName found; set to garden.name
			plantName.text(garden.name);
			let plantStartDate = element.find('.startDate');
			plantStartDate.text(garden.startDate)
			let plantHarvestDate = element.find('.harvestDate');
			plantHarvestDate.text(garden.harvestDate)
		});
		// return element here?
		$('.plantSection').html(gardenElement);
	});
}

// AJAX request to get
// if response from AJAX is success code (200/201) - display results
// else if 400/500, disply error messaage
// should have div that's hidden with id="error"; if a response comes back with error
// this error message will display on html

function addPlant(plant) {
	console.log('Adding plant' + plant);
	$.ajax({
		method: 'POST',
		url: GARDEN_URL,
		data: JSON.stringify(plant),
		success: function(data) {
			getAndDisplayGarden();
		},
		dataType: 'json',
		contentType: 'application/json'
	});
	// add error callback
}

function updatePlant(plant) {
	console.log('updating plant' + garden.id);
	$.ajax({
		url: GARDEN_URL + '/' + garden.id,
		method: 'PUT',
		data: garden,
		success: function(data) {
			getAndDisplayGarden;
		}
	});
	// add error callback
}

function deletePlant(plant) {
	console.log('deleting plant' + garden.id);
	$.ajax({
		url: GARDEN_URL + '/' + garden.id,
		method: 'DELETE',
		success: getAndDisplayGarden
	});
	// add error callback
}

function handlePlantAdd() {
	$('#addPlant').submit(function(e) {
		e.preventDefault()
		addPlant({
			// figure out # for .find()
			name: $(e.currentTarget).find('#').val(),
		});
	});
}

function handlePlantUpdate() {
	$('#updatePlantInfo').on('click', function(e) {
		e.preventDefault();
		updatePlant({
			// figure out # for .find()
			name: $(e.currentTarget).find('#').val(),
		});
	});
}

function handlePlantDelete() {
	$('.plantListSection').on('click', '.delete-plant', function(e) {
		e.preventDefault();
		deletePlant(
			$(e.currentTarget).closest('.plantSection').attr('id'));
	});
}




$(document).ready(function() {

// on landing page, hide #login-page and #register-page; show #login-section and #detail-section

	$("#login-page").hide();
	$("#register-page").hide();
	$(".login-section").show();
	$(".detail-section").show();

	$("#login-form").click(function() {
		alert("log-in was clicked!");
		$("#register-page").hide();
		$(".login-section").hide();
		$(".detail-section").hide();
		$("#login-page").show();
	})

	$("#register-link").click(function() {
		alert("register link was clicked!")
		$("#login-page").hide();
		$(".login-section").hide();
		$(".detail-section").hide();
		$("#register-page").show();
	}) 

	$("#register-form").click(function() {
		alert("register was clicked!");
		$("#login-page").hide();
		$(".login-section").hide();
		$(".detail-section").hide();
		$("#register-page").show();
	})

// #sign-in


// #sign-up

// on home page, hide #updatePlantSection and #addPlantSection, show plantListSection

	$("#updatePlantSection").hide();
	$("#addPlantSection").hide();
	$("#plantListSection").show();

// on update:  #update-plant

	$(".update-plant").click(function() {
		alert("update was clicked!")
		$("#addPlantSection").hide();
		$("#plantListSection").show();
		$("#updatePlantSection").show();
	})

// on add:  #add-plant
	$("#add-plant").click(function() {
		alert("add was clicked!")
		$("#updatePlantSection").hide();
		$("#plantListSection").show();
		$("#addPlantSection").show();
	})

	$(function() {
		addPlant();
		updatePlant();
		deletePlant();
		handlePlantAdd();
		handlePlantUpdate();
		handlePlantDelete();
	})

})

		// LOGIN - issue a POST request to path api-auth-login set header with key authorization and Basic encoding, to return a JWT
		// save in local storage
		// later when you want to send a request, will send request to BEARER + token