export const BrowserCookie = () => {
    var cookies = document.cookie
        .split(';')
        .map(cookie => cookie.split('='))
        .reduce((accumulator, [key, value]) => ({ ...accumulator, [key.trim()]: decodeURIComponent(value) }), {});
    let UserToken = cookies.token;
    return (
        { UserToken }
    )
}
