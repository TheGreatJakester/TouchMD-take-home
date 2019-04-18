base = "https://harbulary-no-promo.herokuapp.com"
username = "admin"
password = "icannottellyou"
token = ""
companyID = ""
fileId = ""

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
    $.ajax({
        url : (base + "/login"),
        method : 'POST',
        headers : {"Content-Type":"application/json"} ,
        data : JSON.stringify({'UserName':username,'Password':password}),
        success : function(data,status,_){
            token = data.AccessToken
            companyID = data.CompanyId
            output(JSON.stringify(data))
        },
        error : function(data,status,_){
            output("something isn't right...")
        }
    })
}

/*
Objective 2:
Get the company details based on the CompanyId from Objective 1. Print out the “website” of the company.
*/
function showWebsite(){
    if(!checkToken()){
        return
    }
    $.ajax({
        url : `${base}/companies/${companyID}`,
        method : 'GET',
        headers : {
            "Authorization": `Bearer ${token}`,
            "Content-Type":"application/json"
        },
        success : function(data,status,_){
            output(`<a href="${data.website}">${data.website}</a>`)
        }
    })
}
/*
    data structure for /companies/:companyID
    {
        name:str,
        username:str,
        company{
            bs:str,catchPhrase:str,name:str
        },
        address:str,
        avitar:imgURL,
        email:EmailAddress,
        phone:str,
        username:str,
        website:URL
    }
*/

/*
Objective 3:
Get the company images based on the CompanyId from Objective 1. Print out the “PublicUrl” of the image with the id of 5.
*/
function getImage(){
    if(!checkToken()){
        return
    }
    $.ajax({
        url : `${base}/companies/${companyID}/images`,
        method : 'GET',
        headers : {
            "Authorization": "Bearer "+token,
            "Content-Type":"application/json"
        },
        success : function(data,status,_){
            var imageUrl = data.find(imgEntry => imgEntry.Id == 5).PublicUrl
            output(`<img src="${imageUrl}"><p>${imageUrl}</p>`)
            //this would work too, but what if IDs didn't match indexes?
            //output(`<img src="${data[5].PublicUrl}">`)
        }
    })
}
/*
Objective 4:
Upload a “public” .jpg image. Print out the id of the newly created image.
*/

function upload(e){
    if(!checkToken()){
        return
    }
    var uploadData = new FormData();
    uploadData.append("file",e.target.files[0],e.target.files[0].name)
    if(fileId != ""){
        output(`Looks like you have already uploaded a file with Id ${fileId}, maybe delete it first.`)
        return
    }
    $.ajax({
        url : `${base}/public`,
        method : 'POST',
        headers : {
            "Authorization": "Bearer "+token,
        },
        data : uploadData,
        processData : false,
        success : function(data,status){
            console.log(data)
            output(data.Id)
            fileId = data.Id
        }
    })
}

/*
Objective 5:
Delete the newly uploaded image.
*/

function deleteImage(){
    if(!checkToken()){
        return
    }
    if(fileId == ""){
        output(`Nothing to delete`)
        return
    }
    $.ajax({
        url : `${base}/public/${fileId}`,
        method : 'DELETE',
        headers : {
            "Authorization": "Bearer "+token,
        },
        success : function(data,status){
            output(`file with Id ${fileId} was deleted`)
            fileId = ""
        }
    })

}