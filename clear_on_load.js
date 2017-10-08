
var waitCounter = 0;
var waitForPaywall = setInterval (checkForPaywall, 500);

function checkForPaywall () 
{
	waitCounter++;
	//alert("checkForPaywall");

	var adblockWindowExit = document.getElementById("adblk-close"); //.click();
	if(adblockWindowExit) {
		console.log("DNReadItAll - Closing adblock window");
		adblockWindowExit.click();
	}

	var articleBodyMask = document.getElementsByClassName('article__body article__body--mask');
	var klarna = document.getElementById('klanaStep2');
	var paywallContent = document.getElementsByClassName('paywall-content');
    if (articleBodyMask.length || paywallContent.length) 
    {
		console.log("DNReadItAll - Removing paywall");
        removePayWall();
        clearInterval(waitForPaywall);
    } 
    else if(waitCounter >= 20) 
    {
		console.log("DNReadItAll - Giving up after 20 tries");
    	clearInterval(waitForPaywall);
    }
}

function removePayWall() 
{
	var articleBodyMask = document.getElementsByClassName('article__body article__body--mask')[0];
	if(articleBodyMask)
		articleBodyMask.className = articleBodyMask.className.replace( /(?:^|\s)article__body--mask(?!\S)/ , '' );

	var payWall = document.getElementsByClassName('js-paywall paywall paywall--pad paywall--active')[0];
	if(payWall) 
		payWall.setAttribute("style", "display:none;");

	var klarna = document.getElementById('klanaStep2');
	if(klarna)
		klarna.setAttribute("style", "visibility:hidden;");

	var paywallContent = document.getElementsByClassName('paywall-content')[0];
	if(paywallContent)
		paywallContent.setAttribute('style', '');

}