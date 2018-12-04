$(document).ready(function () {
    $('.ui.checkbox').checkbox()
    $('#login_form')
        .form({
            fields: {
                username: {
                    rules: [
                        {
                            type: 'empty',
                            prompt: 'Nick alanı boş olamaz.'
                        }
                    ]
                },
                password: {
                    rules: [
                        {
                            type: 'empty',
                            prompt: 'Parola alanı boş olamaz.'
                        }
                    ]
                }
            },
            inline : true,
            on     : 'blur',
            onSuccess: function (event) {
                event.preventDefault();
                var $form = $("#login_form");

                var id = $form.find("input[name='username']").val();
                var pw = $form.find("input[name='password']").val();
                authenticate(id,pw, function (response) {
                    $.cookie("electronToken",response, {
                        expires: 10,
                        path: '/'
                    });
                },function (response) {
                    console.log(response);
                });

                location.href = "index.html";
                return false;
            }

        });

    $('#register_form')
        .form({
            fields: {
                nickName: {
                    rules: [
                        {
                            type: 'minLength[6]',
                            prompt: 'Nick alanı minumum 6 karakter olmalıdır.'
                        }
                    ]
                },
                mail: {
                    rules: [
                        {
                            type: 'email',
                            prompt: 'Lütfen geçerli bir eposta adresi giriniz.'
                        }
                    ]
                },
                password: {
                    rules: [
                        {
                            type: 'minLength[6]',
                            prompt: 'Parola alanı boş olamaz, minumum 6 karakter olmalıdır.'
                        }
                    ]
                }
            },
            inline : true,
            on     : 'blur',
            onSuccess: function (event) {
                event.preventDefault();
                var $form = $("#register_form");

                var $loader = $form.closest(".column").find(".ui.inverted.dimmer");
                $loader.addClass("active");

                $.postRequest("user/create", $form.serializeObject(), function (data) {
                    $loader.removeClass("active");
                    message("Başarılı.","Seni sisteme ekledik. Şimdi giriş yapabilirsin.", true,"positive");
                }, function (data) {
                    $loader.removeClass("active");
                    message("Opss! Bir şeyler ters gitti.","Merak etme ne olduğunu bulmak için şimdiden başladık çalışmaya.", true, "negative");
                });

                return false;
            }
        });
});


function message(header, msg, show, clas) {
    var $msg = $(".ui.icon.message");
    $msg.find(".header").html(header);
    $msg.find(".msg").html(msg);
    $msg.addClass(clas);

    if (show) {
        $msg.show();
    }else {
        $msg.hide();
        $msg.removeClass("positive");
        $msg.removeClass("negative");
    }
}