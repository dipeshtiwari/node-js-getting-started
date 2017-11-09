//let Environment = 'DEVELOPMENT';
let Environment = 'PRODUCTION';

let BaseUrl = "http://localhost:8080/api/";

let Host;
if(Environment == 'PRODUCTION'){
    Host = true;
}else{
    Host = false;
}

export { BaseUrl, Host }