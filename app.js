document.addEventListener('DOMContentLoaded',function () {
   
    
    var button = $('#button1');

    button.on('click',function (event) {

        var toSend = false;

        $.ajax({
            url:'http://localhost:8888/Bookshelf/newPost.php',
            method:"DELETE",
            dataType:'text',
            data: "to send"+toSend
        }).done(function (data) {
            console.log('Done');
            console.log(data);
            /*var div = $("<div>");
            div.text('Nowy post o id' + data.id + " o tekscie: " + data.text);
            $('body').append(div);*/
        }).fail(function (xhr, code, error) {
            console.log("fail");
            console.log(error);
        }).always(function () {
            console.log('always');
        })
    });
});
