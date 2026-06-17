 const BASE_URL ="https://open.er-api.com/v6/latest";
const dropdowns=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("form button");
const fromcurr = document.querySelector("select[name='from']");
const tocurr = document.querySelector("select[name='to']");
const resetBtn = document.querySelector(".reset-btn");

for(let select of dropdowns)
{
for(code in countryList)
{
    let newoption=document.createElement("option");
    newoption.innerText=code;
    newoption.value=code;
    if(select.name==="from"&&code==="USD")
    {
        newoption.selected="selected";
    }else if(select.name==="to"&&code==="INR")
    {
        newoption.selected="selected";
    }
    select.append(newoption); 
}
 select.addEventListener("change",(evt)=>{
        upadateflag(evt.target);
    })
}

const upadateflag=(element)=>{
    let code=element.value;
    let countrycode=countryList[code];
    let newsrc=`https://flagsapi.com/${countrycode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newsrc;
}

btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    let amount = document.querySelector("form input");
    let amtVal = amount.value;
    if (amtVal === "" || amtVal < 1) {
        amtVal = 1;
        amount.value = "1";
    }
    const URL = `${BASE_URL}/${fromcurr.value}`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data.rates[tocurr.value];
    let finalAmount = amtVal * rate;
    document.querySelector(".con").innerText =
        `${amtVal} ${fromcurr.value} = ${finalAmount.toFixed(2)} ${tocurr.value}`;
});
resetBtn.addEventListener("click", () => {
    document.querySelector("form input").value = "";

    fromcurr.value = "USD";
    tocurr.value = "INR";

    document.querySelector(".con").innerText = "1 USD = 95.18INR";

    upadateflag(fromcurr);
    upadateflag(tocurr);
});