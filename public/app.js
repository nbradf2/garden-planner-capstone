let serverBase = '//localhost:8080/';
let GARDEN_URL = serverBase + 'garden';
let user = localStorage.getItem('currentUser');
let authToken = localStorage.getItem('authToken');

function getGarden(userGardenArray) {
	console.log('Getting garden info')
	let authToken = localStorage.getItem('authToken');
	$.ajax({
		method: 'GET',
		url: `${GARDEN_URL}/user/${user}`,
		headers: {
			Authorization: `Bearer ${authToken}`
		},
		contentType: 'application/json',
		success: function(userData) {
			console.log(userData);
			showGardenResults(userData);
		}
	});

function showGardenResults(plantArray) {

	$('#showName').html(user);
	let buildPlantList = "";

	$.each(plantArray, function (plantArrayKey, plantArrayValue) {
		buildPlantList += `<div class="plantItem">` 
		buildPlantList += `<p class="plantName">${plantArrayValue.name}</p>`
		buildPlantList += `<div class="plantInfo">` 
		buildPlantList += `<p class="startDate">${plantArrayValue.startDate}</p>` 
		buildPlantList += `<p class="harvestDate">${plantArrayValue.harvestDate}</p>` 
		buildPlantList += `<p class="plantComments">${plantArrayValue.comments}</p>` 
		buildPlantList += `</div>` 
		buildPlantList += `</div>`
		buildPlantList += `<button type="submit" class="updatePlant">Update</button>`
		buildPlantList += `<button type="submit" class="deletePlant">Delete</button>`

		$('.plantListSection').html(buildPlantList);
	});
}

function addPlant(plant) {
	console.log('Adding plant' + plant);
	// took out authToken variable from here
	$.ajax({
		method: 'POST',
		url: GARDEN_URL,
		headers: {
			Authorization: `Bearer ${authToken}`
		},
		data: JSON.stringify(plant),
		success: function(data) {
			getGarden(data);
		},
		dataType: 'json',
		contentType: 'application/json'
	});
	// add error callback
}

function updatePlant(plant) {
	console.log('updating plant' + garden.id);
	let authToken = localStorage.getItem('authToken');
	$.ajax({
		url: GARDEN_URL + '/' + garden.id,
		headers: {
			Authorization: `Bearer ${authToken}`
		},
		method: 'PUT',
		data: garden,
		success: function(data) {
			getGarden();
		}
	});
	// add error callback
}

function deletePlant(plant) {
	console.log(`Deleting plant ${id}`);
	let authToken = localStorage.getItem('authToken');
	$.ajax({
		url: GARDEN_URL + '/' + garden.id,
		headers: {
			Authorization: `Bearer ${authToken}`
		},
		method: 'DELETE',
		success: getGarden()
	});
	// add error callback
}

function handlePlantAdd() {
  $('#addPlantSection').submit(function(e) {
    e.preventDefault();
    addPlant({
    	user: user,
    	name: $(e.currentTarget).find('#addPlantName').val(),
    	startDate: $(e.currentTarget).find('#addStartDate').val(),
    	harvestDate: $(e.currentTarget).find('#addHarvestDate').val(),
    	comments: $(e.currentTarget).find('#addComments').val()
    });
    // hide add plant form - do I need to put all of these in?
    $("#updatePlantSection").hide();
	$("#addPlantSection").hide();
	$("#plantListSection").show();
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
	$('.plantListSection').on('click', '.deletePlant', function(e) {
		console.log('you clicked delete');
		e.preventDefault();
		deletePlant(
			$(e.currentTarget).closest('.plantItem').attr('id'));
	});
}



$(document).ready(function() {

// on landing page, hide #login-page and #register-page; show #login-section and #detail-section

	$("#login-page").hide();
	$("#register-page").hide();
	$(".login-section").show();
	$(".detail-section").show();

	$("#login-button").click(function() {
		$("#register-page").hide();
		$(".login-section").hide();
		$(".detail-section").hide();
		$("#login-page").show();
	})

	$("#register-link").click(function() {
		$("#login-page").hide();
		$(".login-section").hide();
		$(".detail-section").hide();
		$("#register-page").show();
	}) 

	$("#register-button").click(function() {
		$("#login-page").hide();
		$(".login-section").hide();
		$(".detail-section").hide();
		$("#register-page").show();
	})

// LOG-IN

	$("#loginForm").submit(function(e) {
		e.preventDefault();
		let username = $("#GET-username").val();
		let password = $("#GET-password").val();
		let user = {username, password};
		let settings = {
			url:"/auth/login",
			type: 'POST',
			contentType: 'application/json',
			data: JSON.stringify(user),
			success: function(data) {
				console.log('successfully logged in');
				localStorage.setItem("authToken", data.authToken);
				localStorage.setItem("currentUser", username);
				window.location = "home.html";
				console.log(data);
				// ADDED 12.15.17 - what is the parameter?
				getGarden(data);
			},
			error: function(err) {
				console.log(err);
				// instead can write separate function 'handleError(err)'
			}
		};
		$.ajax(settings);
	}) 

// SIGN UP

	$("#registerForm").submit(function(e) {
		e.preventDefault();
		let username = $("#POST-username").val();
		console.log('client-side username is:', username);
		let password = $("#POST-password").val();
		let retypePass = $("#retype-password").val();
		let user = {username, password};
		let settings = {
			url:"/users/",
			type: 'POST',
			// application/json - make sure is forward slash
			contentType: 'application/json',
			data: JSON.stringify(user),
			success: function(data) {
				console.log('successfully registered')
				$("#register-page").hide();
				$(".login-section").hide();
				$(".detail-section").hide();
				$("#login-page").show();
			},
			error: function(err) {
				console.log(err);
			}
		};
		$.ajax(settings);
	})


// on home page, hide #updatePlantSection and #addPlantSection, show plantListSection

	$("#updatePlantSection").hide();
	$("#addPlantSection").hide();
	$("#plantListSection").show();

// on update:  #update-plant

	$(".update-plant").click(function() {
		$("#addPlantSection").hide();
		$("#plantListSection").show();
		$("#updatePlantSection").show();
	})

// on add:  #add-plant
	$("#add-plant").click(function() {
		$("#updatePlantSection").hide();
		$("#plantListSection").show();
		$("#addPlantSection").show();
	})

	// additional property in record:  user = localStorage.getItem...

	// api call 

	$(function() {

		// will move to another spot where needed
		// addPlant();
		// updatePlant();
		// deletePlant();
		handlePlantAdd();
		handlePlantUpdate();
		handlePlantDelete();
	})

})

	