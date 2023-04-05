class Product {
    Product({
        this.id,
        this.name,
        this.quantity,
        this.category,
        this.price,
        this.location,
        this.description,
        this.images,
        this.sellerId,
        this.sellerEmail,
        this.sellerPhone,
        this.sellerName,
        this.rating,
        this.status,
    });

    String? id;
    String? name;
    int? quantity;
    String? category;
    int? price;
    String? location;
    String? description;
    List<String>? images;
    String? sellerId;
    String? sellerEmail;
    String? sellerPhone;
    String? sellerName;
    int? rating;
    String? status;

    factory Product.fromJson(Map<String, dynamic> json) => Product(
        id: json["id"],
        name: json["name"],
        quantity: json["quantity"],
        category: json["category"],
        price: json["price"],
        location: json["location"],
        description: json["description"],
        images: json["images"] == null ? [] : List<String>.from(json["images"]!.map((x) => x)),
        sellerId: json["seller_id"],
        sellerEmail: json["seller_email"],
        sellerPhone: json["seller_phone"],
        sellerName: json["seller_name"],
        rating: json["rating"],
        status: json["status"],
    );

    Map<String, dynamic> toJson() => {
        "id": id,
        "name": name,
        "quantity": quantity,
        "category": category,
        "price": price,
        "location": location,
        "description": description,
        "images": images == null ? [] : List<dynamic>.from(images!.map((x) => x)),
        "seller_id": sellerId,
        "seller_email": sellerEmail,
        "seller_phone": sellerPhone,
        "seller_name": sellerName,
        "rating": rating,
        "status": status,
    };
}
