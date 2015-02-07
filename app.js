var itemTemplate = $ ('#templates .item')
var list = $ ('#list')
var addItemToPage = function (itemData) {
	var item = itemTemplate.clone()
	item.attr ('data-id',itemData.id)
	item.find('.description').text(itemData.description)
	if (itemData.completed) {
		item.addClass ('completed')
	}
	list.append(item)
}
	item = { description: 'a new item', id: 9000, completed: false}
	addItemToPage (item)
	var loadRequest = $.ajax({
  type: 'GET',
  url: "https://listalous.herokuapp.com/lists/thisisareallist/"
})
loadRequest.done(function(dataFromServer) {
  var itemsData = dataFromServer.items

  itemsData.forEach(function(itemData) {
    addItemToPage(itemData)
  })
})
$('#add-form').on('submit', function(event) {
	// capture the todo item name
  itemDescription = event.target.itemDescription.value
  	// prevents the page from refreshing
    event.preventDefault();
    //this creates a new to do item on the server
    var creationRequest = $.ajax({
  		type: 'POST',
  		url: "http://listalous.herokuapp.com/lists/thisisareallist/items",
  		data: { description: itemDescription, completed: false }
	})
	// displays the new todo item on the page
	creationRequest.done(function(itemDataFromServer) {
  		addItemToPage(itemDataFromServer)
})
})
// when user clicks on button invoke this function
$('#list').on('click', '.complete-button', function(event) {
  var item = $(event.target).parent()
  isItemCompleted = item.hasClass('completed')
  var itemId = item.attr('data-id')

  var updateRequest = $.ajax({
    type: 'PUT',
    url: "https://listalous.herokuapp.com/lists/YOUR-LIST-NAME-HERE/items/" + itemId,
    data: { completed: !isItemCompleted }
  })

  updateRequest.done(function(itemData) {
    if (itemData.completed) {
      item.addClass('completed')
    } else {
      item.removeClass('completed')
    }
  })
})






