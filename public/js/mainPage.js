$(document).ready(function () {
    //将电话加入剪切板
    $("#phoneLink").click(async function (event) {
        event.preventDefault();
        await navigator.clipboard.writeText("+1 (201) 123-1234");
        alert("Our phone number \"+1 (201) 123-1234\" has been added to your clipboard!");
        return false;
    });

    // //将邮箱加入剪切板
    // $("#emailLink").click(async function (event) {
    //     event.preventDefault();
    //     await navigator.clipboard.writeText("admin@gmail.com");
    //     alert("Our email address \"admin@gmail.com\" has been added to your clipboard!");
    //     return false;
    // });

    $("#instagramLink").click(async function (event) {
        event.preventDefault();
        const url = window.location.href;
        await navigator.clipboard.writeText(url);
        alert("Our website \"" + url + "\" has been added to your clipboard!");
        window.open("https://www.instagram.com/");
        return false;
    });

    $("#searchInput").on("keydown", function (event) {
        if (event.which == 13 || event.keyCode == 13) {
            event.preventDefault();
            const searchContent = document.getElementById("searchInput").value;
            window.location.href = "/perfume/search/" + searchContent;
            return false;
        }
        return true;
    });

    $("#cart").click(function (event) {
        event.preventDefault();
        window.open($("#amazonLink")[0].href);
        return false;
    });

    let link = window.location.href.replace("http://localhost:3000/", "");
    if (link != "") {
        link.replace("/", "+");
        link = "search?q=" + link;
    }
    $("#facebookLink").prop("href", "http://www.facebook.com/share.php?u=https://www.google.com/" + link);
    $("#fbshareLink").prop("href", "http://www.facebook.com/share.php?u=https://www.google.com/" + link);
    $("#twitterLink", "#twshareLink").prop("href", "https://twitter.com/share?url=" + encodeURIComponent(window.location.href) + "&text=" + document.title, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');

});
