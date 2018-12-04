// var serverURL = "http://35.204.247.166:8081/electro/";
var serverURL = "http://192.168.1.20:8081/";

$.fn.serializeObject = function () {
    var obj = {};
    var arr = this.serializeArray();
    arr.forEach(function (item, index) {
        if (obj[item.name] === undefined) {
            obj[item.name] = item.value || '';
        } else {
            if (!obj[item.name].push) {
                obj[item.name] = [obj[item.name]];
            }
            obj[item.name].push(item.value || '');
        }
    });
    return obj;
};

function authenticate(username, password, fun, error) {
    var token = $.cookie('electronToken');

    $.ajax({
        type: 'POST',
        url: serverURL + "user/auth",
        data: {id: username, pw: password},
        beforeSend: function (xhr) {
            xhr.setRequestHeader ("Authorization", "Bearer " + token);
        },
        success: function (response) {
            if (fun !== undefined)
                fun(response);
        },
        error: function (response) {
            if (error !== undefined)
                error(response);
        }

    });

}

$.extend({
    getRequest: function (url, data, fun, error) {
        var token = $.cookie('electronToken');

        $.ajax({
            type: 'GET',
            url: serverURL + url,
            data: data,
            contentType: "text/plain; charset=utf-8",
            beforeSend: function (xhr) {
                xhr.setRequestHeader ("Authorization", "Bearer " + token);
            },
            success: function (data) {
                if (fun !== undefined)
                    fun(data);
            },
            error: function (data) {
                if (error !== undefined)
                    error(data);
            }
        });
    }
});

$.extend({
    getRequestJSON: function (url, data, fun, error) {
        var token = $.cookie('electronToken');

        $.ajax({
            type: 'GET',
            url: serverURL + url,
            data: data,
            contentType: "application/json",
            beforeSend: function (xhr) {
                xhr.setRequestHeader ("Authorization", "Bearer " + token);
            },
            success: function (data) {
                if (fun !== undefined)
                    fun(data);
            },
            error: function (data) {
                if (error !== undefined)
                    error(data);
            }
        });
    }
});

$.extend({
    postRequest: function (url, data, fun, error) {
        var token = $.cookie('electronToken');

        $.ajax({
            type: 'POST',
            url: serverURL + url,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(data),
            beforeSend: function (xhr) {
                xhr.setRequestHeader ("Authorization", "Bearer " + token);
            },
            success: function (data) {
                if (fun !== undefined)
                    fun(data);
            },
            error: function (data) {
                if (error !== undefined)
                    error(data);
            }
        });
    }
});
