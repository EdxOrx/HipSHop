$(document).ready(function(){
  let queryString = window.location.search;
  let params = new URLSearchParams(queryString);
  if(params.get("branch")){
    console.log(typeof params.get("branch"));
    let request = $.ajax({
      url: "http://localhost:8080/product/branch?branch="+ params.get("branch"),
      method: "GET"
    });
    
    request.done(function( data ) {
      console.log(data);
      for (let index = 0; index < data.length; index++) {
        let type = data[index]["product"]["type"];
        let html = "";
        if(type === "Album"){
          html = 'item-song.html';
        }else{
          html = 'item.html';
        }
        $("#container-items").append(
          '<div class="col-lg-4 col-md-6">'+
            '<div class="single-product">'+
              '<a href="'+html+'" class="title-article">'+
                '<img class="img-fluid" src=" '+ data[index]["product"]["image"] +'>'+
              '</a>'+
              '<div class="product-details">'+
                  '<a href="'+html+'" class="title-article">'+data[index]["product"]["productName"]+'</a>'+
                '<div class="price">'+
                  '<h6 class="price-left" style="color: #ce0000;">$'+data[index]["product"]["price"]+'</h6>'+
                '</div>'+
              '</div>'+
            '</div>'+
          '</div>'
        );
      }
    });
    request.fail(function( jqXHR, textStatus ) {
      alert( "Request failed: " + textStatus );
    });
  }
});