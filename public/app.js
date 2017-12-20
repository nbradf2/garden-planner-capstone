let serverBase = '//localhost:8080/';
let GARDEN_URL = serverBase + 'garden';
let user = localStorage.getItem('currentUser');

function getGarden() {
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
}

function showGardenResults(plantArray) {
	$('#showName').html(user);
	let buildPlantList = "";

	$.each(plantArray, function (plantArrayKey, plantArrayValue) {
		buildPlantList += `<div class="plantItem" data-id=${plantArrayValue._id}>` 
		buildPlantList += `<p class="plantName">${plantArrayValue.name}</p>`
		buildPlantList += `<div class="plantInfo" style="display:none">` 
		buildPlantList += `<p class="startDate">Started: ${plantArrayValue.startDate}</p>` 
		buildPlantList += `<p class="harvestDate">Harvest: ${plantArrayValue.harvestDate}</p>` 
		buildPlantList += `<p class="plantComments">Comments: ${plantArrayValue.comments}</p>` 
		buildPlantList += `<button type="submit" class="updatePlant homePageButtons">Update</button>`
		buildPlantList += `<button type="submit" class="deletePlant homePageButtons">Delete</button>`
		buildPlantList += `</div>` 
		buildPlantList += `</div>`
		
		$('.plantListSection').html(buildPlantList);
	});
}

function addPlant(plant) {
	console.log('Adding plant' + plant);
	let authToken = localStorage.getItem('authToken');
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
		error: function(err) {
			console.log(err);
		},
		dataType: 'json',
		contentType: 'application/json'
	});
}

function updatePlantForm(id, element) {
		let authToken = localStorage.getItem('authToken');
		$.ajax({
		method: 'GET',
		url: `${GARDEN_URL}/${id}`,
		headers: {
			Authorization: `Bearer ${authToken}`
		},
		contentType: 'application/json',
		success: function(plantData) {
			console.log(plantData);

			let updateTemplate = `
			<form id="updatePlantSection" class="row" data-id=${id}>
				<h2>Update plant record</h2>
				<label for="updatePlantName">Plant:</label>
				<input type="text" name="updatePlantName" id="updatePlantName" value=${plantData.name}>
				<label for="updateStartDate">Start Date:</label>
				<input type="text" name="updateStartDate" id="updateStartDate" value=${plantData.startDate}>
				<label for="updateHarvestDate">Harvest Date:</label>
				<input type="text" name="updateHarvestDate" value=${plantData.harvestDate}>
				<label for="updateComments">Comments:</label>
				<input type="text" name="updateComments" id="updateComments" value=${plantData.comments}>
				<button type="submit" id="updatePlantInfo" class="homePageButtons">Update it!</button>
			</form>`
			$(element).find(".plantInfo").hide();
			$(element).after(updateTemplate);
		}
	});
}

function updatePlant(id, plant) {
	console.log(`Updating plant ${id}`);
	let authToken = localStorage.getItem('authToken');
	$.ajax({
		url: GARDEN_URL + '/' + id,
		headers: {
			Authorization: `Bearer ${authToken}`
		},
		method: 'PUT',
		dateType: 'json',
		contentType: 'application/json',
		data: JSON.stringify(plant),
		success: function(data) {
			getGarden(data);
		},
		error: function(err) {
			console.log(err);
		}
	});
}

function deletePlant(id) {
	console.log(`Deleting plant ${id}`);
	let authToken = localStorage.getItem('authToken');
	$.ajax({
		url: GARDEN_URL + '/' + id,
		headers: {
			Authorization: `Bearer ${authToken}`
		},
		method: 'DELETE',
		success: function(data) {
			getGarden(data);
		},
		error: function(err) {
			console.log(err);
		}
	});
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
    $("#addPlantSection input[type='text']").val('');
    $("#updatePlantSection").hide();
	$("#addPlantSection").hide();
	$("#plantListSection").show();
  });
}

