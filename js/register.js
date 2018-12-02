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
            on     : 'blur'
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
                },
                passwordAgain: {
                    rules: [
                        {
                            type: 'match[password]',
                            prompt: 'Parolalar eşleşmiyor.'
                        }
                    ]
                },
                terms: {
                    rules: [
                        {
                            type: 'checked',
                            prompt: 'Şartları kabule etmeniz gerekmektedir.'
                        }
                    ]
                }
            },
            inline : true,
            on     : 'blur'

        });
});