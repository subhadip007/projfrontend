
function displayRzorpay(){
    
    const options = {
        "key": "rzp_test_UKDy45mCoGnQBq", // Enter the Key ID generated from the Dashboard
        "amount": `200`, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        "currency": "INR",
        "name": "CuteTee",
        "description": "Visit again",
        "image": "https://example.com/your_logo",
        // "order_id": "order_9A33XWu170gUtm", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        "handler": function (response){
            alert(response.razorpay_payment_id);
            alert(response.razorpay_order_id);
            alert(response.razorpay_signature)
        },
        "prefill": {
            "name": "Gaurav Kumar",
            "email": "gaurav.kumar@example.com",
            "contact": "9999999999"
        },
        "notes": {
            "address": "Razorpay Corporate Office"
        },
        "theme": {
            "color": "#3399cc"
        }
    };
    const paymentObject = new window.Razorpay(options)
		paymentObject.open()
    
    }



function showRazorpay(){

const script= document.createElement('script');
script.src="https://checkout.razorpay.com/v1/checkout.js"
document.body.appendChild(script)
script.onload=displayRzorpay;


    
}




export default showRazorpay;