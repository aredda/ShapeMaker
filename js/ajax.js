function request(url, data, success)
{
    var r = new XMLHttpRequest();
    r.onreadystatechange = function () {
        if (this.status == 200 && this.readyState == 4)
            success(this.responseText);
    };
    r.open("POST", url);
    r.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    r.send(data);
}