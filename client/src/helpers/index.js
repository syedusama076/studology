export const CookieFunction = (response) => {
    var Cookies = document.cookie
        .split(';')
        .map(cookie => cookie.split('='))
        .reduce((accumulator, [key, value]) => ({ ...accumulator, [key.trim()]: decodeURIComponent(value) }), {});
    document.cookie = "token=" + response.data.token;
    return (
        { Cookies }
    )
}
