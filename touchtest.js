function output(text){
    $("#output").html(text)
}


/*
Objective 1:
Login. Print the “AccessToken” and the “CompanyId” out.
*/
username = "admin"
password = "icannottellyou"
function login(){
    $.ajax({
        url : "https://harbulary-no-promo.herokuapp.com/login",
        method : 'POST',
        contentType : "application/json",
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