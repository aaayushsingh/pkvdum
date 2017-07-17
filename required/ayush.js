

function hidePrintShowUpload(){
	$("#upld").attr("class","active");
	$("#prnt").attr("class","");
	$('#trm1').prop("disabled","false");
	$("#trimmer").hide();
	$("#email").hide();
	$("#show_em").hide();
	$("#go_em").hide();
	$('#loader').hide();
	$("#pname").show();
	$("#pemail").show();
	$("#file-input").show();
	$("#trm").show();
	$("#trm").removeAttr("disabled");
	//alert("print hidden");
}
function hideUploadShowPrint(){
	$("#upld").attr("class","");
	$('#loader').hide();
	$("#prnt").attr("class","active");
	$("#pname").hide();
	$("#pemail").hide();
	$("#file-input").hide();
	$("#trm").hide();
	$("#dumber").hide();
	$("#app_pic").hide();
	$("#info").hide();
	$("#trimmer").show();
	$("#email").show();
	onLoad();
	//alert("upload hidden");
}
function fcheck(cl){
	//if(cl.indexOf("?=")){
	hideUploadShowPrint();//return true;}
	//else{ hidePrintShowUpload();return false;}
}

function onLoad(){

	try{
	var cl = window.location.toString().split("#");
	var re = cl[0].split("?=");
	$("#email").attr("value",re[1]);
	} catch (e){
			alert (e);
	}

	fcheck(cl);
}

function check(){alert("success!")}


function exec()
{
  var token=document.getElementById('email').value;
  if (1000<token&&token<=9999&&token.match(/^[0-9]+$/) != null){
    $("#loader").show();
    $("#show_em").hide();
    $("#go_em").hide();
    console.log(token);
    //sendMessage(token);
    //the function to send request is called in here
    hitit(token,peas);
  } else return alert('Enter 4 digit NUMERIC token!');
}


function hitit(data,callback)
{
var xhr = new XMLHttpRequest();
xhr.open('POST', `/sendprint`);
xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
xhr.send("token="+data);
xhr.onreadystatechange = () => {
  if(xhr.readyState === 4){
      if(xhr.status === 200){
	    console.log("Finally reliable response received");
	    //var response = JSON.parse(xhr.responseText);
		//console.log(xhr.responseText);
		//data has been received here along with the token response.token

        callback(JSON.parse(xhr.responseText));
      }
      else{
	    console.log("Response failed");
      }
    }
  };
}

function openPopUp(urlToOpen) {
  var popup_window=window.open(urlToOpen,"p_check","toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=yes, width=0, height=0");
  try {
    popup_window.focus();
    popup_window.close();
	return true;
  }
  catch (e) {
    alert("Pop-up Blocker is enabled! Please add this site to your exception list. \n\nSee our FAQ section on how to unblock popups.");
	return false;
  }
return false;
}

function peas(field)
{
//this function is called on receiveing the response
console.log(field);
$('#loader').hide();
$("#show_em").show();
$("#go_em").show();
	if(openPopUp("http://www.printuu.com")){
		$("#show_em").text(field.message);
		//$("#go_em").text("P.S: Make sure that the popups have been unblocked.");
		if(field.url!=null){

			window.open(field.url,'_blank');
			}


	} else {
		$("#go_em").text("Make sure that the popups have been unblocked and then try again.");
	}




}

// index content starts here
function alerter(){
  const files = document.getElementById('file-input').files;
  const file = files[0];
  if (files[0].size>20971520){
      return alert('File exceeds the 20 Mb size limit. Please try again.');
  }
}


function bunny(){
     var name=document.getElementById('pname').value;
	   var mail=document.getElementById('pemail').value;

    //var mail_dom= mail.split("@")
    const files = document.getElementById('file-input').files;
    const file = files[0];
  /*  if (files[0].size>){
        return alert('bhai kitni badi file upload kregaa?? 20MB limit hai.');
    } else */if(!mail.includes("@")||!mail.includes(".")){
        return alert('invalid email');
    } else if(file == null){
        return alert('Please select a file.');
    } else if (name==''){
        return alert('Invalid name or email.');
    } else if (files[0].size>20971520){
        return alert('Select another file. We only support files upto 20MB!');
    }
    else{

       getSignedRequest(file,name,mail);
	    $('#trm').prop("disabled",true);
			$('#loader').show();
       //$('#loader').show();
  }

}

function getSignedRequest(file,name,mail){
  const xhr = new XMLHttpRequest();
  xhr.open('POST', `/todest?file-name=${file.name}&file-type=${file.type}&name=${name}&mail=${mail}`);
  xhr.onreadystatechange = () => {

    if(xhr.readyState === 4){
      if(xhr.status === 200){
        console.log("Response received");
		console.log(xhr.responseText);
        const response = JSON.parse(xhr.responseText);

		//data has been received here along with the token response.token
        uploadFile(file, response.signedRequest, response.url,response.token,response.file);
      }
      else{
	  console.log("Bad Response received");
	  $('#loader').hide();
	    //$('#loader').hide();
        $("#jumbo").text("Sorry, The file failed to upload. Please try again later");
		$("#jumbo").show();
	     //$("#jumbo").show();
		 //$('#trm').show();
		$('#trm').prop("disabled",false);
      }
    }
  };
  xhr.send();
}

function uploadFile(file, signedRequest, url,token,fileName){
   console.log("Uploding file procedure started");
  const xhr = new XMLHttpRequest();
  xhr.open('PUT', signedRequest);
  xhr.onreadystatechange = () => {
if(xhr.readyState === 4){

      if(xhr.status === 200){
	  console.log("File uploaded well done");
	  $('#loader').hide();
	  $("#dumber").text(token);
	  $("#dumber").show();
	  var text="I uploaded '"+fileName+"' on http://printuu.com.\nUse token "+token+" to print yourself a copy, or \nuse this link printuu.com/printme?="+token;
	  var zam=encodeURI("whatsapp://send?text="+text);
	  $("#app_pic").attr("href",zam);
	  $("#app_pic").removeAttr("hidden");
	  $("#info").removeAttr("hidden");

	  $('#trm').attr("hidden",true);
	  //$("#app_pic").show();
	  //$('#kliber').show();
	  //$('#trm').hide();

	  //$('#trm').prop("disabled",false);

		}
      else{
	  console.log("Error uploading. hawww");
	  $('#loader').attr("hidden",true);
	  //$('#loader').hide();
	  $("#jumbo").text("Sorry, The file failed to upload. Please try again later");
	  $("#jumbo").removeAttr("hidden");
	  //$("#jumbo").show();
	  $('#trm').prop("disabled",false);

	  }
    }

  };
  xhr.send(file);
}

// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("info");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}


//SIDEBAR STARts (pb)

function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft= "0";
    document.body.style.backgroundColor = "white";
}
//SIDEBAR ENds (pb)
