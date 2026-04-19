// TownSpace JavaScript

var listings = [
    {
        id: 1,
        title: "Single room in Site B",
        area: "Khayelitsha",
        type: "Room",
        price: 1200,
        desc: "Neat single room close to the station. Shared bathroom and kitchen.",
        amenities: ["Water", "Shared bathroom", "Secure gate"],
        landlord: "Nomsa D.",
        image: "images/room1.png"
    },
    {
        id: 2,
        title: "Backyard dwelling Zone 17",
        area: "Khayelitsha",
        type: "Backyard",
        price: 1800,
        desc: "Private entrance. Water and electricity included.",
        amenities: ["Water", "Electricity", "Private entrance"],
        landlord: "Bongani M.",
        image: "images/room2.png"
    },
    {
        id: 3,
        title: "Room with kitchenette",
        area: "Khayelitsha",
        type: "Room",
        price: 2100,
        desc: "Furnished room with private bathroom and WiFi.",
        amenities: ["Water", "Electricity", "WiFi", "Furnished"],
        landlord: "Lindiwe T.",
        image: "images/room3.png"
    },
    {
        id: 4,
        title: "Double Storey House in Mitchells Plain",
        area: "Mitchells Plain",
        type: "Wendy",
        price: 1500,
        desc: "Comfortable house with its own entrance.",
        amenities: ["Water", "Electricity", "Secure gate"],
        landlord: "Fatima A.",
        image: "images/room4.png"
    },
    {
        id: 5,
        title: "Affordable room in NY1",
        area: "Gugulethu",
        type: "Room",
        price: 950,
        desc: "Simple room, close to Gugulethu Square.",
        amenities: ["Water", "Shared bathroom"],
        landlord: "Noluthando G.",
        image: "images/room5.png"
    },
    {
        id: 6,
        title: "Backyard unit in Langa",
        area: "Langa",
        type: "Backyard",
        price: 2400,
        desc: "Modern unit close to Langa Station.",
        amenities: ["Water", "Electricity", "Private bathroom", "Communal Pool"],
        landlord: "Khulekani N.",
        image: "images/room6.png"
    }
];

//wishlist saved
var wishlist = [];
var currentListingId = null;
var uploadedPhoto = null;


// Show a page and hide others
function showPage(pageName) {
    document.getElementById("home").style.display = "none";
    document.getElementById("search").style.display = "none";
    document.getElementById("detail").style.display = "none";
    document.getElementById("list").style.display = "none";
    document.getElementById("wishlist").style.display = "none";

    document.getElementById(pageName).style.display = "block";
    
    //Refresh the content of the page if needed
    if (pageName == "search") {
        displayListings(listings, "searchList");
    }
    if (pageName == "wishlist") {
        showWishlist();
    }

    window.scrollTo(0, 0);
}


//display list of listings in a given container
function displayListings(items, containerId) {
    var container = document.getElementById(containerId);
    container.innerHTML = "";

    if (items.length == 0) {
        container.innerHTML = "<p>No listings found.</p>";
        return;
    }

    for (var i = 0; i < items.length; i++) {
        var item = items[i];
        var card = "<div class='card' onclick='openListing(" + item.id + ")'>";
        card += "<img src='" + item.image + "' alt='Property photo' class='card-image'>";
        card += "<h3>" + item.title + "</h3>";
        card += "<p>" + item.area + " - " + item.type + "</p>";
        card += "<p class='price'>R" + item.price + " / month</p>";
        card += "</div>";
        container.innerHTML += card;
    }
}


//opens listing detail page
function openListing(id) {
    var listing = null;
    for (var i = 0; i < listings.length; i++) {
        if (listings[i].id == id) {
            listing = listings[i];
        }
    }

    if (listing == null) return;

    currentListingId = id;

    document.getElementById("dImage").src = listing.image;
    document.getElementById("dTitle").textContent = listing.title;
    document.getElementById("dLocation").textContent = listing.area + " - " + listing.type;
    document.getElementById("dPrice").textContent = "R" + listing.price + " / month";
    document.getElementById("dDesc").textContent = listing.desc;
    document.getElementById("dLandlord").textContent = listing.landlord;

    var amenList = document.getElementById("dAmenities");
    amenList.innerHTML = "";
    for (var j = 0; j < listing.amenities.length; j++) {
        amenList.innerHTML += "<li>" + listing.amenities[j] + "</li>";
    }

    showPage("detail");
}


