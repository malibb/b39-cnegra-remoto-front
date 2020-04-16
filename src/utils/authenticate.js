export default function(){
    const token = sessionStorage.getItem('blogToken');
    if(token) {
        const [,baseUri] = token.split('.');
        const base64 = baseUri.replace('-','+').replace('_','/');
        const payload = JSON.parse(window.atob(base64));
        
        return {
            isAuthenticate: true,
            payload
        };
    } else {
        return {
            isAuthenticate: false,
            payload: null
        };
    }
}