function handlePlantUpdate() {
	$('#updatePlantInfo').on('click', function(e) {
		console.log('you updated your plant!');
		e.preventDefault();
		updatePlant({
			user: user,
			name: $(e.currentTarget).find('#updatePlantName').val(),
			startDate: $(e.currentTarget).find('#updateStartDate').val(),
			harvestDate: $(e.currentTarget).find('#updateHarvestDate').val(),
			comments: $(e.currentTarget).find('#updateComments').val(),
		});
		$("#updatePlantSection").hide();
		$("#addPlantSection").hide();
		$("#plantListSection").show();
	});
}

function handlePlantDelete() {
	$('.plantListSection').on('click', '.deletePlant', function(e) {
		e.preventDefault();
		deletePlant(
			$(e.currentTarget).closest('.plantItem').attr('data-id'));
	});
}

$(document).ready(function() {

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

	$("#loginForm").submit(function(e) {
		e.preventDefault();
		let username = $("#GET-username").val();
		let password = $("#GET-password").val();
		let userInfo = {username, password};
		let settings = {
			url:"/auth/login",
			type: 'POST',
			contentType: 'application/json',
			data: JSON.stringify(userInfo),
			success: function(data) {
				console.log('successfully logged in');
				localStorage.setItem("authToken", data.authToken);
				localStorage.setItem("currentUser", username);
				user = username;
				$("#login-page").hide();
				$("#register-page").hide();
				$(".login-section").hide();
				$(".detail-section").hide();
				$(".home").show();
				$(".logout").show();
				$("#plantListSection").show();
				console.log(data);
				getGarden(data);
			},
			error: function(err) {
				console.log(err);
				// TO DO:
				// if username not found
				// if username and password don't match
				// instead can write separate function 'handleError(err)'
			}
		};
		$.ajax(settings);
	}) 

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
				console.log('successfully registered');
				$("#registerForm input[type='text']").val('');
				$("#register-page").hide();
				$(".login-section").hide();
				$(".detail-section").hide();
				$("#login-page").show();
			},
			error: function(err) {
				console.log(err);
				if (password.length < 10) {
					$("#errorTenChar").html("Password must be at least 10 characters")
				}
				//TO DO: not fully functional
				if (password.length !== retypePass.length) {
					$("#errorMatchPass").html("Passwords must match")
				}
				if (password !== retypePass) {
					$("#errorMatchPass").html("Passwords must match")
				}
			}
		};
		$.ajax(settings);
	})

	$("#updatePlantSection").hide();
	$("#addPlantSection").hide();
	$("#plantListSection").show();

	$("body").on("click", ".plantName", function() {
		console.log("you clicked the plant name");
		event.preventDefault();
		// $(this).slideToggle(300).siblings(".plantName");
		$(this).parent().find(".plantInfo").slideToggle(300);
	});

	$("body").on("click", ".updatePlant", function() {
		console.log('you clicked update!!');
		let plant = $(this).parent().parent();
		let id = $(this).parent().parent().attr("data-id");
		console.log(id);
		updatePlantForm(id, plant);
	})

	$("body").on("submit", "#updatePlantSection", function(e) {
		e.preventDefault();
		let id = $(this).attr("data-id")
		console.log(`you submitted updatePlantSection for ${id}`);
		let updatedPlant = {
			id: id,
			name: $('#updatePlantName').val(),
			startDate: $('#updateStartDate').val(),
			harvestDate: $('#updateHarvestDate').val(),
			comments: $('#updateComments').val(),
		}
		updatePlant(id, updatedPlant);
		console.log("plant updated")
	})

	$("#cancel-add-plant").click(function() {
		$("#addPlantSection input[type='text']").val('');
		$("#addPlantSection").hide();
		$("#cancel-add-plant").hide();
	})

	$("#add-plant").click(function() {
		$("#updatePlantSection").hide();
		$("#cancel-add-plant").show();
		$("#plantListSection").show();
		$("#addPlantSection").show();
	})

	$(".logout").click(function() {
		console.log('you clicked logout!');
		localStorage.clear();
		user = null;
		window.location.reload(true);
	});

	$(function() {
		handlePlantAdd();
		handlePlantUpdate();
		handlePlantDelete();
	});
})