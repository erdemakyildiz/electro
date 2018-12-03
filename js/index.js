$(document).ready(function () {
    $('.progress').progress({
        percent: 22
    });

    $.getRequest("streak/streaks","", function (data) {
        for (var i = data.data.length-1; i >= 0; i--){
            var item = data.data[i];
            var $streak = $("#base_post").clone();

            $streak.removeAttr("id");

            $streak.find(".card_information .header").html(item.nickName);
            $streak.find(".card_title").html(item.title);
            $streak.find(".card_content").html(item.content);
            $streak.find(".card_publish_date").html(item.createDate);
            $streak.find(".like_count").html(item.likeCount);
            $streak.find(".disslike_count").html(item.dissLikeCount);

            $streak.insertAfter("#streak_starter");
            $streak.fadeIn();
        }

    }, function (data) {
        console.log(data);
    });

    $.getRequest("streak/categories","", function (data) {
        var cat = "";
        for (var i = data.data.length-1; i >= 0; i--){
            cat += "<a class=\"item\">#" + data.data[i] + "</a>";
        }

        $(".categories").html(cat);

    }, function (data) {
        console.log(data);
    });
});
