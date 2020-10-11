var itemUrl = "https://awiclass.monoame.com/api/command.php?type=get&name=itemdata"
var shoplist = {}

shoplist.name = "My Buylist"
shoplist.time = "2020/10/10"
shoplist.list = [
    {name: "吹風機",price: 300},
    {name: "麥克筆",price: 9000},
    {name: "筆記型電腦",price: 54555},
    {name: "Iphone 9",price: 32000},
    {name: "神奇海螺",price: 5000}
]

$.ajax({
    url: itemUrl,
    success: function(res){
        shoplist.list = JSON.parse(res)
        showlist()
    }
})

var itemHtml = "<li id={{id}} class='buyItem'>{{num}}. {{item}}<div class='price'>{{price}}</div><div id={{delId}} data-delid={{delItemId}} class='delBtn'>X</div></li>"
var totalHtml = "<li class='buyItem total'>總價<div class='price'>{{price}}</div></li>"

function showlist(){
    $("#itemList").html("")

    var totalPrice = 0

    for(var i=0;i<shoplist.list.length;i++){
        var item = shoplist.list[i]
        totalPrice+=parseInt(item.price)
        var currentItemHtml = itemHtml.replace("{{num}}",i+1)
                                      .replace("{{item}}",item.name)
                                      .replace("{{price}}",item.price)
                                      .replace("{{id}}","buyItem"+i)
                                      .replace("{{delItemId}}",i)
                                      .replace("{{delId}}","delBuyItem"+i)
        $("#itemList").append(currentItemHtml)
        $("#delBuyItem"+i).click(function(){
            removeItem(parseInt($(this).attr("data-delid")))
        })
    }
    var currentTotalPrice = totalHtml.replace("{{price}}",totalPrice)
    $("#itemList").append(currentTotalPrice)
}
showlist()

$(".addBtn").click(function(){
    shoplist.list.push({
        name: $("#inputName").val(),
        price: $("#inputPrice").val()
    })
    $("#inputName").val("")
    $("#inputPrice").val("")
    showlist()
})

function removeItem(id){
    shoplist.list.splice(id,1)
    showlist()
}