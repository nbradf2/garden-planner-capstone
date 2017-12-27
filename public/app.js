let GARDEN_URL = 'garden';
let JOURNAL_URL = 'journal';
let user = localStorage.getItem('currentUser');
let date = new Date();

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

function getJournal() {
	console.log('Getting journal info')
	let authToken = localStorage.getItem('authToken');
	$.ajax({
		method: 'GET',
		url: `${JOURNAL_URL}/user/${user}`,
		headers: {
			Authorization: `Bearer ${authToken}`
		},
		contentType: 'application/json',
		success: function(userData) {
			console.log(userData);
			showJournalResults(userData);
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

function showJournalResults(journalArray) {
	let buildJournal = "";

	$.each(journalArray, function(journalArrayKey, journalArrayValue) {
		buildJournal += `<div class="journalItem" data-id=${journalArrayValue._id}>`
		buildJournal += `<p class="journalDateAndTime">${journalArrayValue.publishDate}</p>`
		buildJournal += `<div class="journalInfo" style="display:none">`
		buildJournal += `<p class="journalContent">${journalArrayValue.content}</p>`
		buildJournal += `<button type="submit" class="updateJournal homePageButtons">Update</button>`
		buildJournal += `<button type="submit" class="deleteJournal homePageButtons">Delete</button>`
		buildJournal += `</div>`
		buildJournal += `</div>`
	
		$('.journalSection').html(buildJournal);
	})
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

function addJournalEntry(journalPosts) {
	console.log('Adding journal post' + journalPosts);
	let authToken = localStorage.getItem('authToken');
	$.ajax({
		method: 'POST',
		url: JOURNAL_URL,
		headers: {
			Authorization: `Bearer ${authToken}` 
		},
		data: JSON.stringify(journalPosts),
		success: function(data) {
			console.log(data);
			getJournal(data);
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
				<form class="row updatePlantSection" data-id=${id}>
					<h2>Update plant record</h2><br>
					<label for="updatePlantName">Plant:</label>
					<input type="text" name="updatePlantName" class="updatePlantName" value=${plantData.name}>
					<label for="updateStartDate">Start Date:</label>
					<input type="text" name="updateStartDate" class="updateStartDate" value=${plantData.startDate}>
					<label for="updateHarvestDate">Harvest Date:</label>
					<input type="text" name="updateHarvestDate" class="updateHarvestDate" value=${plantData.harvestDate}>
					<label for="updateComments">Comments:</label>
					<input type="text" name="updateComments" class="updateComments" value=${plantData.comments}>
					<button type="submit" id="updatePlantInfo" class="homePageButtons">Update it!</button>
				</form>`
			$(element).find(".plantInfo").hide();
			$(element).after(updateTemplate);
		}
	});
}

function updateJournalForm(id, element) {
	let authToken = localStorage.getItem('authToken');
	$.ajax({
		method: 'GET',
		url: `${JOURNAL_URL}/${id}`,
		headers: {
			Authorization: `Bearer ${authToken}`
		},
		contentType: 'application/json',
		success: function(journalData) {
			console.log(journalData);

			let updateJournalTemplate = `
				<form class="row updateJournalSection" data-id=${id}>
					<label for="newJournalEntry">What's new today?</label>
					<input type="text" name="updateJournalEntry" class="updateJournalEntry" placeholder="Write something!" required value=${journalData.content}>
					<button type="submit" id="updateJournalInfo" class="homePageButtons">Update it!</button>
				</form>`
			$(element).find(".journalInfo").hide();
			$(element).after(updateJournalTemplate);
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

function updateJournal(id, journalPosts) {
	console.log(`Updating journal entry ${id}`);
	let authToken = localStorage.getItem('authToken');
	$.ajax({
		url: JOURNAL_URL + '/' + id,
		headers: {
			Authorization: `Bearer ${authToken}`
		},
		method: 'PUT',
		dataType: 'json',
		contentType: 'application/json',
		data: JSON.stringify(journalPosts),
		success: function(data) {
			getJournal(data);
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

function deleteJournalEntry(id) {
	console.log(`Deleting journal entry ${id}`);
	let authToken = localStorage.getItem('authToken');
	$.ajax({
		url: JOURNAL_URL + '/' + id,
		headers: {
			Authorization: `Bearer ${authToken}`
		},
		method: 'DELETE',
		success: function(data) {
			getJournal(data);
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
	    $(".updatePlantSection").hide();
		$("#addPlantSection").hide();
		$("#cancel-add-plant").hide();
		$(".plantListSection").show();
  });
}

function handleJournalAdd() {
	$("#addJournalSection").submit(function(e) {
		e.preventDefault();
		addJournalEntry({
			user: user,
			content: $(e.currentTarget).find('#newJournalEntry').val(),
			publishDate: date.toDateString()
		});
		$("#addJournalSection input[type='text']").val('');
		$("#addJournalSection").hide();
		$(".updateJournalSection").hide();
		$("#cancel-journal-entry").hide();
		$(".journalSection").show();
	})
}

function handlePlantUpdate() {
	$('#updatePlantInfo').on('click', function(e) {
		console.log('you updated your plant!');
		e.preventDefault();
		updatePlant({
			user: user,
			name: $(e.currentTarget).find('.updatePlantName').val(),
			startDate: $(e.currentTarget).find('.updateStartDate').val(),
			harvestDate: $(e.currentTarget).find('.updateHarvestDate').val(),
			comments: $(e.currentTarget).find('.updateComments').val(),
		});
		$(".updatePlantSection").hide();
		$("#addPlantSection").hide();
		$("#plantListSection").show();
	});
}

function handleJournalUpdate() {
	$("#updateJournal").on('click', function(e) {
		alert('you updated your journal!');
		e.preventDefault();
		updateJournal({
			user: user,
			content: $(e.currentTarget).find('.updateJournalEntry').val(),
			publishDate: date.toDateString()
		});
		$("updateJournalForm").hide();
		$("addJournalSection").hide();
		$("journalSection").show();
	})
}

function handlePlantDelete() {
	$('.plantListSection').on('click', '.deletePlant', function(e) {
		e.preventDefault();
		deletePlant(
			$(e.currentTarget).closest('.plantItem').attr('data-id'));
	});
}

function handleJournalDelete() {
	$(".journalSection").on('click', '.deleteJournal', function(e) {
		e.preventDefault();
		deleteJournalEntry(
			$(e.currentTarget).closest('.journalItem').attr('data-id'));
	})
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
				$(".gardenDetails").show();
				console.log(data);
				getGarden(data);
				getJournal(data);
			},
			error: function(err) {
				console.log(err);
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

	$(".updatePlantSection").hide();
	$("#addPlantSection").hide();
	$(".plantListSection").show();

	$("body").on("click", ".plantName", function() {
		console.log("you clicked the plant name");
		event.preventDefault();
		$(this).parent().find(".plantInfo").slideToggle(300);
	});

	$("body").on("click", ".journalDateAndTime", function() {
		console.log("you clicked the date and time");
		event.preventDefault();
		$(this).parent().find(".journalInfo").slideToggle(300);
	})

	$("body").on("click", ".updatePlant", function() {
		console.log('you clicked update!!');
		let plant = $(this).parent().parent();
		let id = $(this).parent().parent().attr("data-id");
		console.log(id);
		updatePlantForm(id, plant);
	})

	$("body").on("click", ".updateJournal", function() {
		console.log('you clicked update journal!')
		let journalEntry = $(this).parent().parent();
		console.log(journalEntry);
		let id = $(this).parent().parent().attr("data-id");
		console.log(id);
		updateJournalForm(id, journalEntry);
	})

	$("body").on("submit", ".updatePlantSection", function(e) {
		e.preventDefault();
		let id = $(this).attr("data-id")
		console.log(`you submitted updatePlantSection for ${id}`);
		let updatedPlant = {
			id: id,
			name: $('.updatePlantName').val(),
			startDate: $('.updateStartDate').val(),
			harvestDate: $('.updateHarvestDate').val(),
			comments: $('.updateComments').val(),
		}
		updatePlant(id, updatedPlant);
		console.log("plant updated")
	})

	$("body").on("submit", ".updateJournalSection", function(e) {
		e.preventDefault();
		let id = $(this).attr("data-id")
		console.log(`you submitted updateJournalSection for ${id}`);
		let updatedJournal = {
			id: id,
			content: $('.updateJournalEntry').val(),
			publishDate: date.toDateString()
		}
		updateJournal(id, updatedJournal);
		console.log("journal updated")
	})

	$("#cancel-add-plant").click(function() {
		$("#addPlantSection input[type='text']").val('');
		$("#addPlantSection").hide();
		$("#cancel-add-plant").hide();
	})

	$("#add-plant").click(function() {
		$(".updatePlantSection").hide();
		$("#cancel-add-plant").show();
		$("#plantListSection").show();
		$("#addPlantSection").show();
	})

	$("#cancel-journal-entry").click(function() {
		$("#addJournalSection input[type='text']").val('');
		$("#addJournalSection").hide();
		$("#cancel-journal-entry").hide();
	})

	$("#add-journal-entry").click(function() {
		$("#cancel-journal-entry").show();
		$("#addJournalSection").show();
	})

	$(".logout").click(function() {
		console.log('you clicked logout!');
		localStorage.clear();
		user = null;
		window.location.reload(true);
	});

	$(function() {
		handlePlantAdd();
		handleJournalAdd();
		handlePlantUpdate();
		handleJournalUpdate();
		handlePlantDelete();
		handleJournalDelete();
	});
})