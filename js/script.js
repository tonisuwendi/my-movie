$("#form-search").on('submit', function(e){
	$("#movie-list").html("");
	e.preventDefault();
	$.ajax({
		url: 'http://omdbapi.com',
		type: 'get',
		dataType: 'json',
		data: {
			'apikey': 'f33ecf50',
			's': $("#search-input").val()
		},
		success: function(result){
			if(result.Response == "True"){
				let movies = result.Search

				$.each(movies, function(i, data){
					$("#movie-list").append(`
						<div class="col-md-4">
							<div class="card mb-3">
							  <img src="`+ data.Poster +`" class="card-img-top" alt="...">
							  <div class="card-body">
							    <h5 class="card-title">`+ data.Title +`</h5>
							    <h6 class="card-subtitle mb-2 text-muted">`+ data.Year +`</h6>
							    <a href="#" data-id="`+ data.imdbID +`" data-toggle="modal" data-target="#exampleModal" class="card-link see-detail">See Detail</a>
							  </div>
							</div>
						</div>
					`)
				});

				$("#search-input").val("");

			}else{
				$("#movie-list").html(`
					<div class="col">
						<h3 class="text-center text-danger">Movie not found!</h3>
					</div>
				`);
			}
		}
	})
})

$("#movie-list").on('click', '.see-detail', function(){
	
	$.ajax({
		url: 'http://omdbapi.com',
		type: 'get',
		dataType: 'json',
		data: {
			'apikey': 'f33ecf50',
			'i': $(this).data('id')
		},
		success: function(movie){
			if(movie.Response === "True"){
				$(".title-movie-modal").text(movie.Title);
				$(".modal-body").html(`
					<div class="container-fluid">
						<div class="row">
							<div class="col-md-4">
								<img src="`+ movie.Poster +`" class="img-fluid">
							</div>
							<div class="col-md-8">
								<ul class="list-group">
								  <li class="list-group-item">Released : `+ movie.Released +`</li>
								  <li class="list-group-item">Genre : `+ movie.Genre +`</li>
								  <li class="list-group-item">Director : `+ movie.Director +`</li>
								  <li class="list-group-item">Actors : `+ movie.Actors +`</li>
								</ul>
							</div>
						</div>
					</div>
				`);
			}
		}
	})

})