// To parse this JSON data, do
//
//     final verified = verifiedFromJson(jsonString);

import 'dart:convert';

Verified verifiedFromJson(String str) => Verified.fromJson(json.decode(str));

String verifiedToJson(Verified data) => json.encode(data.toJson());

class Verified {
    Verified({
        this.id,
        this.name,
        this.email,
        this.phone,
    });

    String? id;
    String? name;
    String? email;
    String? phone;

    factory Verified.fromJson(Map<String, dynamic> json) => Verified(
        id: json["id"],
        name: json["name"],
        email: json["email"],
        phone: json["phone"],
    );

    Map<String, dynamic> toJson() => {
        "id": id,
        "name": name,
        "email": email,
        "phone": phone,
    };
}