//Share the current listing on WhatsApp
function shareOnWhatsApp() {
    if (currentListingId == null) return;

    //find the current listing
    var listing = null;
    for (var i = 0; i < listings.length; i++) {
        if (listings[i].id == currentListingId) {
            listing = listings[i];
        }
    }

    if (listing == null) return;

    //build the WhatsApp message
    var message = "Check out this listing on TownSpace!\n\n";
    message += listing.title + "\n";
    message += "Location: " + listing.area + "\n";
    message += "Price: R" + listing.price + " / month\n";
    message += "Landlord: " + listing.landlord + "\n\n";
    message += listing.desc;

    //encode the message and open WhatsApp
    var encodedMessage = encodeURIComponent(message);
    var whatsappUrl = "https://wa.me/?text=" + encodedMessage;
    window.open(whatsappUrl, "_blank");
}


//Search from home page
function searchListings() {
    var searchTerm = document.getElementById("searchBox").value.toLowerCase();
    var results = [];

    for (var i = 0; i < listings.length; i++) {
        if (listings[i].area.toLowerCase().indexOf(searchTerm) != -1 ||
            listings[i].title.toLowerCase().indexOf(searchTerm) != -1) {
            results.push(listings[i]);
        }
    }

    showPage("search");
    displayListings(results, "searchList");
}


//Filter the listings on search page
function filterListings() {
    var area = document.getElementById("filterArea").value;
    var type = document.getElementById("filterType").value;
    var maxPrice = document.getElementById("filterPrice").value;

    document.getElementById("priceValue").textContent = maxPrice;

    var results = [];
    for (var i = 0; i < listings.length; i++) {
        var l = listings[i];
        var match = true;

        if (area != "all" && l.area != area) match = false;
        if (type != "all" && l.type != type) match = false;
        if (l.price > maxPrice) match = false;

        if (match) results.push(l);
    }

    displayListings(results, "searchList");
}


//Send enquiry
function sendEnquiry() {
    var name = document.getElementById("enqName").value;
    var date = document.getElementById("enqDate").value;
    var msg = document.getElementById("enqMsg").value;

    if (name == "" || date == "" || msg == "") {
        alert("Please fill in all fields.");
        return;
    }

    alert("Enquiry sent! The landlord will contact you soon.");
    document.getElementById("enqName").value = "";
    document.getElementById("enqDate").value = "";
    document.getElementById("enqMsg").value = "";
}


//Save listing to wishlist
function saveToWishlist() {
    if (currentListingId == null) return;

    //check if already in wishlist
    for (var i = 0; i < wishlist.length; i++) {
        if (wishlist[i] == currentListingId) {
            alert("Already in your wishlist.");
            return;
        }
    }

    wishlist.push(currentListingId);
    alert("Saved to wishlist!");
}


//display wishlist page
function showWishlist() {
    var saved = [];
    for (var i = 0; i < listings.length; i++) {
        for (var j = 0; j < wishlist.length; j++) {
            if (listings[i].id == wishlist[j]) {
                saved.push(listings[i]);
            }
        }
    }
    displayListings(saved, "wishlistList");
}


//preview the uploaded photo
function previewPhoto() {
    var fileInput = document.getElementById("newPhoto");
    var preview = document.getElementById("photoPreview");

    if (fileInput.files.length > 0) {
        var reader = new FileReader();
        reader.onload = function(e) {
            uploadedPhoto = e.target.result;
            preview.src = uploadedPhoto;
            preview.style.display = "block";
        };
        reader.readAsDataURL(fileInput.files[0]);
    }
}


//Add a new listing from the list property form
function addListing() {
    var title = document.getElementById("newTitle").value;
    var area = document.getElementById("newArea").value;
    var type = document.getElementById("newType").value;
    var price = document.getElementById("newPrice").value;
    var desc = document.getElementById("newDesc").value;
    var landlord = document.getElementById("newLandlord").value;

    if (title == "" || price == "" || landlord == "") {
        alert("Please fill in all fields.");
        return;
    }

    //default if none was uploaded
    var photoToUse = uploadedPhoto;
    if (photoToUse == null) {
        photoToUse = "images/room1.jpg";
    }

    var newListing = {
        id: listings.length + 1,
        title: title,
        area: area,
        type: type,
        price: Number(price),
        desc: desc,
        amenities: ["Water"],
        landlord: landlord,
        image: photoToUse
    };

    listings.push(newListing);

    //Clearing the form
    document.getElementById("newTitle").value = "";
    document.getElementById("newPrice").value = "";
    document.getElementById("newDesc").value = "";
    document.getElementById("newLandlord").value = "";
    document.getElementById("newPhoto").value = "";
    document.getElementById("photoPreview").style.display = "none";
    uploadedPhoto = null;

    alert("Your listing has been published!");
    showPage("search");
}


//Load featured listings when page opens
displayListings(listings.slice(0, 3), "featuredList");
