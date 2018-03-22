
$('#scraper').on('click', () => {
  $.ajax({
    method: 'GET',
    url: '/scrape'
  }).then(data => {
      location.assign('/')
    }
  )
})

$('.save-btn').on('click', function() {

	const title = $(this).attr('data-title')
	const link = $(this).attr('data-link')

	$.ajax({
		method: 'POST',
		url: '/articles',
		data: { title: title, link: link }
	}).then(data => {
		console.log(data)
	}) 
})

$('#savedArticles').on('click', () => {
	$.ajax({
		method: 'GET',
		url: '/articles'
	}).then(data => {
		console.log(data)
    location.assign('/articles')
	})
})

$(document).on('click', '.delete-btn', function() {

	const id = $(this).attr('data-id')

	console.log(`id: ${id}`)

	$.ajax({
		method: 'DELETE',
		url: '/articles',
		data: { id: id }
	}).then(data => {
		location.reload()
		console.log('Article deleted from the collection!')
	}) 
})

let articleId = null

$(document).on('click', '.add-note', function() {
	articleId = $(this).attr('data-id')
	console.log(`articleId: ${articleId}`)
	$.ajax({
		method: 'POST',
		url: '/articles',
		data: { id: articleId }
	}).then(data => {
		console.log('Notes are populated')
	})
})


$('.save-note').on('click', () => {
	const title = $('#note-title').val().trim()
	const body = $('#note-body').val().trim()

	$.ajax({
		method: 'POST',
		url: '/notes',
		data: { id: articleId, title: title, body: body }
	}).then(data => {
		console.log('Article saved in the collection!')
	}) 

	$('#note-title').val('')
	$('#note-body').val('')	
})

