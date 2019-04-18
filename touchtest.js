base = "https://harbulary-no-promo.herokuapp.com"
username = "admin"
password = "icannottellyou"
token = ""

function output(text){
    $("#output").html(text)
}

function checkToken(){
    if(token == ""){
        output("We are missing a token, maybe try logging in first")
        return false
    } else {
        return true
    }
}

/*
Objective 1:
Login. Print the “AccessToken” and the “CompanyId” out.
*/
function login(){
    /*
    mimic curl
    curl -X POST 
    -H 'Content-Type: application/json' 
    -d '{"username":"admin","password":"icannottellyou"}' 
    -v -i'https://harbulary-no-promo.herokuapp.com/login'
    */
    
    $.ajax({
        url : (base + "/login"),
        method : 'POST',
        headers : {"Content-Type":"application/json"} ,
        data : {'UserName':username,'Password':password},
        success : function(data,status,_){
            console.long(status)
            console.log(data)
        }
    })
}

/*
Objective 2:
Get the company details based on the CompanyId from Objective 1. Print out the “website” of the company.
*/
/*
Objective 3:
Get the company images based on the CompanyId from Objective 1. Print out the “PublicUrl” of the image with the id of 5.
*/
/*
Objective 4:
Upload a “public” .jpg image. Print out the id of the newly created image.
*/
/*
Objective 5:
Delete the newly uploaded image.
*/